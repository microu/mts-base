import { defineConfig, RollupOptions, Plugin } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";

const moduleList = [{ name: "random" }, {name: "collections"},{ name: "main" }];

function buildconfig(moduleList: { name: String }[]) {
  const rollupSteps = [] as RollupOptions[];

  for (let i = 0; i < moduleList.length; i += 1) {
    const module = moduleList[i];

    // typescript => js step
    const tsStep: RollupOptions = {
      input: `src/${module.name}/index.ts`,
      output: {
        file: `build/${module.name}/index.js`,
        format: "es",
      },
      plugins: [typescript({ tsconfig: `tsconfig.compile-${module.name}.json` })],
    };
    // if (i == 0) {
    //   (tsStep.plugins as Plugin[]).push(
    //     del({ targets: ["build/**/*", "dist/**/*"], runOnce: true })
    //   );
    // }

    // declarationStep
    const dtsStep: RollupOptions = {
      input: `build/${module.name}/index.js`,
      output: {
        dir: "dist",
        format: "es",
      },
      plugins: [
        dts({ tsconfig: `tsconfig.compile-${module.name}.json` }),
      ],
    };

    if (i < moduleList.length - 1) {
      (dtsStep.plugins as Plugin[]).push(
        copy({
          hook: "writeBundle",
          targets: [
            {
              src: "dist/index.d.ts",
              dest: "dist/",
              rename: `${module.name}.d.ts`,
            },
          ],
        }),
        copy({
          targets: [
            {
              src: `build/${module.name}/index.js`,
              dest: "dist/",
              rename: `${module.name}.js`,
            },
          ],
        })
      );
    } else {
      (dtsStep.plugins as Plugin[]).push(
        copy({
          targets: [{ src: `build/${module.name}/index.js`, dest: "dist/" }],
        })
      );
    }

    rollupSteps.push(tsStep, dtsStep);
  }
  return rollupSteps;
}

const rollupSteps = buildconfig(moduleList);

console.log("STEPS:", rollupSteps);

export default defineConfig(rollupSteps);

// export default defineConfig([
//   {
//     input: "src/random/index.ts",
//     output: {
//       file: "build/random/index.js",
//       format: "es",
//     },
//     plugins: [
//       typescript({ tsconfig: "tsconfig.compile-random.json" }),
//       del({ targets: ["build/**/*", "dist/**/*"], runOnce: true }),
//     ],
//   },
//   {
//     input: "build/random/index.js",
//     output: {
//       dir: "dist",
//       format: "es",
//     },
//     plugins: [
//       dts({ tsconfig: "tsconfig.compile-random.json" }),
//       copy({
//         hook: "writeBundle",
//         targets: [
//           { src: "dist/index.d.ts", dest: "dist/", rename: "random.d.ts" },
//         ],
//       }),
//       copy({
//         targets: [
//           { src: "build/random/index.js", dest: "dist/", rename: "random.js" },
//         ],
//       }),
//     ],
//   },

//   {
//     input: "src/main/index.ts",
//     output: {
//       file: "build/main/index.js",
//       format: "es",
//     },
//     plugins: [typescript({ tsconfig: "tsconfig.compile-main.json" })],
//   },

//   {
//     input: "build/main/index.js",
//     output: {
//       dir: "dist",
//       format: "es",
//     },
//     plugins: [
//       dts({ tsconfig: "tsconfig.compile-main.json" }),
//       copy({
//         targets: [{ src: "build/main/index.js", dest: "dist/" }],
//       }),
//     ],
//   },
// ]);
