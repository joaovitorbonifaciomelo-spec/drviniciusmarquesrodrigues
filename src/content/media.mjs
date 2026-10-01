/**
 * Manifesto de mídia.
 *
 * Cada entrada descreve UMA imagem/vídeo do site e funciona também como
 * briefing de captação (direção: Presença Editorial — Brandbook).
 *
 * Para substituir um placeholder:
 *   1. salve os arquivos em /public/media/ seguindo `file` (sem extensão);
 *   2. gere as larguras listadas em `widths` nos formatos .avif e .jpg
 *      (ex.: retrato-escuta-800.avif, retrato-escuta-800.jpg);
 *   3. preencha `ready: true` e `width`/`height` do arquivo original.
 *
 * Enquanto `ready` for false, o site mostra uma "cena" tonal com o
 * briefing — o layout, o recorte e o motion já funcionam com ela.
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
  /* RESOLVIDO (2026-10-01) — acervo novo fornecido pelo cliente. Par
     mobile/desktop real (duas fotos distintas da mesma cena, não o mesmo
     crop redimensionado): mobile usa o enquadramento vertical já quase
     4:5 nativo; desktop usa o plano horizontal, que é o que a cena
     hero→autoridade realmente recorta dinamicamente via clip-path no
     palco (scenes/hero-authority.js). Olhar no paciente, não na câmera —
     resolve a limitação do acervo anterior (DSC04880/escuta.jpg, sempre
     olhando pra lente). */
  listening: {
    kind: 'image',
    ready: true,
    file: 'authority-listening-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 960,
    mobile: { file: 'authority-listening-mobile', widths: [640, 960, 1122] },
    variant: 'listening',
    alt: 'Dr. Vinicius ouvindo um paciente durante a consulta.',
  },
  /* ATUALIZADO (2026-10-01) — substitui o master DSC04925 pelo acervo
     novo (mesma ideia: mãos + caneta + bordado do jaleco), agora com par
     mobile/desktop real em vez de um único crop reaproveitado. */
  careDepth: {
    kind: 'image',
    ready: true,
    file: 'care-profundidade-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 960,
    mobile: { file: 'care-profundidade-mobile', widths: [640, 960, 1122] },
    variant: 'exam',
    alt: 'Mãos do Dr. Vinicius escrevendo, com o bordado do jaleco visível.',
  },
  /* RESOLVIDO — master DSC04796.jpg. Perfil junto à janela, luz natural,
     olhar para fora (concentração/interpretação). Recorte 4:5 único uso
     (esta etapa não aparece no mobile). */
  careInterpretation: {
    kind: 'image',
    ready: true,
    file: 'cuidado-interpretacao',
    widths: [640, 960, 1400],
    width: 1400,
    height: 1750,
    variant: 'desk',
    alt: 'Dr. Vinicius concentrado, olhando pela janela do consultório.',
    brief: 'Perfil · concentração · mesa de trabalho · luz de janela.',
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
    file: 'care-explicacao',
    widths: [640, 960, 1400],
    width: 1400,
    height: 875,
    variant: 'conversation',
    alt: 'Dr. Vinicius explicando algo a um paciente, com um modelo anatômico do coração.',
  },
  /* APROVEITÁVEL COM RESSALVA (B) — reauditado em 2026-09-26, master
     "proximo passo.jpg" (sala de espera/corredor da Vivenza — mesma
     fonte que já usamos para "vivenza", ali chamada 01.jpg; imagens
     diferentes, mesma sessão/local). Cadeiras + porta + luz de janela dão
     a linha de fuga do briefing. Precisou de recorte fechado (zoom ~1,9×)
     para excluir a bancada de recepção com a marca Vivenza — do
     contrário duplicava o slot "vivenza" e confundia a leitura. Fonte
     nativa de 1200 px já é pequena; depois desse recorte o crop real tem
     só 631 px de largura → o tier de 960 já upscala 1,52×. `widths`
     reduzido a [640,960] (sem 1400, que exigiria 2,2×). Serve para o
     tamanho em que aparece (painel "Como cuidamos", não hero), mas é
     candidato a nova captura em alta resolução do mesmo ângulo. */
  careDirection: {
    kind: 'image',
    ready: true,
    file: 'cuidado-direcao',
    widths: [640, 960],
    width: 960,
    height: 600,
    variant: 'corridor',
    alt: 'Corredor da Vivenza com cadeiras de espera, porta e luz natural.',
    brief: 'Espaço · corredor/porta com luz natural · composição com linha de fuga clara.',
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
  /* RESOLVIDO (2026-10-01) — acervo novo. Par mobile/desktop real (cenas
     distintas, não o mesmo crop): médico sozinho, janela/skyline, muita
     respiração visual — o "momento de silêncio" que o placeholder antigo
     nunca teve (o único candidato disponível antes, pausa editorial.jpg,
     era um retrato posado turístico sem relação com a cena; ver histórico
     de auditoria abaixo). */
  pause: {
    kind: 'image',
    ready: true,
    file: 'pause-desktop',
    widths: [960, 1536],
    width: 1536,
    height: 864,
    mobile: { file: 'pause-mobile', widths: [640, 960, 1122] },
    variant: 'pause',
    alt: 'Dr. Vinicius em silêncio, trabalhando junto à janela com vista para a cidade.',
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
    file: 'artigo-infarto-jovens',
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
  /* APROVEITÁVEL (B) — master "vivenza.jpg" no acervo (detalhe da
     sinalização Vivenza: madeira, mármore e latão — reconfirmado em
     2026-09-26 que é o mesmo arquivo, apenas renomeado). O arquivo
     original tem uma marca d'água translúcida sobreposta (padrão
     repetido) cobrindo ~40% do quadro à esquerda — o recorte usado evita
     inteiramente essa área. Testado também nos formatos reais do slot
     "vivenza" (5:4/4:3): é um bom detalhe, mas não substitui 01.jpg como
     arquitetura/recepção — mantido só aqui, como textura decorativa de
     baixa opacidade. `widths` reduzido de [1600,2400] para [1200,1600]
     pela resolução nativa do recorte. */
  closing: {
    kind: 'image',
    ready: true,
    file: 'encerramento-textura',
    widths: [1200, 1600],
    width: 1600,
    height: 900,
    variant: 'closing',
    alt: '',
    brief: 'Textura fotográfica sutil (luz em parede) para o fundo do encerramento — usada a ~10% de opacidade.',
  },
};
