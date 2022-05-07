import Worker from "creeps/workers/Worker";

export class Hauler extends Worker {
    memory: WorkerMemory;
    static readonly HAULER_PROPS0: WORKER_PROPS = {
        PARTS: [CARRY, CARRY, MOVE],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Hauler(creep); },
    };

    static readonly HAULER_PROPS1: WORKER_PROPS = {
        PARTS: [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Creep) { return new Hauler(creep); },
    };

    constructor(creep: Creep) {
        super(creep);
        this.memory = creep.memory as WorkerMemory;
    }

    perform(): void {
        switch (this.memory.state) {
            case Worker.CONSTANTS.STATE_NEW:
            case Worker.CONSTANTS.STATE_SEEKTOILER:
                this.seekToiler();
                break;
            case Worker.CONSTANTS.STATE_SEEKDROPPEDENERGY:
                this.seekDroppedEnergy();
                break;
            case Worker.CONSTANTS.STATE_SEEKFREESTORE:
                this.seekFreeStore();
                break;
            case Worker.CONSTANTS.STATE_RELOCATE:
                this.relocate();
                break;
            case Worker.CONSTANTS.STATE_UNLOAD:
                this.unload();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }

    }
    seekDroppedEnergy() {
        throw new Error("Method not implemented.");
    }

    seekToiler() {
        throw new Error("Method not implemented.");
    }
}

export default Hauler;