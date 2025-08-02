import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import eslintPluginJest from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.extends('plugin:jest/recommended'),
    ...compat.extends('plugin:prettier/recommended'),
    ...compat.extends('plugin:react/recommended'),

    {
      ignores: ['*', '!src/**', '!tests/**'],
    },

    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parserOptions: {
          project: './tsconfig.json',
        },
      },
      plugins: {
        prettier: eslintPluginPrettier,
        import: importPlugin,
        jest: eslintPluginJest,
        react: reactPlugin,
      },
      rules: {
        /* Ban unsafe casts */
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSAsExpression > TSAnyKeyword',
            message: 'Do not use `as any`, types must be explicit and safe.',
          },
          {
            selector:
              "JSXOpeningElement[name.type='JSXIdentifier'][name.name=/^[a-z]/]",
            message:
              'Do not use native HTML elements: use an MUI component (PascalCase) instead.',
          },
        ],

        /* Code structure and clarity */
        // 'max-params': ['warn', 1],

        'default-case': 'warn',
        'import/no-unresolved': 'error',
        'no-inline-comments': 'warn',
        'no-undefined': 'warn',
        'no-var': 'error',
        'prefer-const': ['error', {destructuring: 'all'}],
        'require-await': 'error',
        'require-object-destructuring': 'off',
        'arrow-parens': ['error', 'as-needed'],
        /* Formatting */
        'max-len': ['warn', {code: 300, ignoreUrls: true}],
        'prettier/prettier': ['warn', {semi: true}],
        semi: ['error', 'always'],

        /* Naming conventions */
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'classProperty',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/typedef': [
          'error',
          {
            variableDeclaration: true,
            memberVariableDeclaration: true,
            propertyDeclaration: false,
            arrayDestructuring: false,
            objectDestructuring: false,
            parameter: false,
            arrowParameter: false,
            variableDeclarationIgnoreFunction: true,
          },
        ],

        /* TypeScript strictness */
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {allowExpressions: false},
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {accessibility: 'explicit'},
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {allowConstructorOnly: false},
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-magic-numbers': [
          'warn',
          {ignoreEnums: true, ignore: [0, 1], enforceConst: true},
        ],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {argsIgnorePattern: '^_'},
        ],
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
        react: {
          version: 'detect',
        },
      },
    },

    {
      files: ['src/app/ui/**/*.{ts,tsx}', 'src/modules/ui/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@api/*', '@prisma/*'],
          },
        ],
      },
    },

    {
      files: ['src/app/api/**/*.{ts,tsx}', 'src/modules/api/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@ui/*'],
          },
        ],
      },
    },

    {
      files: ['src/modules/shared/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@api/*', '@ui/*', '@prisma/*'],
          },
        ],
      },
    },

    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
      plugins: {jest: eslintPluginJest},
      settings: {
        jest: {version: 29},
      },
    },
  ],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
  }
);
