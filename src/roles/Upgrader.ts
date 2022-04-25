import Commoner from "roles/Commoner";

interface Upgrader extends Commoner {
    name: string;
    room: Room;
    state: Upgrader["states"];
    intent: Upgrader["intents"];
    role: "UPGRADER" | "UPGRADER";
    bodyParts: BodyPartConstant[];

    states: typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD;
    intents: typeof INTENT_UNLOAD | typeof INTENT_HARVEST;
    
    memory: CreepMemory;
    perform(): void;
}
class Upgrader implements Upgrader {
    public static role = "UPGRADER";
    public static bodyParts = [MOVE, WORK, CARRY];
    public static states = [STATE_NEW, STATE_SEEKSOURCE, STATE_SEEKHOME, STATE_RELOCATE, STATE_GATHER, STATE_UNLOAD];
    public static intents = [INTENT_UNLOAD, INTENT_HARVEST];

    constructor(creep: Creep) {
        this.memory = creep.memory;
    }

    public static perform(): void {
        // if (this.upgrading && this.store[RESOURCE_ENERGY] == 0) {
        //     this.memory.upgrading = false;
        //     this.say('🔄 harvest');
        // }
        // if (!this.memory.upgrading && this.store.getFreeCapacity() == 0) {
        //     this.memory.upgrading = true;
        //     this.say('⚡ upgrade');
        // }

        // if (this.memory.upgrading) {
        //     if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
        //         this.moveTo(this.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        //     }
        // }
        // else {
        //     const sources = this.room.find(FIND_SOURCES);
        //     if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         this.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        //     }
        // }
    }
}

export default Upgrader;