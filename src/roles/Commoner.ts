import { STATE_GATHER, STATE_RELOCATE, STATE_UNLOAD } from "constants/states";
import { INTENT_HARVEST, INTENT_DEPOSIT } from "constants/intents";

abstract class Commoner extends Creep {
    abstract memory: CommonerMemory;
    abstract perform(): void;

    constructor(creep: Creep) {
        super(creep.id);
    }

    protected seekHome(): void {
        this.memory.targetId = this.findNearestSpawn().id as Id<StructureSpawn>;
        this.memory.state = STATE_RELOCATE;
    }

    protected seekSource(): void {
        this.memory.targetId = this.findNearestSource().id as Id<Source>;
        this.memory.state = STATE_RELOCATE;
    }

    protected findNearestSource(): Source {
        return this.memory.room.find(FIND_SOURCES)[0];
    }

    protected findNearestSpawn(): AnyStructure {
        const targets = this.memory.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        return targets[0];
    }

    protected relocate(): void {
        const target = Game.getObjectById(this.memory.targetId);

        if (target === null) { 
            this.say("Target is null");
            return; }

        if (this.pos.getRangeTo(target.pos) <= 1) {
            switch (this.memory.intent) {
                case INTENT_HARVEST:
                    this.memory.state = STATE_GATHER;
                    break;
                case INTENT_DEPOSIT:
                    this.memory.state = STATE_UNLOAD;
                    break;
                default:
                    console.log('Invalid intent: ' + this.memory.intent);
            }
        } else {
            this.moveTo(target.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
}

export default Commoner;