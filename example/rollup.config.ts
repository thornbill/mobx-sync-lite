import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/client/index.tsx',
  output: [{ file: pkg.main, format: 'iife', sourcemap: true }],
  plugins: [
    commonjs(),
    nodeResolve({ browser: true }),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
    sourceMaps(),
  ],
};
