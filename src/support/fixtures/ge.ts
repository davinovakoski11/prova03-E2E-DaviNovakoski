import { test as base } from '@playwright/test';
import GePage from '../pages/GePage';

type GeFixtures = {
  gePage: GePage;
};

export const test = base.extend<GeFixtures>({
  gePage: async ({ page, context }, use) => {
    await context.route(
      /^https:\/\/(?:ads-library\.globo\.com|(?:[\w-]+\.)*(?:doubleclick\.net|googlesyndication\.com))\//,
      route => route.abort()
    );
    const gePage = new GePage(page);
    await gePage.preparar();
    await use(gePage);
  }
});

export { expect } from '@playwright/test';
