import _ from "lodash";
import * as  ErrorMapper from "utils/ErrorMapper";

declare global {
    interface Memory {
        uuid: number;
        log: unknown;
    }

    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);
    console.log(_.prototype)
    // Automatically delete memory of missing creeps
    Object.keys(Memory.creeps).forEach((name: string) => {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    });
});
