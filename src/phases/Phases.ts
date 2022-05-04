import Builder from "workers/Builder";
import Harvester from "workers/Harvester";
import Upgrader from "workers/Upgrader";

export class Phases {
    static instance: Phases;

    static readonly WORKER_PLANS0: ReadonlyMap<WORKER_ROLES, WORKER_PLAN> = new Map([
        [Harvester.CONSTANTS.ROLE_HARVESTER, Object.assign(Harvester.HARVESTER_PROPS0, { budget: 3 })],
        [Upgrader.CONSTANTS.ROLE_UPGRADER, Object.assign(Upgrader.UPGRADER_PROPS0, { budget: 5 })],
        [Builder.CONSTANTS.ROLE_BUILDER, Object.assign(Builder.BUILDER_PROPS0, { budget: 3 })]
    ]);

    static readonly WORKER_PLANS1: ReadonlyMap<WORKER_ROLES, WORKER_PLAN> = new Map([
        [Harvester.CONSTANTS.ROLE_HARVESTER, Object.assign(Harvester.HARVESTER_PROPS1, { budget: 3 })],
        [Upgrader.CONSTANTS.ROLE_UPGRADER, Object.assign(Upgrader.UPGRADER_PROPS1, { budget: 3 })],
        [Builder.CONSTANTS.ROLE_BUILDER, Object.assign(Builder.BUILDER_PROPS1, { budget: 5 })]
    ]);

    static readonly BUILD_PLANS0: ReadonlyMap<BuildableStructureConstant, BUILD_PLAN> = new Map([
        [STRUCTURE_EXTENSION as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(x, y, STRUCTURE_EXTENSION); } }]

    ]);

    static readonly BUILD_PLANS1: ReadonlyMap<BuildableStructureConstant, BUILD_PLAN> = new Map([
        [STRUCTURE_EXTENSION as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(17 + x, 17 + y, STRUCTURE_EXTENSION); } }],
        [STRUCTURE_CONTAINER as BuildableStructureConstant, { budget: 5, frame: (x, y, room) => { room.createConstructionSite(17 + x, 32 - y, STRUCTURE_CONTAINER); } }]

    ]);

    static getWorkerPlan = () => {
        if (Memory.phase === 0) {
            return Phases.WORKER_PLANS0;
        } else {
            return Phases.WORKER_PLANS1;
        }
    };

    static getBuildPlan = () => {
        if (Memory.phase === 0) {
            return Phases.BUILD_PLANS0;
        } else {
            return Phases.BUILD_PLANS1;
        }
    };
}

export default Phases;