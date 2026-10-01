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
 */

export const media = {
  heroVideo: {
    kind: 'video',
    ready: false,
    file: 'hero', // hero-desktop.mp4/.webm (1920×1080, ≤ 6 MB), hero-mobile.mp4/.webm (1080×1350, ≤ 3 MB), hero-poster-720/1080.avif|jpg
    posterWidths: [720, 1080],
    variant: 'hero',
    alt: 'Dr. Vinicius em atendimento, em um ambiente de luz natural.',
    brief:
      'Vídeo · plano contínuo, 12–20 s em loop · Dr. Vinicius trabalhando (análise de exame, escrita, conversa) · luz natural lateral · câmera estável e lenta · médico no terço DIREITO do quadro (o recorte do scroll ancora à direita).',
  },
  /* /bio/ — presença: fotografia viva num recorte vertical. Não sustenta
     narrativa; a ação acontece ao lado. Precisa funcionar congelada no pôster. */
  bioVideo: {
    kind: 'video',
    ready: false,
    file: 'bio', // bio-mobile|desktop.webm/.mp4 (1080×1920, 6–10 s, ≤ 2 MB) + bio-poster-720/1080.avif|jpg
    variant: 'bio',
    posterWidths: [720, 1080],
    width: 1080,
    height: 1920,
    alt: '',
    brief:
      '9:16 · 6–10 s em loop · sem áudio · Dr. Vinicius em situação real, sem olhar para a câmera · movimento mínimo · luz natural · figura ao centro-direita · elegante também como foto (pôster).',
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
     novo (mesma ideia: mãos + caneta + bordado do jaleco), agora com par
     mobile/desktop real em vez de um único crop reaproveitado. */
  careDepth: {
    kind: 'image',
    ready: true,
    file: 'care-depth-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 960,
    mobile: { file: 'care-depth-mobile', widths: [640, 960, 1122] },
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
    height: 864,
    variant: 'desk',
    alt: 'Dr. Vinicius concentrado, trabalhando no computador.',
  },
  /* ATUALIZADO (2026-10-01) — substitui o master DSC04954 pelo acervo
     novo (mesma ideia: explicação com modelo anatômico, paciente fora de
     foco). Só há uma versão (sem par mobile dedicado) — crop único
     reaproveitado via object-fit:cover, como antes. Tier de 1400 px
     upscala 1,25× (fonte nativa permite nitidez até ~1120 px no recorte
     16:10); aceitável, consistente com a tolerância já usada no projeto. */
  careExplanation: {
    kind: 'image',
    ready: true,
    file: 'care-explanation',
    widths: [640, 960, 1400],
    width: 1400,
    height: 875,
    variant: 'conversation',
    alt: 'Dr. Vinicius explicando algo a um paciente, com um modelo anatômico do coração.',
  },
  /* ATUALIZADO (2026-10-01) — substitui "proximo passo.jpg" (crop fechado
     a 1,9× do master antigo, upscale 1,52×) pelo acervo novo: corredor
     central da Vivenza com DUAS bancadas de recepção enquadrando a linha
     de fuga até a sala de espera ao fundo — a mesma ideia de "caminho/
     direção/próximo passo", agora em alta resolução nativa (zero upscale,
     fonte 1536 px) e com perspectiva mais clara que o crop antigo. */
  careDirection: {
    kind: 'image',
    ready: true,
    file: 'care-next-step',
    widths: [640, 960],
    width: 960,
    height: 600,
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
    height: 960,
    variant: 'listening',
    alt: 'Dr. Vinicius ouvindo um paciente durante a consulta.',
  },
  /* APROVEITÁVEL (B) — master DSCF5469.jpg (sessão Louvre, casaco/óculos
     escuros, mãos nos bolsos — sem "braços cruzados", diretriz do Brandbook).
     Perfil três-quartos, não olha para a câmera, luz natural, arquitetura
     serena. Limitação real: óculos escondem os olhos — considerar produção
     de um retrato sem óculos antes de tratar como definitivo. */
  portrait: {
    kind: 'image',
    ready: true,
    file: 'retrato-editorial',
    widths: [640, 960, 1400, 1800],
    width: 1800,
    height: 2250,
    variant: 'portrait',
    alt: 'Retrato editorial do Dr. Vinicius Marques Rodrigues.',
    brief: 'Retrato editorial vertical 4:5 · presença tranquila · pode olhar para a câmera · sem braços cruzados, sem estetoscópio como adereço.',
  },
  /* RESOLVIDO (2026-10-01) — "Homem Elegante em Pátio Clássico.png"
     (sessão Louvre/Paris, mesmo figurino do `portrait`, mas plano aberto
     diferente): pátio monumental com grande espaço negativo à esquerda,
     Dr. Vinicius pequeno no quadro, postura natural encostado num poste
     — cumpre os critérios que DSCF5237/DSCF5177/"ambiente acolhedor"
     não cumpriam (ver histórico abaixo no commit anterior).

     MOBILE PROVISÓRIO: o cliente pediu "DSCF5521.jpg" como original
     vertical para o mobile, mas esse arquivo não existe em nenhum lugar
     do projeto (busca completa feita em 2026-10-01). Enquanto não for
     fornecido, `mobile` usa um recorte vertical (4:5) desta MESMA foto
     — não é a arte-dirigida real que foi pedida, apenas um crop
     provisório para não deixar a seção sem imagem nenhuma no mobile.
     Trocar por um `file` próprio assim que DSCF5521.jpg existir. */
  pause: {
    kind: 'image',
    ready: true,
    file: 'pause-editorial-desktop',
    widths: [960, 1672],
    width: 1672,
    height: 940,
    mobile: { file: 'pause-editorial-mobile', widths: [640, 941] },
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
  /* RESOLVIDO (2026-10-01) — acervo novo. Crop largo (21:9) a partir de
     uma cena horizontal real; evita deliberadamente ECG/monitor (pedido
     explícito do briefing editorial: capa de prevenção, não de tecnologia
     médica) — por isso não reaproveita area-arritmias/area-eletrofisiologia. */
  articleInfartoJovens: {
    kind: 'image',
    ready: true,
    file: 'content-infarto-jovens',
    widths: [640, 960, 1400],
    width: 1400,
    height: 600,
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
    height: 768,
    mobile: { file: 'vivenza-recepcao-mobile', widths: [640, 960, 1122] },
    variant: 'architecture',
    alt: 'Recepção da Vivenza, com marcenaria em madeira e mármore.',
  },
  /* ATUALIZADO (2026-10-01) — correção pontual: o desktop estava usando o
     recorte derivado da foto vertical do letreiro (941 px nativo, ainda
     retrato na fonte). Cliente forneceu uma foto nativamente horizontal
     da mesma sinalização (logo + mármore) especificamente para o
     desktop — `mobile` mantém o recorte antigo (derivado da vertical,
     já aprovado para esse uso), `file` (desktop) passa a apontar para a
     nova fonte horizontal, zero upscale (nativa 1448 px). */
  closing: {
    kind: 'image',
    ready: true,
    file: 'vivenza-signage-desktop',
    widths: [960, 1448],
    width: 1448,
    height: 814,
    mobile: { file: 'vivenza-signage-mobile', widths: [640, 941] },
    variant: 'closing',
    alt: '',
  },
};
