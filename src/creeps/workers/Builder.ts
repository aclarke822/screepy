import Worker from "creeps/workers/Worker";

class Builder extends Worker {
    memory: WorkerMemory;

    static readonly BUILDER_PROPS0: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Builder) { return new Builder(creep); }
    };

    static readonly BUILDER_PROPS1: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY, MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Builder) { return new Builder(creep); }
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
            case Worker.CONSTANTS.STATE_SEEKFULLSTORE:
                this.seekSource();
                break;
            case Worker.CONSTANTS.STATE_SEEKFRAME:
                this.seekFrame();
                break;
            case Worker.CONSTANTS.STATE_RELOCATE:
                this.relocate();
                break;
            case Worker.CONSTANTS.STATE_GATHER:
                this.gather(Worker.CONSTANTS.INTENT_BUILD, Worker.CONSTANTS.STATE_SEEKFRAME, Worker.CONSTANTS.STATE_SEEKSOURCE);
                break;
            case Worker.CONSTANTS.STATE_CONSTRUCT:
                this.construct();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }
    }

    protected findConstructionSites(): ConstructionSite<BuildableStructureConstant> | undefined {
        const targets = this.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            return targets[0];
        } else {
            return undefined;
        }
    }

    protected seekFrame(): void {
        const target = this.findConstructionSites();
        if (target !== undefined) {
            this.memory.targetId = target.id;
            this.memory.state = Worker.CONSTANTS.STATE_RELOCATE;
        } else {
            this.seekHome();
        }
    }

    protected construct() {
        const target = Game.getObjectById(this.memory.targetId) as ConstructionSite<BuildableStructureConstant>;

        if (target === null) {
            this.seekFrame();
            return;
        }

        if (this.store.getUsedCapacity() > 0) {
            if (this.build(target) !== OK) {
                this.seekHome();
                this.seekFrame();
            }
        } else {
            this.seekSource();
            this.memory.intent = Worker.CONSTANTS.INTENT_HARVEST;
        }
    }
}

export default Builder;