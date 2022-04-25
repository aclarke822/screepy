type BUILDER_STATES = typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD
type BUILDER_INTENTS = typeof INTENT_UPGRADE | typeof INTENT_HARVEST

interface Builder extends Creep {
    perform(): void;
    memory: CreepMemory;
    bodyParts: BodyPartConstant[];
    states: BUILDER_STATES;
    intents: BUILDER_INTENTS;
}

class Builder implements Builder {
    memory: CreepMemory = {
        name: 'harvester',
        bodyParts: [MOVE, WORK, CARRY],
        role: 'harvester',
        state: STATE_NEW,
        intent: INTENT_HARVEST,
        room: '',
        working: false,
        target: this.findNearestSource().id
    };

    static states: BUILDER_STATES;

    perform(): void {
        if (this.memory.working && this.store[RESOURCE_ENERGY] == 0) {
            this.memory.working = false;
            this.say('🔄 harvest');
        }
        if (!this.memory.working && this.store.getFreeCapacity() == 0) {
            this.memory.working = true;
            this.say('🚧 build');
        }

        if (this.memory.working) {
            const targets = this.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (this.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            const sources = this.room.find(FIND_SOURCES);
            if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    findNearestSource() {
        return this.room.find(FIND_SOURCES)[0];
    }

}

export default Builder;