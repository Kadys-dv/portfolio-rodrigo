import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--autoplay-policy=user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => {
  if (message.type() === 'error') errors.push(message.text());
});

const targetUrl = process.env.PORTFOLIO_URL ?? 'https://kadys-dv.github.io/portfolio-rodrigo/';
await page.goto(targetUrl, { waitUntil: 'networkidle' });
const video = page.locator('[data-demo-autoplay]');
await video.evaluate(element => {
  const bounds = element.getBoundingClientRect();
  window.scrollTo(0, scrollY + bounds.top - innerHeight + bounds.height * 0.25);
});
await page.waitForTimeout(3000);
const state = await video.evaluate(element => ({
  paused: element.paused,
  muted: element.muted,
  currentTime: element.currentTime,
  readyState: element.readyState,
  networkState: element.networkState,
  error: element.error?.message ?? null,
  visibleHeight: Math.max(0, Math.min(innerHeight, element.getBoundingClientRect().bottom) - Math.max(0, element.getBoundingClientRect().top)),
  height: element.getBoundingClientRect().height,
}));

console.log(JSON.stringify({ state, errors }, null, 2));
await browser.close();

if (state.paused || state.currentTime <= 0 || state.error || errors.length) process.exitCode = 1;
