import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const email=process.env.MATCHHUB_DEMO_EMAIL;
const password=process.env.MATCHHUB_DEMO_PASSWORD;
if(!email||!password)throw new Error('Defina MATCHHUB_DEMO_EMAIL e MATCHHUB_DEMO_PASSWORD para gerar a captura.');
await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
await page.getByLabel('E-mail').fill(email);
await page.getByLabel('Senha', { exact: true }).fill(password);
await page.getByRole('button', { name: 'Entrar no painel' }).click();
await page.waitForURL('**/dashboard');
await page.waitForLoadState('networkidle');
await page.getByRole('heading', { name: 'Central de operações PlayMatch' }).waitFor();
await mkdir('assets/matchhub', { recursive: true });
await page.screenshot({ path: 'assets/matchhub/dashboard.png', fullPage: true });
await browser.close();
