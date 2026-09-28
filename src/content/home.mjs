/**
 * Conteúdo da Home.
 *
 * Títulos são arrays de linhas autorais: cada item é uma linha tipográfica
 * (quebra editorial controlada + unidade do reveal por máscara).
 *
 * Cuidado de linguagem (Plataforma de Marca §6–7): a "Condução Clara de
 * Decisões" é direção estratégica, não método proprietário comprovado.
 * Os textos descrevem a forma de cuidar — sem superlativos, sem promessa
 * de resultado, sem comparação.
 */
import { ph } from '../../tools/lib/html.mjs';

export const hero = {
  eyebrow: ['Cardiologia', 'Arritmias', 'Eletrofisiologia'],
  title: ['Entender a situação.', 'Saber como seguir.'],
  lead: 'Cardiologia de confiança para orientar decisões e acompanhar sua jornada cardiovascular.',
  cta: 'Agendar consulta',
};

export const authority = {
  chapter: 'Autoridade próxima',
  label: 'Autoridade próxima',
  titleA: 'Profundidade médica.',
  titleB: 'Presença humana.',
  copy: 'Uma referência cardiológica de profundidade técnica que permanece próxima e atenta para orientar decisões.',
  path: ['Conhecimento', 'Compreensão', 'Critério', 'Direção'],
};

export const care = {
  chapter: 'Como cuidamos',
  label: 'Como cuidamos',
  intro: 'Do conhecimento técnico ao próximo passo — um percurso para que cada decisão seja compreendida.',
  steps: [
    {
      short: 'Profundidade',
      title: 'Profundidade médica',
      text: 'Formação e experiência em cardiologia, arritmias e eletrofisiologia são o ponto de partida para olhar cada caso.',
      media: 'careDepth',
    },
    {
      short: 'Interpretação',
      title: 'Interpretação da situação',
      text: 'Sintomas, histórico e exames são lidos em conjunto, para entender o que de fato está acontecendo.',
      media: 'careInterpretation',
    },
    {
      short: 'Explicação',
      title: 'Explicação do que importa',
      text: 'O que é relevante é explicado com clareza — sem excesso de termos técnicos e sem deixar dúvidas pelo caminho.',
      media: 'careExplanation',
    },
    {
      short: 'Orientação',
      title: 'Orientação para a decisão',
      text: 'Os caminhos possíveis são apresentados com critério, para que a decisão seja tomada com segurança.',
      media: 'listening',
    },
    {
      short: 'Próximo passo',
      title: 'Próximo passo claro',
      text: 'Ao final, você sabe como seguir: acompanhar, investigar ou tratar.',
      media: 'careDirection',
      cta: true,
    },
  ],
};

export const doctor = {
  chapter: 'Trajetória',
  label: 'Dr. Vinicius Marques Rodrigues',
  title: ['Uma trajetória', 'construída com', 'profundidade.'],
  /* Fonte: initial-evidence-audit.md — CLIENT-REPORTED / VALIDATED (declaração do próprio médico). */
  intro:
    'Cardiologista e eletrofisiologista, Dr. Vinicius atua em Goiânia com cardiologia clínica, arritmias e eletrofisiologia.',
  cta: 'Conheça minha trajetória',
};

export const pause = {
  label: 'Segurança sem distância. Conhecimento sem excesso de complexidade. Proximidade sem perder precisão.',
  phrases: [
    ['Segurança sem distância.'],
    ['Conhecimento sem', 'excesso de complexidade.'],
    ['Proximidade sem', 'perder precisão.'],
  ],
};

export const areasIntro = {
  chapter: 'Atuação',
  label: 'Áreas de atuação',
  title: ['Cada situação pede', 'uma forma de olhar.'],
};

/** Perguntas conceituais — editar livremente. */
export const questions = {
  chapter: 'Perguntas',
  label: 'Perguntas do paciente',
  title: ['Às vezes, tudo começa', 'com uma pergunta.'],
  items: [
    ['Meu coração está acelerando.', 'Isso é normal?'],
    ['Meu exame apresentou', 'uma alteração.', 'O que ela significa?'],
    ['Essa palpitação precisa', 'ser investigada?'],
    ['Preciso tratar', 'ou apenas acompanhar?'],
  ],
  closing: ['Antes de decidir,', 'é preciso entender.'],
};

export const articlesIntro = {
  chapter: 'Conteúdos',
  label: 'Conteúdos',
  title: ['Informação para ajudar', 'você a entender melhor.'],
  cta: 'Ver todos os conteúdos',
};

/**
 * Vivenza — estrutura + sustentação (Brandbook, arquitetura de co-presença).
 * Endereço e telefone confirmados em 2026-09-27 (dados oficiais fornecidos).
 */
export const vivenza = {
  chapter: 'Onde atendo',
  label: 'Onde atendo',
  brand: 'Vivenza',
  fullName: 'Vivenza Centro Médico',
  title: ['O cuidado também', 'precisa de estrutura.'],
  copy: 'O atendimento acontece na Vivenza — a estrutura que sustenta a consulta, os exames e o acompanhamento.',
  address: {
    building: 'Ed. Órion Business and Health',
    line1: 'Av. Portugal, nº 1148 — Sl. B3001',
    line2: 'Setor Marista, Goiânia — GO, 74150-340',
    // Texto de busca do Google Maps (usado no link "Como chegar" e no mapa embutido):
    mapsQuery: 'Vivenza Centro Médico, Av. Portugal, 1148, Sl B3001, Setor Marista, Goiânia - GO, 74150-340',
  },
  details: [
    { label: 'Acesso', value: ph('Referência de acesso / estacionamento') },
    { label: 'Atendimento', value: ph('Dias e horários') },
  ],
  cta: 'Como chegar',
  call: 'Ligar',
};

export const closing = {
  chapter: 'Contato',
  title: ['Vamos entender', 'sua situação?'],
  copy: 'Agende sua consulta para uma avaliação individual e orientação dos próximos passos.',
  cta: 'Agendar consulta',
};
