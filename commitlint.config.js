module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New features
        'fix',      // Bug fixes
        'docs',     // Documentation
        'style',    // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Tests
        'chore',    // Build process, dependency updates, etc
        'ci',       // CI configuration
        'build',    // Build system changes
        'revert',   // Reverts
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', ['lower-case', 'upper-case']],
    'scope-empty': [0],
  },
};
