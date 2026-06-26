<script lang="ts">
	import { page } from '$app/state';
	import { locale } from '$lib/i18n';
	import { SITE_URL, DEFAULT_OG_IMAGE } from '$lib/seo';

	// Componente SEO riutilizzabile: centralizza title, description, Open Graph,
	// Twitter card, canonical e (opzionale) JSON-LD. Va usato una volta per pagina.
	let {
		title,
		description,
		image = DEFAULT_OG_IMAGE,
		type = 'website',
		jsonLd = null
	}: {
		title: string;
		description: string;
		image?: string;
		type?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		jsonLd?: any;
	} = $props();

	// Canonical/og:url assoluti basati sul percorso corrente.
	const canonical = $derived(SITE_URL + page.url.pathname);
	const ogLocale = $derived($locale === 'it' ? 'it_IT' : 'en_US');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Alice nella Città" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:locale" content={ogLocale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
	{/if}
</svelte:head>
