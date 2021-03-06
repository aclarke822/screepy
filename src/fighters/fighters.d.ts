// interface FIGHTER_PROPS {
//     PARTS: BodyPartConstant[];
//     STATE_NEW: FIGHTER_STATES;
//     INTENT_NEW: FIGHTER_INTENTS;
//     NEW(creep: Fighter): Fighter;
// }

// interface FighterMemory extends CreepMemory {
//     name: string;
//     room: Room;
//     role: ROLE_HARVESTER | ROLE_BUILDER | ROLE_UPGRADER;
//     state: FIGHTER_STATES;
//     intent: FIGHTER_INTENTS;
//     parts: BodyPartConstant[];
//     targetId: Id<Source> | Id<StructureSpawn> | Id<ConstructionSite<BuildableStructureConstant>> | Id<StructureController>
//     birth: number;
// }

// type INTENT_DEFEND = "DEFEND";

// type DEFENDER_INTENTS = INTENT_DEFEND;
// type BUILDER_INTENTS = INTENT_HARVEST | INTENT_BUILD | INTENT_DEPOSIT;
// type UPGRADER_INTENTS = INTENT_HARVEST | INTENT_UPGRADE | INTENT_DEPOSIT;

// type DEFENDER_INTENTS = HARVESTER_INTENTS | BUILDER_INTENTS | UPGRADER_INTENTS;

// type STATE_PATROL = "PATROL";
// type STATE_SEEKSOURCE = "SEEKSOURCE";
// type STATE_SEEKHOME = "SEEKHOME";
// type STATE_RELOCATE = "RELOCATE";
// type STATE_GATHER = "GATHER";
// type STATE_UNLOAD = "UNLOAD";
// type STATE_SEEKFRAME = "SEEKFRAME";
// type STATE_CONSTRUCT = "CONSTRUCT";
// type STATE_SEEKCONTROLLER = "SEEKCONTROLLER";
// type STATE_PROMOTE = "PROMOTE";
// type STATE_SEEKFREESTORE = "SEEKFREESTORE";

// type HARVESTER_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_SEEKHOME | STATE_SEEKFREESTORE | STATE_RELOCATE | STATE_GATHER | STATE_UNLOAD;
// type BUILDER_STATES = STATE_CONSTRUCT | STATE_GATHER | STATE_NEW | STATE_RELOCATE | STATE_SEEKFRAME | STATE_SEEKSOURCE;
// type UPGRADER_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_SEEKCONTROLLER | STATE_RELOCATE | STATE_GATHER | STATE_PROMOTE;

// type FIGHTER_STATES = HARVESTER_STATES | BUILDER_STATES | UPGRADER_STATES;

// type ROLE_CLUBMAN = "CLUBMAN";
// type ROLE_BOWMAN = "BOWMAN";
// type ROLE_SCOUT = "SCOUT";

// type FIGHTER_ROLES = ROLE_CLUBMAN | ROLE_BOWMAN | ROLE_SCOUT;