import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }),
  plugins: [
    typescript(),
    commonjs(),
    resolve({ preferBuiltins: true }),
    sourceMaps(),
  ],
};
