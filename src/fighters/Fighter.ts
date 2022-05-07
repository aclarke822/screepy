// export const FIGHTER_CONSTANTS = {
//     INTENT_DEFEND: "DEFEND" as INTENT_DEFEND,

//     STATE_PATROL: "PATROL" as STATE_PATROL,
//     STATE_SEEKSOURCE:"SEEKSOURCE" as STATE_SEEKSOURCE,
//     STATE_SEEKHOME: "SEEKHOME" as STATE_SEEKHOME,
//     STATE_RELOCATE: "RELOCATE" as STATE_RELOCATE,
//     STATE_GATHER: "GATHER" as STATE_GATHER,
//     STATE_UNLOAD: "UNLOAD" as STATE_UNLOAD,
//     STATE_SEEKFRAME: "SEEKFRAME" as STATE_SEEKFRAME,
//     STATE_CONSTRUCT: "CONSTRUCT" as STATE_CONSTRUCT,
//     STATE_SEEKCONTROLLER: "SEEKCONTROLLER" as STATE_SEEKCONTROLLER,
//     STATE_PROMOTE: "PROMOTE" as STATE_PROMOTE,
//     STATE_SEEKFREESTORE: "SEEKFREESTORE" as STATE_SEEKFREESTORE,

//     ROLE_HARVESTER: "HARVESTER" as ROLE_HARVESTER,
//     ROLE_UPGRADER: "UPGRADER" as ROLE_UPGRADER,
//     ROLE_BUILDER: "BUILDER" as ROLE_BUILDER
// };

// export abstract class Fighter extends Creep {
//     abstract memory: FighterMemory;
//     abstract perform(): void;
//     static readonly BIRTH: number;
//     static readonly CONSTANTS = FIGHTER_CONSTANTS;

//     constructor(creep: Creep) {
//         super(creep.id);
//     }

//     protected seekHome(): void {
//         this.memory.targetId = this.findNearestSpawn().id as Id<StructureSpawn>;
//         this.memory.state = FIGHTER_CONSTANTS.STATE_RELOCATE;
//     }

//     protected seekSource(): void {
//         this.memory.targetId = this.findNearestSource().id as Id<Source>;
//         this.memory.state = FIGHTER_CONSTANTS.STATE_RELOCATE;
//     }

//     protected findNearestSource(): Source {
//         //Every room should have a source... right?
//         return this.room.find(FIND_SOURCES_ACTIVE)[0];

//     }

//     protected findNearestSpawn(): AnyStructure {
//         const targets = this.room.find(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 return (structure.structureType == STRUCTURE_SPAWN);
//             }
//         });

//         return targets[0];
//     }

//     protected findNearestFreeStore(): AnyStructure {
//         const targets = this.room.find(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
//                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//             }
//         });

//         if (targets.length > 0) {
//             return targets[0];
//         } else {
//             return this.findNearestSpawn();
//         }

//     }

//     protected relocate(): void {
//         const target = this.getTargetById(this.memory.targetId) as Structure<StructureConstant>;

//         if (this.pos.getRangeTo(target.pos) <= 1) {
//             switch (this.memory.intent) {
//                 case FIGHTER_CONSTANTS.INTENT_DEFEND:
//                     this.memory.state = FIGHTER_CONSTANTS.STATE_GATHER;
//                     break;
//                 // case FIGHTER_CONSTANTS.INTENT_DEPOSIT:
//                 //     this.memory.state = FIGHTER_CONSTANTS.STATE_UNLOAD;
//                 //     break;
//                 // case FIGHTER_CONSTANTS.INTENT_BUILD:
//                 //     this.memory.state = FIGHTER_CONSTANTS.STATE_CONSTRUCT;
//                 //     break;
//                 // case FIGHTER_CONSTANTS.INTENT_UPGRADE:
//                 //     this.memory.state = FIGHTER_CONSTANTS.STATE_PROMOTE;
//                 //     break;
//                 default:
//                     throw new Error(`${this.name} - Invalid Intent: ${this.memory.intent}`);
//             }
//         } else {
//             this.moveTo(target.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
//         }
//     }

//     protected getTargetById(id: Id<_HasId>): _HasId {
//         const target = Game.getObjectById(id);

//         if (target !== null && target !== undefined) {
//             return target;
//         } else {
//             // switch (this.memory.intent) {
//             //     case FIGHTER_CONSTANTS.INTENT_HARVEST:
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKSOURCE;
//             //         break;
//             //     case FIGHTER_CONSTANTS.INTENT_DEPOSIT:
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKFREESTORE;
//             //         break;
//             //     case FIGHTER_CONSTANTS.INTENT_BUILD:
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKFRAME;
//             //         break;
//             //     case FIGHTER_CONSTANTS.INTENT_UPGRADE:
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKCONTROLLER;
//             //         break;
//             //     default:
//             //         throw new Error(`${this.name} - Invalid Intent: ${this.memory.intent}`);
//             // }
//             return Game.spawns['Spawn1'];
//         }
//     }

//     protected gather(): void {
//         const target = this.getTargetById(this.memory.targetId) as Source;

//         if (this.store.getFreeCapacity() > 0) {
//             if (this.harvest(target) !== OK) {
//                 this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKSOURCE;
//             }
//         } else {
//             // switch (this.memory.role) {
//             //     case FIGHTER_CONSTANTS.ROLE_HARVESTER:
//             //         this.memory.intent = FIGHTER_CONSTANTS.INTENT_DEPOSIT;
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKHOME;
//             //         break;
//             //     case FIGHTER_CONSTANTS.ROLE_BUILDER:
//             //         this.memory.intent = FIGHTER_CONSTANTS.INTENT_BUILD;
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKFRAME;
//             //         break;
//             //     case FIGHTER_CONSTANTS.ROLE_UPGRADER:
//             //         this.memory.intent = FIGHTER_CONSTANTS.INTENT_UPGRADE;
//             //         this.memory.state = FIGHTER_CONSTANTS.STATE_SEEKCONTROLLER;
//             //         break;
//             //     default:
//             //         throw new Error(`${this.name} - Invalid role: ${this.memory.role}`);
//             // }
//         }
//     }
// }

// export default Fighter;