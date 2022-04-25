import Harvester from "roles/Harvester";
import Builder from "roles/Builder";
import Upgrader from "roles/Upgrader";
import _ from 'lodash';

class Director {
    private static incubate = (memory: CreepMemory) => {
        const newName = `${memory.role}-${Game.time};`;
        const dryRunValue = Game.spawns['Spawn1'].spawnCreep(memory.bodyParts, newName, { memory, dryRun: true });

        if (dryRunValue !== 0) {
            console.log(`Spawn not possible: ${dryRunValue}`);
        } else {
            console.log(`Spawning new ${memory.role}: ${newName}`);
            Game.spawns['Spawn1'].spawnCreep(memory.bodyParts, newName, { memory, dryRun: false });
        }
    };

    public static maintain = () => {
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Harvester.role);
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Builder.role);
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == Upgrader.role);

        if (harvesters.length < 1) {
            this.incubate({role: Harvester.role, bodyParts: Harvester.bodyParts, state: STATE_NEW, intent: INTENT_HARVEST} as CreepMemory);
        } else if (upgraders.length < 1) {
            this.incubate({role: Upgrader.role, bodyParts: Upgrader.bodyParts, state: STATE_NEW, intent: INTENT_HARVEST} as CreepMemory);
        } else if (builders.length < 1) {
            this.incubate({role: Builder.role, bodyParts: Builder.bodyParts, state: STATE_NEW, intent: INTENT_HARVEST} as CreepMemory);
        } else {
            console.log("Nothing to spawn");
        }
    };

    public static cleanse = () => {
        Object.keys(Memory.creeps).forEach((name: string) => {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        });
    };

    public static direct = () => {
        Object.keys(Game.creeps).forEach((creepName: keyof typeof Game.creeps) => {
            const creep = Game.creeps[creepName];
            let performer;
            switch (creep.memory.role) {
                case Harvester.role:
                    performer = new Harvester(creep);
                    performer.perform();
                    break;
                case Upgrader.role:
                    performer = new Upgrader(creep);
                    performer.perform();
                    break;
                case Builder.role:
                    performer = new Builder(creep);
                    performer.perform();
                    break;
                default:
                    console.log('No role found');
    
            }
    
        });
    };

    public static calculateBodyCost = (bodyParts: BodyPartDefinition["type"][]) => {
        let sum = 0;
        bodyParts.forEach(part => {
            sum += BODYPART_COST[part].valueOf();
        });
        return sum;
    };

    public static initialize = () => {
        if (!Memory.isInit) {
            Memory.isInit = true;
        }
    };
}

export default Director;