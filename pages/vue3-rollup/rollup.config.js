// rollup.config.js
import fs from 'fs';
import path from 'path';
import vuePlugin from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const projectRoot = path.resolve(__dirname, '.');

const resolveExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

const autoHtml = html({
  attributes:{html:{lang:'zh-CN'}, links:[{fileName:'es-module-shims.min.js'}]}
})

const entries = {
  homepage:{
    input: 'src/pages/homepage/homepage.tsx',
    html:autoHtml
  }
}

// Customize configs for individual targets
export default {
  input: entries.homepage.input,
  external: [
    // list external dependencies, exactly the way it is written in the import statement.
    // eg. 'jquery'
    'vue',
  ],
  output: {
    file: 'dist/page-vue.esm.js',
    format: 'esm',
    exports: 'named',
  },
  plugins: [
    entries.homepage.html,
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
    babel({
      exclude: 'node_modules/**',
      extensions: resolveExtensions,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    }),
    nodeResolve({
      extensions: resolveExtensions,
    }),
  ],
};
