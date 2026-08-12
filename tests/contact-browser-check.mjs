import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: process.env.HEADED !== '1',
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await context.grantPermissions(['clipboard-read', 'clipboard-write']);
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));

const targetUrl = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4173/';
await page.goto(targetUrl, { waitUntil: 'networkidle' });

const emailLink = page.locator('[data-email-link]');
const href = await emailLink.getAttribute('href');
const popupPromise = page.waitForEvent('popup');
await emailLink.click();
const popup = await popupPromise;
await popup.waitForLoadState('domcontentloaded').catch(() => {});

await page.locator('[data-copy-email]').click();
await page.locator('[data-copy-feedback]').filter({ hasText: 'E-mail copiado' }).waitFor();
const feedback = await page.locator('[data-copy-feedback]').textContent();
const copiedEmail = await page.evaluate(() => navigator.clipboard.readText());

const result = { href, popupUrl: popup.url(), feedback, copiedEmail, errors };
console.log(JSON.stringify(result, null, 2));
await browser.close();

if (
  !href?.startsWith('https://mail.google.com/mail/') ||
  !popup.url().includes('google.com') ||
  copiedEmail !== 'cskadys@gmail.com' ||
  !feedback?.includes('E-mail copiado') ||
  errors.length
) process.exitCode = 1;
