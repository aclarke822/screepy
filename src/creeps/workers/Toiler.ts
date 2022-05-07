import Worker from "creeps/workers/Worker";

export class Toiler extends Worker {
    memory: WorkerMemory;

    static readonly TOILER_PROPS0: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Toiler(creep); },
    };

    static readonly TOILER_PROPS1: WORKER_PROPS = {
        PARTS: [WORK, WORK, WORK, WORK, CARRY, MOVE],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Toiler(creep); },
    };

    constructor(creep: Creep) {
        super(creep);
        this.memory = creep.memory as WorkerMemory;
    }

    perform(): void {
        switch (this.memory.state) {
            case Worker.CONSTANTS.STATE_NEW:
            case Worker.CONSTANTS.STATE_SEEKSOURCE:
                this.seekSource();
                break;
            case Worker.CONSTANTS.STATE_RELOCATE:
                this.relocate();
                break;
            case Worker.CONSTANTS.STATE_GATHER:
                this.gather(Worker.CONSTANTS.INTENT_TOIL, Worker.CONSTANTS.STATE_DUMP, Worker.CONSTANTS.STATE_RELOCATE);
                break;
            case Worker.CONSTANTS.STATE_DUMP:
                this.dump();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }
    }

    dump() {
        this.drop(RESOURCE_ENERGY);
        this.memory.state = Worker.CONSTANTS.STATE_GATHER;
    }

    protected findd(): Source {
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
}

export default Toiler;