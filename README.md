# Site — Dr. Vinicius Marques Rodrigues

Site editorial da marca pessoal. Conceito: **CLAREZA QUE ORIENTA** (Brandbook 2026).

## Rodar

Requer Node ≥ 20. **Não há dependências** (`npm install` não é necessário).

```bash
npm run dev       # build + servidor em http://localhost:4321 com recarga automática
npm run build     # gera /dist (site estático final)
npm run preview   # serve /dist sem recarga
```

`HIDE_MEDIA_NOTES=1 npm run build` oculta as notas de briefing sobre os placeholders de foto/vídeo (útil para apresentar).

> **Por que sem dependências?** O projeto vive no Google Drive (drive virtual). `node_modules` significaria dezenas de milhares de arquivos sincronizando e observadores de arquivo instáveis. O build é um gerador estático próprio em Node puro (`tools/`), e as bibliotecas de movimento estão vendorizadas em `src/vendor/`. Migrar para Astro/Next no futuro é direto: componentes já são funções e o conteúdo já está separado.

## Estrutura

```
tools/            build.mjs (gerador), serve.mjs (dev server), lib/html.mjs (templates + placeholders)
src/content/      TODO o texto e dados — editar aqui
src/components/   layout, header/menu/footer, assinatura, mídia, CTA, primitivas
src/sections/     uma seção da Home por arquivo
src/pages/        rotas: /, /bio/, /trajetoria/, /atuacao/<slug>/, /conteudos/, /conteudos/<slug>/, /privacidade/, 404
src/styles/       bundles: main.css (site) e bio.css (/bio/, embutido inline) — ambos partem de tokens.css
src/scripts/      core/ (ambiente, scroll, âncoras, tokens) · motion/ (primitivas) · ui/ · scenes/ (palcos)
src/vendor/       gsap, ScrollTrigger, CustomEase, lenis (arquivos únicos, minificados)
public/           fontes servidas (Newsreader instanciada, Inter — OFL), favicon, /media (fotos e vídeo finais)
assets-src/       originais que não vão para o ar (fontes variáveis completas)
```

## Conteúdo

| O quê | Onde |
| --- | --- |
| Textos da Home (títulos em linhas autorais) | `src/content/home.mjs` |
| Formação / trajetória | `src/content/trajectory.mjs` |
| Áreas de atuação (Home + páginas) | `src/content/areas.mjs` |
| Artigos | `src/content/articles.mjs` |
| Contato, CRM/RQE, navegação, agendamento | `src/content/site.mjs` |
| Link da bio (três destinos + acessos secundários) | `src/content/bio.mjs` |
| Fotos e vídeo (manifesto + briefing de captação) | `src/content/media.mjs` |

Títulos são **arrays de linhas**: cada item é uma linha tipográfica (quebra editorial controlada e unidade do reveal). Os tamanhos de título foram medidos para que cada linha caiba inteira em 1280–1920 px — ao trocar um texto por outro muito mais longo, prefira dividir em mais linhas.

## Placeholders e dados a confirmar

O build lista no terminal todo placeholder factual ainda não substituído (`ph('…')` no código; no site aparecem entre colchetes, sublinhados em tracejado). **Nada foi inventado.** Pendências:

**Precisam de confirmação oficial antes de publicar**
- CRM/GO 10224 · RQE 5073 (Cardiologia) · RQE 9036 (Eletrofisiologia) — fonte: perfil público (RR-02, *regulatory-research-execution.md*), **não verificados no CFM/CRM-GO**. `site.registry.verified = false`.
- Formação — informada pelo próprio Dr. Vinicius (*initial-evidence-audit.md*): Medicina (Petrópolis), Clínica Médica (HCPM-RJ), Cardiologia/Eletrofisiologia (INC), fellowship (Hospital Clínic, Barcelona). Faltam nomes completos das instituições e anos (`trajectory.mjs → confirm`).

**Não existem nas fontes**
- WhatsApp, telefone, e-mail, canal/URL de agendamento (os CTAs levam a `#contato` enquanto isso).
- Endereço, acesso e horários da Vivenza; o mapa só é inserido após o endereço (`home.mjs → vivenza.address.mapsQuery`).
- Domínio final (`site.url`), texto da Política de Privacidade (LGPD), biografia editorial da página /trajetoria/.
- Vídeo do hero e vídeo vertical do /bio/ (nenhum vídeo foi fornecido até agora).
- Fotos: 6 dos 12 slots do site já usam o acervo real fornecido (ver "Fotografia e vídeo" abaixo); os demais 6 slots de imagem seguem como placeholder — nenhuma foto do acervo servia sem forçar (Hero/"escuta", "Próximo passo", Pausa Editorial, as três Áreas de Atuação).

**Revisão clínica**
- `areas.mjs → situations` e os 4 artigos (`placeholder: true`) são textos demonstrativos, escritos sem claims de resultado. Devem ser revisados/substituídos pelo Dr. Vinicius.
- A seção "Como cuidamos" descreve o percurso *profundidade → interpretação → explicação → orientação → próximo passo* como forma de cuidar — **não** como método proprietário (a Plataforma de Marca registra a Diferenciação como direção estratégica, com prontidão para alegação externa = NÃO PRONTA). Manter essa linguagem.

## Fotografia e vídeo

Cada entrada de `src/content/media.mjs` é também um **briefing de captação** (Presença Editorial). Enquanto `ready: false`, o site exibe uma "cena" tonal com direção de luz e o briefing — layout, recortes e motion já funcionam com ela.

**Acervo real (auditoria 2026-09-26).** 12 masters fornecidos ficam em `assets-src/photos/masters/` (não versionado, só leitura — nunca editar os originais). 6 slots foram resolvidos com esse acervo: `careDepth`, `careInterpretation`, `careExplanation`, `portrait`, `vivenza`, `closing` — os comentários acima de cada entrada em `media.mjs` documentam o master de origem e o raciocínio do recorte. Os outros 6 slots de imagem permanecem `ready: false` porque nenhuma foto do acervo os resolvia sem forçar (ver comentários `FALTANTE (D)` no mesmo arquivo). Script de geração dos derivados (crop + resize + AVIF/JPEG) não faz parte do repositório — refazer manualmente com Pillow (`crop → resize LANCZOS → UnsharpMask leve → save`) se for preciso reprocessar.

Para publicar uma imagem: gerar as larguras de `widths` em `.avif` e `.jpg` (ex.: `retrato-escuta-960.avif`), salvar em `public/media/`, preencher `ready: true`, `width`, `height`.

Vídeos (`kind: 'video'`): `<file>-desktop.webm|mp4`, `<file>-mobile.webm|mp4` e o pôster em `<file>-poster-<largura>.avif|jpg` (larguras em `posterWidths`). O pôster é uma imagem responsiva real — é ele que pinta primeiro e conta como LCP; o vídeo só é baixado depois do carregamento, em tempo ocioso, e só aparece por cima quando está tocando (erro de carga → fica o pôster).

- Hero do site: 1920×1080 (≤ 6 MB) / 1080×1350 (≤ 3 MB). **Médico no terço direito do quadro** — é onde o recorte ancora na transição para a Autoridade Próxima.
- /bio/: vertical 9:16, 6–10 s, ≤ 2 MB, loop sem corte perceptível, sem áudio — **é o ambiente inteiro da tela** (full-bleed), não um recorte. **Enquadrar o Dr. Vinicius no quadrante superior direito** (mobile) a **centro-direita** (desktop) — a metade/terço inferior precisa ficar relativamente limpo para a pergunta e as três ações; ver `--bio-focal` abaixo. Precisa ser bonito também congelado no pôster.

## /bio/ — link da bio do Instagram

**Função: direcionar, não convencer.** Quem chega do Instagram já tem intenção; a /bio/ é a interface entre essa intenção e a ação. Descoberta é papel do site (a Home, a trajetória, as áreas, os conteúdos) — nada disso se repete aqui.

`PRESENÇA → IDENTIFICAÇÃO → AÇÃO`

- **Uma tela imersiva única**, sem narrativa de scroll: o vídeo vertical é o ambiente inteiro (full-bleed, `position:fixed; inset:0`), não um recorte ao lado da interface. Nome, especialidades, a pergunta *"Como posso ajudar?"* e os três destinos ficam desenhados sobre o filme — nunca dentro de uma caixa opaca. Um véu cinematográfico (gradiente, não painel) garante contraste: mais denso no topo e na base, quase ausente no centro, onde o rosto respira. Testado de 320×568 a 2560×1080 (ultrawide) — as três ações sempre visíveis sem esforço, sem scroll.
- **Enquadramento configurável:** `--bio-focal` (custom property, `src/styles/bio/bio.css`) controla o `object-position` do vídeo/pôster por breakpoint — hoje `74% 26%` no mobile (quadrante superior direito), `64% 32%` no desktop, `60% 34%` em telas ≥ 1440px. Ajustar esses três valores é o único passo para reposicionar a figura quando o vídeo real chegar.
- **Hierarquia:** *Agendar uma consulta* é um BLOCO azul opaco (no Brandbook, o bloco "cria prioridade") — o único elemento que não depende do véu para ter contraste; *Como chegar* e *Acessar o site* são destinos tipográficos direto sobre o filme. Sem lista de acessos secundários (WhatsApp/Telefone/Instagram foram removidos — o WhatsApp já está representado pela ação principal quando for o canal; Instagram não precisa existir como destino, a pessoa acabou de vir de lá).
- **Destinos derivados dos dados reais** (`content/bio.mjs`): consulta = link de agendamento, senão WhatsApp (nunca os dois como ação principal); como chegar = Google Maps quando houver `mapsQuery`. Sem o dado, o destino leva à seção correspondente do site, mostra o placeholder e recebe `data-pending`.
- **Toque = decisão.** A intenção (toque, hover ou foco de teclado) marca `[data-intent]`: a Linha de Orientação — que em repouso aponta a consulta — se redireciona até o destino; os outros cedem contraste; o filme muda levemente de enquadramento e uma legenda diz para onde você vai ("VIVENZA", "CANAL OFICIAL", "SITE COMPLETO"). Toque com 40 ms de espera (não pisca se o gesto virar scroll); a navegação nunca espera. Voltando do app (bfcache), a página reabre em repouso.
- **Vídeo = atmosfera, não narrativa:** fotografia viva em tela cheia; se removido, a página perde boa parte da personalidade (é a atmosfera inteira) — mas se falhar, o pôster sustenta toda a composição sozinho (mesmo pipeline do site: pôster primeiro, carga adiada, Save-Data/2G/3G/movimento reduzido → pôster + "Reproduzir", erro → pôster).
- **Rodapé mínimo:** registro profissional (CRM/RQE, mesmo dado público já usado no resto do site) + "© ano Dr. Vinicius Marques Rodrigues. Todos os direitos reservados."
- **Chegada:** o filme assenta e a linha desce do nome até a ação principal (≈ 1 s) sem esconder nada — tudo legível e clicável desde o primeiro quadro. O bloco de decisão é ancorado à base via `position:absolute` (não `margin-top:auto` num flex) — deliberado: manter a posição imune a qualquer variação de altura do cabeçalho (ex.: troca de fonte fallback→Newsreader) evita CLS.
- **Técnica:** sem bibliotecas; CSS do bundle `bio.css` (tokens, base, assinatura, núcleo de mídia) inline; ~3 kB de JS gzip.

**Safe areas.** O vídeo sangra deliberadamente sob as safe areas (`env(safe-area-inset-*)`) — faz parte da imersão. Só o *conteúdo* (cabeçalho, pergunta, ações, rodapé, botão de pausa) respeita a safe area, via padding em `.bio-main`. Na gravação: o enquadramento em si não precisa reservar margem para notch/home-indicator — só a composição do sujeito dentro do quadro (ver `--bio-focal` acima).

**Instrumentação (pronta, nada instalado).** `data-dest`: `consultation · location · website` (a assinatura, no topo, também emite `website` com `data-dest-at="brand"`). `data-dest-at`: `actions`, `brand`. Cada clique emite `document → CustomEvent('dv:navigate', { detail: { dest, at, href, label, pending } })` e chama `window.dvTrack(detail)` se existir.

**Pendências específicas do /bio/:** canal de agendamento/WhatsApp, endereço (e `mapsQuery`), telefone, URL do Instagram, vídeo vertical e pôster.

## Fontes

Newsreader é servida instanciada a partir dos originais variáveis em `assets-src/fonts/` (fontTools `instancer`): estilo normal fixo no peso **500** — o único usado no sistema — mantendo o eixo óptico (59 kB em vez de 129 kB); itálico com pesos 400–500. Se o sistema passar a usar outro peso (ex.: 600, também prioritário no Brandbook), gerar nova instância a partir dos originais e ajustar o `@font-face` em `tokens.css`.

## Sistema de movimento

Regra: toda animação orienta, revela hierarquia, conecta ideias, mostra progressão ou responde à interação. Nada decorativo.

- **Tokens**: curvas e durações vivem em `tokens.css` (`--ease-orient`, `--ease-inout`, `--ease-calm`, `--dur-1…5`); o JS lê do CSS e registra as mesmas curvas no GSAP.
- **Primitivas** (`motion/reveal.js`, uma implementação para o site todo): `data-reveal="fade|lines|line|row|media"` e `data-line="draw"`.
- **Palcos** (`scenes/`): Hero → Autoridade, Como cuidamos, Pausa. Ativos só com `html.stage` (≥ 1024 × 560, movimento permitido), aplicado já na primeira pintura (sem salto de layout). Distâncias de scroll em `--ha-dist`, `--care-dist`, `--pause-dist` (CSS).
- **Fluxo** (mobile/telas baixas): scroll natural, sem palcos presos; cada seção tem reinterpretação própria (percurso vertical, etapas com linha contínua, acordeão por toque).
- **Movimento reduzido**: layout estático completo, nenhum conteúdo oculto; vídeo não carrega (fica o pôster) e pode ser iniciado pelo botão.

**Linha de Orientação** — reaparece com funções diferentes, nunca atravessando a página inteira:
indicador de scroll do hero → trilho do percurso Conhecimento → Direção → progresso de "Como cuidamos" → linhas da trajetória → linha ativa das áreas → marcador das perguntas → réguas de conteúdo e Vivenza → "L" que desce e aponta o CTA final → régua do rodapé com retorno ao início. No header: sublinhado do capítulo atual.

## Qualidade (QA realizado)

- axe-core (WCAG 2.0/2.1/2.2 A/AA + boas práticas): **0 violações** em todos os tipos de página, desktop e mobile.
- CLS ≈ 0,0004; LCP ≈ 0,5–1,3 s (servidor local, rede simulada).
- /bio/: axe 0 violações (320, 390 e 1440 px); CLS ≤ 0,0007; LCP ≈ 0,25–0,3 s; ~130 kB antes da mídia (HTML 20 kB gzip com CSS inline, JS 3 kB, fontes 106 kB); vídeo testado com arquivo sintético (carga adiada, movimento reduzido, Save-Data, 404 → pôster); intenção verificada por toque emulado, hover e teclado.
- Viewports testados: 390×844, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080; movimento reduzido; navegação por teclado (foco dentro dos palcos leva à etapa correspondente); menu com foco preso, ESC e fundo inerte.

## Publicação

`/dist` é estático: qualquer hospedagem (Netlify, Vercel, Cloudflare Pages, S3). Configurar `404.html` como página de erro. Servir com gzip/brotli e cache longo para `/fonts` e `/media`.

## Licenças

GSAP (licença "Standard no-charge", gsap.com/standard-license) · Lenis (MIT) · Newsreader e Inter (SIL OFL, ver `public/fonts/`). Assinatura: paths originais de `02_BRAND-ASSETS/wordmark.svg`, sem alteração; a configuração horizontal reproduz a página "Uma assinatura. Diferentes contextos." do Brandbook.
