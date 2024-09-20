import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'rollup'
import fs from 'fs'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['node:child_process'],
  plugins: [typescript(), commonjs(), {
    name: 'post-build',
    closeBundle() {
      // we copy index.d.ts into index.es.d.ts
      fs.copyFileSync('dist/index.d.ts', 'dist/index.es.d.ts')
    }
  }],
})
