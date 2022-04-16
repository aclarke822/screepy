var utilities = require('utilities');

module.exports = {
    init: function () {
        Memory.HARVESTER_PROPS = { parts: [WORK, CARRY, MOVE], role: 'harvester', cost: 0 }
        Memory.UPGRADER_PROPS = { parts: [WORK, CARRY, MOVE], role: 'upgrader', cost: 0 }
        Memory.BUILDER_PROPS = { parts: [WORK, CARRY, MOVE], role: 'builder', cost: 0 }

        Memory.HARVESTER_PROPS.cost = utilities.calculateBodyCost(Memory.HARVESTER_PROPS.parts);
        Memory.UPGRADER_PROPS.cost = utilities.calculateBodyCost(Memory.UPGRADER_PROPS.parts);
        Memory.BUILDER_PROPS.cost = utilities.calculateBodyCost(Memory.BUILDER_PROPS.parts);
    }
};