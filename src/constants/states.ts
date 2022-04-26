export type STATE_NEW = "NEW";
export type STATE_SEEKSOURCE = "SEEKSOURCE";
export type STATE_SEEKHOME = "SEEKHOME";
export type STATE_RELOCATE = "RELOCATE";
export type STATE_GATHER = "GATHER";
export type STATE_UNLOAD = "UNLOAD";

export declare const STATE_NEW: STATE_NEW;
export declare const STATE_SEEKSOURCE: STATE_SEEKSOURCE;
export declare const STATE_SEEKHOME: STATE_SEEKHOME;
export declare const STATE_RELOCATE: STATE_RELOCATE;
export declare const STATE_GATHER: STATE_GATHER;
export declare const STATE_UNLOAD: STATE_UNLOAD;

// export type CREEP_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_GATHER | STATE_RELOCATE | STATE_SEEKHOME | STATE_UNLOAD;
export type HARVESTER_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_GATHER | STATE_RELOCATE | STATE_SEEKHOME | STATE_UNLOAD;
export type BUILDER_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_GATHER | STATE_RELOCATE | STATE_SEEKHOME | STATE_UNLOAD;
export type UPGRADER_STATES = STATE_NEW | STATE_SEEKSOURCE | STATE_GATHER | STATE_RELOCATE | STATE_SEEKHOME | STATE_UNLOAD;