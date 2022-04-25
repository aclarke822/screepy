type HARVESTER_STATES = typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD
type HARVESTER_INTENTS = typeof INTENT_UNLOAD | typeof INTENT_HARVEST

interface Harvester extends Creep {
    perform(): void;
    memory: CreepMemory;
    bodyParts: BodyPartConstant[];
    states: HARVESTER_STATES;
    intents: HARVESTER_INTENTS;
}

class Harvester implements Harvester {
    constructor() {
        this.memory = {
            name: 'harvester',
            bodyParts: [MOVE, WORK, CARRY],
            role: 'harvester',
            state: STATE_NEW,
            intent: INTENT_HARVEST,
            room: '',
            working: false,
            target: this.findNearestSource().id
        };
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
                console.log("Invalid State: " + this.memory.state);
        }

    }

    relocate() {
        const target = Game.getObjectById(this.memory.target);


        if (target === null) { return; }

        if (this.pos.getRangeTo(target.pos) <= 1) {
            switch (this.memory.intent) {
                case "HARVEST":
                    this.memory.state = "GATHER";
                    break;
                case "DEPOSIT":
                    this.memory.state = "UNLOAD";
                    break;
                default:
                    console.log('Invalid intent: ' + this.memory.intent);
            }
        } else {
            this.moveTo(target.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }

    seekSource() {
        this.memory.target = this.findNearestSource().id as Id<Source>;
        this.memory.state = "RELOCATE";
    }

    seekHome() {
        this.memory.target = this.findNearestSpawn().id as Id<StructureSpawn>;
        this.memory.state = "RELOCATE";
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

    findNearestSource() {
        return this.room.find(FIND_SOURCES)[0];
    }

    findNearestSpawn() {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        return targets[0];
    }

    static states: HARVESTER_STATES;
}

export default Harvester;