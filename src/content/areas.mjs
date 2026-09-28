/**
 * Áreas de atuação — Home (lista editorial) + páginas próprias (/atuacao/<slug>/).
 *
 * `situations` é conteúdo informativo genérico, escrito para estrutura de
 * página. `review: true` = precisa de revisão clínica do Dr. Vinicius antes
 * da publicação (nada aqui é claim de resultado ou de serviço exclusivo).
 */

export const areas = [
  {
    slug: 'cardiologia',
    title: 'Cardiologia',
    media: 'areaCardiology',
    summary:
      'Avaliação e acompanhamento da saúde do coração ao longo do tempo — da prevenção à investigação de sintomas e de alterações em exames.',
    lead: 'A cardiologia clínica é a porta de entrada: entender o que está acontecendo, organizar o que os exames mostram e definir como acompanhar.',
    review: true,
    situations: [
      'Acompanhamento preventivo da saúde cardiovascular',
      'Pressão arterial ou colesterol alterados',
      'Falta de ar, cansaço ou desconforto no peito',
      'Resultados de exames que precisam ser interpretados',
    ],
  },
  {
    slug: 'arritmias',
    title: 'Arritmias',
    media: 'areaArrhythmia',
    summary:
      'Investigação e condução de alterações do ritmo cardíaco, como palpitações e batimentos irregulares, com critério para cada caso.',
    lead: 'Nem toda alteração de ritmo exige tratamento — mas toda alteração merece ser compreendida. O ponto de partida é entender o que o ritmo está mostrando.',
    review: true,
    situations: [
      'Palpitações ou sensação de coração acelerado',
      'Batimentos irregulares ou “falhando”',
      'Tontura ou desmaio sem causa esclarecida',
      'Alterações de ritmo identificadas em exames',
    ],
  },
  {
    slug: 'eletrofisiologia',
    title: 'Eletrofisiologia',
    media: 'areaEp',
    summary:
      'Estudo aprofundado da atividade elétrica do coração, quando a situação pede investigação ou tratamento especializado.',
    lead: 'Quando uma arritmia pede um olhar mais aprofundado, a eletrofisiologia permite investigar a atividade elétrica do coração e discutir caminhos de tratamento.',
    review: true,
    situations: [
      'Arritmias que pedem investigação aprofundada',
      'Avaliação para estudo eletrofisiológico',
      'Discussão de tratamento especializado, quando indicado',
      'Acompanhamento após procedimentos',
    ],
  },
];
