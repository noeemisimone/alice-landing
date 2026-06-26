<script lang="ts">
	import { editorial } from '$lib/festival-images';
	import { reveal } from '$lib/reveal';
	import { splitReveal, clipReveal } from '$lib/anim';
	import { t, locale } from '$lib/i18n';
	import Seo from '$lib/Seo.svelte';

	type Section = { title: string; body?: string; body_html?: string };
</script>

<Seo
	title="{$t('page_chi_siamo.eyeshot')} — Alice nella Città"
	description={$locale === 'it'
		? 'Chi è Alice nella Città: storia, missione e identità della sezione della Festa del Cinema di Roma dedicata ai giovani e alle nuove generazioni.'
		: 'About Alice nella Città: history, mission and identity of the Rome Film Fest section dedicated to young people and new generations.'}
/>

<section class="page-hero">
	<img src={editorial.chiSiamoBg} alt="Festival" fetchpriority="high" />
	<div class="hero-gradient"></div>
	<div class="hero-text">
		<p class="eyeshot">{$t('page_chi_siamo.eyeshot')}</p>
		{#key $locale}
			<h1 use:splitReveal={{ stagger: 80, duration: 1200 }}>
				{@html $t('page_chi_siamo.title_html')}
			</h1>
		{/key}
	</div>
</section>

<section class="page">
	<p class="lead" use:reveal>{$t('page_chi_siamo.lead')}</p>

	<div class="stats">
		<div use:reveal={{ delay: 0 }}>
			<span class="number">XXIV</span>
			<span class="caption">{$t('stats.editions')}</span>
		</div>
		<div use:reveal={{ delay: 100 }}>
			<span class="number">200+</span>
			<span class="caption">{$t('stats.films')}</span>
		</div>
		<div use:reveal={{ delay: 200 }}>
			<span class="number">2002</span>
			<span class="caption">{$t('stats.founded')}</span>
		</div>
	</div>

	<div class="block-overlap reverse">
		<div class="block-image" use:clipReveal={{ direction: 'right' }}>
			<img src={editorial.manifesto} alt="Manifesto" loading="lazy" />
		</div>
		<div class="block-text" use:reveal={{ delay: 120 }}>
			{#key $locale}
				<h2 class="block-title" use:splitReveal={{ stagger: 90 }}>
					{@html $t('page_chi_siamo.overlap_title_html')}
				</h2>
			{/key}
		</div>
	</div>

	<div class="text">
		{#each $t<Section[]>('page_chi_siamo.sections') as section, i (i)}
			<div use:reveal={{ delay: i * 120 }}>
				<h3>{section.title}</h3>
				<p>{@html section.body_html ?? section.body ?? ''}</p>
			</div>
		{/each}
	</div>

	<div class="image-band" use:clipReveal={{ direction: 'bottom', duration: 1200 }}>
		<img src={editorial.contattiBg} alt="Fuori Sala" loading="lazy" />
	</div>
</section>

<style>
	.page-hero {
		position: relative;
		width: 100%;
		height: clamp(420px, 70vh, 720px);
		background: #0a0a0a;
		overflow: hidden;
		color: #fff;
	}

	.page-hero img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.4) 0%,
			rgba(0, 0, 0, 0.1) 40%,
			rgba(0, 0, 0, 0.85) 100%
		);
	}

	.hero-text {
		position: absolute;
		bottom: 3rem;
		left: 2.5rem;
		right: 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.eyeshot {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin: 0 0 1.5rem;
	}

	h1 {
		font-size: clamp(3rem, 10vw, 8rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.04em;
		margin: 0;
	}

	.page {
		padding: 5rem 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.lead {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.02em;
		max-width: 900px;
		margin: 0 0 4rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		padding: 3rem 0;
		border-top: 1px solid #0a0a0a;
		border-bottom: 1px solid #0a0a0a;
		margin-bottom: 5rem;
	}

	.stats div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.number {
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.caption {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #666;
	}

	/* Due rettangoli solidi che si sovrappongono in un angolo.
	   Variante reverse: immagine a destra, testo a sinistra. */
	.block-overlap {
		position: relative;
		min-height: 580px;
		margin-bottom: 4rem;
	}

	.block-image {
		position: absolute;
		top: 90px;
		left: 38%;
		right: 0;
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
		left: 0;
		right: 50%;
		background: #ffffff;
		padding: 2.5rem 3rem 2.75rem 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.block-title {
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 900;
		line-height: 0.92;
		letter-spacing: -0.04em;
		margin: 0;
		color: #0a0a0a;
	}

	.text {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem 4rem;
		max-width: 1100px;
		margin-bottom: 5rem;
	}

	.text h3 {
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin: 0 0 1rem;
	}

	.text p {
		font-size: 1.05rem;
		line-height: 1.6;
		margin: 0;
		color: #333;
	}

	.image-band {
		width: calc(100% + 5rem);
		margin-left: -2.5rem;
		height: clamp(280px, 50vh, 540px);
		overflow: hidden;
		background: #0a0a0a;
	}

	.image-band img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.hero-text { bottom: 2rem; left: 1.5rem; right: 1.5rem; }
		.page { padding: 3rem 1.5rem; }
		.stats { grid-template-columns: 1fr; gap: 1.5rem; padding: 2rem 0; }
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
		.text { grid-template-columns: 1fr; }
		.image-band {
			width: calc(100% + 3rem);
			margin-left: -1.5rem;
		}
	}

	@media (max-width: 480px) {
		.page { padding: 2.5rem 1.25rem; }
		.block-title { font-size: clamp(2rem, 11vw, 3rem); }
		.block-image { height: 42vh; }
		.image-band {
			width: calc(100% + 2.5rem);
			margin-left: -1.25rem;
		}
	}
</style>
