import Commoner from "roles/Commoner";

interface Builder extends Commoner {
    name: string;
    room: Room;
    state: Builder["states"];
    intent: Builder["intents"];
    role: "BUILDER" | "BUILDER";
    bodyParts: BodyPartConstant[];

    states: typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD;
    intents: typeof INTENT_UNLOAD | typeof INTENT_HARVEST;
    
    memory: CreepMemory;
    perform(): void;
}

class Builder implements Builder {
    public static role = "HARVESTER";
    public static bodyParts = [MOVE, WORK, CARRY];
    public static states = [STATE_NEW, STATE_SEEKSOURCE, STATE_SEEKHOME, STATE_RELOCATE, STATE_GATHER, STATE_UNLOAD];
    public static intents = [INTENT_UNLOAD, INTENT_HARVEST];
    
    constructor(creep: Creep) {
        this.memory = creep.memory;
    }

    perform(): void {
        // if (this.memory.working && this.store[RESOURCE_ENERGY] == 0) {
        //     this.memory.working = false;
        //     this.say('🔄 harvest');
        // }
        // if (!this.memory.working && this.store.getFreeCapacity() == 0) {
        //     this.memory.working = true;
        //     this.say('🚧 build');
        // }

        // if (this.memory.working) {
        //     const targets = this.room.find(FIND_CONSTRUCTION_SITES);
        //     if (targets.length) {
        //         if (this.build(targets[0]) == ERR_NOT_IN_RANGE) {
        //             this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        //         }
        //     }
        // }
        // else {
        //     const sources = this.room.find(FIND_SOURCES);
        //     if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         this.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        //     }
        // }
    }

    findNearestSource() {
        return this.room.find(FIND_SOURCES)[0];
    }

}

export default Builder;