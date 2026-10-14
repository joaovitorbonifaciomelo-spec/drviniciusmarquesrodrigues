/**
 * Manifesto de mídia.
 *
 * Cada entrada descreve UMA imagem/vídeo do site e funciona também como
 * briefing de captação (direção: Presença Editorial — Brandbook).
 *
 * Para substituir um placeholder:
 *   1. salve o master em assets-src/photos/masters/<categoria>/ (não
 *      versionado — ver .gitignore) e os derivados em /public/media/
 *      seguindo `file` (sem extensão);
 *   2. gere as larguras listadas em `widths` nos formatos .avif e .jpg
 *      (ex.: retrato-escuta-800.avif, retrato-escuta-800.jpg);
 *   3. preencha `ready: true` e `width`/`height` do arquivo original.
 *
 * Enquanto `ready` for false, o site mostra uma "cena" tonal com o
 * briefing — o layout, o recorte e o motion já funcionam com ela.
 *
 * Organização dos masters (reorganizado em 2026-10-01 — ver memória do
 * projeto / histórico de commits para o inventário completo):
 *   assets-src/photos/
 *     masters/authority/  → listening
 *     masters/care/       → careDepth, careInterpretation, careExplanation,
 *                            careDirection, careOrientation
 *     masters/areas/      → areaCardiology, areaArrhythmia, areaEp
 *     masters/content/    → articleInfartoJovens
 *     masters/vivenza/    → vivenza, closing (sinalização)
 *     masters/trajectory/ → portrait
 *     masters/editorial/  → pause (sessão Louvre/Paris)
 *     legacy/             → masters reais já substituídos (preservados)
 *     archive/             → candidatos avaliados e não usados (preservados)
 *   assets-src/videos/    → heroVideo (hero-desktop, hero-mobile), bioVideo (bio)
 */

export const media = {
  /* VÍDEOS REAIS (2026-10-14) — montagens editadas entregues pelo cliente
     (masters em assets-src/videos/: hero-desktop.mp4, hero-mobile.mp4,
     bio.mp4). Derivados em /public/media com qualidade visualmente
     idêntica ao master (pedido do cliente — a 1ª versão, CRF 40, alisava
     pele e tecidos): mesma resolução e mesma taxa de quadros do original
     (o hero mobile é 60 fps), sem áudio, cor BT.709 marcada:
     <file>.webm (VP9, 2 passes, CRF 28) + <file>.mp4 (H.264 High@4.2,
     CRF 19, tune film — fallback do Safari).
     + <file>-lite.mp4 (720p, 30 fps, H.264 High@3.1, CRF 22): versão leve
     para PC antigo/rede lenta — scripts/ui/video.js decide qual usar.
     `fps` (e width/height) alimentam essa decisão (Media Capabilities).
     Pôster = quadro 0 do próprio vídeo (a troca pôster→vídeo acontece
     quando ele começa a tocar, do quadro 0 — qualquer outro quadro daria
     um salto na troca). Vídeo com `mobile` = recorte diferente para tela
     em pé (fonte e pôster próprios, mesma media query nos dois — ver
     components/media.mjs); sem `mobile` = uma fonte só para tudo. */
  heroVideo: {
    kind: 'video',
    ready: true,
    file: 'hero-desktop', // 26,8 s
    posterWidths: [960, 1920],
    width: 1920,
    height: 1080,
    fps: 30,
    mobile: { file: 'hero-mobile', posterWidths: [720, 1080], width: 1080, height: 1920, fps: 60 }, // 8,3 s
    variant: 'hero',
    alt: 'Dr. Vinicius em atendimento, em um ambiente de luz natural.',
  },
  /* /bio/ — presença: o vídeo é o ambiente inteiro do cartão vertical (em
     pé em qualquer tela, inclusive no desktop), então uma fonte só. */
  bioVideo: {
    kind: 'video',
    ready: true,
    file: 'bio', // 18,5 s
    variant: 'bio',
    posterWidths: [720, 1080],
    width: 1080,
    height: 1920,
    fps: 30,
    alt: '',
  },
  /* ATUALIZADO (2026-10-01) — desacoplado de `careOrientation` (abaixo):
     até aqui os dois compartilhavam esta mesma referência, então
     "Autoridade Próxima" e "Como cuidamos → Orientação" sempre mostravam
     a mesma foto por acidente de arquitetura, não por escolha. Correção
     pontual do cliente: `listening` (Autoridade Próxima, hero→autoridade)
     passa a usar exclusivamente "Consulta Médica Acolhedora no
     Consultório.png" — arquivo único, sem par desktop (a cena hero→
     autoridade recorta essa mesma imagem dinamicamente via clip-path no
     palco desktop; ver scenes/hero-authority.js). O par antigo
     (authority-listening-desktop) continua existindo só em
     `careOrientation`, com asset próprio e independente. */
  listening: {
    kind: 'image',
    ready: true,
    file: 'authority-listening-mobile',
    widths: [640, 960, 1122],
    width: 1122,
    height: 1402,
    variant: 'listening',
    alt: 'Dr. Vinicius ouvindo um paciente durante a consulta.',
  },
  /* ATUALIZADO (2026-10-01) — substitui o master DSC04925 pelo acervo
     novo (mesma ideia: mãos + caneta + bordado do jaleco).
     CORRIGIDO (2026-10-01, 2ª vez) — correção pontual do cliente: a foto
     designada "desktop" (plano mais aberto) foi trocada pela mesma foto
     já usada no mobile (plano mais fechado, bordado "Vinicius M.
     Rodrigues" nítido) — arquivo único em todos os breakpoints agora,
     sem par mobile/desktop distinto nesta etapa. */
  careDepth: {
    kind: 'image',
    ready: true,
    file: 'care-depth-mobile',
    widths: [640, 960, 1122],
    width: 1122,
    height: 1402,
    variant: 'exam',
    alt: 'Mãos do Dr. Vinicius escrevendo, com o bordado do jaleco visível.',
  },
  /* ATUALIZADO (2026-10-01) — substitui DSC04796 pela cena de computador/
     escritório do acervo novo (movida da Pausa Editorial, por decisão
     explícita: representa melhor análise/interpretação/concentração do
     que silêncio/respiro — ver `pause` abaixo). Sem par mobile aqui: esta
     etapa já não aparece no mobile (regra existente de care.js, nada
     mudou nisso), então só o crop desktop é usado. */
  careInterpretation: {
    kind: 'image',
    ready: true,
    file: 'care-interpretation-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 1024,
    variant: 'desk',
    alt: 'Dr. Vinicius concentrado, trabalhando no computador.',
  },
  /* ATUALIZADO (2026-10-01) — substitui o master DSC04954 pelo acervo
     novo (mesma ideia: explicação com modelo anatômico, paciente fora de
     foco). Só há uma versão (sem par mobile dedicado). CORRIGIDO
     (2026-10-01, correção global de proporção): sem crop — a fonte nativa
     é vertical (4:5, 1122×1402); o tier máximo passa a ser 1122 px (zero
     upscale) em vez do antigo 1400 px cropado para 16:10. */
  careExplanation: {
    kind: 'image',
    ready: true,
    file: 'care-explanation',
    widths: [640, 960, 1122],
    width: 1122,
    height: 1402,
    variant: 'conversation',
    alt: 'Dr. Vinicius explicando algo a um paciente, com um modelo anatômico do coração.',
  },
  /* ATUALIZADO (2026-10-01) — substitui "proximo passo.jpg" (crop fechado
     a 1,9× do master antigo, upscale 1,52×) pelo acervo novo: corredor
     central da Vivenza com DUAS bancadas de recepção enquadrando a linha
     de fuga até a sala de espera ao fundo — a mesma ideia de "caminho/
     direção/próximo passo".
     CORRIGIDO (2026-10-01, 2ª vez) — correção pontual do cliente: a foto
     designada "desktop" não era a correta — a foto certa é a mesma já
     usada no mobile (captura vertical do corredor). Arquivo único em
     todos os breakpoints agora, sem par mobile/desktop distinto. */
  careDirection: {
    kind: 'image',
    ready: true,
    file: 'care-next-step-mobile',
    widths: [640, 960, 1122],
    width: 1122,
    height: 1402,
    variant: 'corridor',
    alt: 'Corredor da Vivenza com bancadas de recepção e sala de espera ao fundo.',
  },
  /* NOVO (2026-10-01) — desacoplado de `listening` (ver comentário lá em
     cima): esta etapa ("Orientação para a decisão") tem agora seu próprio
     asset, independente da Autoridade Próxima. Usa o plano horizontal do
     mesmo par fornecido pelo cliente — esta etapa não aparece no mobile
     (regra existente de care.js), então não precisa de variante vertical. */
  careOrientation: {
    kind: 'image',
    ready: true,
    file: 'care-orientation',
    widths: [960, 1536],
    width: 1536,
    height: 1024,
    variant: 'listening',
    alt: 'Dr. Vinicius ouvindo um paciente durante a consulta.',
  },
  /* APROVEITÁVEL (B) — master DSCF5469.jpg (sessão Louvre, casaco/óculos
     escuros, mãos nos bolsos — sem "braços cruzados", diretriz do Brandbook).
     Perfil três-quartos, não olha para a câmera, luz natural, arquitetura
     serena. Limitação real: óculos escondem os olhos — considerar produção
     de um retrato sem óculos antes de tratar como definitivo.
     CORRIGIDO (2026-10-01, correção global de proporção): sem crop 4:5 —
     a fonte nativa é 2:3 (5117×7676, master renomeado para
     trajectory-portrait.jpg na reorganização de pastas), mostrada na
     proporção real. */
  portrait: {
    kind: 'image',
    ready: true,
    file: 'trajectory-portrait',
    widths: [640, 960, 1400, 1800],
    width: 1800,
    height: 2700,
    variant: 'portrait',
    alt: 'Retrato editorial do Dr. Vinicius Marques Rodrigues.',
    brief: 'Retrato editorial vertical 2:3 · presença tranquila · pode olhar para a câmera · sem braços cruzados, sem estetoscópio como adereço.',
  },
  /* RESOLVIDO (2026-10-01) — par mobile/desktop real da sessão
     Louvre/Paris (mesmo figurino do `portrait`, plano aberto diferente):
     pátio monumental com grande espaço negativo, Dr. Vinicius pequeno no
     quadro, postura natural encostado num poste — cumpre os critérios
     que DSCF5237/DSCF5177/"ambiente acolhedor" não cumpriam (ver
     histórico em commits anteriores). Desktop = plano horizontal
     (pause-editorial-desktop, nativo 1672×941 ≈ 16:9 — a diferença para
     1672×940 é <0,1%, não é um crop real); mobile = DSCF5521.jpg, o mesmo
     instante capturado verticalmente (nativo 1365×2047 ≈ 2:3, NÃO 4:5) —
     arte-dirigida real, zero upscale em ambos. */
  pause: {
    kind: 'image',
    ready: true,
    file: 'pause-editorial-desktop',
    widths: [960, 1672],
    width: 1672,
    height: 941,
    mobile: { file: 'pause-editorial-mobile', widths: [640, 960, 1365], width: 1365, height: 2047 },
    variant: 'pause',
    alt: 'Dr. Vinicius em silêncio, em um pátio monumental com grande área de espaço negativo.',
  },
  /* RESOLVIDO (2026-10-01) — acervo novo: uma cena própria para cada
     área, finalmente distinguindo visualmente cardiologia (modelo
     anatômico do coração), arritmias (ECG/monitor) e eletrofisiologia
     (mapeamento cardíaco 3D na tela) — o acervo antigo não tinha nenhuma
     cena que diferenciasse as três. */
  areaCardiology: {
    kind: 'image',
    ready: true,
    file: 'area-cardiologia',
    widths: [480, 800],
    width: 800,
    height: 1000,
    variant: 'desk',
    alt: 'Dr. Vinicius explicando um modelo anatômico do coração durante consulta.',
  },
  areaArrhythmia: {
    kind: 'image',
    ready: true,
    file: 'area-arritmias',
    widths: [480, 800],
    width: 800,
    height: 1000,
    variant: 'exam',
    alt: 'Dr. Vinicius analisando um traçado de ECG com o paciente.',
  },
  areaEp: {
    kind: 'image',
    ready: true,
    file: 'area-eletrofisiologia',
    widths: [480, 800],
    width: 800,
    height: 1000,
    variant: 'corridor',
    alt: 'Dr. Vinicius mostrando um mapeamento cardíaco em tela.',
  },
  /* RESOLVIDO (2026-10-01) — acervo novo: cena horizontal real; evita
     deliberadamente ECG/monitor (pedido explícito do briefing editorial:
     capa de prevenção, não de tecnologia médica) — por isso não reaproveita
     area-arritmias/area-eletrofisiologia. CORRIGIDO (2026-10-01, correção
     global de proporção): sem crop 21:9 — a fonte nativa é 3:2 (1536×1024),
     mostrada na proporção real. */
  articleInfartoJovens: {
    kind: 'image',
    ready: true,
    file: 'content-infarto-jovens',
    widths: [640, 960, 1536],
    width: 1536,
    height: 1024,
    variant: 'conversation',
    alt: 'Dr. Vinicius em consulta, com um modelo anatômico do coração.',
  },
  /* ATUALIZADO (2026-10-01) — acervo novo substitui 01.jpg (1200 px,
     upscale 1,33×): mesma recepção, resolução nativa maior (1536 px,
     zero upscale no tier usado) e melhor enquadramento — marca "Vivenza"
     no balcão legível, luminárias e marcenaria em evidência. Par
     mobile/desktop real. */
  vivenza: {
    kind: 'image',
    ready: true,
    file: 'vivenza-recepcao-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 1024,
    mobile: { file: 'vivenza-recepcao-mobile', widths: [640, 960, 1122], width: 1122, height: 1402 },
    variant: 'architecture',
    alt: 'Recepção da Vivenza, com marcenaria em madeira e mármore.',
  },
  /* ATUALIZADO (2026-10-01) — correção pontual: o desktop estava usando o
     recorte derivado da foto vertical do letreiro (941 px nativo, ainda
     retrato na fonte). Cliente forneceu uma foto nativamente horizontal
     da mesma sinalização (logo + mármore) especificamente para o
     desktop — `file` (desktop) passa a apontar para a nova fonte
     horizontal, zero upscale (nativa 1448 px).
     CORRIGIDO (2026-10-01, 2ª vez) — o derivado mobile ainda estava
     cropado a 16:9 (941×529) a partir do master vertical nativo
     (941×1672, 0,56:1) — um crop de ~70% da foto, que depois ainda
     sofria object-fit: cover de novo dentro do painel (igualmente
     vertical no mobile), resultando num "zoom" duplo e excessivo
     (reportado pelo cliente). Regenerado sem crop a partir do master
     vertical — o painel do Encerramento já é vertical no mobile, então
     a proporção nativa cabe bem melhor ali, com bem menos recorte
     residual do object-fit: cover. */
  closing: {
    kind: 'image',
    ready: true,
    file: 'vivenza-signage-desktop',
    widths: [960, 1448],
    width: 1448,
    height: 814,
    mobile: { file: 'vivenza-signage-mobile', widths: [640, 941], width: 941, height: 1672 },
    variant: 'closing',
    alt: '',
  },
};
