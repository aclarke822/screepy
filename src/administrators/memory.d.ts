
interface Memory {
    uuid: number;
    log: unknown;
    isInitialized: boolean;
    phase: number;
}

interface FlagMemory { [name: string]: unknown }
interface SpawnMemory { [name: string]: unknown }

interface RoomMemory {
    name: string;
    defaultSourceId: Id<Source>;
    avoidSourceId: Id<Source>;
    sources: { [id: Id<Source>]: SourceMemory; };
    roadPlans: [x: number, y: number]
}

interface SourceMemory {
    targets: number;
    occupied: boolean;
}
