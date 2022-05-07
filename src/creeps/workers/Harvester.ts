import Worker from "creeps/workers/Worker";

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
                this.gather(Worker.CONSTANTS.INTENT_DEPOSIT, Worker.CONSTANTS.STATE_SEEKHOME, Worker.CONSTANTS.STATE_SEEKSOURCE);
                break;
            case Worker.CONSTANTS.STATE_UNLOAD:
                this.unload();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }
    }
}

export default Harvester;