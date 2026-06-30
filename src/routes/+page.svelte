<script lang="ts">
	import { onMount } from 'svelte';
	import { editorial, TICKETS_URL } from '$lib/festival-images';
	import { reveal } from '$lib/reveal';
	import { splitReveal } from '$lib/anim';
	import Seo from '$lib/Seo.svelte';
	import { SITE_URL, DEFAULT_OG_IMAGE } from '$lib/seo';
	import { t, locale } from '$lib/i18n';

	// Gli unici 2 link esterni del contenuto: accrediti (Clappit, TICKETS_URL)
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

	// Landing minimale: la home è ridotta a Hero + blocco 2 CTA (Accrediti /
	// Iscrivi la tua opera). Tutte le altre sezioni sono state rimosse.
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
				<!-- Edizione + date in evidenza (richiesta cliente): la data esatta va
				     aggiornata in i18n hero.meta_date quando definitiva. -->
				<div class="hero-dates">
					<span class="hero-edition">{$t('hero.meta_edition')}</span>
					<span class="hero-when">{$t('hero.meta_date')} · {$t('hero.meta_city')}</span>
				</div>
				<a class="scroll-cue" href="#biglietti">{$t('common.scroll')} <span class="arrow">↓</span></a>
			</div>

			<!-- CTA subito disponibili: stessi 2 link esterni del sito -->
			<div class="hero-actions">
				<a class="hero-link" href={FILMFREEWAY_URL} target="_blank" rel="noopener">
					{$locale === 'it' ? 'Iscrivi la tua opera' : 'Submit your film'}
					<span class="hero-arrow">↗</span>
				</a>
				<a class="hero-btn" href={TICKETS_URL} target="_blank" rel="noopener">
					{$locale === 'it' ? 'Richiedi il tuo accredito' : 'Request accreditation'}
					<span class="hero-arrow">↗</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ─────────────────────── ACCREDITI & ISCRIZIONI (2 CTA) ─────────────────────── -->
<section class="biglietti-section" id="biglietti">
	<div class="biglietti-grid">
		<!-- CTA 1 — Accrediti → Clappit -->
		<article class="biglietti-card primary" use:reveal={{ delay: 0, distance: 50 }}>
			<div class="card-top">
				<span class="card-label">{$locale === 'it' ? 'Pubblico' : 'Audience'}</span>
				<h3>{$locale === 'it' ? 'Accrediti' : 'Accreditation'}</h3>
			</div>
			<p>
				{$locale === 'it'
					? 'Richiedi il tuo accredito per partecipare alle proiezioni e agli eventi del festival.'
					: 'Request your accreditation to attend the festival’s screenings and events.'}
			</p>
			<a class="big-cta filled" href={TICKETS_URL} target="_blank" rel="noopener">
				{$locale === 'it' ? 'Richiedi il tuo accredito' : 'Request accreditation'}
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
					? 'Sono aperte le iscrizioni per la selezione di lungometraggi e cortometraggi.'
					: 'Submissions are open for the feature and short film selection.'}
			</p>
			<a class="big-cta" href={FILMFREEWAY_URL} target="_blank" rel="noopener">
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

	.eyeshot {
		font-size: 0.95rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin: 0;
	}

	.hero-title {
		/* Testo più ravvicinato (richiesta cliente): righe più compatte. */
		margin: auto 0 0;
		font-size: clamp(2.5rem, 9vw, 8rem);
		font-weight: 900;
		line-height: 0.82;
		letter-spacing: -0.05em;
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

	/* Edizione + date in evidenza sul video */
	.hero-dates {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.hero-edition {
		font-size: clamp(1.15rem, 2.4vw, 1.8rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1;
	}

	.hero-when {
		font-size: clamp(1rem, 1.7vw, 1.35rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		line-height: 1;
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

	/* ===================== ACCREDITI & ISCRIZIONI (2 CTA) ===================== */
	.biglietti-section {
		max-width: 1400px;
		margin: 0 auto;
		padding: 8rem 2.5rem;
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

	/* La card destra mantiene il suo bordo destro così il blocco resta chiuso. */
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

	/* ===================== RESPONSIVE ===================== */
	@media (max-width: 900px) {
		.hero-content { padding: 2rem 1.5rem; gap: 1.5rem; }
		.hero-bottom { flex-direction: column-reverse; align-items: flex-start; gap: 1.75rem; }
		.hero-actions { align-items: flex-start; width: 100%; }
		.biglietti-section { padding: 5rem 1.5rem; }
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
	}

	/* ── Telefoni piccoli ─────────────────────────────────────────── */
	@media (max-width: 480px) {
		.hero-content { padding: 1.5rem 1.25rem; }
		.hero-title { font-size: clamp(2rem, 11vw, 3rem); }
		.biglietti-section { padding: 3.5rem 1.25rem; }
		.biglietti-card h3 {
			font-size: clamp(2.25rem, 12vw, 3.5rem);
			word-break: break-word;
			hyphens: auto;
		}
	}
</style>
