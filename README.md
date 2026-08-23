# Portfolio - Rodrigo Marcelo dos Santos

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-22c55e?style=for-the-badge&logo=github)](https://kadys-dv.github.io/portfolio-rodrigo/)
[![Quality](https://img.shields.io/badge/quality-tests%20%2B%20lint-0f766e?style=for-the-badge)](#qualidade)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-334155?style=for-the-badge)](#stack)

Portfolio profissional para apresentar a trajetoria, os projetos e os materiais de candidatura de Rodrigo Marcelo dos Santos, Desenvolvedor de Software Junior com foco em web, mobile e backend.

## Demo

- Portfolio: <https://kadys-dv.github.io/portfolio-rodrigo/>
- Curriculo: <https://kadys-dv.github.io/portfolio-rodrigo/curriculo.html>
- Carta de apresentacao: <https://kadys-dv.github.io/portfolio-rodrigo/carta-apresentacao.html>
- LinkedIn: <https://www.linkedin.com/in/rodrigo-marcelo-dos-santos-2851a4429/>

## Problema

Um perfil junior precisa mostrar mais do que tecnologias listadas. O objetivo deste portfolio e provar capacidade pratica com projetos reais, estudos de caso, demonstracoes, documentos profissionais e validacoes automatizadas.

## Solucao

O site organiza a apresentacao em uma experiencia responsiva com:

- Home profissional com proposta de valor, trajetoria e contatos.
- Estudos de caso de PlayMatch, MatchHub API, MatchHub Dashboard, Helpdesk e RitmoraX.
- Video real do PlayMatch gravado em aparelho Android.
- Curriculo, carta de apresentacao e certificados verificaveis.
- SEO com canonical, Open Graph, Twitter Card, sitemap, robots e dados estruturados.
- Testes automatizados para conteudo, links, layout, comportamento mobile e fluxos essenciais.

## Projetos em destaque

| Projeto | Stack | O que demonstra |
| --- | --- | --- |
| **PlayMatch** | Flutter, Dart, Firebase, Google Maps | Produto mobile com autenticacao, mapas, partidas, atletas, chat, avaliacoes, denuncias e notificacoes. |
| **MatchHub API** | Java 21, Spring Boot, PostgreSQL, JWT, Docker | Backend REST transacional com seguranca, regras de negocio, migrations e testes de integracao. |
| **MatchHub Dashboard** | Next.js, React, TypeScript, Tailwind CSS | Painel administrativo com BFF, cookie HTTP-only, indicadores, moderacao e build de producao. |

## Stack

- HTML semantico, CSS modular e JavaScript ES Modules.
- Playwright para validacoes de navegador e layout.
- Node Test Runner para testes automatizados.
- Biome para lint e formatacao.
- Knip para deteccao de arquivos e exports nao utilizados.
- GitHub Actions e GitHub Pages.

## Executar localmente

```powershell
npm install
npm run serve
```

Abra <http://127.0.0.1:4173>.

## Qualidade

```powershell
npm run check
npm run test:layout
npm run test:e2e
```

O comando `npm run check` valida sintaxe, lint, dependencias/exports nao utilizados e testes unitarios. Os testes de layout e E2E usam navegador para conferir desktop, mobile, navegacao, tema e secoes essenciais.

## Seguranca e dados locais

A captura do dashboard usa `MATCHHUB_DEMO_EMAIL` e `MATCHHUB_DEMO_PASSWORD` definidos somente no ambiente local; nenhuma credencial e versionada.

Desenvolvido por Dev Rodrigo. Todos os direitos reservados.
