const safeExternalLink = (href, label) =>
  `<a class="button secondary" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

const createExperienceCard = ({ eyebrow, title, summary, bullets, href }) => {
  const article = document.createElement('article');
  article.className = 'experience-card reveal';
  article.innerHTML = `<header><div><small>${eyebrow}</small><h3>${title}</h3></div><span>Produto próprio</span></header><p>${summary}</p><ul>${bullets.map((item) => `<li>${item}</li>`).join('')}</ul><a href="${href}">Ver estudo de caso →</a>`;
  return article;
};

const createFeaturedCase = ({
  title,
  kicker,
  heading,
  description,
  features,
  tech,
  href,
  github,
  flow,
}) => {
  const article = document.createElement('article');
  article.className = 'case-study reveal';
  article.style.marginBottom = '34px';
  article.innerHTML = `<div class="case-copy"><div class="case-brand"><div><small>${kicker}</small><strong>${title}</strong></div></div><h3>${heading}</h3><p>${description}</p><ul class="feature-list">${features.map((item) => `<li>${item}</li>`).join('')}</ul><div class="tech-list">${tech.map((item) => `<span>${item}</span>`).join('')}</div><div class="actions"><a class="button light" href="${href}">Ver estudo de caso</a>${github ? safeExternalLink(github, 'Ver repositório') : ''}</div></div><div class="api-visual" aria-hidden="true"><div class="code-window"><div class="code-bar"><i></i><i></i><i></i><span>${title}</span></div><pre>${flow.map((item, index) => `${index ? '<span>↓</span>\n' : ''}${item}`).join('\n')}</pre></div></div>`;
  return article;
};

const addTimelineItems = () => {
  const timeline = document.querySelector('.career-timeline');
  if (!timeline || timeline.querySelector('[data-career="security"]')) return;

  const security = document.createElement('li');
  security.className = 'reveal';
  security.dataset.career = 'security';
  security.innerHTML =
    '<span>05</span><i aria-hidden="true">◈</i><div><small>SEGURANÇA E SISTEMAS CRÍTICOS</small><h3>HATP Authority Firewall</h3><p>Camada de autorização humana verificável para agentes de IA, com WebAuthn, transaction binding e proteção contra replay.</p><b>Segurança</b></div>';

  const mutualAid = document.createElement('li');
  mutualAid.className = 'reveal';
  mutualAid.dataset.career = 'governance';
  mutualAid.innerHTML =
    '<span>06</span><i aria-hidden="true">◇</i><div><small>ENGENHARIA DE ALTA CONFIANÇA</small><h3>Fazer o Bem</h3><p>Plataforma sandbox de ajuda mútua com ledger, auditoria, concorrência, WebAuthn, Redis, reconciliação e gates de Production Readiness.</p><b>Engenharia</b></div>';

  timeline.append(security, mutualAid);
};

const addPrimaryProjects = () => {
  const experienceGrid = document.querySelector('.experience-grid');
  if (
    experienceGrid &&
    !experienceGrid.querySelector('[data-project="fazerobem"]')
  ) {
    const fazerobem = createExperienceCard({
      eyebrow: 'PROJETO INDEPENDENTE · JAVA / SEGURANÇA',
      title: 'Fazer o Bem',
      summary:
        'Plataforma de ajuda mútua em sandbox/staging projetada para preservar governança, rastreabilidade e invariantes financeiras sem habilitar dinheiro real antes das evidências externas obrigatórias.',
      bullets: [
        'Spring Boot, PostgreSQL, Redis e Flyway',
        'Ledger/auditoria, dupla aprovação e idempotência',
        'WebAuthn, KMS, CI, chaos/DR e reconciliação',
      ],
      href: 'projetos/fazerobem.html',
    });
    fazerobem.dataset.project = 'fazerobem';

    const hatp = createExperienceCard({
      eyebrow: 'PROJETO INDEPENDENTE · SECURITY / AI',
      title: 'HATP Authority Firewall',
      summary:
        'Camada de autorização que impede agentes de IA de ultrapassarem autoridade delegada em operações críticas, exigindo confirmação humana verificável quando necessário.',
      bullets: [
        'ALLOW / DENY / HUMAN_REQUIRED',
        'Passkeys/WebAuthn e transaction binding',
        'Replay protection e políticas por organização',
      ],
      href: 'projetos/hatp.html',
    });
    hatp.dataset.project = 'hatp';

    experienceGrid.prepend(hatp);
    experienceGrid.prepend(fazerobem);
  }

  const projectsContainer = document.querySelector('#projetos .container');
  const firstExistingCase = projectsContainer?.querySelector('.case-study');
  if (
    projectsContainer &&
    firstExistingCase &&
    !projectsContainer.querySelector('[data-featured="fazerobem"]')
  ) {
    const mutualAidCase = createFeaturedCase({
      title: 'Fazer o Bem',
      kicker: 'ESTUDO DE CASO · JAVA / SECURITY',
      heading: 'Ajuda mútua com governança verificável.',
      description:
        'Projeto sandbox/staging focado em separar funções, evitar liquidação duplicada e tornar pagamentos, auditoria e reconciliação verificáveis antes de qualquer discussão sobre dinheiro real.',
      features: [
        'Dupla aprovação e segregação ANALYST / APPROVER / ADMIN / AUDITOR',
        'Ledger e auditoria encadeados',
        'Idempotência, webhook assinado e replay protection',
        'Carga/concorrência, chaos/DR e rehearsal de staging',
      ],
      tech: [
        'Java 21',
        'Spring Boot',
        'PostgreSQL',
        'Redis',
        'WebAuthn',
        'Testcontainers',
      ],
      href: 'projetos/fazerobem.html',
      github: 'https://github.com/Kadys-dv/fazerobem',
      flow: [
        'MEMBER → REQUEST',
        'ANALYST → ANTIFRAUD',
        'APPROVER A + B',
        'ADMIN → PROCESSING',
        'PROVIDER → PAID',
        'LEDGER + AUDIT',
      ],
    });
    mutualAidCase.dataset.featured = 'fazerobem';

    const hatpCase = createFeaturedCase({
      title: 'HATP Authority Firewall',
      kicker: 'ESTUDO DE CASO · AI SECURITY',
      heading: 'Autoridade humana antes de ações críticas de agentes de IA.',
      description:
        'Uma camada de políticas para decidir quando um agente pode prosseguir autonomamente e quando precisa de confirmação humana criptograficamente verificável.',
      features: [
        'Decisões ALLOW / DENY / HUMAN_REQUIRED',
        'Passkeys/WebAuthn com user verification',
        'Transaction binding e proteção contra replay',
        'Isolamento por organização e auditoria',
      ],
      tech: [
        'Java 21',
        'Spring Boot',
        'WebAuthn',
        'PostgreSQL',
        'Flyway',
        'Docker',
      ],
      href: 'projetos/hatp.html',
      github: 'https://github.com/Kadys-dv/hatp-shopping-agent',
      flow: [
        'AI AGENT → INTENT',
        'HATP → POLICY',
        'ALLOW / DENY',
        'HUMAN_REQUIRED',
        'PASSKEY / FIDO',
        'BOUND DECISION',
      ],
    });
    hatpCase.dataset.featured = 'hatp';

    projectsContainer.insertBefore(hatpCase, firstExistingCase);
    projectsContainer.insertBefore(mutualAidCase, hatpCase);
  }
};

const addEngineeringDecisions = () => {
  const projects = document.querySelector('#projetos');
  if (!projects || document.querySelector('#decisoes-engenharia')) return;

  const section = document.createElement('section');
  section.className = 'section practical-experience';
  section.id = 'decisoes-engenharia';
  section.setAttribute('aria-labelledby', 'engineering-decisions-title');
  section.innerHTML = `<div class="container"><div class="section-title reveal"><p class="eyebrow dark">Decisões de engenharia</p><h2 id="engineering-decisions-title">O motivo por trás do código.</h2><p>Algumas escolhas que uso para transformar requisitos em sistemas previsíveis, testáveis e seguros.</p></div><div class="experience-grid"><article class="experience-card reveal"><header><div><small>CONSISTÊNCIA</small><h3>Concorrência e idempotência</h3></div><span>Backend</span></header><p>Operações críticas precisam manter invariantes mesmo com requisições simultâneas e retries.</p><ul><li>Transações e restrições no banco</li><li>Chaves idempotentes em pagamentos</li><li>Testes concorrentes contra PostgreSQL real</li></ul></article><article class="experience-card reveal"><header><div><small>SEGURANÇA</small><h3>Fail-closed e menor privilégio</h3></div><span>Security</span></header><p>Configurações sensíveis não devem assumir valores inseguros nem liberar autoridade por padrão.</p><ul><li>Perfis de produção sem fallback funcional</li><li>WebAuthn/MFA em fluxos privilegiados</li><li>Segregação de funções e trilha de auditoria</li></ul></article><article class="experience-card reveal"><header><div><small>RESILIÊNCIA</small><h3>Estado externo não é estado interno</h3></div><span>Payments</span></header><p>Uma tentativa local não deve ser tratada como liquidada até confirmação autenticada e reconciliável.</p><ul><li>Webhook assinado e replay protection</li><li>RECONCILIATION_REQUIRED para incerteza</li><li>Nenhum botão administrativo força PAID</li></ul></article><article class="experience-card reveal"><header><div><small>QUALIDADE</small><h3>Gates antes de confiança</h3></div><span>CI/CD</span></header><p>Testes unitários são apenas uma camada; cenários de staging, carga, segurança e recuperação precisam de gates próprios.</p><ul><li>Testcontainers e Playwright</li><li>Load/concurrency e chaos/DR</li><li>Production readiness e rehearsal</li></ul></article></div></div>`;

  projects.insertAdjacentElement('afterend', section);
};

export function initEngineeringRefresh() {
  addTimelineItems();
  addPrimaryProjects();
  addEngineeringDecisions();
}
