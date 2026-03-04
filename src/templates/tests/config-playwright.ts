export const nextConfigPlaywightTestTemplate = () => `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000, // 30s por teste
  use: {
    headless: true,          // false para abrir browser
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry', // útil para debugar
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
`;