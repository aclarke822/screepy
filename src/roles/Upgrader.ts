import Commoner from "roles/Commoner";
import {STATE_NEW} from "constants/states";
import {INTENT_HARVEST} from "constants/intents";
import {ROLE_UPGRADER} from "constants/roles";

class Upgrader extends Commoner {
    memory: UpgraderMemory;
    public static ROLE = ROLE_UPGRADER;
    public static PARTS = [MOVE, WORK, CARRY];
    public static STATE_NEW = STATE_NEW;
    public static INTENT_NEW = INTENT_HARVEST;

    constructor(creep: Creep) {
        super(creep);
        this.memory = creep.memory as UpgraderMemory;
    }

    perform(): void {
        throw new Error("Method not implemented.");
    }
}

export default Upgrader;