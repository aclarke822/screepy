var creepSpawner = require('creep.spawner');

module.exports = {
    maintain: function () {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.HARVESTER_PROPS.role);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.UPGRADER_PROPS.role);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.BUILDER_PROPS.role);

        //console.log('Harvesters: ' + harvesters.length);
        //console.log('Upgraders: ' + upgraders.length);
        //console.log('Builders: ' + builders.length);

        if (harvesters.length < 1) {
            //creepSpawner.spawn(Memory.HARVESTER_PROPS)
        } else if (upgraders.length < 1) {
            //creepSpawner.spawn(Memory.UPGRADER_PROPS)
        } else if (builders.length < 1) {
            //creepSpawner.spawn(Memory.BUILDER_PROPS)
        } else {
            //console.log("Nothing to spawn")
        }
    }
};