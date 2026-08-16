import { chromium } from 'playwright';
import { mkdir, rename, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, 'assets', 'playmatch');
const recordingDir = resolve(root, '.tmp', 'playmatch-launch-recording');
const webmOutput = resolve(outputDir, 'playmatch-launch-9x16.webm');
const mp4Output = resolve(outputDir, 'playmatch-launch-9x16.mp4');
const ffmpeg = resolve(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe');

await rm(recordingDir, { recursive: true, force: true });
await mkdir(recordingDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
  recordVideo: { dir: recordingDir, size: { width: 1080, height: 1920 } },
});
const page = await context.newPage();
const video = page.video();
await page.goto(`file:///${resolve(root, 'tools', 'playmatch-launch-9x16.html').replaceAll('\\', '/')}`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(23000);
await page.close();
await context.close();
await browser.close();

const recordedVideo = await video.path();
await rm(webmOutput, { force: true });
await rename(recordedVideo, webmOutput);
execFileSync(ffmpeg, ['-y', '-i', webmOutput, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4Output], {
  stdio: 'inherit',
});
await rm(recordingDir, { recursive: true, force: true });
console.log(`Vídeo criado: ${mp4Output}`);
