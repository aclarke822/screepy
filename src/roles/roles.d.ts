declare global {
    const STATE_NEW = "NEW";
    const STATE_SEEKSOURCE = "SEEKSOURCE";
    const STATE_SEEKHOME = "SEEKHOME";
    const STATE_RELOCATE = "RELOCATE";
    const STATE_GATHER = "GATHER";
    const STATE_UNLOAD = "UNLOAD";

    const INTENT_HARVEST = "HARVEST";
    const INTENT_UPGRADE = "UPGRADE";
    const INTENT_UNLOAD = "DEPOSIT";

    type CREEP_STATES = Harvester["states"] | Builder["states"] | Upgrader["states"];
    type CREEP_INTENTS = Harvester["intents"] | Builder["intents"] | Upgrader["intents"];
}

export {};
