import { filter } from "lodash-es";
import Phases from "phases/Phases";
import Worker from "workers/Worker";

export class Director {
    static instance: Director;

    private static incubate = (memory: CreepMemory) => {
        const name = `${memory.role}-${Game.time % 9999};`;
        const spawn = Game.spawns['Spawn1'];
        const dryRunValue = spawn.spawnCreep(memory.parts, name, { memory, dryRun: true });

        if (dryRunValue === OK) {
            memory = Object.assign(memory, { room: spawn.room, targetId: spawn.id });
            spawn.spawnCreep(memory.parts, name, { memory, dryRun: false });
        }
    };

    public static maintain = () => {
        const workerPlans = Phases.getWorkerPlan();
        const spawn = Game.spawns['Spawn1'];
        let isBusy = false;
        if (spawn.spawning) { return; }

        workerPlans.forEach((workerPlan, workerRole) => {
            if (isBusy) { return; }
            const workerCount = filter(Game.creeps, (creep) => creep.memory.role == workerRole).length;

            if (workerCount < workerPlan.budget) {
                isBusy = true;
                this.incubate({ role: workerRole, parts: workerPlan.PARTS, state: workerPlan.STATE_NEW, intent: workerPlan.INTENT_NEW, birth: Game.time } as WorkerMemory);
            }
        });

        const buildPlans = Phases.getBuildPlan();

        buildPlans.forEach((buildPlan, buildType) => {
            const buildingCount = filter(Game.structures, (structure) => structure.structureType == buildType).length;
            if (buildingCount < buildPlan.budget) {
                buildPlan.frame(buildingCount, buildingCount, spawn.room);
            }
        });
    };

    public static direct = () => {
        Object.keys(Game.creeps).forEach((creepName: keyof typeof Game.creeps) => {
            const creep = Game.creeps[creepName];

            if (!creep.spawning) {
                const creepMemory = creep.memory;
                Phases.getWorkerPlan().get(creepMemory.role)?.NEW(creep as Worker).perform();
            }
        });
    };

    public static calculateBodyCost = (bodyParts: BodyPartDefinition["type"][]) => {
        let sum = 0;
        bodyParts.forEach(part => {
            sum += BODYPART_COST[part].valueOf();
        });
        return sum;
    };
}

export default Director;