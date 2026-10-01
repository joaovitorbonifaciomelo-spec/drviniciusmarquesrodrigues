/**
 * Dados globais do site.
 *
 * REGRA: nenhum dado factual é inventado. Tudo que não consta nas fontes
 * do projeto (Brand/) está declarado com ph('...') e aparece marcado no
 * site e no relatório do build até ser substituído.
 */
import { ph } from '../../tools/lib/html.mjs';

export const site = {
  name: 'Dr. Vinicius Marques Rodrigues',
  shortName: 'Dr. Vinicius',
  lang: 'pt-BR',
  url: 'https://www.exemplo.com.br', // PLACEHOLDER: domínio final
  description:
    'Cardiologia de confiança para orientar decisões e acompanhar sua jornada cardiovascular. Cardiologia, arritmias e eletrofisiologia.',

  /**
   * Registro profissional.
   * Fonte: 04_STRATEGIC-RESEARCH/regulatory-research-execution.md (RR-02).
   * Status: PUBLIC SOURCE — correspondência com cadastro oficial CFM/CRM-GO
   * NÃO verificada. Confirmar oficialmente antes da publicação definitiva.
   */
  registry: {
    verified: false,
    crm: 'CRM/GO 10224',
    rqe: [
      { number: 'RQE 5073', specialty: 'Cardiologia' },
      { number: 'RQE 9036', specialty: 'Eletrofisiologia' },
    ],
  },

  /**
   * Canais de contato. Telefone (Vivenza) confirmado em 2026-09-27,
   * Instagram em 2026-10-01, WhatsApp em 2026-10-01 (dados oficiais
   * fornecidos). E-mail continua sem confirmação nas fontes.
   */
  contact: {
    whatsapp: { label: '(62) 99966-7661', href: 'https://wa.me/5562999667661' },
    phone: { label: '(62) 3093-2333', href: 'tel:+556230932333' },
    email: { label: ph('E-mail'), href: null },
    instagram: { label: '@dr.vinicius.marques.rodrigues', href: 'https://www.instagram.com/dr.vinicius.marques.rodrigues/' },
  },

  /**
   * Agendamento. Enquanto não há uma URL de agendamento online dedicada,
   * os CTAs "Agendar consulta" direcionam direto para o WhatsApp
   * confirmado acima.
   */
  booking: { href: 'https://wa.me/5562999667661', label: 'Agendar consulta' },

  nav: [
    { label: 'Trajetória', href: '/#trajetoria', chapter: 'trajetoria' },
    { label: 'Atuação', href: '/#atuacao', chapter: 'atuacao' },
    { label: 'Conteúdos', href: '/#conteudos', chapter: 'conteudos' },
    { label: 'Onde atendo', href: '/#local', chapter: 'local' },
    { label: 'Contato', href: '/#contato', chapter: 'contato' },
  ],

  footerNav: [
    { label: 'Cardiologia', href: '/atuacao/cardiologia/' },
    { label: 'Arritmias', href: '/atuacao/arritmias/' },
    { label: 'Eletrofisiologia', href: '/atuacao/eletrofisiologia/' },
    { label: 'Conteúdos', href: '/conteudos/' },
    { label: 'Contato', href: '/#contato' },
  ],
};

export const bookingHref = () => site.booking.href || '/#contato';
