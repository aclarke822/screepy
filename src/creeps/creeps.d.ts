type CREEP_ROLES = WORKER_ROLES
type CREEP_STATES = WORKER_STATES
type CREEP_INTENTS = WORKER_INTENTS

interface CREEP_PROPS {
    PARTS: BodyPartConstant[];
    STATE_NEW: CREEP_STATES
    INTENT_NEW: CREEP_INTENTS;
    NEW(creep: Worker): Worker;
}

interface CreepMemory {
    name: string;
    room: Room;
    parts: BodyPartConstant["type"];
    role: CREEP_ROLES
    state: CREEP_STATES;
    intent: CREEP_INTENTS;
    targetId: Id<_HasId>;
}
