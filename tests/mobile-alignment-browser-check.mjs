import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});

for (const viewport of [{ name: 'compact', width: 360, height: 800 }, { name: 'motorola', width: 432, height: 960 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const centered = selector => getComputedStyle(document.querySelector(selector)).textAlign === 'center';
    return {
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      projectTitle: centered('#projetos .section-title'),
      skill: centered('.skill'),
      certificate: centered('.cert-card > div'),
      footer: centered('.footer-inner'),
      availabilityGrid: getComputedStyle(document.querySelector('.availability')).display === 'inline-grid',
      obsoleteContactText: document.body.textContent.includes('O botão abre uma nova mensagem no Gmail'),
    };
  });
  console.log(JSON.stringify({ viewport: viewport.name, result, errors }));
  if (result.overflow || result.obsoleteContactText || !result.projectTitle || !result.skill || !result.certificate || !result.footer || !result.availabilityGrid || errors.length) process.exitCode = 1;
  await page.close();
}

await browser.close();
