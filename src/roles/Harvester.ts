import Commoner from "roles/Commoner";
import { STATE_NEW, STATE_SEEKSOURCE, STATE_GATHER, STATE_RELOCATE, STATE_SEEKHOME, STATE_UNLOAD } from "constants/states";
import { INTENT_HARVEST, INTENT_DEPOSIT } from "constants/intents";
import { ROLE_HARVESTER } from "constants/roles";

class Harvester extends Commoner {
    memory: HarvesterMemory;
    public static ROLE = ROLE_HARVESTER;
    public static PARTS = [MOVE, WORK, CARRY];
    public static STATE_NEW = STATE_NEW;
    public static INTENT_NEW = INTENT_HARVEST;

    constructor(creep: Creep) {
        super(creep);
        this.memory = creep.memory as HarvesterMemory;
    }

    perform(): void {
        switch (this.memory.state) {
            case STATE_NEW:
            case STATE_SEEKSOURCE:
                this.seekSource();
                break;
            case STATE_SEEKHOME:
                this.seekHome();
                break;
            case STATE_RELOCATE:
                this.relocate();
                break;
            case STATE_GATHER:
                this.gather();
                break;
            case STATE_UNLOAD:
                this.unload();
                break;
            default:
                console.log(`Invalid State: ${this.memory.state}`);
        }
    }

    unload(): void {
        const target = Game.getObjectById(this.memory.targetId) as Structure<StructureConstant>;

        if (this.store.getUsedCapacity() > 0) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.memory.state = STATE_SEEKHOME;
            }

        } else {
            this.memory.intent = INTENT_HARVEST;
            this.memory.state = STATE_SEEKSOURCE;
        }
    }

    gather() {
        const target = Game.getObjectById(this.memory.targetId) as Source;

        if (this.store.getFreeCapacity() > 0) {
            if (this.harvest(target) == ERR_NOT_IN_RANGE) {
                this.memory.state = STATE_SEEKSOURCE;
            }
        } else {
            this.memory.intent = INTENT_DEPOSIT;
            this.memory.state = STATE_SEEKHOME;
        }
    }
}

export default Harvester;