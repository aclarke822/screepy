class MyUtilities {
    static calculateBodyCost = (bodyParts: BodyPartDefinition["type"][]) => {
        let sum = 0;
        bodyParts.forEach(part => {
            sum += BODYPART_COST[part].valueOf();
        });
        return sum;
    };

    static initialize = () => {
        // const harvesterBodyParts = [WORK, CARRY, MOVE];
        // const builderBodyParts = [WORK, CARRY, MOVE];
        // const upgraderBodyParts = [WORK, CARRY, MOVE];

        // Memory.creepTypes.push({ name: 'harvester', bodyParts: harvesterBodyParts, role: 'harvester', cost: this.calculateBodyCost(harvesterBodyParts)});
        // Memory.creepTypes.push({ name: 'upgrader', bodyParts: upgraderBodyParts, role: 'upgrader', cost: this.calculateBodyCost(upgraderBodyParts)});
        // Memory.creepTypes.push({ name: 'builder', bodyParts: builderBodyParts, role: 'builder', cost: this.calculateBodyCost(builderBodyParts)});

        Memory.isInit = true;
    };
}

export default MyUtilities;