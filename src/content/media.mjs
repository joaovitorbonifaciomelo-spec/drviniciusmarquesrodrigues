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
  /* FALTANTE (D) — reauditado em 2026-09-26 (arquivo hoje chamado
     escuta.jpg no acervo; é o mesmo DSC04880 já testado — o nome do
     arquivo não muda o conteúdo). Testado de novo, com 3 recortes
     diferentes: em todos, o médico sorrindo direto para a câmera continua
     inequívoco — é um problema de POSE (olhar na lente, não no paciente),
     não de enquadramento. Nenhum recorte resolve isso. Mantido como
     placeholder até existir uma foto de escuta real (olhar no paciente). */
  listening: {
    kind: 'image',
    ready: false,
    file: 'retrato-escuta',
    widths: [640, 960, 1400],
    variant: 'listening',
    alt: 'Dr. Vinicius ouvindo com atenção durante uma conversa em consulta.',
    brief: 'Foto vertical 4:5 · escuta em consulta · perfil ou três-quartos · sem olhar para a câmera · luz lateral suave.',
  },
  /* RESOLVIDO — acervo real (auditoria 2026-09-26). Master: DSC04925.jpg
     (assets-src/photos/masters, não versionado). Mãos escrevendo, bordado
     do jaleco legível, aliança — recorte 16:10 (fx.55 fy.55 z1.0) para que
     object-fit:cover funcione tanto no 4:5 (desktop/tablet) quanto no
     16:10 nativo (mobile). Auditoria técnica (2026-09-27): tier de 1900 px
     adicionado a pedido — é a largura NATIVA do recorte (zero upscale,
     0,997×); sem ele, o reuso como capa de artigo (tela cheia) upscalava
     1,88× em monitores retina. Painel pequeno ("Como cuidamos") nunca
     precisa desse tier; só a capa do artigo o usa. */
  careDepth: {
    kind: 'image',
    ready: true,
    file: 'cuidado-profundidade',
    widths: [640, 960, 1400, 1900],
    width: 1900,
    height: 1188,
    variant: 'exam',
    alt: 'Mãos do Dr. Vinicius escrevendo, com o bordado do jaleco visível.',
    brief: 'Detalhe · mãos analisando exame real em contexto · profundidade de campo curta · sem ECG decorativo.',
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
  /* APROVEITÁVEL (B) — master DSC04954.jpg. Explicação real a um paciente
     (fora de foco/de costas), usando um modelo anatômico como ferramenta de
     ensino — gesto genuíno, não ícone decorativo, mas visualmente presente;
     recorte pensado para não deixar o modelo dominar o quadro. 16:10, mesmo
     raciocínio de cover() do careDepth. Mesmo tier de 1900 px (nativo,
     zero upscale) adicionado pela mesma razão — ver comentário acima. */
  careExplanation: {
    kind: 'image',
    ready: true,
    file: 'cuidado-explicacao',
    widths: [640, 960, 1400, 1900],
    width: 1900,
    height: 1188,
    variant: 'conversation',
    alt: 'Dr. Vinicius explicando algo a um paciente, com um modelo anatômico do coração.',
    brief: 'Conversa · gesto de explicação · paciente de costas/fora de foco (sem identificar pacientes).',
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
  /* FALTANTE (D) — reauditado em 2026-09-26, incluindo o candidato mais
     recente ("pausa editorial.jpg" no acervo, na verdade o mesmo arquivo
     já usado em `portrait` — Louvre, sobretudo). Testado nos 3 formatos
     reais da seção (4:5, 16:9, 21:9): com a pessoa em quadro, é
     inequivocamente um RETRATO POSADO — braços cruzados (a pose que o
     Brandbook pede para evitar), olhando para o lado de forma estilizada,
     óculos escuros, num marco turístico reconhecível; sem a pessoa em
     quadro (recorte bem largo), vira só fachada de prédio, sem nenhuma
     ligação com o Dr. Vinicius. Nenhum dos dois serve a "pausa editorial"
     (silêncio, espaço negativo, sem pose de câmera). Reutilizar essa
     mesma foto aqui também duplicaria o slot `portrait`, onde ela já é
     usada e onde a pose posada faz sentido. Mantido como placeholder. */
  pause: {
    kind: 'image',
    ready: false,
    file: 'pausa-horizontal',
    widths: [960, 1600, 2400],
    variant: 'pause',
    alt: 'Dr. Vinicius em silêncio junto à janela, com grande área de espaço negativo.',
    brief: 'Horizontal 16:9 · plano aberto · muito espaço negativo à esquerda · luz natural · momento de silêncio.',
  },
  /* FALTANTE (D), as três áreas — o acervo atual não contém nenhuma cena
     que distinga visualmente cardiologia, arritmias e eletrofisiologia.
     Por instrução explícita, não improvisar: as três seguem como placeholder
     até haver fotografia real específica para cada uma. */
  areaCardiology: {
    kind: 'image',
    ready: false,
    file: 'area-cardiologia',
    widths: [480, 800],
    variant: 'desk',
    alt: 'Consulta cardiológica em andamento.',
    brief: 'Vertical 3:4 · consulta em andamento · conversa.',
  },
  areaArrhythmia: {
    kind: 'image',
    ready: false,
    file: 'area-arritmias',
    widths: [480, 800],
    variant: 'exam',
    alt: 'Detalhe de um registro de ritmo cardíaco sendo analisado.',
    brief: 'Vertical 3:4 · exame real de ritmo em análise (Holter/registro) · detalhe com mãos.',
  },
  areaEp: {
    kind: 'image',
    ready: false,
    file: 'area-eletrofisiologia',
    widths: [480, 800],
    variant: 'corridor',
    alt: 'Ambiente de procedimento de eletrofisiologia, em luz controlada.',
    brief: 'Vertical 3:4 · ambiente técnico real · luz controlada · sem equipamentos em primeiro plano como símbolo.',
  },
  /* Capa do artigo "Infarto em jovens cresce no Brasil" — imagem final a
     ser fornecida pelo Dr. Vinicius; não gerar/substituir por conta própria. */
  articleInfartoJovens: {
    kind: 'image',
    ready: false,
    file: 'artigo-infarto-jovens',
    widths: [640, 960, 1400, 1900],
    variant: 'conversation',
    alt: 'Consulta cardiológica com discussão de fatores de risco.',
    brief: 'Horizontal · consulta real ou avaliação de fatores de risco (aferição de pressão, conversa) · luz natural · sem ícones de ECG ou coração, sem clichê de saúde/tech.',
  },
  /* APROVEITÁVEL (B) — master 01.jpg (Vivenza, recepção — arquivo distinto
     do "vivenza.jpg" do acervo, que é um detalhe de sinalização; ver
     `closing` abaixo). Fonte nativa de apenas 1200 px de largura →
     upscale moderado (~1,33×) no maior tier; aceitável para uso atual,
     mas uma nova captura em alta resolução é recomendada a médio prazo.
     `widths` reduzido de [960,1600,2200] para [960,1600] — 2200 exigiria
     upscale grande demais para ser honesto. */
  vivenza: {
    kind: 'image',
    ready: true,
    file: 'vivenza-arquitetura',
    widths: [960, 1600],
    width: 1600,
    height: 1200,
    variant: 'architecture',
    alt: 'Recepção da Vivenza, com marcenaria em madeira e mármore.',
    brief: 'Arquitetura · fachada ou recepção da Vivenza · linhas limpas · luz natural · sem pessoas posando.',
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
