const SERVICES = {
  app: 'https://plalymatch.web.app',
  api: 'https://matchhub-api-43bv.onrender.com/actuator/health',
};

async function isReachable(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controller.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function renderStatus(panel, service, online, message) {
  const card = panel.querySelector(`[data-status-service="${service}"]`);
  if (!card) return;
  card.dataset.status = online ? 'online' : 'unavailable';
  const label = card.querySelector('[data-status-label]');
  if (label) label.textContent = message ?? (online ? 'Operacional' : 'Indisponível');
}

export function initServiceStatus() {
  const panel = document.querySelector('[data-status-panel]');
  if (!panel) return;
  const summary = panel.querySelector('[data-status-summary]');
  const refresh = panel.querySelector('[data-status-refresh]');

  const check = async () => {
    refresh?.setAttribute('disabled', '');
    if (summary) summary.textContent = 'Executando verificação…';
    const [appOnline, apiOnline] = await Promise.all([
      isReachable(SERVICES.app),
      isReachable(SERVICES.api),
    ]);
    renderStatus(panel, 'app', appOnline);
    renderStatus(panel, 'api', apiOnline);
    const onlineCount = Number(appOnline) + Number(apiOnline);
    panel.classList.toggle('has-online-status', onlineCount > 0);
    if (summary)
      summary.textContent = `${onlineCount}/2 serviços públicos responderam · atualizado agora`;
    refresh?.removeAttribute('disabled');
  };

  refresh?.addEventListener('click', check);
  check();
}
