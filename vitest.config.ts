import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './__tests__',
    include: ['**/*.ts'],
  },
});
