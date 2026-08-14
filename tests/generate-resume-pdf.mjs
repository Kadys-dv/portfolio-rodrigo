import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve('curriculo.html')).href, { waitUntil: 'networkidle' });
await page.pdf({
  path: 'assets/documentos/curriculo-rodrigo-v5.pdf',
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
