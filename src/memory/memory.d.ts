import { HARVESTER_STATES, BUILDER_STATES, UPGRADER_STATES } from "constants/states";
import { HARVESTER_INTENTS, BUILDER_INTENTS, UPGRADER_INTENTS } from "constants/intents";
import { ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER } from "constants/roles";

declare global {
    interface CreepMemory {
        name: string;
        room: Room;
        state: HARVESTER_STATES | BUILDER_STATES | UPGRADER_STATES;
        intent: HARVESTER_INTENTS | BUILDER_INTENTS | UPGRADER_INTENTS;
        role: ROLE_HARVESTER | ROLE_UPGRADER | ROLE_BUILDER
        PARTS: BodyPartConstant["type"];
    }
    interface CommonerMemory extends CreepMemory {
        name: string;
        room: Room;
        state: HARVESTER_STATES | BUILDER_STATES | UPGRADER_STATES;
        intent: HARVESTER_INTENTS | BUILDER_INTENTS | UPGRADER_INTENTS;
        role: ROLE_HARVESTER | ROLE_UPGRADER | ROLE_BUILDER
        PARTS: BodyPartConstant["type"];
        targetId: Id<Source> | Id<StructureSpawn>
    }

    interface HarvesterMemory extends CommonerMemory {
        state: HARVESTER_STATES;
        intent: HARVESTER_INTENTS;
        role: ROLE_HARVESTER
        PARTS: [MOVE, WORK, CARRY];
    }

    interface UpgraderMemory extends CommonerMemory {
        state: UPGRADER_STATES;
        intent: UPGRADER_INTENTS;
        role: ROLE_UPGRADER
        PARTS: [MOVE, WORK, CARRY];
    }

    interface BuilderMemory extends CommonerMemory {
        state: BUILDER_STATES;
        intent: BUILDER_INTENTS;
        role: ROLE_BUILDER
        PARTS: [MOVE, WORK, CARRY];
    }

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

    interface FlagMemory { [name: string]: unknown }
    interface SpawnMemory { [name: string]: unknown }
    interface RoomMemory { [name: string]: unknown }
}