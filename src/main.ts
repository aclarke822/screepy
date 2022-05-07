//screepy 4.0.0
import { ErrorMapper } from "utilities/ErrorMapper";
import { Orchestrator } from "administrators/Orchestrator";

const loop = ErrorMapper.wrapLoop(() => {
    Orchestrator.initialize();

    if (Game.time % 1 === 0) { Orchestrator.tick1(); }
    if (Game.time % 2 === 0) { Orchestrator.tick2(); }
    if (Game.time % 4 === 0) { Orchestrator.tick4(); }
    if (Game.time % 8 === 0) { Orchestrator.tick8(); }
    if (Game.time % 8 === 0) { Orchestrator.tick16(); }
    if (Game.time % 8 === 0) { Orchestrator.tick32(); }
    if (Game.time % 64 === 0) { Orchestrator.tick64(); }
});

module.exports.loop = loop;