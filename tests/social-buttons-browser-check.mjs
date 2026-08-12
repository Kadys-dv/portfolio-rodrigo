import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});

for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 412, height: 915 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('#contato').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const result = await page.locator('#contato').evaluate(section => ({
    copyButton: Boolean(section.querySelector('[data-copy-email]')),
    linkedinIcon: Boolean(section.querySelector('.linkedin-button svg')),
    githubIcon: Boolean(section.querySelector('.github-button svg')),
    linkedinUrl: section.querySelector('.linkedin-button')?.href,
    githubUrl: section.querySelector('.github-button')?.href,
  }));
  await page.screenshot({ path: `${process.env.TEMP}\\portfolio-contact-${viewport.name}.png` });
  console.log(JSON.stringify({ viewport: viewport.name, result, errors }));
  if (result.copyButton || !result.linkedinIcon || !result.githubIcon || errors.length) process.exitCode = 1;
  await page.close();
}

await browser.close();
