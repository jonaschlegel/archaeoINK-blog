import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      '.contentlayer/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'scripts/**',
      '.eslintrc.js'
    ]
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // Custom rules configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        module: 'writable',
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly'
      }
    },
    rules: {
      // Disable problematic rules for this project
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
)
