import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const read = path => readFile(resolve(path), 'utf8');

test('apresentacao pessoal centralizada sem botao redundante', async () => {
  const [html, styles] = await Promise.all([read('index.html'), read('styles/main.css')]);
  assert.doesNotMatch(html, />Vamos conversar</);
  assert.match(styles, /\.about-profile\{[^}]*text-align:center/);
  assert.match(styles, /\.profile-portrait\{[^}]*margin:0 auto 28px/);
  assert.match(styles, /\.about-copy\{[^}]*text-align:center/);
});
