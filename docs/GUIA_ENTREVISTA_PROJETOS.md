# Guia de entrevista — projetos do portfólio

Objetivo: responder de forma simples, técnica e verificável. Não decorar palavras; entender a decisão.

## Como explicar o uso de IA

**Resposta curta:**

Usei IA como ferramenta de desenvolvimento para acelerar implementação, revisão e investigação. Eu defini requisitos, acompanhei decisões de arquitetura, validei comportamento com testes e CI e mantive responsabilidade pelo que entrou no projeto. Quando a IA sugeria uma solução, eu comparava com o domínio, os testes e as invariantes antes de aceitar.

**Evite dizer:** "a IA fez tudo" ou "escrevi absolutamente tudo sem ajuda".

---

# Fazer o Bem

## O que é?

Uma plataforma de ajuda mútua em sandbox/staging. Membros podem contribuir voluntariamente e solicitar auxílio. O sistema aplica elegibilidade, análise, antifraude, dupla aprovação, tentativa de pagamento, confirmação externa, ledger e auditoria.

## Por que PostgreSQL?

Porque o domínio possui estados e invariantes que precisam ser preservados transacionalmente. Constraints, locks, unicidade e transações ajudam a impedir estados impossíveis, especialmente sob concorrência.

## Por que Redis?

Para controles distribuídos e temporários, como rate limiting e coordenação que não precisa viver como estado financeiro definitivo. O PostgreSQL continua sendo a fonte persistente das invariantes financeiras.

## O que é idempotência?

É garantir que repetir a mesma operação não gere o efeito financeiro duas vezes. Em pagamento, a mesma Idempotency-Key deve retornar/reusar a tentativa correspondente em vez de criar uma nova transferência.

## O que impede dois pagamentos simultâneos para o mesmo auxílio?

O desenho combina regras de domínio, transação e restrições no banco. Os testes de concorrência criam vários racers ao mesmo tempo e verificam que permanece apenas uma tentativa financeira ativa para o auxílio.

## Por que existem dois APPROVERs?

Para segregação de funções e redução do risco de uma única pessoa concentrar autoridade crítica. A mesma pessoa não pode cumprir as duas aprovações independentes.

## Por que o ADMIN não pode marcar PAID?

Porque o estado interno não deve substituir confirmação do provedor. O ADMIN inicia a tentativa, mas PAID depende de confirmação externa autenticada ou reconciliação segura do estado do provedor.

## O que é RECONCILIATION_REQUIRED?

É um estado explícito para incerteza. Em vez de fingir que uma operação deu certo ou errado quando o estado externo é inconclusivo, o sistema mantém a tentativa para reconciliação e evidência operacional.

## O que acontece se o webhook chegar duas vezes?

O webhook possui autenticação, janela temporal e replay protection. Além disso, o fluxo de settlement é idempotente para impedir que uma confirmação repetida produza um segundo lançamento financeiro.

## O que é ledger encadeado?

Cada entrada inclui informação que permite relacioná-la criptograficamente à anterior. Se alguém alterar uma entrada histórica sem recalcular a cadeia inteira, a verificação de integridade detecta a inconsistência. Isso não substitui controles de acesso ou banco seguro; é uma camada adicional de evidência.

## O que o chaos-dr verifica?

Reinicia dependências como PostgreSQL/Redis, verifica recuperação da aplicação e executa backup/restore e invariantes financeiras depois das falhas. O objetivo não é provar alta disponibilidade total, e sim provar comportamento de recuperação sob cenários controlados.

## Por que dinheiro real continua bloqueado?

Porque readiness técnico interno não substitui evidência externa. Ainda são exigidos rehearsal no staging alvo real, pentest independente, validações jurídica/LGPD e homologação contratual do provedor financeiro.

---

# HATP Authority Firewall

## O que é?

Uma camada de autorização para agentes de IA. Antes de uma ação crítica, o agente consulta o HATP, que pode responder ALLOW, DENY ou HUMAN_REQUIRED.

## Por que não basta autenticar o agente?

Autenticação responde "quem é"; autoridade responde "o que ele pode fazer agora". Um agente autenticado pode não ter permissão para uma compra de determinado valor ou pode precisar de confirmação humana.

## O que é transaction binding?

É vincular a autorização humana aos dados concretos da transação. Assim, uma aprovação para uma compra específica não pode ser reutilizada para outra operação diferente.

## O que é replay protection?

É impedir reutilização de uma decisão/autorização já consumida. Depois que a decisão é usada, uma segunda tentativa é rejeitada.

## O que WebAuthn acrescenta?

Permite uma confirmação humana forte com passkeys/FIDO e user verification, reduzindo dependência de senhas e tornando a prova de presença/autorização mais robusta.

## Por que escopos de API separados?

Runtime, verificação humana, administração de políticas e leitura de auditoria têm responsabilidades diferentes. Separar escopos reduz o impacto caso uma credencial seja exposta.

---

# MatchHub

## Como funciona o JWT?

Após autenticação válida, o backend emite um token assinado. O cliente envia o token nas requisições protegidas, e o servidor valida assinatura, expiração e claims antes de autorizar a rota. O token identifica a sessão/autorização, mas não substitui validação de regra de negócio.

## Como evita duas pessoas ocuparem a última vaga?

A decisão precisa acontecer no backend e dentro de uma transação. O projeto usa mecanismos de concorrência no banco para que duas requisições simultâneas não confirmem a mesma vaga disponível.

## Por que regras no backend e não só na interface?

Porque qualquer cliente pode falhar, ficar desatualizado ou chamar a API diretamente. A interface melhora UX; o backend é responsável pela regra autoritativa.

---

# PlayMatch

## Por que Firebase?

Para acelerar autenticação, persistência em tempo real, notificações e serviços mobile enquanto eu desenvolvia o produto Flutter. Regras do Firebase e Cloud Functions ajudam a manter parte das validações fora do cliente.

## Qual foi um desafio real?

Geolocalização, permissões, configuração do Google Maps, regras de segurança e fluxo de candidaturas exigiram validação em aparelho real e investigação de erros específicos de Android/Firebase.

---

# Perguntas de arquitetura

## Como você decide onde uma regra deve ficar?

Primeiro identifico se a regra precisa ser autoritativa e consistente. Regras críticas ficam no backend/domínio; constraints importantes também são reforçadas no banco. A interface pode repetir validações para UX, mas não é a única barreira.

## Como você pensa em segurança?

Menor privilégio, fail-closed, defesa em profundidade e auditabilidade. Tento evitar defaults inseguros, separar papéis e tratar autenticação, autorização, integridade, replay e operação como problemas diferentes.

## Como você pensa em testes?

Uso camadas: unitários para regras locais, integração com banco real/Testcontainers para persistência e concorrência, E2E para fluxo completo e gates específicos para segurança, carga, chaos/DR e readiness.

## O que você faria diferente em um time profissional?

Aumentaria revisão por pares, ADRs, threat modeling conjunto, observabilidade com infraestrutura real, testes contratados com provedores e validações de segurança/jurídicas por especialistas. Os projetos atuais são independentes e servem para praticar essas decisões.

---

# Regra para entrevista

Se não souber algo, diga exatamente onde termina seu conhecimento e explique como investigaria. É melhor demonstrar método e entendimento real do que tentar parecer mais experiente do que é.
