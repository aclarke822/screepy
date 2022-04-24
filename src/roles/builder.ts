
type BUILDER_STATES = typeof STATE_NEW | typeof STATE_SEEKSOURCE | typeof STATE_SEEKHOME | typeof STATE_RELOCATE | typeof STATE_GATHER | typeof STATE_UNLOAD

interface Builder extends Creep {
    perform(): void;
    memory: CreepMemory;
    bodyParts: BodyPartConstant[];
    states: BUILDER_STATES;
}

class Builder implements Builder {
    memory: CreepMemory = {
        name: 'harvester',
        bodyParts: [BODYPARTS_ALL[0], BODYPARTS_ALL[1], BODYPARTS_ALL[2]],
        role: 'harvester',
        state: "NEW",
        room: '',
        working: false
    };

    static states: BUILDER_STATES;

}

export default Builder;