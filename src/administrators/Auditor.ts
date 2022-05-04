import Phases from "phases/Phases";
import { filter } from "lodash-es";

export class Auditor {
    static instance: Auditor;

    public static getObjectById(id: Id<_HasId>): _HasId {
        const object = Game.getObjectById(id);

        if (object === null) {
            throw new Error(`Object with ${id} is null`);
        }

        return object;
    }

    public static cleanse = () => {
        Object.keys(Memory.creeps).forEach((name: string) => {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
                console.log(`Cleansed creep: ${name}`);
            }
        });
    };

    public static auditPhase = () => {
        let phaseIsComplete = true;
        const workerPlans = Phases.getWorkerPlan();

        workerPlans.forEach((workerPlan, workerRole) => {
            const workerCount = filter(Game.creeps, (creep) => creep.memory.role == workerRole).length;
            //console.log(`${workerRole}:${workerCount}:${workerPlan.budget}:${phaseIsComplete}:${!(workerCount < workerPlan.budget)}`);
            phaseIsComplete = phaseIsComplete && !(workerCount < workerPlan.budget);
        });

        const buildPlans = Phases.getBuildPlan();

        buildPlans.forEach((buildPlan, buildType) => {
            const buildingCount = filter(Game.structures, (structure) => structure.structureType == buildType).length;
            phaseIsComplete = phaseIsComplete && !(buildingCount < buildPlan.budget);
        });
        
        return phaseIsComplete;
    };
}

export default Auditor;