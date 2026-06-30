import { editorial } from '$lib/festival-images';

// Dominio di produzione del sito. AGGIORNARE con il dominio reale quando definitivo:
// alimenta canonical, og:url e sitemap.xml.
export const SITE_URL = 'https://www.alicenellacitta.com';

// Immagine di condivisione di default (Open Graph / Twitter card) quando una pagina
// non ne specifica una propria. Deve essere un URL assoluto.
export const DEFAULT_OG_IMAGE = editorial.heroBg;

// Landing: la sitemap include solo la home.
export const STATIC_PATHS = [''];
