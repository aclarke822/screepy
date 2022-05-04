import Worker from "workers/Worker";

export class Harvester extends Worker {
    memory: WorkerMemory;

    static readonly HARVESTER_PROPS0: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Harvester(creep); },
    };

    static readonly HARVESTER_PROPS1: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY, MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Harvester(creep); },
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
            case Worker.CONSTANTS.STATE_SEEKHOME:
                this.seekHome();
                break;
            case Worker.CONSTANTS.STATE_SEEKFREESTORE:
                this.seekFreeStore();
                break;
            case Worker.CONSTANTS.STATE_RELOCATE:
                this.relocate();
                break;
            case Worker.CONSTANTS.STATE_GATHER:
                this.gather();
                break;
            case Worker.CONSTANTS.STATE_UNLOAD:
                this.unload();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }
    }

    seekFreeStore() {
        this.memory.targetId = this.findNearestFreeStore().id as Id<StructureSpawn>;
        this.memory.state = Worker.CONSTANTS.STATE_RELOCATE;
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

export class Harvester2 extends Harvester {
    static readonly HARVESTER_PROPS: WORKER_PROPS = {
        PARTS: [MOVE, MOVE, WORK, WORK, CARRY, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Harvester2(creep); },
    };
}

export default Harvester;