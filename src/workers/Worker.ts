import { clone, cloneDeep } from "lodash-es";
import util from 'util';

export const WORKER_CONSTANTS = {
    INTENT_HARVEST: "HARVEST" as INTENT_HARVEST,
    INTENT_UPGRADE: "UPGRADE" as INTENT_UPGRADE,
    INTENT_DEPOSIT: "DEPOSIT" as INTENT_DEPOSIT,
    INTENT_BUILD: "BUILD" as INTENT_BUILD,

    STATE_NEW: "NEW" as STATE_NEW,
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

    ROLE_HARVESTER: "HARVESTER" as ROLE_HARVESTER,
    ROLE_UPGRADER: "UPGRADER" as ROLE_UPGRADER,
    ROLE_BUILDER: "BUILDER" as ROLE_BUILDER
};

export abstract class Worker extends Creep {
    abstract memory: WorkerMemory;
    abstract perform(): void;
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
        this.memory.targetId = this.findLeastActiveSource().id as Id<Source>;
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
        const sources = this.room.find(FIND_SOURCES_ACTIVE);

        let leastActiveSource: {
            source: Source | undefined,
            sourceTargets: number
        };

        leastActiveSource = { source: undefined, sourceTargets: 99999 };

        sources.forEach((source) => {
            let targets = 0;

            Object.keys(creeps).forEach((creepName) => {
                const creep = creeps[creepName];

                if (creep.targetId === source.id) { targets += 1; }
            });
            console.log(`${source.id}:::leastActiveSource.sourceTargets-${leastActiveSource.sourceTargets}:::targets-${targets}`);

            if (leastActiveSource.sourceTargets > targets) { leastActiveSource = { source: source, sourceTargets: targets }; }
        });

        const source = leastActiveSource.source;

        if (source !== undefined && source !== null) {
            if (source.id === "42f183d02d348e16b6e6e4d5") { return sources[0];}
            return source;
        } else {
            return sources[0];
        }
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
                default:
                    throw new Error(`${this.name} - Invalid Intent: ${this.memory.intent}`);
            }
            return Game.spawns['Spawn1'];
        }
    }

    protected gather(): void {
        const target = this.getTargetById(this.memory.targetId) as Source;

        if (this.store.getFreeCapacity() > 0) {
            if (this.harvest(target) !== OK) {
                this.memory.state = WORKER_CONSTANTS.STATE_SEEKSOURCE;
            }
        } else {
            switch (this.memory.role) {
                case WORKER_CONSTANTS.ROLE_HARVESTER:
                    this.memory.intent = WORKER_CONSTANTS.INTENT_DEPOSIT;
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKHOME;
                    break;
                case WORKER_CONSTANTS.ROLE_BUILDER:
                    this.memory.intent = WORKER_CONSTANTS.INTENT_BUILD;
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKFRAME;
                    break;
                case WORKER_CONSTANTS.ROLE_UPGRADER:
                    this.memory.intent = WORKER_CONSTANTS.INTENT_UPGRADE;
                    this.memory.state = WORKER_CONSTANTS.STATE_SEEKCONTROLLER;
                    break;
                default:
                    throw new Error(`${this.name} - Invalid role: ${this.memory.role}`);
            }
        }
    }
}

export default Worker;