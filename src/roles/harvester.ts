type HARVESTER_STATES = typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD

interface Harvester extends Creep {
    perform(): void;
    memory: CreepMemory;
    bodyParts: BodyPartConstant[];
    states: HARVESTER_STATES;
    
    
    // static states: [
    //     "NEW",
    //     "SEEKSOURCE",
    //     "SEEKHOME",
    //     "RELOCATE",
    //     "GATHER",
    //     "UNLOAD",

    // ]
}

class Harvester implements Harvester {
    memory: CreepMemory = {
        name: 'harvester',
        bodyParts: [BODYPARTS_ALL[0], BODYPARTS_ALL[1], BODYPARTS_ALL[2]],
        role: 'harvester',
        state: STATE_NEW,
        room: '',
        working: false
    };

    static states: HARVESTER_STATES;

    perform(): void {
        switch (this.memory.state) {
            case STATE_NEW:
            case "SEEKSOURCE":
                this.seekSource();
                break;
            case "SEEKHOME":
                this.seekHome();
                break;
            case "RELOCATE":
                this.relocate();
                break;
            case "GATHER":
                this.gather();
                break;
            case "UNLOAD":
                this.unload();
                break;
            default:
                console.log("Invalid State: " + this.memory.state);
        }

    }
    static relocate() {
        throw new Error("Method not implemented.");
    }

    
    
    seekSource() {
        throw new Error("Method not implemented.");
    }
    seekHome() {
        throw new Error("Method not implemented.");
    }
    relocate() {
        throw new Error("Method not implemented.");
    }
    gather() {
        throw new Error("Method not implemented.");
    }
    unload() {
        throw new Error("Method not implemented.");
    }
}

export default Harvester;