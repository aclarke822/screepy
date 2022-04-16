module.exports = {
    spawn: function (props) {
        var newName = props.role + Game.time;
        var dryRunValue = Game.spawns['Spawn1'].spawnCreep(props.parts, newName, { memory: { role: props.role }, dryRun: true })

        if (dryRunValue !== 0) {
            console.log("Spawn not possible: " + dryRunValue)
        } else {
            console.log('Spawning new' + props.role + ':' + newName);
            Game.spawns['Spawn1'].spawnCreep(props.parts, newName, { memory: { role: props.role }, dryRun: false });
        }
    }
};