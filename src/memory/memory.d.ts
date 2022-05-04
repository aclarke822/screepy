declare global {
    interface CreepMemory {
        name: string;
        room: Room;
        parts: BodyPartConstant["type"];
        role: ROLE_HARVESTER | ROLE_UPGRADER | ROLE_BUILDER
        state: HARVESTER_STATES | BUILDER_STATES | UPGRADER_STATES;
        intent: HARVESTER_INTENTS | BUILDER_INTENTS | UPGRADER_INTENTS;
        targetId: Id<_HasId>
    }
    interface Memory {
        uuid: number;
        log: unknown;
        isInitialized: boolean;
        phase: number;
    }

    interface FlagMemory { [name: string]: unknown }
    interface SpawnMemory { [name: string]: unknown }

    interface RoomMemory { 
        name: string,
        sources: SourceMemory[],
    }
    
    interface SourceMemory { 
        id: string,
        targets: number
    }
}

export {};