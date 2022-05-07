import { filter } from "lodash-es";
import Director from "administrators/Director";

export class Coordinator {
    static instance: Coordinator;

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
        const workerPlans = Director.getWorkerPlan();
        const spawn = Game.spawns['Spawn1'];
        let isBusy = false;
        if (spawn.spawning) { return; }

        workerPlans.forEach((workerPlan, workerRole) => {
            if (isBusy) { return; }
            const workerCount = filter(Game.creeps, (creep) => creep.memory.role == workerRole).length;
            //const workerCount = Game.spawns['Spawn1'].room.find(FIND_CREEPS, { filter: (i) => { return (i.memory.role == workerRole); } }).length;

            if (workerCount < workerPlan.budget) {
                isBusy = true;
                this.incubate({ role: workerRole, parts: workerPlan.PARTS, state: workerPlan.STATE_NEW, intent: workerPlan.INTENT_NEW, birth: Game.time } as WorkerMemory);
            }
        });

        const buildPlans = Director.getBuildPlan();

        buildPlans.forEach((buildPlan, buildType) => {
            const buildingCount = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (i) => { return (i.structureType == buildType); } }).length;

            //console.log(`${buildingCount}::${buildPlan.budget}`);
            if (buildingCount < buildPlan.budget) {
                buildPlan.frame(buildingCount, buildingCount, spawn.room);
            }
        });
    };
}
export default Coordinator;