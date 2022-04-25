// module.exports = {
//     spawn: function (props) {
//         const newName = props.role + Game.time;
//         const dryRunValue = Game.spawns['Spawn1'].spawnCreep(props.parts, newName, { memory: { role: props.role }, dryRun: true });

//         if (dryRunValue !== 0) {
//             console.log("Spawn not possible: " + dryRunValue);
//         } else {
//             console.log('Spawning new' + props.role + ':' + newName);
//             Game.spawns['Spawn1'].spawnCreep(props.parts, newName, { memory: { role: props.role }, dryRun: false });
//         }
//     }
// };