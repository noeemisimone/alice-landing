<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { t, locale, setLocale, initLocale, type Locale } from '$lib/i18n';
	import { reveal } from '$lib/reveal';
	import { TICKETS_URL } from '$lib/festival-images';

	let { children } = $props();

	// Logo col bollino giallo del festival (ritagliato senza date), in static/.
	const LOGO_URL = '/images/logo-bollino.png';

	// Gli unici 2 link esterni del contenuto: accrediti (Clappit) e iscrivi
	// la tua opera (FilmFreeway). TICKETS_URL è condiviso con la home.
	const FILMFREEWAY_URL = 'https://filmfreeway.com/alicenellacitta';
	// Prompt pre-compilato per le icone AI (ChatGPT / Claude). Modificalo qui.
	const AI_PROMPT =
		"Raccontami la storia di Alice nella Città, il festival cinematografico romano dedicato ai giovani. Come è nato, chi lo ha fondato, com'è cresciuto nel tempo e qual è il suo ruolo oggi nel panorama del cinema internazionale?";
	const CHATGPT_URL = `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`;
	const CLAUDE_URL = `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}`;

	// Scala la wordmark gigante finché riempie la larghezza disponibile su una riga.
	function fitText(node: HTMLElement) {
		const fit = () => {
			const parent = node.parentElement;
			if (!parent) return;
			const available = parent.clientWidth;
			const natural = node.getBoundingClientRect().width;
			if (!available || !natural) return;
			const current = parseFloat(getComputedStyle(node).fontSize) || 100;
			node.style.fontSize = (current * available) / natural - 0.5 + 'px';
		};
		const raf = () => requestAnimationFrame(fit);
		raf();
		if (document.fonts?.ready) document.fonts.ready.then(raf);
		const ro = new ResizeObserver(raf);
		if (node.parentElement) ro.observe(node.parentElement);
		return { destroy: () => ro.disconnect() };
	}

	// Ombra della navbar: compare appena si inizia a scrollare, così resta
	// distinguibile sul contenuto chiaro senza una linea sempre presente.
	let scrolled = $state(false);

	// Altezza reale dell'header → variabile CSS --header-h. Evita lo spazio bianco
	// tra navbar fissa e contenuto: il fallback CSS non combaciava su mobile.
	let headerH = $state(0);
	$effect(() => {
		if (typeof document !== 'undefined' && headerH) {
			document.documentElement.style.setProperty('--header-h', `${headerH}px`);
		}
	});

	// Menu mobile: stato apertura. Su desktop il menu è sempre visibile (CSS),
	// questo stato controlla solo l'overlay sotto i 768px.
	let menuOpen = $state(false);

	function switchLocale(loc: Locale) {
		setLocale(loc);
		menuOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	// Blocca lo scroll del body quando il menu mobile è aperto.
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Chiude il menu quando cambia rotta/hash (navigazione interna).
	$effect(() => {
		page.url.pathname;
		page.url.hash;
		menuOpen = false;
	});

	onMount(() => {
		// Apply the visitor's locale after hydration (see initLocale): doing it
		// here, as a runtime change, is what makes the keyed {@html} titles switch
		// language for visitors landing directly in English.
		initLocale();

		const hash = window.location.hash;
		if (hash && window.location.pathname === '/') {
			setTimeout(() => {
				const el = document.querySelector(hash);
				el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 80);
		}

		const onScroll = () => (scrolled = window.scrollY > 4);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app">
	<header class:scrolled bind:clientHeight={headerH}>
		<a class="brand" href="/" aria-label={$t('footer.home_label')}>
			<img src={LOGO_URL} alt="Alice nella Città" />
		</a>

		<div class="header-end">
			<nav id="primary-nav" class:is-open={menuOpen}>
				<!-- Iscrivi la tua opera → FilmFreeway (link esterno, stile testo) -->
				<a href={FILMFREEWAY_URL} target="_blank" rel="noopener" onclick={closeMenu}>
					{$locale === 'it' ? 'Iscrivi la tua opera' : 'Submit your film'}
				</a>

				<!-- Richiedi il tuo accredito → Clappit (link esterno, stile bottone) -->
				<a
					class="primary-nav"
					href={TICKETS_URL}
					target="_blank"
					rel="noopener"
					onclick={closeMenu}
				>
					{$locale === 'it' ? 'Richiedi il tuo accredito' : 'Request accreditation'}
				</a>
			</nav>

			<!-- IT/EN: sempre visibile nella barra (anche su mobile, fuori dal menu) -->
			<div class="locale-switch" role="group" aria-label="Language switch">
				<button
					type="button"
					onclick={() => switchLocale('it')}
					class:active={$locale === 'it'}
					aria-label="Italiano"
					aria-pressed={$locale === 'it'}
				>
					IT
				</button>
				<span aria-hidden="true">/</span>
				<button
					type="button"
					onclick={() => switchLocale('en')}
					class:active={$locale === 'en'}
					aria-label="English"
					aria-pressed={$locale === 'en'}
				>
					EN
				</button>
			</div>

			<button
				type="button"
				class="menu-toggle"
				class:is-open={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
				aria-expanded={menuOpen}
				aria-controls="primary-nav"
			>
				<span class="menu-bar"></span>
				<span class="menu-bar"></span>
				<span class="menu-bar"></span>
			</button>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="footer-flim">
		<!-- Banda nera: blocco "Chiedi all'AI" -->
		<div class="ff-top">
			<div class="ff-connect">
				<div class="ff-connect-block">
					<p class="ff-col-label" use:reveal>{$locale === 'it' ? 'Chiedi all’AI' : 'Ask AI'}</p>
					<div class="ff-socials" use:reveal>
						<!-- ChatGPT (OpenAI): apre ChatGPT col prompt pre-compilato -->
						<a
							href={CHATGPT_URL}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Chiedi a ChatGPT la storia di Alice nella Città"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9a6.0651 6.0651 0 0 0-10.3185 2.5731 5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
							</svg>
						</a>

						<!-- Claude (Anthropic): apre Claude col prompt pre-compilato -->
						<a
							href={CLAUDE_URL}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Chiedi a Claude la storia di Alice nella Città"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M17.3041 3.541h-3.6718l6.696 16.918H24L17.3041 3.541zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.541H6.6959zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456H6.3247z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright + note legali -->
		<div class="ff-copy" use:reveal>
			<span>© Alice nella Città, {$t('footer.copyright')}, {new Date().getFullYear()}</span>
		</div>

		<!-- Wordmark gigante -->
		<div class="ff-wordmark" aria-hidden="true">
			<span class="ff-line" use:fitText use:reveal={{ distance: 30, duration: 1100, delay: 420 }}>
				Alice <em>nella</em> Città
			</span>
		</div>
	</footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
		--header-h: 108px;
		/* Gli anchor si fermano sotto la navbar fissa, non nascosti dietro. */
		scroll-padding-top: var(--header-h);
	}

	@media (max-width: 640px) {
		:global(html) {
			--header-h: 92px;
		}
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		/* Protezione anti-sbordamento orizzontale su mobile */
		overflow-x: hidden;
		max-width: 100%;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		color: #0a0a0a;
		background: #ffffff;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(a) {
		color: inherit;
	}

	:global(em) {
		font-family: 'Playfair Display', Georgia, serif;
		font-style: italic;
		font-weight: 400;
	}

	/* ── Word-mask reveal (split text rising from a line) ────────── */
	:global(.word-mask) {
		display: inline-block;
		overflow: hidden;
		vertical-align: bottom;
		padding-bottom: 0.18em;
		line-height: inherit;
	}

	:global(.word-inner) {
		display: inline-block;
		transform: translate3d(0, 110%, 0);
		transition: transform cubic-bezier(0.7, 0, 0.15, 1);
		will-change: transform;
	}

	:global(.split-reveal.is-visible .word-inner) {
		transform: translate3d(0, 0, 0);
	}

	/* ── Scroll-driven text fill (manifesto claim) ───────────────── */
	:global(.scroll-fill) {
		background-image: linear-gradient(
			to right,
			#0a0a0a 0%,
			#0a0a0a var(--fill-progress, 0%),
			rgba(10, 10, 10, 0.12) var(--fill-progress, 0%),
			rgba(10, 10, 10, 0.12) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
	}

	/* ── Reveal-on-scroll (simple fade-up fallback) ───────────────── */
	:global(.reveal) {
		opacity: 0;
		transform: translate3d(0, var(--reveal-distance, 40px), 0);
		transition:
			opacity var(--reveal-duration, 900ms) cubic-bezier(0.16, 1, 0.3, 1)
				var(--reveal-delay, 0ms),
			transform var(--reveal-duration, 900ms) cubic-bezier(0.16, 1, 0.3, 1)
				var(--reveal-delay, 0ms);
		will-change: opacity, transform;
	}

	:global(.reveal.is-visible) {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	/* Ken-Burns subtle zoom on hero/page-hero images */
	:global(.hero img),
	:global(.page-hero img) {
		animation: kenburns 24s ease-out forwards;
	}

	@keyframes kenburns {
		from {
			transform: scale(1.02);
		}
		to {
			transform: scale(1.1);
		}
	}

	/* Hero meta + label fade-up on mount (title handled by splitReveal) */
	:global(.hero-top),
	:global(.page-hero .eyeshot) {
		animation: heroIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	:global(.hero-bottom) {
		animation: heroIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
	}

	@keyframes heroIn {
		from {
			opacity: 0;
			transform: translate3d(0, 30px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.hero img),
		:global(.page-hero img),
		:global(.hero-top),
		:global(.hero-bottom),
		:global(.page-hero .eyeshot) {
			animation: none;
		}
		:global(.word-inner) {
			transform: translate3d(0, 0, 0) !important;
		}
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 2.5rem;
		/* Fissa in alto sempre. Non uso position: sticky perché viene rotta da
		   overflow-x: hidden su html/body; fixed + padding-top su main è affidabile. */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		background: #ffffff;
		z-index: 100;
		transition: box-shadow 0.25s ease;
	}

	header.scrolled {
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.brand img {
		height: clamp(64px, 7.5vw, 96px);
		width: auto;
		display: block;
	}

	.brand:hover {
		opacity: 0.75;
	}

	/* Bottone hamburger: nascosto su desktop, mostrato ≤768px */
	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		padding: 0;
		margin: -0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		z-index: 110;
	}

	.menu-bar {
		display: block;
		width: 26px;
		height: 2px;
		background: #0a0a0a;
		margin: 0 auto;
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.2s ease;
	}

	.menu-toggle.is-open .menu-bar:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.menu-toggle.is-open .menu-bar:nth-child(2) {
		opacity: 0;
	}

	.menu-toggle.is-open .menu-bar:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Gruppo destro della barra: nav + lingua + hamburger */
	.header-end {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	nav {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	nav a {
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding-bottom: 2px;
		border-bottom: 2px solid transparent;
		transition: border-color 0.15s ease;
	}

	nav a:hover {
		border-bottom-color: #0a0a0a;
	}

	nav a.primary-nav {
		background: #0a0a0a;
		color: #fff;
		padding: 0.5rem 0.95rem;
		border-bottom: none !important;
		transition:
			background 0.25s ease,
			transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	nav a.primary-nav:hover {
		background: #333;
		transform: translateY(-1px);
	}

	.locale-switch {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-left: 0.5rem;
		padding-left: 1rem;
		border-left: 1px solid #d4d4d4;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.locale-switch button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: #999;
		cursor: pointer;
		transition: color 0.2s ease;
		letter-spacing: inherit;
	}

	.locale-switch button:hover,
	.locale-switch button.active {
		color: #0a0a0a;
	}

	.locale-switch span {
		color: #ccc;
	}

	main {
		flex: 1;
		width: 100%;
		/* Compensa l'header fixed così il contenuto non finisce sotto la navbar. */
		padding-top: var(--header-h, 108px);
	}

	/* ===================== FOOTER (flim, editoriale) ===================== */
	.footer-flim {
		background: #ffffff;
		padding: 3rem 2.5rem 2rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Banda nera a tutta larghezza: sfonda il padding del footer e lo re-inserisce */
	.ff-top {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: start;
		gap: 3rem 6rem;
		text-align: center;
		background: #0a0a0a;
		color: #fff;
		margin: -3rem -2.5rem 0;
		padding: 4rem 2.5rem 4.5rem;
	}

	/* Colonna destra: "Seguici" e "Chiedi all'AI" impilati e separati */
	.ff-connect {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.25rem;
	}

	.ff-col-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: #fff;
		margin: 0 0 1.4rem;
	}

	/* Riga di icone social (orizzontale) — incluse ChatGPT e Claude */
	.ff-socials {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.1rem;
		flex-wrap: wrap;
		margin-top: 0.2rem;
	}

	.ff-socials a {
		display: inline-flex;
		color: #fff;
		transition:
			opacity 0.2s ease,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.ff-socials a:hover {
		opacity: 0.55;
		transform: translateY(-3px);
	}

	.ff-socials svg {
		width: 22px;
		height: 22px;
		display: block;
	}

	.ff-copy {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #0a0a0a;
		margin: 0;
		padding: 1.25rem 0 3.5rem;
		border-top: 1px solid rgba(10, 10, 10, 0.12);
	}

	/* Wordmark gigante che riempie la larghezza (font scalato via fitText) */
	.ff-wordmark {
		display: block;
		font-weight: 900;
		letter-spacing: -0.045em;
		line-height: 0.72;
		color: #0a0a0a;
		user-select: none;
		margin: 0 -2.5rem -2rem;
	}

	.ff-line {
		display: inline-block;
		vertical-align: bottom;
		white-space: nowrap;
		line-height: 0.72;
		font-size: 9.5vw;
	}

	/* ── Tablet/Mobile: menu hamburger + overlay ─────────────────── */
	@media (max-width: 768px) {
		header {
			padding: 1rem 1.5rem;
		}

		.menu-toggle {
			display: flex;
		}

		/* Il nav diventa un pannello overlay a tutto schermo */
		nav {
			position: fixed;
			inset: 0;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 2rem;
			background: #ffffff;
			padding: var(--header-h) 1.5rem 2rem;
			transform: translateX(100%);
			transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			z-index: 105;
		}

		nav.is-open {
			transform: translateX(0);
		}

		nav a {
			font-size: 1.5rem;
			border-bottom: none;
			padding-bottom: 0;
		}

		nav a:hover {
			border-bottom: none;
			opacity: 0.6;
		}

		nav a.primary-nav {
			padding: 0.85rem 2rem;
			font-size: 1.25rem;
		}

		/* Su mobile riduco il gruppo destro: lingua + hamburger restano in barra */
		.header-end {
			gap: 1rem;
		}

		/* IT/EN resta nella barra (non nell'overlay) e sopra di esso, sempre cliccabile */
		.locale-switch {
			margin-left: 0;
			padding-left: 0;
			border-left: none;
			font-size: 0.9rem;
			gap: 0.5rem;
			position: relative;
			z-index: 111;
		}
	}

	@media (max-width: 900px) {
		.ff-top {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}

	@media (max-width: 480px) {
		header {
			padding: 0.85rem 1.25rem;
		}

		.footer-flim {
			/* padding-bottom dà aria sotto la wordmark gigante: con line-height 0.72
			   le lettere sforano il loro box e, senza questo spazio, l'overflow:hidden
			   del footer le taglierebbe in basso su mobile. */
			padding: 2rem 1.5rem 1rem;
		}
		.ff-top {
			margin: -2rem -1.5rem 0;
			padding: 2.5rem 1.5rem 3rem;
		}
		.ff-wordmark {
			margin: 0 -1.5rem;
		}
	}

	/* Su desktop il menu resta sempre visibile anche se menuOpen è true */
	@media (min-width: 769px) {
		nav {
			transform: none !important;
		}
	}
</style>
