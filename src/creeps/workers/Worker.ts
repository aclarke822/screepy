export const WORKER_CONSTANTS = {
    INTENT_HARVEST: "HARVEST" as INTENT_HARVEST,
    INTENT_UPGRADE: "UPGRADE" as INTENT_UPGRADE,
    INTENT_DEPOSIT: "DEPOSIT" as INTENT_DEPOSIT,
    INTENT_BUILD: "BUILD" as INTENT_BUILD,
    INTENT_WITHDRAW: "WITHDRAW" as INTENT_WITHDRAW,
    INTENT_TOIL: "TOIL" as INTENT_TOIL,
    INTENT_FETCH: "FETCH" as INTENT_FETCH,

    STATE_NEW: "NEW" as STATE_NEW,
    STATE_DUMP: "DUMP" as STATE_DUMP,
    STATE_SEEKSOURCE: "SEEKSOURCE" as STATE_SEEKSOURCE,
    STATE_SEEKHOME: "SEEKHOME" as STATE_SEEKHOME,
    STATE_RELOCATE: "RELOCATE" as STATE_RELOCATE,
    STATE_GATHER: "GATHER" as STATE_GATHER,
    STATE_UNLOAD: "UNLOAD" as STATE_UNLOAD,
    STATE_SEEKFRAME: "SEEKFRAME" as STATE_SEEKFRAME,
    STATE_CONSTRUCT: "CONSTRUCT" as STATE_CONSTRUCT,
    STATE_SEEKCONTROLLER: "SEEKCONTROLLER" as STATE_SEEKCONTROLLER,
    STATE_PROMOTE: "PROMOTE" as STATE_PROMOTE,
    STATE_SEEKFREESTORE: "SEEKFREESTORE" as STATE_SEEKFREESTORE,
    STATE_SEEKFULLSTORE: "SEEKFULLSTORE" as STATE_SEEKFULLSTORE,
    STATE_SEEKTOILER: "SEEKTOILER" as STATE_SEEKTOILER,
    STATE_SEEKDROPPEDENERGY: "SEEKDROPPEDENERGY" as STATE_SEEKDROPPEDENERGY,

    ROLE_HARVESTER: "HARVESTER" as ROLE_HARVESTER,
    ROLE_UPGRADER: "UPGRADER" as ROLE_UPGRADER,
    ROLE_BUILDER: "BUILDER" as ROLE_BUILDER,
    ROLE_TOILER: "TOILER" as ROLE_TOILER,
    ROLE_HAULER: "HAULER" as ROLE_HAULER
};

export abstract class Worker extends Creep {
    abstract memory: WorkerMemory;
    abstract perform(): void;
    // abstract arrivedToTarget(): void;
    static readonly BIRTH: number;
    static readonly CONSTANTS = WORKER_CONSTANTS;

    constructor(creep: Creep) {
        super(creep.id);
    }

    protected seekHome(): void {
        this.memory.targetId = this.findNearestSpawn().id as Id<StructureSpawn>;
        this.memory.state = WORKER_CONSTANTS.STATE_RELOCATE;
    }

    protected seekSource(): void {
        this.memory.targetId = this.findLeastActiveSource().id;
        this.memory.state = WORKER_CONSTANTS.STATE_RELOCATE;
    }

    protected findNearestSource(): Source {
        //Every room should have a source... right?
        return this.room.find(FIND_SOURCES_ACTIVE)[0];
    }

    // private sourceCalculation(sources): Source {

    // }

    protected findLeastActiveSource(): Source {
        const creeps = Memory.creeps;
        const room = Memory.rooms[this.room.name];
        const sources = room.sources; //find(FIND_SOURCES_ACTIVE);

        let leastActiveSource: {
            sourceId: string | undefined,
            targets: number
        };

        leastActiveSource = { sourceId: undefined, targets: 99999 };

        Object.keys(sources).forEach((sourceId) => {
            let targets = 0;
            
            if (sourceId === room.avoidSourceId) { return; }

            Object.keys(creeps).forEach((creepName) => {
                const creep = creeps[creepName];

                if (creep.targetId === sourceId) { targets += 1; }
            });
            //console.log(`${sourceId}:::leastActiveSource.sourceTargets-${leastActiveSource.targets}:::targets-${targets}`);
            sources[sourceId as Id<Source>].targets = targets;
            if (leastActiveSource.targets > targets) { leastActiveSource = { sourceId: sourceId, targets: targets }; }
        });

        let sourceId = leastActiveSource.sourceId as Id<_HasId>;

        if (sourceId === undefined || sourceId === null || sourceId === room.avoidSourceId) {
            sourceId = room.defaultSourceId;
        }

        return this.getTargetById(sourceId) as Source;
    }

    protected findNearestSpawn(): AnyStructure {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });

        return targets[0];
    }

    protected findNearestFreeStore(): AnyStructure {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length > 0) {
            return targets[0];
        } else {
            return this.findNearestSpawn();
        }
    }

    seekFreeStore() {
        this.memory.targetId = this.findNearestFreeStore().id as Id<StructureSpawn>;
        this.memory.state = Worker.CONSTANTS.STATE_RELOCATE;
    }

    protected findNearestFullStore(): AnyStructure | Source {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length > 0) {
            return targets[0];
        } else {
            return this.findLeastActiveSource();
        }
    }

    protected relocate(): void {
        const target = this.getTargetById(this.memory.targetId) as Structure<StructureConstant>;

        if (this.pos.getRangeTo(target.pos) <= 1) {
            switch (this.memory.intent) {
                case WORKER_CONSTANTS.INTENT_HARVEST:
                    this.memory.state = WORKER_CONSTANTS.STATE_GATHER;
                    break;
                case WORKER_CONSTANTS.INTENT_DEPOSIT:
                    this.memory.state = WORKER_CONSTANTS.STATE_UNLOAD;
                    break;
                case WORKER_CONSTANTS.INTENT_BUILD:
                    this.memory.state = WORKER_CONSTANTS.STATE_CONSTRUCT;
                    break;
                case WORKER_CONSTANTS.INTENT_UPGRADE:
                    this.memory.state = WORKER_CONSTANTS.STATE_PROMOTE;
                    break;
                case WORKER_CONSTANTS.INTENT_TOIL:
                    this.memory.state = WORKER_CONSTANTS.STATE_GATHER;
                    break;
                default:
                    throw new Error(`${this.name} - Invalid Intent: ${this.memory.intent}`);
            }
        } else {
            this.moveTo(target.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }

    protected getTargetById(id: Id<_HasId>): _HasId {
        const target = Game.getObjectById(id);

        if (target !== null && target !== undefined) {
            return target;
        } else {
            switch (this.memory.intent) {
                case WORKER_CONSTANTS.INTENT_HARVEST:
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKSOURCE;
                    break;
                case WORKER_CONSTANTS.INTENT_DEPOSIT:
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKFREESTORE;
                    break;
                case WORKER_CONSTANTS.INTENT_BUILD:
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKFRAME;
                    break;
                case WORKER_CONSTANTS.INTENT_UPGRADE:
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKCONTROLLER;
                    break;
                case WORKER_CONSTANTS.INTENT_WITHDRAW:
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKFULLSTORE;
                    break;
                default:
                    throw new Error(`${this.name} - Invalid Intent: ${this.memory.intent}`);
            }
            return Game.spawns['Spawn1'];
        }
    }

    //abstract targetAcquired: void

    protected gather(intentChange: WORKER_INTENTS, stateChange: WORKER_STATES, failState: WORKER_STATES): void {
        const target = this.getTargetById(this.memory.targetId) as Source;

        if (this.store.getFreeCapacity() > 0) {
            if (this.harvest(target) !== OK) { this.memory.state = failState; }
        } else {
            this.memory.intent = intentChange;
            this.memory.state = stateChange;
        }
    }

    protected unload(): void {
        const target = this.getTargetById(this.memory.targetId) as Structure<StructureConstant>;
        const returnCode = this.transfer(target, RESOURCE_ENERGY);

        if (this.store.getUsedCapacity() > 0) {
            if (returnCode !== OK) {
                this.memory.state = Worker.CONSTANTS.STATE_SEEKFREESTORE;
            }
        } else {
            this.memory.intent = Worker.CONSTANTS.INTENT_HARVEST;
            this.memory.state = Worker.CONSTANTS.STATE_SEEKSOURCE;
        }
    }
}

export default Worker;