//screepy 2.0.0
import { ErrorMapper } from "utils/ErrorMapper";
import MyUtilities from "utils/Utilities";
import Harvester from "roles/harvester";
import Builder from "roles/builder";

declare global {
    const STATE_NEW = "NEW";
    const STATE_SEEKSOURCE = "SEEKSOURCE";
    const STATE_SEEKHOME = "SEEKHOME";
    const STATE_RELOCATE = "RELOCATE";
    const STATE_GATHER = "GATHER";
    const STATE_UNLOAD = "UNLOAD";

    type CREEP_STATES = Harvester["states"]


    type EnumType = CREEP_STATES;
    type EnumKeyType = keyof EnumType;

    interface Memory {
        uuid: number;
        log: unknown;
        creepTypes: [{
            name: string,
            bodyParts: BodyPartDefinition["type"][],
            role: string,
            cost: number
        }];
        isInit: boolean;
    }
    interface CreepMemory {
        name: string;
        role: string;
        room: string;
        working: boolean;
        state: CREEP_STATES;

        bodyParts: BodyPartConstant[];
    }



    interface FlagMemory { [name: string]: unknown }
    interface SpawnMemory { [name: string]: unknown }
    interface RoomMemory { [name: string]: unknown }


}


export const loop = ErrorMapper.wrapLoop(() => {
    if (!Memory.isInit) {
        MyUtilities.initialize();
        console.log("Initialized");
    }

    Game.notify(
        `Current game tick is ${Game.time}`,
        1, // group these notifications for 1 minutes
    );

    if (Game.spawns["Spawn1"].store[RESOURCE_ENERGY] === 0) {
        Game.notify(
            "Spawn1 is out of energy",
            1, // group these notifications for 1 minutes
        );
    }

    // Automatically delete memory of missing creeps
    Object.keys(Memory.creeps).forEach((name: string) => {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    });

    Object.keys(Game.creeps).forEach((creepName: keyof typeof Game.creeps) => {
        const creep = Game.creeps[creepName];

        switch (creep.memory.role) {
            case 'harvester':
                //creep.perform();
                break;
            case 'upgrader':
                break;
            case 'builder':
                break;
            default:
                console.log('No role found');

        }

    });


    // Object.keys(Game.spawns).forEach((spawnName: keyof typeof Game.spawns) => {
    //     const spawn = Game.spawns[spawnName];
    //     spawn.spawnCreep(['work', 'move', 'carry'], 'test1');
    //     const creep: Spawning | null = spawn.spawning;
    // });
});
