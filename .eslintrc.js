module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsdoc/recommended',
    'prettier', // Must be last to override other configs
  ],
  plugins: [
    'n',
    'security',
    'sonarjs',
    'unicorn',
    'import',
    'jsdoc',
    'unused-imports',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // General ESLint rules
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'off', // Replaced by unused-imports/no-unused-vars
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-param-reassign': 'error',
    'no-return-await': 'error',
    'require-await': 'error',
    'camelcase': ['error', { properties: 'never' }],
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'max-depth': ['error', 4],
    'max-lines': ['warn', { max: 500 }],
    'max-params': ['warn', { max: 4 }],
    'complexity': ['warn', 15],

    // unused-imports rules
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // import rules
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-self-import': 'error',
    'import/first': 'error',

    // n (Node.js) rules
    'n/no-process-exit': 'error',
    'n/no-path-concat': 'error',
    'n/no-new-require': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-missing-require': 'error',
    'n/no-unpublished-require': 'off', // Turn off as it can be problematic with monorepos
    'n/no-extraneous-require': 'error',
    'n/no-extraneous-require': 'error',
    'n/exports-style': ['error', 'module.exports'],
    'n/prefer-promises/fs': 'error',
    'n/prefer-global/buffer': ['error', 'never'],
    // security rules
    'security/detect-object-injection': 'off', // Often produces false positives
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-possible-timing-attacks': 'error',

    // SonarJS rules
    'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-small-switch': 'error',
    'sonarjs/no-nested-template-literals': 'off', // Allow nested template literals
    'sonarjs/cognitive-complexity': ['warn', 15],
    'sonarjs/no-collapsible-if': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    'sonarjs/no-redundant-jump': 'error',

    // Unicorn rules
    'unicorn/prevent-abbreviations': 'off', // Too strict for many codebases
    'unicorn/no-null': 'off', // Null is commonly used in Node.js APIs
    'unicorn/no-array-for-each': 'off', // forEach is sometimes more readable
    'unicorn/prefer-module': 'off', // Not all Node.js projects use ESM
    'unicorn/no-array-reduce': 'off', // Array.reduce is a powerful method
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          camelCase: true,
        },
      },
    ],
    'unicorn/numeric-separators-style': 'error',
    'unicorn/better-regex': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-nested-ternary': 'error',
    'unicorn/catch-error-name': 'error',

    // JSDoc rules
    'jsdoc/require-jsdoc': ['warn', {
      'publicOnly': true,
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
      }
    }],
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/no-undefined-types': 'off', // Can be problematic with complex type systems
    'jsdoc/check-param-names': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.cjs', '.json'],
      },
    },
    jsdoc: {
      mode: 'jsdoc',
    },
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js', 'test/**/*.js', '__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
        mocha: true,
      },
      rules: {
        'n/no-unpublished-require': 'off',
        'max-lines': 'off',
        'max-nested-callbacks': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
