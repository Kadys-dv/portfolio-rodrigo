import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

test('páginas não possuem marcadores pendentes', async () => {
  const pages = await Promise.all(['index.html', 'curriculo.html'].map(read));
  assert.doesNotMatch(pages.join('\n'), /SEU_[A-Z_]+|TODO|FIXME/);
});

test('arquivos locais referenciados existem', async () => {
  for (const pageName of ['index.html', 'curriculo.html']) {
    const html = await read(pageName);
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map((match) => match[1].split('#')[0].split('?')[0])
      .filter((value) => value && !/^(?:https?:|mailto:|#)/.test(value));
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

test('folha de estilos possui versão para evitar cache antigo', async () => {
  const html = await read('index.html');
  assert.match(html, /styles\/main\.css\?v=\d{8}-\d+/);
});

test('três certificados principais são priorizados na página inicial', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles/main.css')]);
  for (const certificate of ['Dominando a Linguagem de Programação Java', 'Princípios de Desenvolvimento de Software Colaborativo', 'Aprendendo a Sintaxe Java']) {
    assert.ok(html.includes(certificate), `Certificado ausente: ${certificate}`);
  }
  assert.match(css, /#certificacoes \.cert-card:nth-child\(n\+4\)\{display:none\}/);
  assert.doesNotMatch(html, /data-cert-more/);
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
  assert.match(html, /Gravado em um Motorola real/);
  await assert.doesNotReject(access(resolve(root, 'assets/playmatch/playmatch-demo-real.mp4')));
});

test('alternância de tema fica restrita ao botão dedicado', async () => {
  const [html, themeModule] = await Promise.all([read('index.html'), read('js/modules/theme.js')]);
  assert.equal((html.match(/data-theme-toggle/g) ?? []).length, 1);
  assert.match(themeModule, /\$\('\[data-theme-toggle\]'\)/);
  assert.doesNotMatch(themeModule, /\$\('\[data-theme\]'\)/);
});

test('assinatura profissional está presente no rodapé', async () => {
  const html = await read('index.html');
  assert.match(html, /Desenvolvido por Dev Rodrigo • Todos os direitos reservados/);
});

test('currículo e carta profissionais estão disponíveis em HTML imprimível', async () => {
  const [index, resume, letter] = await Promise.all(['index.html', 'curriculo.html', 'carta-apresentacao.html'].map(read));
  assert.ok(resume.includes('Rodrigo Marcelo dos Santos'));
  assert.ok(letter.includes('Rodrigo Marcelo dos Santos'));
  assert.match(resume, /Salvar \/ imprimir PDF/);
  assert.match(letter, /Salvar \/ imprimir PDF/);
  assert.match(index, /curriculo\.html/);
  assert.match(index, /carta-apresentacao\.html/);
  assert.doesNotMatch(index + resume + letter, /curriculo-rodrigo-ats-v6\.pdf|carta-apresentacao-rodrigo\.pdf/);
});

test('currículo informa a escolaridade concluída', async () => {
  const html = await read('curriculo.html');
  assert.match(html, /Ensino Médio Completo/);
  assert.match(html, /Formação concluída/);
});

test('currículo informa o nível de inglês', async () => {
  const html = await read('curriculo.html');
  assert.match(html, /Inglês básico/);
});

test('currículo apresenta competências técnicas desenvolvidas nos projetos atuais', async () => {
  const html = await read('curriculo.html');
  for (const skill of ['Spring Boot', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript', 'análise de logs', 'WebAuthn', 'concorrência']) {
    assert.ok(html.includes(skill), `Competência ausente no currículo: ${skill}`);
  }
  assert.match(html, /Desenvolvedor de Software Júnior/);
  assert.match(html, /Praia Grande - SP/);
  for (const project of ['Fazer o Bem', 'HATP Authority Firewall', 'MatchHub', 'ALPHA Lab \/ Builders', 'PlayMatch']) {
    assert.match(html, new RegExp(project));
  }
});

test('MatchHub API possui estudo de caso e repositório no portfólio', async () => {
  const html = await read('index.html');
  assert.match(html, /id="matchhub-title">MatchHub API/);
  assert.match(html, /github\.com\/Kadys-dv\/matchhub-api/);
  for (const technology of ['Java 21', 'Spring Boot 4', 'PostgreSQL', 'JWT', 'Docker', 'Flyway']) assert.ok(html.includes(technology), `Tecnologia ausente: ${technology}`);
  assert.match(html, /CI validada no GitHub Actions/);
  const caseStudy = await read('projetos/matchhub-api.html');
  assert.match(caseStudy, /href="#arquitetura"/);
  assert.doesNotMatch(caseStudy, />Saúde da API</);
  assert.doesNotMatch(caseStudy, /href="https:\/\/matchhub-api-43bv\.onrender\.com\/actuator\/health"/);
});

test('blocos de código usam animação de digitação acessível', async () => {
  const [main, module, css] = await Promise.all([read('js/main.js'), read('js/modules/code-typing.js'), read('styles/main.css')]);
  assert.match(main, /initCodeTyping/);
  assert.match(module, /IntersectionObserver/);
  assert.match(module, /prefers-reduced-motion/);
  assert.match(module, /pre\.innerHTML = highlightCode\(visibleCode\)/);
  assert.match(module, /highlightCode/);
  assert.match(module, /token-\$\{type\}/);
  assert.match(css, /\.token-string/);
  assert.doesNotMatch(module, /createElement\(['"]pre['"]\)/);
  const html = await read('index.html');
  assert.match(html, /<pre data-typing-code=/);
  assert.match(html, /<span class="token-keyword">const<\/span>/);
  assert.match(html, /<span class="token-property">ideia<\/span>/);
  assert.match(html, /<span class="token-string">'validada'<\/span>/);
  assert.match(html, /<span class="token-property">Authorization<\/span>/);
  assert.match(html, /<span class="token-status">HTTP\/1\.1 200 OK<\/span>/);
  assert.match(html, /<span class="token-number">10<\/span>/);
  assert.doesNotMatch(html, /<pre><span>const<\/span> produto/);
  assert.match(css, /typing-caret/);
  assert.match(css, /transform-style:preserve-3d/);
});

test('sistema de movimento prioriza sequências, métricas e acessibilidade', async () => {
  const [html, main, motion, css, status] = await Promise.all([read('index.html'), read('js/main.js'), read('js/modules/motion.js'), read('styles/main.css'), read('js/modules/service-status.js')]);
  assert.match(main, /initMotion/);
  assert.match(html, /data-count-to="20"/);
  assert.match(html, /data-count-to="6"/);
  assert.match(html, /data-count-to="9"/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /career-timeline li/);
  assert.match(css, /motion-enter/);
  assert.match(css, /has-online-status/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(status, /has-online-status/);
});

test('contato usa mailto e destaca as redes profissionais', async () => {
  const [html, contactModule] = await Promise.all([read('index.html'), read('js/modules/contact.js')]);
  assert.match(contactModule, /mailto:cskadys@gmail\.com\?subject=Contato%20pelo%20portf%C3%B3lio/);
  assert.match(contactModule, /emailLink\.removeAttribute\('target'\)/);
  assert.doesNotMatch(html, /data-copy-email|Copiar e-mail/);
  assert.match(html, /class="button social-button linkedin-button"/);
  assert.match(html, /class="button social-button github-button"/);
  assert.match(html, /class="button social-button whatsapp-button"/);
  assert.match(html, /https:\/\/wa\.me\/5513996690378\?text=/);
  assert.doesNotMatch(html, /O botão abre uma nova mensagem no Gmail/);
});

test('MatchHub Dashboard possui estudo de caso full stack', async () => {
  const html = await read('index.html');
  assert.match(html, /id="dashboard-title">PlayMatch MatchHub/);
  assert.match(html, /assets\/matchhub\/dashboard\.png/);
  for (const technology of ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vitest']) assert.ok(html.includes(technology), `Tecnologia do dashboard ausente: ${technology}`);
  await assert.doesNotReject(access(resolve(root, 'assets/matchhub/dashboard.png')));
});

test('cada projeto possui página individual ligada à seção correspondente', async () => {
  const index = await read('index.html');
  const projects = [['projetos/playmatch.html', 'PlayMatch'], ['projetos/matchhub-api.html', 'MatchHub API'], ['projetos/matchhub-dashboard.html', 'MatchHub Dashboard']];
  for (const [path, title] of projects) {
    assert.ok(index.includes(`href="${path}"`), `Link ausente: ${path}`);
    const page = await read(path);
    assert.ok(page.includes(title), `Título ausente: ${title}`);
    for (const section of ['O problema', 'Decisões técnicas', 'Arquitetura', 'Testes', 'Resultados']) assert.ok(page.includes(section), `Seção ${section} ausente em ${path}`);
    assert.match(page, /Desenvolvido por Dev Rodrigo/);
  }
});

test('trajetória, status e experiência prática são apresentados com transparência', async () => {
  const [html, statusModule] = await Promise.all([read('index.html'), read('js/modules/service-status.js')]);
  assert.match(html, /id="trajetoria"/);
  for (const milestone of ['Fundamentos em Java', 'PlayMatch', 'MatchHub API', 'MatchHub Dashboard']) assert.ok(html.includes(milestone), `Marco ausente: ${milestone}`);
  assert.match(html, /data-status-service="app"/);
  assert.match(html, /data-status-service="api"/);
  assert.match(html, /href="projetos\/matchhub-api\.html" data-status-service="api"/);
  assert.doesNotMatch(html, /href="https:\/\/matchhub-api-43bv\.onrender\.com\/actuator\/health"[^>]*data-status-service="api"/);
  assert.doesNotMatch(html, /console\.neon\.tech/);
  assert.doesNotMatch(html, /data-status-service="database"/);
  assert.match(statusModule, /Promise\.all/);
  assert.doesNotMatch(html, /Esta seção não representa vínculo empregatício/);
  assert.match(html, /PROJETO INDEPENDENTE · MOBILE/);
  assert.match(html, /PROJETO INDEPENDENTE · FULL STACK/);
  assert.match(html, /class="career-universe reveal"/);
  assert.match(html, /career-orbit orbit-java/);
  assert.match(html, /status-pulse/);
  assert.doesNotMatch(html, /<span data-status-summary>Executando verificação/);
});

test('vídeo inicia uma vez ao entrar na área visível', async () => {
  const [html, module] = await Promise.all([read('index.html'), read('js/modules/video-autoplay.js')]);
  assert.match(html, /<video[^>]+controls[^>]+muted[^>]+loop[^>]+playsinline[^>]+data-demo-autoplay/);
  assert.match(module, /IntersectionObserver/);
  assert.match(module, /video\.loop = true/);
  assert.match(module, /addEventListener\('ended'/);
  assert.match(module, /intersectionRatio >= 0\.2/);
  assert.match(module, /observer\?\.unobserve\(video\)/);
  assert.match(module, /addEventListener\('canplay', attemptPlay\)/);
});

test('observador aciona a reprodução automática do vídeo', async () => {
  let callback;
  let playCalls = 0;
  let unobserveCalls = 0;
  const video = { muted: false, play: () => { playCalls += 1; return Promise.resolve(); }, addEventListener() {} };
  globalThis.document = { querySelector: (selector) => (selector === '[data-demo-autoplay]' ? video : null) };
  globalThis.matchMedia = () => ({ matches: false });
  globalThis.window = { IntersectionObserver: true };
  globalThis.IntersectionObserver = class {
    constructor(handler) { callback = handler; }
    observe() {}
    unobserve() { unobserveCalls += 1; }
  };
  const moduleUrl = pathToFileURL(resolve(root, 'js/modules/video-autoplay.js')).href;
  const { initVideoAutoplay } = await import(`${moduleUrl}?test=${Date.now()}`);
  initVideoAutoplay();
  callback([{ isIntersecting: true, intersectionRatio: 0.2 }]);
  await Promise.resolve();
  assert.equal(video.muted, true);
  assert.equal(playCalls, 1);
  assert.equal(unobserveCalls, 1);
});
