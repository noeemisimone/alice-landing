<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { splitReveal } from '$lib/anim';
	import { locale } from '$lib/i18n';
	import Seo from '$lib/Seo.svelte';

	const EMAIL = 'segreteriaalice@gmail.com';
	const LAST_UPDATED = { it: '26 giugno 2026', en: '26 June 2026' };
</script>

<Seo
	title="Privacy Policy — Alice nella Città"
	description={$locale === 'it'
		? 'Informativa sul trattamento dei dati personali del sito di Alice nella Città.'
		: 'Privacy policy for the Alice nella Città website.'}
/>

<section class="page-hero-text">
	<p class="eyeshot">{$locale === 'it' ? 'Informativa' : 'Policy'}</p>
	{#key $locale}
		<h1 use:splitReveal={{ stagger: 80, duration: 1100 }}>Privacy Policy</h1>
	{/key}
</section>

<section class="legal" use:reveal>
	{#if $locale === 'it'}
		<p class="updated">Ultimo aggiornamento: {LAST_UPDATED.it}</p>

		<p class="lead">
			L'Associazione Culturale Playtown Roma (di seguito, il «Titolare»), ai sensi del Regolamento
			(UE) 2016/679 («GDPR»), informa gli utenti del sito www.alicenellacitta.com sulle modalità
			di trattamento dei dati personali effettuato durante la navigazione e l'utilizzo dei servizi
			offerti.
		</p>

		<h2>1. Titolare del trattamento</h2>
		<p>
			Associazione Culturale Playtown Roma<br />
			Via Benaco, 5<br />
			00199 Roma (RM) – Italia<br />
			P. IVA 05734111007<br />
			E-mail: <a href="mailto:{EMAIL}">{EMAIL}</a>
		</p>

		<h2>2. Tipologie di dati trattati</h2>
		<p>Durante la navigazione del sito possono essere trattati:</p>
		<ul>
			<li>
				dati tecnici necessari al funzionamento del sito (quali indirizzo IP, tipo di browser,
				sistema operativo, data e ora della richiesta);
			</li>
			<li>
				dati forniti volontariamente dall'utente per l'iscrizione alla newsletter (indirizzo
				e-mail).
			</li>
		</ul>
		<p>
			Il sito non prevede la registrazione di account utenti, aree riservate o servizi di commercio
			elettronico.
		</p>

		<h2>3. Finalità del trattamento</h2>
		<p>I dati personali sono trattati per le seguenti finalità:</p>
		<ul>
			<li>garantire il corretto funzionamento e la sicurezza del sito;</li>
			<li>
				raccogliere statistiche aggregate e anonime sull'utilizzo del sito mediante Vercel
				Analytics;
			</li>
			<li>
				inviare newsletter e comunicazioni informative agli utenti che abbiano espresso il proprio
				consenso.
			</li>
		</ul>

		<h2>4. Base giuridica del trattamento</h2>
		<p>Il trattamento è effettuato:</p>
		<ul>
			<li>
				sulla base dell'interesse legittimo del Titolare per garantire il funzionamento e la
				sicurezza del sito;
			</li>
			<li>sulla base del consenso dell'interessato per l'iscrizione alla newsletter.</li>
		</ul>

		<h2>5. Newsletter</h2>
		<p>
			L'iscrizione alla newsletter è libera e facoltativa. Per l'invio delle comunicazioni il
			Titolare utilizza la piattaforma Brevo, che tratta i dati in qualità di Responsabile del
			trattamento ai sensi dell'art. 28 del GDPR. L'utente può revocare il consenso in qualsiasi
			momento utilizzando il link di disiscrizione presente in ogni newsletter oppure scrivendo
			all'indirizzo e-mail del Titolare.
		</p>

		<h2>6. Statistiche di utilizzo</h2>
		<p>
			Il sito utilizza Vercel Analytics esclusivamente in modalità cookie-free, al fine di
			raccogliere dati statistici aggregati sull'utilizzo del sito. Questo servizio non utilizza
			cookie né altre tecnologie di tracciamento destinate alla profilazione degli utenti e viene
			impiegato esclusivamente per analizzare le prestazioni e migliorare il sito.
		</p>

		<h2>7. Modalità del trattamento</h2>
		<p>
			I dati sono trattati con strumenti informatici e telematici, adottando misure di sicurezza
			adeguate a proteggerli da accessi non autorizzati, perdita, modifica o divulgazione.
		</p>

		<h2>8. Conservazione dei dati</h2>
		<p>
			I dati personali sono conservati per il tempo strettamente necessario al perseguimento delle
			finalità indicate. I dati relativi alla newsletter saranno conservati fino alla revoca del
			consenso da parte dell'interessato.
		</p>

		<h2>9. Destinatari dei dati</h2>
		<p>
			I dati potranno essere trattati da soggetti che forniscono servizi indispensabili al
			funzionamento del sito, tra cui:
		</p>
		<ul>
			<li>il fornitore dell'infrastruttura di hosting;</li>
			<li>Vercel Inc., quale fornitore della piattaforma di hosting e del servizio Analytics;</li>
			<li>Brevo, per la gestione della newsletter.</li>
		</ul>
		<p>
			Tali soggetti operano, ove previsto, in qualità di Responsabili del trattamento ai sensi
			dell'art. 28 del GDPR.
		</p>

		<h2>10. Trasferimento dei dati</h2>
		<p>
			Qualora i dati siano trattati da fornitori situati al di fuori dello Spazio Economico Europeo,
			il trasferimento avverrà nel rispetto delle garanzie previste dagli articoli 44 e seguenti del
			GDPR.
		</p>

		<h2>11. Diritti dell'interessato</h2>
		<p>
			Gli utenti possono esercitare in qualsiasi momento i diritti previsti dagli articoli 15-22 del
			GDPR, tra cui:
		</p>
		<ul>
			<li>accesso ai propri dati personali;</li>
			<li>rettifica dei dati inesatti;</li>
			<li>cancellazione dei dati («diritto all'oblio»);</li>
			<li>limitazione del trattamento;</li>
			<li>opposizione al trattamento nei casi previsti dalla legge;</li>
			<li>portabilità dei dati;</li>
			<li>revoca del consenso prestato.</li>
		</ul>
		<p>Le richieste possono essere inviate a: <a href="mailto:{EMAIL}">{EMAIL}</a></p>
		<p>
			Gli interessati hanno inoltre il diritto di proporre reclamo all'Autorità Garante per la
			Protezione dei Dati Personali.
		</p>

		<h2>12. Cookie</h2>
		<p>
			Il sito non utilizza cookie di profilazione né cookie analitici di terze parti. Le statistiche
			di utilizzo sono raccolte tramite Vercel Analytics in modalità cookie-free. Qualora in futuro
			vengano introdotti cookie o strumenti di tracciamento soggetti al consenso dell'utente, la
			presente informativa sarà aggiornata e saranno adottate le misure previste dalla normativa
			vigente.
		</p>

		<h2>13. Aggiornamenti</h2>
		<p>
			La presente Privacy Policy può essere modificata o aggiornata in qualsiasi momento, anche in
			conseguenza di modifiche normative o dell'introduzione di nuovi servizi. Gli utenti sono
			invitati a consultarla periodicamente.
		</p>
	{:else}
		<p class="updated">Last updated: {LAST_UPDATED.en}</p>

		<p class="lead">
			The Associazione Culturale Playtown Roma (hereinafter, the "Controller"), pursuant to
			Regulation (EU) 2016/679 ("GDPR"), informs users of the website www.alicenellacitta.com about
			how personal data is processed during browsing and use of the services offered.
		</p>
		<p class="note">
			This English version is a courtesy translation. The binding version is the Italian one.
		</p>

		<h2>1. Data controller</h2>
		<p>
			Associazione Culturale Playtown Roma<br />
			Via Benaco, 5<br />
			00199 Rome (RM) – Italy<br />
			VAT No. 05734111007<br />
			E-mail: <a href="mailto:{EMAIL}">{EMAIL}</a>
		</p>

		<h2>2. Types of data processed</h2>
		<p>While browsing the website, the following may be processed:</p>
		<ul>
			<li>
				technical data necessary for the operation of the site (such as IP address, browser type,
				operating system, date and time of the request);
			</li>
			<li>
				data voluntarily provided by the user to subscribe to the newsletter (email address).
			</li>
		</ul>
		<p>
			The site does not provide for user account registration, restricted areas or e-commerce
			services.
		</p>

		<h2>3. Purposes of processing</h2>
		<p>Personal data is processed for the following purposes:</p>
		<ul>
			<li>to ensure the proper functioning and security of the site;</li>
			<li>
				to collect aggregated and anonymous statistics on the use of the site through Vercel
				Analytics;
			</li>
			<li>
				to send newsletters and informational communications to users who have given their consent.
			</li>
		</ul>

		<h2>4. Legal basis for processing</h2>
		<p>Processing is carried out:</p>
		<ul>
			<li>
				on the basis of the Controller's legitimate interest in ensuring the functioning and
				security of the site;
			</li>
			<li>on the basis of the data subject's consent for newsletter subscription.</li>
		</ul>

		<h2>5. Newsletter</h2>
		<p>
			Newsletter subscription is free and optional. To send communications, the Controller uses the
			Brevo platform, which processes data as a Data Processor pursuant to Art. 28 GDPR. The user may
			withdraw consent at any time using the unsubscribe link in every newsletter or by writing to
			the Controller's email address.
		</p>

		<h2>6. Usage statistics</h2>
		<p>
			The site uses Vercel Analytics exclusively in cookie-free mode, in order to collect aggregated
			statistical data on the use of the site. This service does not use cookies or other tracking
			technologies for user profiling and is used solely to analyse performance and improve the
			site.
		</p>

		<h2>7. Processing methods</h2>
		<p>
			Data is processed using IT and electronic tools, adopting security measures appropriate to
			protect it from unauthorised access, loss, alteration or disclosure.
		</p>

		<h2>8. Data retention</h2>
		<p>
			Personal data is kept for the time strictly necessary to pursue the stated purposes.
			Newsletter data will be kept until the data subject withdraws their consent.
		</p>

		<h2>9. Data recipients</h2>
		<p>
			Data may be processed by parties providing services essential to the operation of the site,
			including:
		</p>
		<ul>
			<li>the hosting infrastructure provider;</li>
			<li>Vercel Inc., as provider of the hosting platform and the Analytics service;</li>
			<li>Brevo, for newsletter management.</li>
		</ul>
		<p>
			Such parties operate, where applicable, as Data Processors pursuant to Art. 28 GDPR.
		</p>

		<h2>10. Data transfer</h2>
		<p>
			Should data be processed by providers located outside the European Economic Area, the
			transfer will take place in compliance with the safeguards provided for by Articles 44 et seq.
			of the GDPR.
		</p>

		<h2>11. Rights of the data subject</h2>
		<p>
			Users may exercise at any time the rights set out in Articles 15-22 GDPR, including:
		</p>
		<ul>
			<li>access to their personal data;</li>
			<li>rectification of inaccurate data;</li>
			<li>erasure of data ("right to be forgotten");</li>
			<li>restriction of processing;</li>
			<li>objection to processing in the cases provided for by law;</li>
			<li>data portability;</li>
			<li>withdrawal of the consent given.</li>
		</ul>
		<p>Requests can be sent to: <a href="mailto:{EMAIL}">{EMAIL}</a></p>
		<p>
			Data subjects also have the right to lodge a complaint with the Italian Data Protection
			Authority (Garante per la Protezione dei Dati Personali).
		</p>

		<h2>12. Cookies</h2>
		<p>
			The site does not use profiling cookies or third-party analytics cookies. Usage statistics are
			collected through Vercel Analytics in cookie-free mode. Should cookies or tracking tools
			subject to user consent be introduced in the future, this policy will be updated and the
			measures required by applicable law will be adopted.
		</p>

		<h2>13. Updates</h2>
		<p>
			This Privacy Policy may be amended or updated at any time, including as a result of regulatory
			changes or the introduction of new services. Users are invited to consult it periodically.
		</p>
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
		font-size: clamp(2.5rem, 8vw, 6rem);
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
		margin: 0 0 2rem;
	}

	.legal .note {
		font-size: 0.9rem;
		color: #888;
		font-style: italic;
		margin: 0 0 1rem;
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

	.legal ul {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
	}

	.legal li {
		font-size: 1.05rem;
		line-height: 1.65;
		color: #333;
		margin: 0 0 0.4rem;
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
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #888;
		margin: 0 0 2rem;
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
