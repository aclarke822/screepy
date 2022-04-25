// import creepSpawner from 'utils/CreepSpawner';

// module.exports = {
//     maintain: function () {
//         const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.HARVESTER_PROPS.role);
//         const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.UPGRADER_PROPS.role);
//         const builders = _.filter(Game.creeps, (creep) => creep.memory.role == Memory.BUILDER_PROPS.role);

//         //console.log('Harvesters: ' + harvesters.length);
//         //console.log('Upgraders: ' + upgraders.length);
//         //console.log('Builders: ' + builders.length);

//         if (harvesters.length < 1) {
//             //creepSpawner.spawn(Memory.HARVESTER_PROPS)
//         } else if (upgraders.length < 1) {
//             //creepSpawner.spawn(Memory.UPGRADER_PROPS)
//         } else if (builders.length < 1) {
//             //creepSpawner.spawn(Memory.BUILDER_PROPS)
//         } else {
//             //console.log("Nothing to spawn")
//         }
//     }
// };