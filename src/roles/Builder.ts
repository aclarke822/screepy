import Commoner from "roles/Commoner";
import {STATE_NEW} from "constants/states";
import {INTENT_HARVEST} from "constants/intents";
import {ROLE_BUILDER} from "constants/roles";

class Builder extends Commoner {
    memory: BuilderMemory;
    public static ROLE = ROLE_BUILDER;
    public static PARTS = [MOVE, WORK, CARRY];
    public static STATE_NEW = STATE_NEW;
    public static INTENT_NEW = INTENT_HARVEST;

    constructor(creep: Creep) {
        super(creep);
        this.memory = creep.memory as BuilderMemory;
    }

    perform(): void {
        throw new Error("Method not implemented.");
    }
}

export default Builder;