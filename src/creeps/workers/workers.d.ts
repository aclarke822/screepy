type WORKER_PARTS = (MOVE | WORK | CARRY)[];

interface WORKER_PROPS extends CREEP_PROPS {
    PARTS: WORKER_PARTS;
    STATE_NEW: WORKER_STATES
    INTENT_NEW: WORKER_INTENTS;
    NEW(creep: Worker): Worker;
}

interface WorkerMemory extends CreepMemory {
    name: string;
    room: Room;
    role: WORKER_ROLES;
    state: WORKER_STATES;
    intent: WORKER_INTENTS;
    parts: WORKER_PARTS;
    targetId: Id<Source> | Id<StructureSpawn> | Id<ConstructionSite<BuildableStructureConstant>> | Id<StructureController>
    targetPos: {x: number, y: number}
    birth: number;
}