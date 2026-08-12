import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFile(resolve(root, path), 'utf8');

test('páginas não possuem marcadores pendentes', async () => {
  const pages = await Promise.all(['index.html', 'curriculo.html'].map(read));
  assert.doesNotMatch(pages.join('\n'), /SEU_[A-Z_]+|TODO|FIXME/);
});

test('arquivos locais referenciados existem', async () => {
  for (const pageName of ['index.html', 'curriculo.html']) {
    const html = await read(pageName);
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map(match => match[1].split('#')[0].split('?')[0])
      .filter(value => value && !/^(?:https?:|mailto:|#)/.test(value));
    for (const reference of references) {
      await assert.doesNotReject(access(resolve(root, reference)), `${pageName}: ${reference}`);
    }
  }
});

test('SEO essencial está configurado', async () => {
  const html = await read('index.html');
  for (const required of ['rel="canonical"', 'property="og:image"', 'name="twitter:card"', 'application/ld+json', 'name="robots"']) {
    assert.ok(html.includes(required), `Ausente: ${required}`);
  }
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
});

test('certificados têm prévia e PDF', async () => {
  const html = await read('index.html');
  assert.equal((html.match(/class="cert-card reveal"/g) ?? []).length, 18);
  assert.equal((html.match(/certificados\/[A-Z0-9]+\.pdf/g) ?? []).length, 18);
  assert.equal((html.match(/assets\/certificados\/[A-Z0-9]+\.gif/g) ?? []).length, 18);
});

test('contatos profissionais estão presentes', async () => {
  const html = await read('index.html');
  assert.match(html, /mailto:cskadys@gmail\.com/);
  assert.match(html, /github\.com\/Kadys-dv/);
  assert.match(html, /linkedin\.com\/in\/rodrigo-marcelo-dos-santos-2851a4429/);
});

test('demonstração real do PlayMatch está disponível', async () => {
  const html = await read('index.html');
  assert.match(html, /<video[^>]+controls[^>]+playsinline/);
  assert.match(html, /assets\/playmatch\/playmatch-demo-real\.mp4/);
  await assert.doesNotReject(access(resolve(root, 'assets/playmatch/playmatch-demo-real.mp4')));
});
