var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepMaintainer = require('creep.maintainer');
//var utilities = require('utilities');

var mainInit = require('main.init')
mainInit.init();

module.exports.loop = function () {
    //console.log('Energy: '+ Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY))

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    creepMaintainer.maintain();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}