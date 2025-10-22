import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['node_modules/**', '.react-router/**', 'build/**', 'out/**'],
  },
  reactHooks.configs.flat.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
)
