import Commoner from "roles/Commoner";

interface Builder extends Commoner {
    bodyParts: BodyPartConstant[];
    states: typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD;
    intents: typeof INTENT_UNLOAD | typeof INTENT_HARVEST;
    name: string;
    role: "BUILDER" | "BUILDER";
    state: Builder["states"];
    intent: Builder["intents"];
    room: Room;
    memory: CreepMemory;
    perform(): void;
}

class Builder implements Builder {
    public static role = "BUILDER";
    public static bodyParts = [MOVE, WORK, CARRY];
    
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