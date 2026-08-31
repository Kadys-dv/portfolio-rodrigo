const applyHiringV2 = () => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const hero = $('.hero-copy');
  if (hero) {
    const eyebrow = $('.eyebrow', hero);
    const title = $('h1', hero);
    const lead = $('.lead', hero);
    const facts = $('.hero-facts', hero);
    if (eyebrow) eyebrow.innerHTML = '<span></span> Engenharia de software aplicada';
    if (title) title.innerHTML = 'Desenvolvo produtos digitais <em>do app à infraestrutura.</em>';
    if (lead) {
      lead.textContent =
        'Sou Rodrigo, Desenvolvedor de Software Júnior. Construo aplicações com Java e Spring Boot, Flutter e Next.js, aplicando segurança, testes, consistência de dados e CI/CD.';
    }
    if (facts) {
      facts.innerHTML =
        '<li><strong>Mobile + Web</strong><span>Produtos completos</span></li><li><strong>Backend Java</strong><span>APIs, PostgreSQL e concorrência</span></li><li><strong>Engenharia</strong><span>Testes, segurança e CI/CD</span></li>';
    }
  }

  const floating = $('.floating-label');
  if (floating) floating.textContent = 'Java 21 · Spring Boot · Flutter · Next.js';

  const availability = $('.availability-text');
  if (availability) {
    availability.textContent = 'Buscando oportunidade Júnior em Backend Java, Full Stack ou Mobile';
  }

  const aboutParagraphs = $$('.about-copy > p');
  if (aboutParagraphs[0]) {
    aboutParagraphs[0].textContent =
      'Desenvolvo produtos digitais unindo experiência de usuário e engenharia. Meus projetos passam por mobile, frontend, APIs, banco de dados, segurança, testes e deploy.';
  }
  if (aboutParagraphs[1]) {
    aboutParagraphs[1].textContent =
      'Além de implementar funcionalidades, procuro demonstrar decisões técnicas: quais invariantes o servidor protege, como falhas são testadas, como mudanças chegam à produção e como o sistema pode ser diagnosticado.';
  }

  const careerTimeline = $('.career-timeline');
  if (careerTimeline) {
    careerTimeline.innerHTML = `
      <li class="reveal" data-career="foundation"><span>01</span><i aria-hidden="true">&lt;/&gt;</i><div><small>BASE TÉCNICA</small><h3>Fundamentos em Java</h3><p>Lógica, orientação a objetos, exceções, debugging, Git e desenvolvimento colaborativo formaram a base para construir sistemas maiores.</p><b>Fundamento</b></div></li>
      <li class="reveal" data-career="mobile"><span>02</span><i aria-hidden="true">◇</i><div><small>PRODUTO MOBILE</small><h3>PlayMatch</h3><p>Primeiro produto completo em Flutter, integrando Firebase, mapas, notificações, moderação e validação em dispositivos Android reais.</p><b>Produto</b></div></li>
      <li class="reveal" data-career="backend"><span>03</span><i aria-hidden="true">{ }</i><div><small>BACKEND & CONSISTÊNCIA</small><h3>Plataforma MatchHub</h3><p>Java, Spring Boot e PostgreSQL levaram regras críticas ao servidor, com transações, controle de concorrência, autenticação, testes, Docker e dashboard Next.js.</p><b>Engenharia</b></div></li>
      <li class="reveal" data-career="security"><span>04</span><i aria-hidden="true">⌾</i><div><small>SEGURANÇA APLICADA</small><h3>HATP</h3><p>Pesquisa e implementação de uma camada de autorização humana para agentes de IA, usando WebAuthn, transaction binding, proteção contra replay e isolamento por tenant.</p><b>Segurança</b></div></li>
      <li class="reveal" data-career="architecture"><span>05</span><i aria-hidden="true">⛓</i><div><small>ARQUITETURA & RESILIÊNCIA</small><h3>Fazer o Bem</h3><p>Arquitetura de ajuda mútua em sandbox com ledger e auditoria encadeados, idempotência, reconciliação, dual approval, observabilidade e testes de concorrência, carga e recuperação.</p><b>Resiliência</b></div></li>
      <li class="reveal" data-career="web3"><span>06</span><i aria-hidden="true">⬡</i><div><small>WEB3 & ENTREGA CONTÍNUA</small><h3>ALPHA Lab / Builders</h3><p>Solidity e Hardhat em Base Sepolia combinados com frontend moderno, testes de navegador, acessibilidade, Lighthouse, CI/CD, rulesets e deploy rastreável.</p><b>Operação</b></div></li>
      <li class="reveal" data-career="current"><span>07</span><i aria-hidden="true">↗</i><div><small>FASE ATUAL</small><h3>Engenharia demonstrável</h3><p>O foco atual é transformar projetos em evidências verificáveis de arquitetura, segurança, qualidade, operação e capacidade de entregar produtos completos.</p><b>Evolução contínua</b></div></li>`;
  }

  const experienceCards = $$('.experience-card');
  if (experienceCards[2]) {
    experienceCards[2].innerHTML =
      '<header><div><small>PROJETO INDEPENDENTE · WEB3 + FRONTEND</small><h3>ALPHA Lab / Builders</h3></div><span>Engenharia verificável</span></header><p>Laboratório público que combina Solidity, frontend moderno, automação e operação em Base Sepolia com limites financeiros explícitos.</p><ul><li>Hardhat, Solidity e contrato ERC-20 testado</li><li>Next.js, Cloudflare, Playwright, Axe e Lighthouse</li><li>CI/CD, ruleset protegido e deploy rastreável por SHA</li></ul><a href="https://github.com/Kadys-dv/ALPHA-Lab" target="_blank" rel="noopener">Explorar projeto no GitHub ↗</a>';
  }
  if (experienceCards[3]) {
    experienceCards[3].innerHTML =
      '<header><div><small>PROJETO INDEPENDENTE · ARQUITETURA</small><h3>Fazer o Bem</h3></div><span>Sandbox / staging</span></header><p>Plataforma de ajuda mútua usada para exercitar arquitetura de sistemas financeiros com controles explícitos e operação segura em ambiente de testes.</p><ul><li>Ledger e auditoria encadeados, idempotência e reconciliação</li><li>WebAuthn, Redis, observabilidade e dual approval</li><li>Testes de carga, concorrência, chaos/DR e supply-chain security</li></ul><a href="https://github.com/Kadys-dv/fazerobem" target="_blank" rel="noopener">Explorar evidências no GitHub ↗</a>';
  }

  const projectsContainer = $('#projetos .container');
  const helpdesk = $('.helpdesk-case');
  if (projectsContainer && helpdesk && !$('.engineering-showcase')) {
    const showcase = document.createElement('section');
    showcase.className = 'engineering-showcase reveal';
    showcase.setAttribute('aria-labelledby', 'engineering-showcase-title');
    showcase.innerHTML = `
      <div class="engineering-showcase-head">
        <p class="eyebrow dark">Engenharia em destaque</p>
        <h3 id="engineering-showcase-title">Decisões que consigo demonstrar.</h3>
        <p>Mais do que listar tecnologias, estes projetos mostram riscos, controles e evidências executáveis.</p>
      </div>
      <div class="engineering-projects">
        <article>
          <small>WEB3 · QUALIDADE · OPERAÇÃO</small><h4>ALPHA Lab / Builders</h4>
          <dl><div><dt>Problema</dt><dd>Publicar um produto Web3 verificável sem confundir experimento técnico com oferta financeira.</dd></div><div><dt>Decisão</dt><dd>Base Sepolia, contrato sem funções administrativas críticas, frontend canônico e gates de browser/deploy.</dd></div><div><dt>Evidência</dt><dd>Solidity tests, Playwright, Axe, Lighthouse, Cloudflare build e ruleset protegido.</dd></div></dl>
          <a href="https://github.com/Kadys-dv/ALPHA-Lab" target="_blank" rel="noopener">Ver código e pipelines ↗</a>
        </article>
        <article>
          <small>SEGURANÇA · CONSISTÊNCIA · RESILIÊNCIA</small><h4>Fazer o Bem</h4>
          <dl><div><dt>Problema</dt><dd>Preservar consistência e auditabilidade em fluxos sensíveis mesmo sob concorrência e falhas.</dd></div><div><dt>Decisão</dt><dd>Ledger encadeado, idempotência, dual approval, reconciliação, WebAuthn e limites operacionais explícitos.</dd></div><div><dt>Evidência</dt><dd>Testes de carga/concorrência, pilot simulation, security gates, chaos/DR e production-readiness.</dd></div></dl>
          <a href="https://github.com/Kadys-dv/fazerobem" target="_blank" rel="noopener">Ver arquitetura e evidências ↗</a>
        </article>
      </div>`;
    projectsContainer.insertBefore(showcase, helpdesk);
  }

  if (helpdesk) {
    const previous = helpdesk.previousElementSibling;
    if (previous?.classList.contains('engineering-showcase')) {
      const label = document.createElement('div');
      label.className = 'secondary-projects-title reveal';
      label.innerHTML =
        '<p class="eyebrow dark">Outros projetos</p><h3>Amplitude de produto e interface.</h3><p>Projetos complementares que demonstram experiência web e mobile.</p>';
      helpdesk.parentNode.insertBefore(label, helpdesk);
    }
  }

  const competencies = $('#competencias');
  if (competencies) {
    const heading = $('.section-title h2', competencies);
    if (heading) heading.textContent = 'Engenharia que consigo demonstrar.';
    const skills = $$('.skill', competencies);
    const skillContent = [
      [
        '01',
        'Backend & dados',
        'Java 21, Spring Boot, APIs REST, PostgreSQL, Flyway, transações, concorrência e reconciliação.',
      ],
      [
        '02',
        'Segurança',
        'JWT, WebAuthn, autorização, idempotência, proteção contra replay, auditoria e gestão segura de segredos.',
      ],
      [
        '03',
        'Qualidade',
        'JUnit, testes de integração, Vitest, Playwright, Axe, Lighthouse, análise de logs e cenários negativos.',
      ],
      [
        '04',
        'CI/CD & operação',
        'GitHub Actions, Docker, Cloudflare, Vercel, gates de qualidade, deploy rastreável e observabilidade.',
      ],
      [
        '05',
        'Mobile',
        'Flutter, Dart, Firebase, mapas, notificações, Health Connect e validação em dispositivos Android reais.',
      ],
      [
        '06',
        'Frontend',
        'Next.js, React, TypeScript, acessibilidade, responsividade, SEO, desempenho e arquitetura BFF.',
      ],
    ];
    skills.forEach((skill, index) => {
      const item = skillContent[index];
      if (item) {
        skill.innerHTML = `<span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p>`;
      }
    });
    const strip = $('.evidence-strip', competencies);
    if (strip) {
      strip.innerHTML =
        '<span>✓ API REST</span><span>✓ PostgreSQL</span><span>✓ Concorrência</span><span>✓ WebAuthn</span><span>✓ Docker</span><span>✓ CI/CD</span><span>✓ Testes E2E</span><span>✓ Observabilidade</span>';
    }
  }

  const certGrid = $('[data-cert-grid]');
  if (certGrid) certGrid.classList.add('hiring-certs');

  const contact = $('#contato');
  if (contact) {
    const title = $('h2', contact);
    const text = $('p:not(.eyebrow)', contact);
    if (title) title.textContent = 'Estou buscando minha próxima oportunidade como desenvolvedor.';
    if (text) {
      text.textContent =
        'Tenho interesse em posições Júnior de Backend Java, Full Stack ou Mobile e estou disponível para conversar sobre projetos, desafios técnicos e oportunidades.';
    }
  }

  if (!$('#hiring-v2-styles')) {
    const style = document.createElement('style');
    style.id = 'hiring-v2-styles';
    style.textContent = `
      .engineering-showcase{margin-top:34px;padding:clamp(28px,5vw,58px);border:1px solid var(--line);border-radius:40px;background:linear-gradient(145deg,color-mix(in srgb,var(--surface) 94%,#57e99b),var(--surface));box-shadow:var(--shadow)}
      .engineering-showcase-head{max-width:760px;margin-bottom:28px}.engineering-showcase-head h3,.secondary-projects-title h3{margin:10px 0;font:700 clamp(2rem,4vw,3.6rem)/1 'Space Grotesk';letter-spacing:-.05em}.engineering-showcase-head>p:last-child,.secondary-projects-title>p:last-child{color:var(--muted)}
      .engineering-projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.engineering-projects article{padding:clamp(20px,3vw,30px);border:1px solid var(--line);border-radius:26px;background:var(--surface)}.engineering-projects small{color:#07834b;font-weight:800;letter-spacing:.12em}.engineering-projects h4{margin:8px 0 20px;font:700 1.55rem 'Space Grotesk'}.engineering-projects dl{display:grid;gap:13px;margin:0 0 22px}.engineering-projects dl div{display:grid;gap:4px}.engineering-projects dt{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.engineering-projects dd{margin:0;color:var(--muted);font-size:.88rem;line-height:1.6}.engineering-projects a{color:#07834b;font-weight:800;text-decoration:none}.secondary-projects-title{margin-top:64px;margin-bottom:20px}.hiring-certs:not(.expanded) .cert-card:nth-child(n+5){display:none!important}
      @media(max-width:760px){.engineering-projects{grid-template-columns:1fr}.engineering-showcase{border-radius:28px}}
    `;
    document.head.appendChild(style);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyHiringV2);
} else {
  applyHiringV2();
}

if (location.protocol === 'file:') {
  document.documentElement.classList.add('js');

  addEventListener('DOMContentLoaded', () => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    $$('.reveal').forEach((element) => element.classList.add('visible'));
    $('[data-year]').textContent = new Date().getFullYear();

    const menu = $('[data-menu]');
    const menuButton = $('[data-menu-button]');
    menuButton?.addEventListener('click', () => {
      const open = menu?.classList.toggle('open') ?? false;
      menuButton.setAttribute('aria-expanded', String(open));
    });

    $('[data-theme-toggle]')?.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
    });

    const screen = $('[data-screen]');
    $$('[data-image]').forEach((button) =>
      button.addEventListener('click', () => {
        if (!screen) return;
        screen.src = button.dataset.image;
        screen.alt = button.dataset.alt;
        $$('[data-image]').forEach((item) => item.classList.toggle('active', item === button));
      }),
    );

    const certGrid = $('[data-cert-grid]');
    const certButton = $('[data-cert-more]');
    certButton?.addEventListener('click', () => {
      const expanded = certGrid?.classList.toggle('expanded') ?? false;
      certButton.setAttribute('aria-expanded', String(expanded));
      certButton.textContent = expanded
        ? 'Mostrar menos certificados'
        : 'Ver todos os 18 certificados';
    });
  });
}
