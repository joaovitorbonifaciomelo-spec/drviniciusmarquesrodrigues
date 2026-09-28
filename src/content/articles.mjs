/**
 * Conteúdos editoriais.
 *
 * Estrutura pensada para ser alimentada depois (ou migrada para um CMS):
 * cada artigo é um objeto; `body` é uma lista de blocos simples.
 *
 * ATENÇÃO: os quatro artigos abaixo são DEMONSTRATIVOS (`placeholder: true`)
 * — existem para dar forma ao sistema editorial. Devem ser substituídos ou
 * revisados clinicamente pelo Dr. Vinicius antes da publicação.
 *
 * Tipos de bloco: { p }, { h2 }, { quote }, { list: [...] }
 */

export const articles = [
  {
    slug: 'palpitacoes-quando-investigar',
    placeholder: true,
    featured: true,
    category: 'Arritmias',
    title: 'Palpitações: quando vale investigar melhor',
    dek: 'Sentir o coração acelerar nem sempre é sinal de problema. Entender o contexto é o que orienta o próximo passo.',
    media: 'areaArrhythmia',
    date: '2026-09-01',
    body: [
      { p: 'Palpitação é a percepção dos próprios batimentos cardíacos — acelerados, fortes ou irregulares. Em muitas situações ela é passageira e tem relação com esforço, ansiedade, cafeína ou noites mal dormidas.' },
      { p: 'Em outras, pode estar associada a uma alteração do ritmo cardíaco que merece investigação. A diferença raramente está no sintoma isolado: está no contexto em que ele aparece.' },
      { h2: 'O que ajuda a orientar a avaliação' },
      { list: ['Com que frequência as palpitações acontecem', 'Quanto tempo duram', 'Se vêm acompanhadas de tontura, falta de ar, dor no peito ou desmaio', 'Histórico pessoal e familiar'] },
      { quote: 'Antes de decidir, é preciso entender.' },
      { p: 'Com essas informações, a consulta organiza o que precisa ser investigado — e o que pode apenas ser acompanhado.' },
    ],
  },
  {
    slug: 'exame-alterado-o-que-significa',
    placeholder: true,
    category: 'Exames',
    title: 'Exame alterado: como entender o que o resultado significa',
    dek: 'Um valor fora da referência é um ponto de partida para a interpretação, não uma conclusão.',
    media: 'careDepth',
    date: '2026-08-18',
    body: [
      { p: 'Resultados de exames trazem valores de referência que ajudam a leitura, mas não substituem a interpretação clínica. Uma alteração precisa ser vista junto com sintomas, histórico e outros exames.' },
      { p: 'É essa leitura em conjunto que permite entender se o achado é relevante, se precisa ser repetido ou se exige investigação adicional.' },
    ],
  },
  {
    slug: 'acompanhar-ou-tratar',
    placeholder: true,
    category: 'Decisões',
    title: 'Acompanhar ou tratar? Como uma decisão cardiológica é construída',
    dek: 'Nem toda alteração pede intervenção. Critério é saber diferenciar.',
    media: 'careExplanation',
    date: '2026-08-04',
    body: [
      { p: 'Diante de um diagnóstico, a pergunta mais comum é se será preciso tratar. A resposta depende de um conjunto de fatores que precisam ser explicados com clareza.' },
      { p: 'Entender os caminhos possíveis — e o que cada um envolve — é o que permite decidir com segurança.' },
    ],
  },
  {
    slug: 'o-que-e-eletrofisiologia',
    placeholder: true,
    category: 'Eletrofisiologia',
    title: 'O que é a eletrofisiologia — e quando ela entra no cuidado',
    dek: 'Uma área dedicada à atividade elétrica do coração e às alterações de ritmo.',
    media: 'areaEp',
    date: '2026-07-21',
    body: [
      { p: 'A eletrofisiologia é a área da cardiologia dedicada ao estudo da atividade elétrica do coração. Ela entra no cuidado quando uma arritmia pede investigação mais aprofundada.' },
      { p: 'Nesses casos, entender o mecanismo da alteração ajuda a orientar a decisão sobre acompanhamento ou tratamento.' },
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
