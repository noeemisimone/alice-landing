# Alice nella Città — Landing page (progetto separato)

Questo progetto è la **landing page** di Alice nella Città, da pubblicare **prima** del sito
completo. È nato **duplicando** il sito completo (cartella `AlicexIED`) e poi riducendolo.
I due progetti sono **indipendenti**: questa è solo la landing.

## Cos'è Alice nella Città
Sezione autonoma e parallela della **Festa del Cinema di Roma** dedicata ai **giovani e alle
nuove generazioni**. Festival di cinema a Roma, attivo dal 2002. Bilingue **IT/EN**.

## Stack
SvelteKit + Vite + TypeScript. Avvio: `npm install` poi `npm run dev`.
(Il sito completo gira su :5173, questa landing tipicamente su `npm run dev -- --port 5174`.)

## Struttura attuale della landing
**Home (`/`)** — solo queste sezioni, in ordine:
1. Hero (video di sfondo, sigla — segmento 16–31s in loop)
2. Manifesto / claim
3. Chi siamo (con **immagine = rettangolo placeholder**, vedi TODO)
4. Marquee + Statistiche
5. **Blocco 2 CTA** (sezione `biglietti-section`):
   - *Accrediti / Biglietteria* → Clappit (link esterno)
   - *Iscrivi la tua opera* → FilmFreeway (link esterno)
   → questi sono gli **unici 2 link esterni** del contenuto.

**Pagine**: solo `/` e `/chi-siamo`. Le altre route sono state rimosse
(programma, film, news, bando, stampa, partner, professionisti, biglietti, contatti).

**Navbar**: logo + "Chi siamo" + switch lingua IT/EN.

**Footer** (stile "flim", banda nera + wordmark): solo link **Chi siamo**, blocco
**"Chiedi all'AI"** (icone ChatGPT/Claude che aprono l'app con un prompt pre-compilato),
copyright e **wordmark gigante "Alice nella Città"** (non toccare). Niente newsletter/social/legali.

## SEO / GEO (già presente e funzionante — NON perderlo)
- `src/lib/Seo.svelte`: componente con title, meta description, Open Graph, Twitter card,
  canonical, JSON-LD. Usato su ogni pagina.
- `src/routes/sitemap.xml/+server.ts`: sitemap (solo `/` e `/chi-siamo`).
- `static/robots.txt`, `static/llm.txt` (file GEO per gli LLM), `lang="it"` in `src/app.html`.
- i18n IT/EN in `src/lib/i18n/`.
- Prompt AI e link ChatGPT/Claude: costanti in cima a `src/routes/+layout.svelte`.

## TODO / cose lasciate in sospeso
1. **Pulizia CSS**: in `+page.svelte` e `+layout.svelte` sono rimasti gli stili delle
   sezioni rimosse (programma/film/eventi/news/partner/newsletter) → generano solo
   **warning "Unused CSS selector"**, non rompono nulla. Vanno rimossi.
2. **Immagini reali + maschere SVG**: la "nota tecnica" del cliente chiede il **ritaglio
   immagini con SVG**; per ora c'è un **rettangolo placeholder** (`.block-image.placeholder`
   in `+page.svelte`). Implementare le maschere SVG e mettere le immagini vere.
3. **`SITE_URL`** in `src/lib/seo.ts`: impostare il **dominio definitivo** della landing
   (alimenta canonical, og:url, sitemap, llm.txt).
4. **`llm.txt`**: completare con fondatori / date ufficiali del festival se necessario.
5. Verificare i testi delle 2 CTA e gli URL esterni (Clappit, FilmFreeway).

## Vincoli dati dal cliente (per non sbagliare)
- Solo **2 link esterni** nel contenuto: Clappit + FilmFreeway.
- Footer essenziale (in pratica solo "Chi siamo" + le icone AI, volute esplicitamente).
- Hero invariata rispetto al sito completo.
