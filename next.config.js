module.exports = {
  output: 'standalone',
  experimental: {
    outputFileTracingExcludes: {
      './': [
        'tests/**',
        'docs/**',
        '**/*.md',
        '**/*.test.*',
        '**/*.spec.*',
        'cypress/**',
        'playwright/**',
        '__mocks__/**',
        '__tests__/**'
      ]
    }
  }
};
