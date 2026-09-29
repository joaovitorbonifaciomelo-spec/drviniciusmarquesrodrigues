/**
 * Conteúdos editoriais.
 *
 * Estrutura pensada para ser alimentada depois (ou migrada para um CMS):
 * cada artigo é um objeto; `body` é uma lista de blocos simples.
 *
 * `seoTitle`/`seoDescription` são opcionais — sobrescrevem o padrão
 * `${title} — ${site.name}` / `dek` quando o artigo pede um SEO específico.
 *
 * Tipos de bloco: { p }, { h2 }, { quote }, { list: [...] }
 */

export const articles = [
  {
    slug: 'infarto-em-jovens-cresce-no-brasil',
    featured: true,
    category: 'Prevenção',
    title: 'Infarto em jovens cresce no Brasil e reforça alerta para prevenção cardiovascular',
    dek: 'Ser jovem não significa estar protegido de doenças cardiovasculares. O crescimento das internações por infarto nessa faixa etária reforça a importância de identificar e controlar os fatores de risco mais cedo.',
    seoTitle: 'Infarto em jovens cresce no Brasil | Dr. Vinicius Marques Rodrigues',
    seoDescription: 'O número de infartos em pessoas jovens vem crescendo no Brasil. Dr. Vinicius Marques Rodrigues explica os principais fatores de risco e por que a prevenção cardiovascular deve começar cedo.',
    media: 'articleInfartoJovens',
    date: '2026-09-28',
    body: [
      { p: 'O infarto ainda é mais frequente nas faixas etárias mais avançadas, mas deixou de ser uma preocupação restrita às pessoas mais velhas. Dados divulgados a partir dos registros do SUS mostram crescimento expressivo das internações por infarto entre brasileiros com menos de 40 anos nas últimas décadas. Levantamentos publicados em 2025 apontam aumento de 184% entre 2000 e 2022 nessa faixa etária.' },
      { h2: 'O que explica esse aumento?' },
      { p: 'Esse cenário não tem uma única explicação. O que vemos é a combinação e, muitas vezes, o mau controle de fatores de risco que já conhecemos: hipertensão arterial, colesterol elevado, diabetes, obesidade, tabagismo, sedentarismo e histórico familiar de doença cardiovascular.' },
      { h2: 'Cigarro eletrônico também merece atenção' },
      { p: 'Entre os mais jovens, alguns hábitos merecem atenção especial. O uso de cigarros eletrônicos, por exemplo, não deve ser considerado inofensivo. A exposição à nicotina pode elevar a frequência cardíaca e a pressão arterial, além de afetar a função dos vasos sanguíneos.' },
      { h2: 'O uso de esteroides anabolizantes' },
      { p: 'Outro ponto que merece cada vez mais atenção é o uso não médico de esteroides anabolizantes em doses elevadas. Evidências recentes associam esse consumo a maior risco de infarto, arritmias, alterações do músculo cardíaco e insuficiência cardíaca.' },
      { h2: 'O papel do estresse' },
      { p: 'O estresse crônico também entra nessa discussão. Ele não deve ser tratado isoladamente como causa de um infarto, mas faz parte de um conjunto de fatores que podem contribuir para o risco cardiovascular, além de frequentemente estar associado a pior alimentação, menor atividade física, tabagismo e dificuldade em manter outros cuidados de saúde.' },
      { quote: 'O principal recado, portanto, é que ser jovem não significa estar protegido de uma doença cardiovascular.' },
      { h2: 'Prevenção começa antes dos sintomas' },
      { p: 'Um conjunto de atitudes simples ajuda a reduzir o risco cardiovascular:' },
      { list: ['Conhecer a pressão arterial', 'Acompanhar glicemia e colesterol', 'Manter atividade física regular', 'Controlar o peso', 'Não fumar', 'Discutir histórico familiar e outros fatores de risco durante a avaliação médica'] },
      { p: 'Mais do que esperar aparecer um sintoma, precisamos antecipar o risco.' },
      { p: 'Prevenção cardiovascular começa antes da doença se manifestar.' },
      { p: 'Dr. Vinicius Marques Rodrigues — Cardiologista' },
      { h2: 'Fontes' },
      {
        list: [
          'CNN Brasil — "Cresce número de jovens com infarto no Brasil; entenda"',
          'American Heart Association — Cardiopulmonary Impact of Electronic Cigarettes and Vaping Products',
          'PubMed — Cardiovascular Disease in Anabolic Androgenic Steroid Users (PMID: 39945117)',
        ],
      },
    ],
  },
];

/** Tempo de leitura estimado a partir do corpo (≈ 200 palavras/min). */
export const readingTime = (article) => {
  const words = article.body
    .map((b) => b.p || b.h2 || b.quote || (b.list || []).join(' '))
    .join(' ')
    .split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min de leitura`;
};

export const formatDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
