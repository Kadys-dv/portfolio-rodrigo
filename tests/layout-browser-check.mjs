import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 412, height: 915 },
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const layout = await page.locator('#sobre').evaluate((section) => {
    const portrait = section.querySelector('.profile-portrait').getBoundingClientRect();
    const heading = section.querySelector('.about-profile h2').getBoundingClientRect();
    const center = (element) => Math.round(element.left + element.width / 2);
    return { portraitCenter: center(portrait), headingCenter: center(heading) };
  });
  await page.screenshot({
    path: `${process.env.TEMP}\\portfolio-about-${viewport.name}.png`,
    fullPage: false,
  });
  console.log(JSON.stringify({ viewport: viewport.name, layout, errors }));
  if (Math.abs(layout.portraitCenter - layout.headingCenter) > 2 || errors.length)
    process.exitCode = 1;
  await page.close();
}

await browser.close();
