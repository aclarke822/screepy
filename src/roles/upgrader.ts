type UPGRADER_STATES = typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD
type UPGRADER_INTENTS = typeof INTENT_UPGRADE | typeof INTENT_HARVEST

interface Upgrader extends Creep {
    perform(): void;
    memory: CreepMemory;
    bodyParts: BodyPartConstant[];
    states: UPGRADER_STATES;
    intents: UPGRADER_INTENTS;
}

class Upgrader implements Upgrader {
    memory: CreepMemory = {
        name: 'upgrader',
        bodyParts: [MOVE, WORK, CARRY],
        role: 'ugprader',
        state: STATE_NEW,
        intent: INTENT_HARVEST,
        room: '',
        working: false,
        target: this.findNearestSource().id
    };

    findNearestSource() {
        return this.room.find(FIND_SOURCES)[0];
    }

    perform(): void {
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