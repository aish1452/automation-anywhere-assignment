import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 60_000,

  expect: {
    timeout: 10_000
  },

  fullyParallel: false,

  workers: 1,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'setup',

      testMatch: /auth\.setup\.ts/
    },

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        // Automation Anywhere Form Designer
        // needs more vertical space than the default
        // Playwright Desktop Chrome viewport.
        viewport: {
          width: 1280,
          height: 1100
        },

        storageState: 'auth/user.json'
      },

      dependencies: ['setup']
    }
  ]
});