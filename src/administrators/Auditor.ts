import { filter } from "lodash-es";
import Director from "administrators/Director";

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
        const workerPlans = Director.getWorkerPlan();

        workerPlans.forEach((workerPlan, workerRole) => {
            const workerCount = filter(Game.creeps, (creep) => creep.memory.role == workerRole).length;
            phaseIsComplete = phaseIsComplete && !(workerCount < workerPlan.budget);
        });

        const buildPlans = Director.getBuildPlan();

        buildPlans.forEach((buildPlan, buildType) => {
            const buildingCount = filter(Game.structures, (structure) => structure.structureType == buildType).length;
            phaseIsComplete = phaseIsComplete && !(buildingCount < buildPlan.budget);
        });
        
        return phaseIsComplete;
    };

    public static calculateBodyCost = (bodyParts: BodyPartDefinition["type"][]) => {
        let sum = 0;
        bodyParts.forEach(part => {
            sum += BODYPART_COST[part].valueOf();
        });

        return sum;
    };
}

export default Auditor;