import { nodeResolve } from '@rollup/plugin-node-resolve';
import vuePlugin from 'rollup-plugin-vue';
import path from 'path';
import babel from '@rollup/plugin-babel';

import { componentCollect } from './component-collect';

const resolveExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

const basicVueConfig = {
  external: ['vue'],
  plugins: [
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
  watch: {
    chokidar: true,
  },
};

const output = {
  format: 'esm',
  exports: 'named',
};

// 将每一个component以他们的名字输出
const configs = componentCollect().map(({ componentsDirPath, componentName, indexName }) => ({
  input: path.join(componentsDirPath, componentName, indexName),
  output: {
    ...output,
    file: path.join(path.resolve('.'), 'dist', componentName + '.js'),
  },
  ...basicVueConfig,
}));
export default configs;
