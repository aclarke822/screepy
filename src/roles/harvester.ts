import Commoner from "roles/Commoner";

interface Harvester extends Commoner {
    name: string;
    room: Room;
    state: Harvester["states"];
    intent: Harvester["intents"];
    role: "HARVESTER" | "HARVESTER";
    bodyParts: BodyPartConstant[];

    states: typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD;
    intents: typeof INTENT_UNLOAD | typeof INTENT_HARVEST;
    
    memory: CreepMemory;
    perform(): void;
}

class Harvester implements Harvester {
    public static role = "HARVESTER";
    public static bodyParts = [MOVE, WORK, CARRY];
    public static states = [STATE_NEW, STATE_SEEKSOURCE, STATE_SEEKHOME, STATE_RELOCATE, STATE_GATHER, STATE_UNLOAD];
    public static intents = [INTENT_UNLOAD, INTENT_HARVEST];

    constructor(creep: Creep) {
        this.memory = creep.memory;
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

    gather() {
        const target = Game.getObjectById(this.memory.target) as Source;
        if (this.store.getFreeCapacity() > 0) {
            if (this.harvest(target) == ERR_NOT_IN_RANGE) {
                this.memory.state = "SEEKSOURCE";
            }
        } else {
            this.memory.intent = "DEPOSIT";
            this.memory.state = "SEEKHOME";
        }
    }

    unload() {
        const target = Game.getObjectById(this.memory.target) as Structure<StructureConstant>;
        if (this.store.getUsedCapacity() > 0) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.memory.state = "SEEKHOME";
            }

        } else {
            this.memory.intent = "HARVEST";
            this.memory.state = "SEEKSOURCE";
        }
    }
}

export default Harvester;