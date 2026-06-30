<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { splitReveal } from '$lib/anim';
	import { t, locale } from '$lib/i18n';
	import Seo from '$lib/Seo.svelte';

	// Titolare e contatti: VERIFICARE con il cliente prima della pubblicazione
	// (in particolare l'indirizzo email per le richieste privacy).
	const PRIVACY_EMAIL = 'privacy@alicenellacitta.com';
	const LAST_UPDATED = { it: '30 giugno 2026', en: '30 June 2026' };
</script>

<Seo
	title={$locale === 'it'
		? 'Privacy — Alice nella Città'
		: 'Privacy — Alice nella Città'}
	description={$locale === 'it'
		? 'Informativa sul trattamento dei dati personali del sito di Alice nella Città.'
		: 'Privacy policy for the Alice nella Città website.'}
/>

<section class="page-hero-text">
	<p class="eyeshot">{$locale === 'it' ? 'Informativa' : 'Policy'}</p>
	{#key $locale}
		<h1 use:splitReveal={{ stagger: 80, duration: 1100 }}>Privacy</h1>
	{/key}
</section>

<section class="legal" use:reveal>
	{#if $locale === 'it'}
		<p class="lead">
			La presente informativa descrive come vengono trattati i dati personali degli utenti
			che visitano il sito di Alice nella Città, ai sensi del Regolamento (UE) 2016/679 (GDPR).
		</p>

		<h2>1. Titolare del trattamento</h2>
		<p>
			Il titolare del trattamento è <strong>Alice nella Città</strong>, con sede in Via Benaco 5,
			00199 Roma. Per qualsiasi richiesta relativa ai dati personali è possibile scrivere a
			<a href="mailto:{PRIVACY_EMAIL}">{PRIVACY_EMAIL}</a>.
		</p>

		<h2>2. Dati raccolti</h2>
		<p>
			Questo sito è una pagina informativa e <strong>non raccoglie dati attraverso moduli</strong>
			(non sono presenti form di contatto o iscrizione). Durante la navigazione, i sistemi del
			fornitore di hosting possono registrare automaticamente dati tecnici (es. indirizzo IP,
			tipo di browser, data e ora della richiesta) per finalità di funzionamento e sicurezza.
		</p>

		<h2>3. Finalità e base giuridica</h2>
		<p>
			I dati tecnici di navigazione sono trattati per consentire la corretta erogazione del sito
			e per garantirne la sicurezza, sulla base del legittimo interesse del titolare
			(art. 6.1.f GDPR).
		</p>

		<h2>4. Cookie</h2>
		<p>
			Il sito utilizza esclusivamente cookie tecnici necessari al suo funzionamento e
			<strong>non utilizza cookie di profilazione</strong>. Eventuali servizi di statistica o
			analisi verranno aggiunti a questa informativa qualora introdotti.
		</p>

		<h2>5. Servizi e link di terze parti</h2>
		<p>
			Il sito contiene collegamenti a servizi esterni — la biglietteria/accrediti
			(<strong>Clappit</strong>), la piattaforma di iscrizione opere (<strong>FilmFreeway</strong>)
			e gli assistenti AI (ChatGPT, Claude). Una volta seguito il collegamento, il trattamento dei
			dati avviene secondo le rispettive informative privacy, su cui il titolare non ha controllo.
		</p>

		<h2>6. Conservazione dei dati</h2>
		<p>
			I dati tecnici di navigazione sono conservati per il tempo strettamente necessario alle
			finalità indicate e nel rispetto degli obblighi di legge.
		</p>

		<h2>7. Diritti dell'interessato</h2>
		<p>
			In qualsiasi momento è possibile esercitare i diritti previsti dagli artt. 15-22 del GDPR
			(accesso, rettifica, cancellazione, limitazione, opposizione e portabilità) scrivendo a
			<a href="mailto:{PRIVACY_EMAIL}">{PRIVACY_EMAIL}</a>. È inoltre possibile proporre reclamo
			al Garante per la protezione dei dati personali.
		</p>

		<p class="updated">Ultimo aggiornamento: {LAST_UPDATED.it}</p>
	{:else}
		<p class="lead">
			This policy explains how the personal data of users visiting the Alice nella Città website
			is processed, in accordance with Regulation (EU) 2016/679 (GDPR).
		</p>

		<h2>1. Data controller</h2>
		<p>
			The data controller is <strong>Alice nella Città</strong>, based at Via Benaco 5,
			00199 Rome, Italy. For any request regarding your personal data you can write to
			<a href="mailto:{PRIVACY_EMAIL}">{PRIVACY_EMAIL}</a>.
		</p>

		<h2>2. Data we collect</h2>
		<p>
			This site is an informational page and <strong>does not collect data through forms</strong>
			(there are no contact or sign-up forms). While browsing, the hosting provider's systems may
			automatically log technical data (e.g. IP address, browser type, date and time of the
			request) for operational and security purposes.
		</p>

		<h2>3. Purposes and legal basis</h2>
		<p>
			Technical browsing data is processed to allow the proper delivery of the website and to
			ensure its security, on the basis of the controller's legitimate interest
			(Art. 6.1.f GDPR).
		</p>

		<h2>4. Cookies</h2>
		<p>
			The site uses only technical cookies necessary for its operation and
			<strong>does not use profiling cookies</strong>. Any statistics or analytics services will
			be added to this policy should they be introduced.
		</p>

		<h2>5. Third-party services and links</h2>
		<p>
			The site contains links to external services — the box office/accreditation
			(<strong>Clappit</strong>), the film submission platform (<strong>FilmFreeway</strong>)
			and AI assistants (ChatGPT, Claude). Once you follow a link, data is processed according to
			their respective privacy policies, over which the controller has no control.
		</p>

		<h2>6. Data retention</h2>
		<p>
			Technical browsing data is kept only for the time strictly necessary for the stated
			purposes and in compliance with legal obligations.
		</p>

		<h2>7. Your rights</h2>
		<p>
			At any time you may exercise the rights set out in Arts. 15-22 GDPR (access, rectification,
			erasure, restriction, objection and portability) by writing to
			<a href="mailto:{PRIVACY_EMAIL}">{PRIVACY_EMAIL}</a>. You also have the right to lodge a
			complaint with the Italian Data Protection Authority (Garante).
		</p>

		<p class="updated">Last updated: {LAST_UPDATED.en}</p>
	{/if}
</section>

<style>
	.page-hero-text {
		max-width: 900px;
		margin: 0 auto;
		padding: 5rem 2.5rem 2rem;
	}

	.eyeshot {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin: 0 0 1rem;
		color: #666;
	}

	.page-hero-text h1 {
		font-size: clamp(3rem, 9vw, 7rem);
		font-weight: 900;
		line-height: 0.9;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.legal {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 2.5rem 7rem;
	}

	.legal .lead {
		font-size: 1.2rem;
		line-height: 1.6;
		color: #333;
		margin: 0 0 3rem;
	}

	.legal h2 {
		font-size: 1.35rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin: 2.5rem 0 0.75rem;
	}

	.legal p {
		font-size: 1.05rem;
		line-height: 1.65;
		color: #333;
		margin: 0 0 1rem;
	}

	.legal a {
		color: #0a0a0a;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.legal a:hover {
		opacity: 0.6;
	}

	.legal .updated {
		margin-top: 3rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #888;
	}

	@media (max-width: 600px) {
		.page-hero-text {
			padding: 3.5rem 1.5rem 1.5rem;
		}
		.legal {
			padding: 1.5rem 1.5rem 4.5rem;
		}
	}
</style>
