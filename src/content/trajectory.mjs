/**
 * Trajetória / formação.
 *
 * Fonte: 04_STRATEGIC-RESEARCH/initial-evidence-audit.md
 *   "Dr. Vinicius declarou ter se formado em Medicina em Petrópolis, feito
 *    Clínica Médica no HCPM-RJ, Cardiologia/Eletrofisiologia no INC e
 *    fellowship no Hospital Clínic Barcelona" — CLIENT-REPORTED / VALIDATED.
 *
 * Os nomes são reproduzidos exatamente como informados. Nomes completos
 * das instituições e anos NÃO constam nas fontes: `year: null` é omitido
 * na renderização; `confirm` lista o que validar antes da publicação.
 */

/**
 * Biografia editorial (página /trajetoria/).
 *
 * Escrita só a partir de afirmações CLIENT-REPORTED / VALIDATED em
 * 04_STRATEGIC-RESEARCH/initial-evidence-audit.md: percurso de formação
 * (acima), 22 anos de atuação em Goiânia, e os traços recorrentes da
 * autodescrição do próprio médico (vocação, estudo contínuo, dedicação,
 * ética, interesse em compartilhar conhecimento com outros médicos).
 * Não inclui nenhuma história pessoal não transcrita nas fontes do
 * projeto (ex.: motivação por trás da escolha da cardiologia, influência
 * familiar) — ver nota de 2026-10-01 no histórico do projeto.
 */
export const bio = [
  'Cardiologista e eletrofisiologista, Dr. Vinicius atua há 22 anos em Goiânia, com atuação em cardiologia clínica, arritmias e eletrofisiologia. Formou-se em Medicina em Petrópolis, seguiu para a Clínica Médica no HCPM, no Rio de Janeiro, e aprofundou-se em cardiologia e eletrofisiologia no INC, complementando a formação com um fellowship no Hospital Clínic, em Barcelona.',
  'Descreve a medicina como uma vocação sustentada por estudo contínuo e um compromisso ético com cada paciente — e vê valor em compartilhar esse conhecimento também com outros médicos, ao longo da carreira.',
];

export const trajectory = [
  {
    area: 'Formação médica',
    detail: 'Medicina',
    place: 'Petrópolis',
    year: null,
    confirm: 'nome da instituição e ano de conclusão',
  },
  {
    area: 'Clínica médica',
    detail: 'HCPM',
    place: 'Rio de Janeiro',
    year: null,
    confirm: 'nome completo da instituição e período',
  },
  {
    area: 'Cardiologia e eletrofisiologia',
    detail: 'INC',
    place: null,
    year: null,
    confirm: 'nome completo da instituição, cidade e período',
  },
  {
    area: 'Fellowship',
    detail: 'Hospital Clínic',
    place: 'Barcelona',
    year: null,
    confirm: 'área do fellowship e período',
  },
  {
    area: 'Atuação',
    detail: 'Cardiologia, arritmias e eletrofisiologia',
    place: 'Goiânia',
    year: null,
    confirm: null,
  },
];
