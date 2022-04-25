declare global {
    interface CreepMemory {
        name: string;
        room: string;
        state: Harvester["states"] | Builder["states"] | Upgrader["states"];
        intent: Harvester["intents"] | Builder["intents"] | Upgrader["intents"];
        role: Harvester["role"] | Builder["role"] | Upgrader["role"]
        bodyParts: BodyPartConstant[];
        target: Id<Source> | Id<StructureSpawn>
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

export {};