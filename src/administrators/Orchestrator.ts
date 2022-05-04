import Director from "administrators/Director";
import Auditor from "administrators/Auditor";

export class Orchestrator {
    static instance: Orchestrator;

    public static initialize = () => {
        if (!Memory.isInitialized) {
            console.log("Initialize");
            Memory.isInitialized = true;
            Memory.rooms[Game.spawns["Spawn1"].room.name] = Game.spawns["Spawn1"].room.memory;
            Orchestrator.initiatePhase(0);
        }
    };

    private static initiatePhase0 = () => {
        console.log("Initiate Phase0");
        Memory.phase = 0;
    };

    private static initiatePhase1 = () => {
        console.log("Initiate Phase1");
        Memory.phase = 1;
    };

    public static phaseMap: Map<number, {initiatePhase: () => void}> = new Map([
        [0, {initiatePhase: Orchestrator.initiatePhase0}],
        [1, {initiatePhase: Orchestrator.initiatePhase1}]
    ]);

    public static initiatePhase(phase: number) {
        Orchestrator.phaseMap.get(phase)?.initiatePhase();
    }

    public static tick1 = () => {
        Director.direct();
    };

    public static tick2 = () => {
        Director.maintain();
    };

    public static tick4 = () => {
        Auditor.cleanse();
    };

    // public static tick8 = () => {

    // };

    public static tick16 = () => {
        if (Auditor.auditPhase()) { Orchestrator.initiatePhase(Memory.phase + 1); }
    };

    // public static tick32 = () => {
    // };

    public static tick64 = () => {
        console.log(`${Game.time}: 64 ticks`);
    };
}

export default Orchestrator;