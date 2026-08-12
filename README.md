# Portfólio — Rodrigo Marcelo dos Santos

Portfólio profissional de um desenvolvedor web e mobile, com o PlayMatch como estudo de caso principal, currículo imprimível e certificações verificáveis.

## Acessar

- Portfólio: <https://kadys-dv.github.io/portfolio-rodrigo/>
- Currículo: <https://kadys-dv.github.io/portfolio-rodrigo/curriculo.html>
- Carta de apresentação: <https://kadys-dv.github.io/portfolio-rodrigo/carta-apresentacao.html>
- LinkedIn: <https://www.linkedin.com/in/rodrigo-marcelo-dos-santos-2851a4429/>

## Recursos

- Design responsivo e acessível
- Tema claro e escuro
- Estudo de caso interativo do PlayMatch
- 18 certificados DIO com documentos originais
- Currículo preparado para impressão ou PDF
- Foto profissional e carta de apresentação com download em PDF
- SEO, Open Graph, dados estruturados, sitemap e robots
- Testes automáticos e publicação contínua no GitHub Pages

## Estrutura

```text
assets/                 imagens públicas e prévias
certificados/           PDFs originais
js/main.js              inicialização da aplicação
js/modules/             módulos de interface e comportamento
js/utils/               utilitários compartilhados
styles/main.css         entrada dos estilos
styles/core.css         design system, componentes e responsividade
index.html              conteúdo semântico da página
```

## Executar localmente

Como o JavaScript utiliza módulos ES, execute por um servidor local:

```powershell
npx serve .
```

Abrir `index.html` diretamente também funciona para pré-visualização por meio do adaptador `js/file-preview.js`. Para desenvolvimento e publicação, prefira o servidor local.

## Qualidade

```powershell
npm test
```

Os testes validam arquivos referenciados, contatos, certificados, SEO e marcadores pendentes.
