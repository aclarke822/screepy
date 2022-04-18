var utilities = require("utilities");

var roleHarvester = {
    perform: function (creep) {
        switch (creep.memory.state) {
            case "NEW":
            case "SEEKSOURCE":
                this.seekSource(creep);
                break;
            case "SEEKHOME":
                this.seekHome(creep);
                break;
            case "RELOCATE":
                this.relocate(creep);
                break;
            case "GATHER":
                this.gather(creep);
                break;
            case "UNLOAD":
                this.unload(creep);
                break;
            default:
                console.log("Invalid State: " + creep.memory.state);
        }
    },

    gather: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                creep.memory.state = "SEEKSOURCE";
            }
        } else {
            creep.memory.objective = "DEPOSIT";
            creep.memory.state = "SEEKHOME";
        }
    },

    seekSource: function (creep) {
        creep.memory.target = this.findNearestSource(creep).id;
        creep.memory.state = "RELOCATE";
    },

    seekHome: function (creep) {
        creep.memory.target = this.findNearestSpawn(creep).id;
        creep.memory.state = "RELOCATE";
    },

    relocate: function (creep) {
        var target = Game.getObjectById(creep.memory.target);

        if (creep.pos.getRangeTo(target) <= 1) {
            switch (creep.memory.objective) {
                case "HARVEST":
                    creep.memory.state = "GATHER";
                    break;
                case "DEPOSIT":
                    creep.memory.state = "UNLOAD";
                    break;
                default:
                    console.log('Invalid Objective' + creep.memory.objective);
            }
        } else {
            creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });

        }
    },

    unload: function (creep) {
        if (creep.store.getUsedCapacity() > 0) {
            if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.state = "SEEKHOME";
            }
        } else {
            creep.memory.objective = "HARVEST";
            creep.memory.state = "SEEKSOURCE";
        }
    },

    findRandomSource: function (creep) {
        return creep.room.find(FIND_SOURCES)[
            utilities.getRandomInt(0, sources.length - 1)
        ];
    },

    findNearestSource: function (creep) {
        return creep.room.find(FIND_SOURCES)[0];
    },

    findNearestSpawn: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length > 0) {
            return targets[0];
        } else {
            console.log("No spawn targets found.")
        }
    },
};

module.exports = roleHarvester;
