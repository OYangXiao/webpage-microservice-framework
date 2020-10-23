// rollup.config.js
import path from 'path';
import vuePlugin from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

// Get browserslist config and remove ie from es build targets
const projectRoot = path.resolve(__dirname, '.');

const resolveExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
];

const output = {
  dir: 'dist',
  format: 'esm',
  exports: 'named',
};

const plugins = [
  alias({
    resolve: resolveExtensions,
    entries: {
      '@': path.resolve(projectRoot, 'src'),
    },
  }),
  vuePlugin({
    css: true,
    template: {
      isProduction: true,
    },
  }),
  terser(),
  babel({
    babelHelpers: 'bundled',
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
  nodeResolve({
    extensions: resolveExtensions,
  }),
];

const oneFileConfig = { external, plugins, output };

// Customize configs for individual targets
export default [
  {
    input: 'src/frame/frame.ts',
    ...oneFileConfig,
  },
  {
    input: 'src/pages/homepage/homepage.ts',
    ...oneFileConfig,
  },
];
