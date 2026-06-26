<script lang="ts">
	import { onMount } from 'svelte';
	import { editorial, TICKETS_URL } from '$lib/festival-images';
	import { reveal } from '$lib/reveal';
	import { splitReveal, clipReveal, magnet, scrollFill } from '$lib/anim';
	import Marquee from '$lib/Marquee.svelte';
	import Seo from '$lib/Seo.svelte';
	import { SITE_URL, DEFAULT_OG_IMAGE } from '$lib/seo';
	import { t, locale } from '$lib/i18n';

	// Gli unici 2 link esterni del contenuto: biglietteria (Clappit, TICKETS_URL)
	// e iscrivi la tua opera (FilmFreeway). Usati nella hero e nel blocco CTA.
	const FILMFREEWAY_URL = 'https://filmfreeway.com/alicenellacitta';

	// JSON-LD Event: dà a Google/AI i dati strutturati del festival (date, luogo,
	// organizzatore) → eleggibilità ai rich result e migliore comprensione GEO.
	// NOTA: date placeholder, sostituire con quelle ufficiali dell'edizione.
	const eventJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: 'Alice nella Città',
		description:
			'Sezione autonoma e parallela della Festa del Cinema di Roma, dedicata ai giovani e alle nuove generazioni.',
		startDate: '2026-10-15',
		endDate: '2026-10-26',
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		location: {
			'@type': 'Place',
			name: 'Roma',
			address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' }
		},
		organizer: { '@type': 'Organization', name: 'Alice nella Città', url: SITE_URL },
		image: [DEFAULT_OG_IMAGE],
		url: SITE_URL
	};

	// Hero: video di sfondo (sigla del festival) da static/video/hero-sigla.mp4.
	// Il file sorgente dura 67s: ne riproduciamo in loop solo il segmento START→END.
	const START = 16; // secondi: inizio dello spezzone da mostrare
	const END = 31; // secondi: fine dello spezzone (poi torna a START)

	let heroVideo: HTMLVideoElement | null = $state(null);

	// Rispetta prefers-reduced-motion: con animazioni ridotte il video non parte
	// e resta visibile il poster statico (fallback).
	let reducedMotion = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const handler = (e: MediaQueryListEvent) => (reducedMotion = e.matches);
		mq.addEventListener('change', handler);

		const video = heroVideo;

		// Safari NON rispetta l'attributo `muted` in HTML: l'autoplay parte solo se
		// muted è impostato come PROPRIETÀ via JS, prima del play(). Senza questo
		// compare il pulsante play al centro e il video non parte (né va in loop).
		if (video) {
			video.muted = true;
			video.defaultMuted = true;
			video.playsInline = true;
		}

		// Tenta l'avvio; su Safari il play() può fallire la prima volta, quindi
		// lo richiamiamo su più eventi finché non parte.
		const tryPlay = () => {
			if (!video || reducedMotion) return;
			const p = video.play();
			if (p) p.catch(() => {});
		};

		// Appena i metadati sono pronti, salta a START e avvia.
		const onMeta = () => {
			if (!video) return;
			video.currentTime = START;
			tryPlay();
		};

		// Loop sul solo segmento: se si esce dalla finestra, si torna a START.
		const onTime = () => {
			if (!video) return;
			if (video.currentTime >= END || video.currentTime < START) {
				video.currentTime = START;
			}
		};

		// Fallback: se l'autoplay resta bloccato (es. Safari in Risparmio energetico),
		// avvia al primo tocco/click dell'utente in qualunque punto della pagina.
		const onFirstGesture = () => {
			tryPlay();
			window.removeEventListener('pointerdown', onFirstGesture);
		};

		video?.addEventListener('loadedmetadata', onMeta);
		video?.addEventListener('canplay', tryPlay);
		video?.addEventListener('timeupdate', onTime);
		window.addEventListener('pointerdown', onFirstGesture);

		// Se i metadati sono già pronti (cache/HMR), avvia subito.
		if (video && video.readyState >= 1) onMeta();

		return () => {
			mq.removeEventListener('change', handler);
			video?.removeEventListener('loadedmetadata', onMeta);
			video?.removeEventListener('canplay', tryPlay);
			video?.removeEventListener('timeupdate', onTime);
			window.removeEventListener('pointerdown', onFirstGesture);
		};
	});

	// Landing: la home è ridotta a Hero · Manifesto · Chi siamo · Stats · 2 CTA.
	// Programma, Film, Eventi, News, Partner e Contatti sono stati rimossi.
</script>

<Seo
	title={$locale === 'it'
		? 'Alice nella Città — Festival di cinema per i giovani · Roma'
		: 'Alice nella Città — Film festival for young audiences · Rome'}
	description={$locale === 'it'
		? 'Alice nella Città, sezione autonoma della Festa del Cinema di Roma dedicata ai giovani: film, anteprime, ospiti ed eventi per le nuove generazioni.'
		: 'Alice nella Città, the autonomous section of the Rome Film Fest for young audiences: films, premieres, guests and events for new generations.'}
	jsonLd={eventJsonLd}
/>

<!-- ─────────────────────────── HERO ─────────────────────────── -->
<section class="hero" id="top">
	<div class="hero-image" aria-hidden="true">
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			bind:this={heroVideo}
			class="video-bg"
			src="/video/hero-sigla.mp4"
			poster={editorial.heroBg}
			autoplay
			muted
			loop
			playsinline
			preload="auto"
			tabindex="-1"
		></video>
		<div class="hero-gradient"></div>
	</div>

	<div class="hero-content">
		<div class="hero-top">
			<p class="eyeshot light">{$t('hero.eyeshot')}</p>
		</div>

		{#key $locale}
			<h1 class="hero-title" use:splitReveal={{ stagger: 90, duration: 1300 }}>
				{@html $t('hero.title_html')}
			</h1>
		{/key}

		<div class="hero-bottom">
			<div class="hero-info">
				<div class="hero-meta">
					<span>{$t('hero.meta_edition')}</span>
					<span>{$t('hero.meta_date')}</span>
					<span>{$t('hero.meta_city')}</span>
				</div>
				<a class="scroll-cue" href="#manifesto">{$t('common.scroll')} <span class="arrow">↓</span></a>
			</div>

			<!-- CTA subito disponibili: stessi 2 link esterni del sito -->
			<div class="hero-actions">
				<a class="hero-link" href={FILMFREEWAY_URL} target="_blank" rel="noopener">
					{$locale === 'it' ? 'Iscrivi la tua opera' : 'Submit your film'}
					<span class="hero-arrow">↗</span>
				</a>
				<a class="hero-btn" href={TICKETS_URL} target="_blank" rel="noopener">
					{$locale === 'it' ? 'Biglietteria' : 'Tickets'}
					<span class="hero-arrow">↗</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ─────────────────────── MANIFESTO / CLAIM ─────────────────────── -->
<section class="manifesto" id="manifesto">
	{#key $locale}
		<p class="big-claim" use:scrollFill>
			{@html $t('manifesto.claim_html')}
		</p>
	{/key}
	<p class="claim-body" use:reveal={{ delay: 200 }}>
		{$t('manifesto.body')}
	</p>
</section>

<!-- ─────────────────────── CHI SIAMO ─────────────────────── -->
<section class="overlap-section" id="chi-siamo">
	<div class="block-overlap">
		<div class="block-image" use:clipReveal={{ direction: 'right' }}>
			<img
				src="/images/chi-siamo.jpg"
				alt={$locale === 'it'
					? 'Pubblico giovane in sala durante una proiezione del festival'
					: 'Young audience in a cinema during a festival screening'}
				loading="lazy"
			/>
		</div>
		<div class="block-text" use:reveal={{ delay: 120 }}>
			<p class="section-label inset">{$t('chi_siamo.label')}</p>
			{#key $locale}
				<h2 class="block-title" use:splitReveal={{ stagger: 70 }}>
					{@html $t('chi_siamo.title_html')}
				</h2>
			{/key}
		</div>
	</div>

	<div class="two-col">
		<div use:reveal={{ delay: 0 }}>
			<h3>{$t('chi_siamo.card1_title')}</h3>
			<p>{$t('chi_siamo.card1_body')}</p>
		</div>
		<div use:reveal={{ delay: 150 }}>
			<h3>{$t('chi_siamo.card2_title')}</h3>
			<p>{@html $t('chi_siamo.card2_body_html')}</p>
		</div>
	</div>

	<a class="more-link magnet-link" href="/chi-siamo" use:magnet={0.2}>
		<span use:reveal={{ delay: 300 }}>{$t('chi_siamo.link')}</span>
	</a>
</section>

<Marquee items={['Alice nella Città', $t('hero.meta_edition'), $t('hero.meta_date'), $t('hero.meta_city')]} speed={55} />

<!-- ─────────────────────── STATS ─────────────────────── -->
<section class="stats-band">
	<div class="stat" use:reveal={{ delay: 0 }}>
		<span class="big-num">XXIV</span>
		<span class="big-cap">{$t('stats.editions')}</span>
	</div>
	<div class="stat" use:reveal={{ delay: 100 }}>
		<span class="big-num">200+</span>
		<span class="big-cap">{$t('stats.films')}</span>
	</div>
	<div class="stat" use:reveal={{ delay: 200 }}>
		<span class="big-num">2002</span>
		<span class="big-cap">{$t('stats.founded')}</span>
	</div>
	<div class="stat" use:reveal={{ delay: 300 }}>
		<span class="big-num">14</span>
		<span class="big-cap">{$t('stats.sections')}</span>
	</div>
</section>

<!-- ─────────────────────── BIGLIETTI & ACCREDITI ─────────────────────── -->
<section class="biglietti-section" id="biglietti">
	<div class="biglietti-head">
		<p class="section-label" use:reveal>{$t('biglietti_section.label')}</p>
		{#key $locale}
			<h2 class="biglietti-title" use:splitReveal={{ stagger: 80 }}>
				{@html $t('biglietti_section.title_html')}
			</h2>
		{/key}
		<p class="biglietti-intro" use:reveal={{ delay: 200 }}>
			{$t('biglietti_section.intro')}
		</p>
	</div>

	<div class="biglietti-grid">
		<!-- CTA 1 — Accrediti / Biglietteria → Clappit -->
		<article class="biglietti-card primary" use:reveal={{ delay: 0, distance: 50 }}>
			<div class="card-top">
				<span class="card-label">{$locale === 'it' ? 'Pubblico' : 'Audience'}</span>
				<h3>{$locale === 'it' ? 'Accrediti / Biglietteria' : 'Accreditation / Box office'}</h3>
			</div>
			<p>
				{$locale === 'it'
					? 'Acquista il biglietto o richiedi l’accredito per le proiezioni del festival.'
					: 'Buy your ticket or request accreditation for the festival screenings.'}
			</p>
			<a class="big-cta filled" href={TICKETS_URL} target="_blank" rel="noopener">
				{$locale === 'it' ? 'Vai alla biglietteria' : 'Go to the box office'}
				<span class="cta-arrow">↗</span>
			</a>
		</article>

		<!-- CTA 2 — Iscrivi la tua opera → FilmFreeway -->
		<article class="biglietti-card" use:reveal={{ delay: 150, distance: 50 }}>
			<div class="card-top">
				<span class="card-label">{$locale === 'it' ? 'Autori' : 'Filmmakers'}</span>
				<h3>{$locale === 'it' ? 'Iscrivi la tua opera' : 'Submit your film'}</h3>
			</div>
			<p>
				{$locale === 'it'
					? 'Sei un regista? Candida il tuo film alla selezione del festival.'
					: 'Are you a director? Submit your film to the festival selection.'}
			</p>
			<a
				class="big-cta"
				href={FILMFREEWAY_URL}
				target="_blank"
				rel="noopener"
			>
				{$locale === 'it' ? 'Iscrivi su FilmFreeway' : 'Submit on FilmFreeway'}
				<span class="cta-arrow">↗</span>
			</a>
		</article>
	</div>
</section>


<style>
	/* ===================== HERO ===================== */
	.hero {
		position: relative;
		min-height: 100vh; /* fallback */
		min-height: calc(100dvh - var(--header-h, 108px));
		background: #0a0a0a;
		color: #fff;
		overflow: hidden;
		isolation: isolate;
	}

	.hero-image {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	/* Video di sfondo: riempie l'hero dietro al contenuto.
	   La sigla è girata in formato cinematografico (~2.35:1) dentro un frame 16:9,
	   con bande nere "incollate" sopra e sotto nei pixel: object-fit: cover non le
	   toglie. Ingrandiamo il video con scale() per spingerle fuori dal box.
	   Regola --zoom (più alto = più ingrandito) finché le bande spariscono. */
	.video-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		background: #0a0a0a;
		--zoom: 1.4;
		transform: scale(var(--zoom));
		transform-origin: center;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.35) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			rgba(0, 0, 0, 0.55) 70%,
			rgba(0, 0, 0, 0.92) 100%
		);
	}

	.hero-content {
		position: relative;
		z-index: 2;
		min-height: 100vh;
		min-height: calc(100dvh - var(--header-h, 108px));
		padding: 2rem 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.hero-top {
		flex: none;
	}

	.hero-title {
		margin: auto 0 0;
		font-size: clamp(2.5rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.9;
		letter-spacing: -0.045em;
		color: #fff;
	}

	.hero-bottom {
		flex: none;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2rem;
	}

	.hero-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}

	/* CTA hero, in basso a destra sopra il video scuro */
	.hero-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.85rem;
	}

	.hero-link,
	.hero-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		text-decoration: none;
		white-space: nowrap;
	}

	.hero-link {
		color: #fff;
		padding-bottom: 2px;
		border-bottom: 2px solid transparent;
		transition: border-color 0.15s ease;
	}

	.hero-link:hover {
		border-bottom-color: #fff;
	}

	.hero-btn {
		background: #fff;
		color: #0a0a0a;
		padding: 0.8rem 1.4rem;
		transition:
			background 0.2s ease,
			transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-btn:hover {
		background: #e7e7e7;
		transform: translateY(-2px);
	}

	.hero-meta {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.scroll-cue {
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		text-decoration: none;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: #fff;
	}

	.scroll-cue .arrow {
		font-size: 1.2rem;
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(5px); }
	}

	/* ===================== MANIFESTO ===================== */
	.manifesto {
		max-width: 1400px;
		margin: 0 auto;
		padding: 8rem 2.5rem;
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 5rem;
		align-items: end;
		border-bottom: 1px solid #0a0a0a;
	}

	.big-claim {
		font-size: clamp(2.5rem, 8vw, 7rem);
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -0.04em;
		margin: 0;
	}

	.claim-body {
		font-size: 1.15rem;
		line-height: 1.6;
		margin: 0;
		color: #333;
		max-width: 500px;
	}

	/* ===================== OVERLAP SECTION ===================== */
	.overlap-section {
		position: relative;
		padding: 8rem 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
		overflow: hidden;
	}

	.overlap-section.dark {
		max-width: none;
		background: #0a0a0a;
		color: #fff;
	}

	.section-label {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0 0 4rem;
		color: #0a0a0a;
	}

	.section-label.light,
	.light {
		color: #fff;
	}

	/* ── Block overlap: due rettangoli solidi
	     che si sormontano in un angolo. Il blocco testo eredita lo
	     sfondo della sezione, così sembra ritagliato dalla pagina. */
	.block-overlap {
		position: relative;
		min-height: 580px;
		margin-bottom: 5rem;
	}

	.block-image {
		position: absolute;
		top: 90px;
		left: 0;
		right: 38%;
		bottom: 0;
		overflow: hidden;
	}

	.block-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.block-text {
		position: absolute;
		top: 0;
		right: 0;
		left: 50%;
		background: #ffffff;
		padding: 2.5rem 2.5rem 2.75rem 3rem;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.block-text .section-label.inset {
		margin: 0;
	}

	/* Variante dark: il blocco testo eredita lo sfondo nero della
	   sezione (.overlap-section.dark) e inverte i colori del titolo. */
	.overlap-section.dark .block-text {
		background: #0a0a0a;
	}

	.overlap-section.dark .block-title {
		color: #fff;
	}

	.block-title {
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.04em;
		margin: 0;
		color: #0a0a0a;
	}

	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem 4rem;
		max-width: 1000px;
		margin-bottom: 3rem;
	}

	.two-col h3 {
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin: 0 0 1rem;
	}

	.two-col p {
		font-size: 1.05rem;
		line-height: 1.6;
		margin: 0;
		color: #333;
	}

	.more-link {
		display: inline-block;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.9rem;
		text-decoration: none;
		padding-bottom: 4px;
		border-bottom: 2px solid currentColor;
	}

	.more-link.magnet-link {
		border-bottom: none;
		padding: 0;
	}

	.more-link.magnet-link span {
		display: inline-block;
		padding-bottom: 4px;
		border-bottom: 2px solid currentColor;
	}

	.more-link:hover span,
	.more-link:hover {
		opacity: 0.6;
	}

	/* ===================== STATS ===================== */
	.stats-band {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-bottom: 1px solid #0a0a0a;
	}

	.stat {
		padding: 4rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-right: 1px solid #0a0a0a;
	}

	.stat:last-child {
		border-right: none;
	}

	.big-num {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.big-cap {
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #666;
	}

	/* ===================== PROGRAM GRID ===================== */
	.program-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
		margin: 0 0 4rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.prog-item {
		padding: 2.5rem 1.5rem;
		border-right: 1px solid rgba(255, 255, 255, 0.2);
	}

	.prog-item:first-child {
		padding-left: 0;
	}

	.prog-item:last-child {
		border-right: none;
		padding-right: 0;
	}

	.prog-num {
		font-size: 0.8rem;
		font-weight: 700;
		color: #999;
		display: block;
		margin-bottom: 1rem;
		font-variant-numeric: tabular-nums;
	}

	.prog-item h3 {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0 0 0.75rem;
	}

	.prog-item p {
		font-size: 1rem;
		line-height: 1.55;
		margin: 0;
		color: #bbb;
	}

	/* ===================== FILM (POSTERS) ===================== */
	.film-section {
		max-width: 1400px;
		margin: 0 auto;
		padding: 8rem 2.5rem;
	}

	.film-head {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: 5rem;
	}

	.film-head .section-label {
		grid-column: 1 / -1;
		margin: 0 0 2rem;
	}

	.film-title {
		font-size: clamp(3rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.film-intro {
		font-size: 1.15rem;
		line-height: 1.6;
		margin: 0;
		color: #333;
		max-width: 480px;
		padding-bottom: 1rem;
	}

	.poster-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem 2.5rem;
		margin-bottom: 4rem;
		/* Niente stretch: ogni card resta alta quanto la sua locandina, così il
		   pannello sovrapposto si ancora al bordo reale dell'immagine in tutte. */
		align-items: start;
	}

	.poster {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		transition: transform 0.3s ease;
	}

	.poster.tall {
		margin-top: 4rem;
	}

	.poster:hover {
		transform: translateY(-6px);
	}

	.poster-img {
		width: 100%;
		aspect-ratio: 2 / 3;
		overflow: hidden;
	}

	.poster-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform 0.5s ease;
	}

	.poster:hover .poster-img img {
		transform: scale(1.04);
	}

	/* Pannello titolo sovrapposto: stesso principio di .block-text nella sezione
	   "chi siamo" — sfondo bianco solido che si accavalla sull'angolo in basso a
	   sinistra della locandina e sporge leggermente sotto, come ritagliato dalla pagina.
	   Rientrato a destra (right: 22%) così non copre tutta la larghezza. */
	.poster-meta {
		position: absolute;
		left: 0;
		right: 22%;
		top: calc(100% - 3.25rem);
		z-index: 2;
		background: #fff;
		padding: 1rem 1.25rem 0.4rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		transition: top 0.3s ease;
	}

	/* All'hover il pannello scivola un filo più su: l'overlap si accentua. */
	.poster:hover .poster-meta {
		top: calc(100% - 3.9rem);
	}

	.poster-section {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #777;
	}

	.poster h3 {
		font-size: 1.3rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin: 0;
	}

	/* ===================== EVENTI ===================== */
	.eventi-section {
		background: #0a0a0a;
		color: #fff;
		padding: 8rem 2.5rem;
	}

	.eventi-section .section-label {
		color: #fff;
		max-width: 1400px;
		margin: 0 auto 2rem;
	}

	.eventi-title {
		font-size: clamp(3rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0 auto 5rem;
		max-width: 1400px;
	}

	.eventi-grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem 2rem;
	}

	.evento {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.evento.offset {
		margin-top: 4rem;
	}

	.evento-img {
		width: 100%;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		background: #222;
	}

	.evento-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.evento:hover .evento-img img {
		transform: scale(1.04);
	}

	.evento-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #888;
	}

	.evento h3 {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0;
	}

	.evento p {
		font-size: 1rem;
		line-height: 1.55;
		margin: 0;
		color: #bbb;
	}

	/* ===================== NEWS ===================== */
	.news-section {
		max-width: 1400px;
		margin: 0 auto;
		padding: 8rem 2.5rem;
	}

	.news-head {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: 5rem;
	}

	.news-head .section-label {
		grid-column: 1 / -1;
		margin: 0 0 2rem;
	}

	.news-title {
		font-size: clamp(3rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.news-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem 2rem;
	}

	.news-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		transition: transform 0.3s ease;
	}

	.news-card:hover {
		transform: translateY(-4px);
	}

	.news-img {
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: #f4f4f4;
	}

	.news-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.5s ease;
	}

	.news-card:hover .news-img img {
		transform: scale(1.04);
	}

	.news-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #777;
		margin-top: 0.25rem;
	}

	.news-dot {
		opacity: 0.5;
	}

	.news-category {
		color: #0a0a0a;
	}

	.news-card h3 {
		font-size: clamp(1.25rem, 1.8vw, 1.6rem);
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 0;
	}

	.news-card p {
		font-size: 0.95rem;
		line-height: 1.55;
		margin: 0;
		color: #555;
	}

	.news-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 0.5rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #0a0a0a;
	}

	.news-cta .arrow {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.news-card:hover .news-cta {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}

	.news-card:hover .news-cta .arrow {
		transform: translateX(5px);
	}

	.news-card:hover h3 {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}

	/* ===================== CONTATTI (strip) ===================== */
	.contact-strip {
		max-width: 1400px;
		margin: 0 auto;
		padding: 5rem 2.5rem 6rem;
		border-top: 1px solid #0a0a0a;
	}

	.contact-strip .section-label {
		margin: 0 0 2.5rem;
	}

	/* ===================== CONTATTI ===================== */
	.contact-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
		gap: 0;
		margin-bottom: 3rem;
		border-top: 1px solid #0a0a0a;
		border-bottom: 1px solid #0a0a0a;
	}

	.contact-grid div {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 2rem 1.5rem;
		border-right: 1px solid #0a0a0a;
		min-width: 0;
	}

	.contact-grid div:first-child {
		padding-left: 0;
	}

	.contact-grid div:last-child {
		border-right: none;
		padding-right: 0;
	}

	.cap {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #666;
	}

	.contact-grid a,
	.contact-grid span:not(.cap) {
		font-size: clamp(0.95rem, 1.4vw, 1.25rem);
		font-weight: 900;
		letter-spacing: -0.02em;
		text-decoration: none;
		line-height: 1.2;
		word-break: break-word;
	}

	.contact-grid a:hover {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}

	/* ===================== BIGLIETTI & ACCREDITI ===================== */
	.biglietti-section {
		max-width: 1400px;
		margin: 0 auto;
		padding: 8rem 2.5rem;
	}

	.biglietti-head {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: 5rem;
	}

	.biglietti-head .section-label {
		grid-column: 1 / -1;
		margin: 0 0 2rem;
	}

	.biglietti-title {
		font-size: clamp(3rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.biglietti-intro {
		font-size: 1.15rem;
		line-height: 1.6;
		margin: 0;
		color: #333;
		max-width: 480px;
		padding-bottom: 1rem;
	}

	.biglietti-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border-top: 1px solid #0a0a0a;
		border-bottom: 1px solid #0a0a0a;
	}

	.biglietti-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
		padding: 3.5rem 2.5rem;
		border-right: 1px solid #0a0a0a;
		min-height: 460px;
	}

	.biglietti-card:last-child {
		border-right: none;
		padding-right: 0;
	}

	.biglietti-card:first-child {
		padding-left: 0;
	}

	.biglietti-card.primary {
		background: #0a0a0a;
		color: #fff;
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		border-right: none;
	}

	.card-top {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.card-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: #666;
	}

	.biglietti-card.primary .card-label {
		color: #999;
	}

	.biglietti-card h3 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 900;
		letter-spacing: -0.035em;
		line-height: 0.95;
		margin: 0;
	}

	.biglietti-card p {
		font-size: 1.05rem;
		line-height: 1.55;
		margin: 0;
		color: #333;
		max-width: 460px;
	}

	.biglietti-card.primary p {
		color: #bbb;
	}

	.big-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		align-self: flex-start;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.9rem;
		text-decoration: none;
		padding: 1rem 1.75rem;
		border: 2px solid currentColor;
		transition:
			background 0.3s ease,
			color 0.3s ease;
		color: #0a0a0a;
	}

	.big-cta.filled {
		background: #fff;
		color: #0a0a0a;
		border-color: #fff;
	}

	.big-cta:hover {
		background: #0a0a0a;
		color: #fff;
		border-color: #0a0a0a;
	}

	.biglietti-card.primary .big-cta.filled:hover {
		background: transparent;
		color: #fff;
		border-color: #fff;
	}

	.cta-arrow {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.big-cta:hover .cta-arrow {
		transform: translate(3px, -3px);
	}

	/* ===================== PARTNER (dark) ===================== */
	.partner-section {
		background: #0a0a0a;
		color: #fff;
		padding: 8rem 2.5rem;
	}

	.partner-inner {
		max-width: 1400px;
		margin: 0 auto;
	}

	.partner-head {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 4rem;
		align-items: end;
		margin-bottom: 5rem;
	}

	.partner-head .section-label {
		grid-column: 1 / -1;
		margin: 0 0 2rem;
	}

	.partner-title {
		font-size: clamp(3rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.partner-intro {
		font-size: 1.15rem;
		line-height: 1.6;
		margin: 0;
		color: #bbb;
		max-width: 480px;
		padding-bottom: 1rem;
	}

	.partner-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		border-left: 1px solid rgba(255, 255, 255, 0.2);
	}

	.partner-cell {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		aspect-ratio: 16 / 11;
		padding: 1.5rem;
		text-decoration: none;
		color: #fff;
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		transition:
			opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			color 0.45s cubic-bezier(0.16, 1, 0.3, 1);
		overflow: hidden;
		isolation: isolate;
	}

	.partner-grid:hover .partner-cell {
		opacity: 0.3;
	}

	.partner-cell:hover {
		opacity: 1 !important;
		background: #fff;
		color: #0a0a0a;
	}

	.partner-index {
		position: absolute;
		top: 0.85rem;
		left: 1rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.45);
		font-variant-numeric: tabular-nums;
		transition: color 0.45s ease;
	}

	.partner-cell:hover .partner-index {
		color: #666;
	}

	.partner-name {
		font-size: clamp(0.95rem, 1.35vw, 1.25rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.005em;
		line-height: 1.1;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		display: block;
		max-width: 15ch;
	}

	.partner-cell:hover .partner-name {
		transform: translateY(-6px);
	}

	.partner-logo {
		max-width: 55%;
		max-height: 56px;
		width: auto;
		height: auto;
		object-fit: contain;
		filter: brightness(0) invert(1);
		transition:
			filter 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.partner-cell:hover .partner-logo {
		filter: brightness(0);
		transform: translateY(-6px);
	}

	.partner-arrow {
		position: absolute;
		top: 0.75rem;
		right: 0.9rem;
		font-size: 0.9rem;
		opacity: 0;
		transform: translate(-6px, 6px);
		transition:
			opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.partner-cell:hover .partner-arrow {
		opacity: 1;
		transform: translate(0, 0);
	}

	/* CTA "Diventa partner" in coda alla sezione sponsor (sfondo scuro) */
	.partner-cta {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.partner-cta p {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0;
		color: #fff;
		max-width: 540px;
	}

	.partner-cta a {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.9rem;
		text-decoration: none;
		padding: 0.9rem 1.6rem;
		border: 2px solid #fff;
		color: #fff;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.partner-cta a:hover {
		background: #fff;
		color: #0a0a0a;
	}

	/* ===================== RESPONSIVE ===================== */
	@media (max-width: 900px) {
		.hero-content { padding: 2rem 1.5rem; gap: 1.5rem; }
		.hero-bottom { flex-direction: column-reverse; align-items: flex-start; gap: 1.75rem; }
		.hero-actions { align-items: flex-start; width: 100%; }
		.manifesto { grid-template-columns: 1fr; gap: 2rem; padding: 5rem 1.5rem; }
		.overlap-section,
		.overlap-section.dark { padding: 5rem 1.5rem; }
		.block-overlap {
			min-height: auto;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			margin-bottom: 3rem;
		}
		.block-image,
		.block-text {
			position: static;
			width: 100%;
		}
		.block-image {
			height: 55vh;
		}
		.block-text {
			background: transparent;
			padding: 0;
		}
		.two-col { grid-template-columns: 1fr; }
		.stats-band { grid-template-columns: repeat(2, 1fr); }
		.stat { padding: 2.5rem 1.5rem; }
		.stat:nth-child(2) { border-right: none; }
		.stat:nth-child(-n + 2) { border-bottom: 1px solid #0a0a0a; }
		.program-grid {
			grid-template-columns: 1fr;
			border-bottom: none;
		}
		.prog-item,
		.prog-item:first-child,
		.prog-item:last-child {
			padding: 2rem 0;
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		}
		.prog-item:last-child {
			border-bottom: none;
		}
		.film-section,
		.eventi-section { padding: 5rem 1.5rem; }
		.film-head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; }
		/* Locandine: slider orizzontale, scorrimento SOLO orizzontale, nessun movimento */
		.poster-grid {
			display: flex;
			gap: 1rem;
			overflow-x: auto;
			overflow-y: hidden;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
		}
		.poster-grid::-webkit-scrollbar { display: none; }
		.poster { flex: 0 0 60vw; scroll-snap-align: start; }
		.poster.tall { margin-top: 0; }
		.poster:hover { transform: none; }
		.poster:hover .poster-img img { transform: none; }
		.poster-meta {
			position: static;
			right: auto;
			background: transparent;
			padding: 0;
		}
		.poster:hover .poster-meta { top: auto; }
		/* Eventi speciali: stesso slider orizzontale */
		.eventi-grid {
			display: flex;
			gap: 1rem;
			overflow-x: auto;
			overflow-y: hidden;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
		}
		.eventi-grid::-webkit-scrollbar { display: none; }
		.evento { flex: 0 0 70vw; scroll-snap-align: start; }
		.evento.offset { margin-top: 0; }
		.evento:hover .evento-img img { transform: none; }
		.news-section { padding: 5rem 1.5rem; }
		.news-head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; }
		/* News: slider orizzontale come locandine ed eventi */
		.news-grid {
			display: flex;
			gap: 1rem;
			overflow-x: auto;
			overflow-y: hidden;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
		}
		.news-grid::-webkit-scrollbar { display: none; }
		.news-card { flex: 0 0 75vw; scroll-snap-align: start; }
		.news-card:hover { transform: none; }
		.news-card:hover .news-img img { transform: none; }
		.contact-grid {
			grid-template-columns: 1fr;
			border-bottom: none;
		}
		.partner-section { padding: 5rem 1.5rem; }
		.partner-head { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
		/* Partner: slider orizzontale, niente effetto hover-dim su mobile */
		.partner-grid {
			display: flex;
			gap: 0.75rem;
			overflow-x: auto;
			overflow-y: hidden;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			border: none;
		}
		.partner-grid::-webkit-scrollbar { display: none; }
		.partner-cell {
			flex: 0 0 46vw;
			scroll-snap-align: start;
			border: 1px solid rgba(255, 255, 255, 0.2);
		}
		.partner-grid:hover .partner-cell { opacity: 1; }
		.partner-cta { flex-direction: column; align-items: flex-start; }
		.biglietti-section { padding: 5rem 1.5rem; }
		.biglietti-head { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
		.biglietti-grid { grid-template-columns: 1fr; }
		.biglietti-card,
		.biglietti-card:first-child,
		.biglietti-card:last-child {
			border-right: none;
			border-bottom: 1px solid #0a0a0a;
			padding: 2.5rem 0;
			min-height: auto;
		}
		.biglietti-card:last-child {
			border-bottom: none;
		}
		.biglietti-card.primary {
			padding: 2.5rem 1.5rem;
			border-bottom: none;
		}
		.contact-grid div,
		.contact-grid div:first-child,
		.contact-grid div:last-child {
			padding: 1.5rem 0;
			border-right: none;
			border-bottom: 1px solid #0a0a0a;
		}
		.contact-grid div:last-child {
			border-bottom: none;
		}
	}

	@media (min-width: 901px) and (max-width: 1100px) {
		.program-grid,
		.contact-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.prog-item,
		.contact-grid div {
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			padding: 2rem 1.5rem;
		}
		.contact-grid div {
			border-bottom-color: #0a0a0a;
		}
		.prog-item:nth-child(odd),
		.contact-grid div:nth-child(odd) {
			border-right: 1px solid rgba(255, 255, 255, 0.2);
			padding-left: 0;
		}
		.contact-grid div:nth-child(odd) {
			border-right-color: #0a0a0a;
		}
		.prog-item:nth-child(even),
		.contact-grid div:nth-child(even) {
			padding-right: 0;
		}
		.prog-item:nth-last-child(-n + 2),
		.contact-grid div:nth-last-child(-n + 2) {
			border-bottom: none;
		}
	}

	/* ── Telefoni piccoli ─────────────────────────────────────────── */
	@media (max-width: 480px) {
		.hero-content { padding: 1.5rem 1.25rem; }
		.hero-title { font-size: clamp(2rem, 11vw, 3rem); }
		.hero-meta { gap: 0.35rem; font-size: 0.8rem; }

		.film-title,
		.eventi-title,
		.news-title,
		.biglietti-title,
		.partner-title {
			font-size: clamp(2.25rem, 12vw, 3.5rem);
			word-break: break-word;
			hyphens: auto;
		}

		.big-claim { font-size: clamp(2rem, 10vw, 3rem); }

		.manifesto,
		.overlap-section,
		.overlap-section.dark,
		.film-section,
		.eventi-section,
		.partner-section,
		.biglietti-section {
			padding: 3.5rem 1.25rem;
		}

		/* Locandine, eventi, partner e news restano slider orizzontali (vedi ≤900).
		   Le statistiche restano 2×2 compatte (eredita repeat(2,1fr) da ≤900),
		   così non diventano 4 righe altissime su telefono. */
		.stat { padding: 2rem 1rem; }
		.block-image { height: 42vh; }
	}
</style>
