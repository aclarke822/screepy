import Worker from "workers/Worker";

class Upgrader extends Worker {
    memory: WorkerMemory;

    static readonly UPGRADER_PROPS0: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Upgrader) { return new Upgrader(creep); }
    };

    static readonly UPGRADER_PROPS1: WORKER_PROPS = {
        PARTS: [MOVE, WORK, CARRY, MOVE, WORK, CARRY],
        STATE_NEW: Worker.CONSTANTS.STATE_NEW,
        INTENT_NEW: Worker.CONSTANTS.INTENT_HARVEST,
        NEW(creep: Upgrader) { return new Upgrader(creep); }
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
            case Worker.CONSTANTS.STATE_SEEKCONTROLLER:
                this.seekController();
                break;
            case Worker.CONSTANTS.STATE_RELOCATE:
                this.relocate();
                break;
            case Worker.CONSTANTS.STATE_GATHER:
                this.gather();
                break;
            case Worker.CONSTANTS.STATE_PROMOTE:
                this.promote();
                break;
            default:
                throw new Error(`${this.name} - Invalid State: ${this.memory.state}`);
        }
    }

    protected promote() {
        const target = this.getTargetById(this.memory.targetId) as StructureController;
        if (this.store.getUsedCapacity() > 0) {
            if (this.upgradeController(target) !== OK) {
                this.seekHome();
                this.seekController();
            }
        } else {
            this.seekSource();
            this.memory.intent = Worker.CONSTANTS.INTENT_HARVEST;
        }
    }

    protected seekController() {
        const target = this.room.controller;
        if (target !== undefined) {
            this.memory.targetId = target.id;
            this.memory.state = Worker.CONSTANTS.STATE_RELOCATE;

        }
    }
}

export default Upgrader;