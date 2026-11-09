import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/scenarios',
  testMatch: 'Ge*.spec.ts',
  outputDir: 'artifacts/media',
  forbidOnly: !!process.env.CI,
  workers: 1,
  timeout: 120000,
  retries: 0,
  use: {
    baseURL: 'https://ge.globo.com',
    browserName: 'chromium',
    channel: 'chromium',
    trace: 'on',
    locale: 'pt-BR',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 20000,
    navigationTimeout: 60000,
    screenshot: 'on',
    video: 'off'
  },
  expect: {
    timeout: 30000
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never'
      }
    ]
  ]
});
