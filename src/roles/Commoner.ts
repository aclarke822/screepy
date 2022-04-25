declare global {
    const STATE_NEW = "NEW";
    const STATE_SEEKSOURCE = "SEEKSOURCE";
    const STATE_SEEKHOME = "SEEKHOME";
    const STATE_RELOCATE = "RELOCATE";
    const STATE_GATHER = "GATHER";
    const STATE_UNLOAD = "UNLOAD";

    const INTENT_HARVEST = "HARVEST";
    const INTENT_UPGRADE = "UPGRADE";
    const INTENT_UNLOAD = "DEPOSIT";

    const ROLE_HARVESTER = "HARVEST";
    const ROLE_UPGRADER = "UPGRADE";
    const ROLE_BUILDER = "DEPOSIT";
    
    enum ROLES {STATE_NEW, STATE_SEEKSOURCE, STATE_SEEKHOME, STATE_RELOCATE, STATE_GATHER, STATE_UNLOAD}
}

interface Commoner extends Creep {
    perform(): void;
    spawn(): void;
    memory: CreepMemory;
    bodyParts: CreepMemory["bodyParts"];
    states: CreepMemory["state"];
    intents: CreepMemory["intent"];
    roles: CreepMemory["role"];
}

class Commoner implements Commoner {
    protected seekHome() {
        this.memory.target = this.findNearestSpawn().id as Id<StructureSpawn>;
        this.memory.state = "RELOCATE";
    }

    protected seekSource(): void {
        this.memory.target = this.findNearestSource().id as Id<Source>;
        this.memory.state = "RELOCATE";
    }

    protected findNearestSource() {
        return this.room.find(FIND_SOURCES)[0];
    }

    protected findNearestSpawn() {
        const targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        return targets[0];
    }

    protected relocate() {
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
}

export default Commoner;