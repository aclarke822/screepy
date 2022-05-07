import Builder from "creeps/workers/Builder";
import Hauler from "creeps/workers/Hauler";
// import Harvester from "creeps/workers/Harvester";
import Toiler from "creeps/workers/Toiler";
import Upgrader from "creeps/workers/Upgrader";

export class Director {
    static instance: Director;

    public static direct = () => {
        Object.keys(Game.creeps).forEach((creepName: keyof typeof Game.creeps) => {
            const creep = Game.creeps[creepName];

            if (!creep.spawning) {
                const creepMemory = creep.memory;
                this.getWorkerPlan().get(creepMemory.role)?.NEW(creep).perform();
            }
        });
    };

    static readonly WORKER_PLANS0: ReadonlyMap<WORKER_ROLES, WORKER_PLAN> = new Map([
        //[Harvester.CONSTANTS.ROLE_HARVESTER, Object.assign(Harvester.HARVESTER_PROPS0, { budget: 3 })],
        [Toiler.CONSTANTS.ROLE_TOILER, Object.assign(Toiler.TOILER_PROPS0, { budget: 4 })],
        [Hauler.CONSTANTS.ROLE_HAULER, Object.assign(Hauler.HAULER_PROPS0, { budget: 4 })],

        //[Upgrader.CONSTANTS.ROLE_UPGRADER, Object.assign(Upgrader.UPGRADER_PROPS0, { budget: 5 })],
        //[Builder.CONSTANTS.ROLE_BUILDER, Object.assign(Builder.BUILDER_PROPS0, { budget: 3 })]
    ]);

    static readonly WORKER_PLANS1: ReadonlyMap<WORKER_ROLES, WORKER_PLAN> = new Map([
        //[Harvester.CONSTANTS.ROLE_HARVESTER, Object.assign(Harvester.HARVESTER_PROPS1, { budget: 3 })],
        [Toiler.CONSTANTS.ROLE_TOILER, Object.assign(Toiler.TOILER_PROPS1, { budget: 3 })],
        //[Upgrader.CONSTANTS.ROLE_UPGRADER, Object.assign(Upgrader.UPGRADER_PROPS1, { budget: 3 })],
        //[Builder.CONSTANTS.ROLE_BUILDER, Object.assign(Builder.BUILDER_PROPS1, { budget: 5 })]
    ]);

    static readonly BUILD_PLANS0: ReadonlyMap<BuildableStructureConstant, BUILD_PLAN> = new Map([
        [STRUCTURE_EXTENSION as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(17 + x, 17 + y, STRUCTURE_EXTENSION); } }]

    ]);

    static readonly BUILD_PLANS1: ReadonlyMap<BuildableStructureConstant, BUILD_PLAN> = new Map([
        [STRUCTURE_EXTENSION as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(17 + x, 17 + y, STRUCTURE_EXTENSION); } }],
        [STRUCTURE_CONTAINER as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(17 + x, 32 - y, STRUCTURE_CONTAINER); } }]

    ]);

    static getWorkerPlan = () => {
        if (Memory.phase === 0) {
            return this.WORKER_PLANS0;
        } else {
            return this.WORKER_PLANS1;
        }
    };

    static getBuildPlan = () => {
        if (Memory.phase === 0) {
            return this.BUILD_PLANS0;
        } else {
            return this.BUILD_PLANS1;
        }
    };
}

export default Director;