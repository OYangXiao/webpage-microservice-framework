import { nodeResolve } from '@rollup/plugin-node-resolve';
import vuePlugin from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';

import componentCollect from './component-collect.js'

const resolveExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

export default {
  input: './src/components/root/index.ts',
  external: ['vue'],
  plugins: [
    componentCollect(),
    nodeResolve({ extensions: resolveExtensions }),
    vuePlugin(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: resolveExtensions,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            corejs: 3,
            useBuiltIns: 'usage',
          },
        ],
      ],
    }),
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    exports: 'named',
  },
  watch:{
    chokidar: true
  }
};
