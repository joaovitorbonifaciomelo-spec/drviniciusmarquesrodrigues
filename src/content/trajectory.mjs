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
