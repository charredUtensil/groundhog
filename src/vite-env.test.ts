import { expect, it } from 'vitest';

it('should have VITE_ENVIRONMENT defined', () => {
  expect(import.meta.env.VITE_ENVIRONMENT).toBe('test');
});

it('should have VITE_APP_VERSION defined', () => {
  expect(import.meta.env.VITE_APP_VERSION).toBe('0.0.0-test');
});