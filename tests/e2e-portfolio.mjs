import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  headless: true,
  ...(process.platform === 'win32' && existsSync(chromePath) ? { executablePath: chromePath } : {}),
});

const assertExternalProjectButtonContrast = async (page, viewportName, themeName) => {
  const links = page.locator('[data-project-external-link]');
  assert.equal(await links.count(), 2);

  for (let index = 0; index < 2; index += 1) {
    const styles = await links.nth(index).evaluate((element) => {
      const computed = getComputedStyle(element);
      return { backgroundColor: computed.backgroundColor, color: computed.color };
    });
    assert.equal(
      styles.backgroundColor,
      'rgb(255, 255, 255)',
      `${viewportName}/${themeName}: fundo do botão externo deve permanecer branco`,
    );
    assert.equal(
      styles.color,
      'rgb(6, 34, 25)',
      `${viewportName}/${themeName}: texto do botão externo deve permanecer escuro`,
    );
  }
};

try {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 412, height: 915 },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'Rodrigo — Desenvolvedor de Software Júnior');
    assert.equal(
      await page.locator('#contato [data-email-link]').getAttribute('href'),
      'mailto:cskadys@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio',
    );
    assert.equal(await page.locator('#certificacoes .cert-card:visible').count(), 3);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
      false,
    );
    await assertExternalProjectButtonContrast(page, viewport.name, 'claro');

    if (viewport.name === 'mobile') await page.locator('[data-menu-button]').click();
    await page.locator('[data-theme-toggle]').click();
    assert.equal(await page.locator('[data-theme-label]').textContent(), 'Tema escuro');
    await assertExternalProjectButtonContrast(page, viewport.name, 'escuro');

    await page.locator('[data-image]').nth(1).click();
    assert.match(await page.locator('[data-screen]').getAttribute('src'), /local\.png$/);

    await page.locator('[data-count-to="6"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    assert.equal(await page.locator('[data-count-to="6"]').textContent(), '6');
    assert.equal(errors.length, 0, `${viewport.name}: ${errors.join('\n')}`);
    await page.close();
  }
  console.log('Fluxos essenciais validados em desktop e mobile.');
} finally {
  await browser.close();
}
