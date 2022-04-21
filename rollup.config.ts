"use strict";

import del from 'rollup-plugin-delete';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
//import pkg from './package.json';
import screepsJson from './screeps.json';
import screeps from '../rollup-plugin-screeps/dist/es/index';

//import { ScreepsConfig, ScreepsOptions } from 'rollup-plugin-screeps/dist/rollup-plugin-screeps';
//import { ScreepsConfig, ScreepsOptions } from 'rollup-plugin-screeps/dist/rollup-plugin-screeps';

//import { ScreepsConfig } from 'rollup-plugin-screeps/dist/rollup-plugin-screeps';

//const cfg1 = screepsJson as ScreepsOptions;

const dest = process.env.DEST;
const config = screepsJson[dest];

if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if (config == null) {
  throw new Error("Invalid upload destination");
}

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },
  //pkg: pkg,

  //screepsConfig: screepsJson.main,

  plugins: [
    json(),
    del({ targets: ["dist"] }),
    commonjs(),
    nodePolyfills(),
    nodeResolve({preferBuiltins: true, rootDir: "src" }),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ config: config, dryRun: screepsJson == null })
  ]
}
