/**
 * /bio/ — interface entre intenção e ação (link da bio do Instagram).
 *
 * A /bio/ não convence nem apresenta: direciona. Quem chega do Instagram já
 * tem intenção; a página só organiza a ação. Descoberta é papel do site.
 *
 *   ENTRO → IDENTIFICO O QUE PRECISO → TOCO → VOU
 *
 * Três destinos com pesos diferentes:
 *   · consulta: link de agendamento se existir; senão WhatsApp; nunca os
 *     dois como ação principal.
 *   · como chegar: NÃO navega — abre um bottom sheet local (`panel` abaixo)
 *     com endereço, telefone, mapa embutido e as ações "Abrir no Google
 *     Maps"/"Ligar". A /bio/ só sai da própria página pelo item "Acessar
 *     o site".
 *   · acessar o site: único destino que navega para fora.
 * Enquanto um dado não existe, mostra o placeholder — nada inventado.
 *
 * `id` = data-dest (analytics, ver README). `context` = rótulo que surge
 * sobre o vídeo quando a intenção é sinalizada (toque, foco, hover).
 */
import { ph } from '../../tools/lib/html.mjs';
import { site } from './site.mjs';
import { vivenza } from './home.mjs';

const booking = site.booking.href;
const whatsapp = site.contact.whatsapp.href;
const mapsQuery = vivenza.address.mapsQuery;
const phone = site.contact.phone;

const consultation = {
  id: 'consultation',
  title: 'Agendar uma consulta',
  href: booking || whatsapp || null,
  fallback: '/#contato',
  external: Boolean(booking || whatsapp),
  opens: booking ? 'abre o agendamento' : whatsapp ? 'abre o WhatsApp' : null,
  detail: booking ? 'Agendamento online' : whatsapp ? 'WhatsApp' : ph('canal oficial de agendamento'),
  context: booking ? 'Agendamento' : whatsapp ? 'WhatsApp' : 'Canal oficial',
  primary: true,
};

const location = {
  id: 'location',
  title: 'Como chegar',
  sheet: true, // abre o bsheet "panel" abaixo — não navega
  detail: vivenza.brand,
  context: vivenza.brand,
  panel: {
    label: 'Como chegar',
    brand: vivenza.fullName,
    address: vivenza.address,
    phone,
    mapsQuery,
    directionsHref: mapsQuery ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}` : null,
  },
};

const website = {
  id: 'website',
  title: 'Acessar o site',
  href: '/',
  external: false,
  detail: 'Atuação, trajetória e conteúdos',
  context: 'Site completo',
};

export const bio = {
  path: '/bio/',
  title: `${site.name} — Agendar, como chegar, site`,
  description: 'Agendar uma consulta, como chegar à Vivenza ou acessar o site do Dr. Vinicius Marques Rodrigues.',
  specialties: ['Cardiologia', 'Arritmias', 'Eletrofisiologia'],
  question: 'Como posso ajudar?',
  actions: [consultation, location, website],
};
