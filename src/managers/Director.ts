import Harvester from "roles/Harvester";
import Builder from "roles/Builder";
import Upgrader from "roles/Upgrader";
import * as _ from 'lodash';

class Director {
    private static incubate = (memory: CommonerMemory) => {
        const name = `${memory.role}-${Game.time};`;
        const spawn = Game.spawns['Spawn1'];
        const dryRunValue = spawn.spawnCreep(memory.PARTS, name, { memory, dryRun: true });
        

        if (dryRunValue !== 0) {
            console.log(`Spawn not possible: ${dryRunValue}`);
        } else {
            console.log(`Spawning new ${memory.role}: ${name}`);
            memory = Object.assign(memory, {room: spawn.room, targetId: spawn.id});
            spawn.spawnCreep(memory.PARTS, name, {memory, dryRun: false});
        }
    };

    public static maintain = () => {
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Harvester.ROLE);
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Builder.ROLE);
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == Upgrader.ROLE);

        if (harvesters.length < 1) {
            this.incubate({role: Harvester.ROLE, PARTS: Harvester.PARTS, state: Harvester.STATE_NEW} as HarvesterMemory);
        } else if (upgraders.length < 1) {
            this.incubate({role: Upgrader.ROLE, PARTS: Upgrader.PARTS, state: Upgrader.STATE_NEW} as UpgraderMemory);
        } else if (builders.length < 1) {
            this.incubate({role: Builder.ROLE, PARTS: Builder.PARTS, state: Builder.STATE_NEW} as BuilderMemory);
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
                case Harvester.ROLE:
                    performer = new Harvester(creep);
                    performer.perform();
                    break;
                case Upgrader.ROLE:
                    performer = new Upgrader(creep);
                    performer.perform();
                    break;
                case Builder.ROLE:
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