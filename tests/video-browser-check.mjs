import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: process.env.HEADED !== '1',
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
  loop: element.loop,
  currentTime: element.currentTime,
  readyState: element.readyState,
  networkState: element.networkState,
  error: element.error?.message ?? null,
  visibleHeight: Math.max(0, Math.min(innerHeight, element.getBoundingClientRect().bottom) - Math.max(0, element.getBoundingClientRect().top)),
  height: element.getBoundingClientRect().height,
}));

await video.evaluate(element => {
  if (Number.isFinite(element.duration)) element.currentTime = Math.max(0, element.duration - 0.4);
});
await page.waitForTimeout(1800);
const loopState = await video.evaluate(element => ({
  paused: element.paused,
  currentTime: element.currentTime,
  duration: element.duration,
}));

console.log(JSON.stringify({ state, loopState, errors }, null, 2));
await browser.close();

if (state.paused || state.currentTime <= 0 || !state.loop || state.error || loopState.paused || loopState.currentTime >= 5 || errors.length) process.exitCode = 1;
