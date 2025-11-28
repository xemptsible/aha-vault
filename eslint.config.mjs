import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default defineConfig(
  {
    ignores: ['node_modules/**', '.react-router/**', 'build/**', 'out/**'],
  },
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
)
