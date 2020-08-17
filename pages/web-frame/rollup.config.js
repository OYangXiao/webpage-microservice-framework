import typescript from '@rollup/plugin-typescript';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/frame.ts',
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
      sourceMap:false
    }),
    sourcemaps(),
    nodeResolve()
  ],
  output: [
    {
      format: 'es',
      dir: './dist',
    },
  ],
};
