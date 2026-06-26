// Articoli news (fonte: alicenellacitta.com). Contenuto bilingue
// inline per ridurre i round-trip e mantenere coerenza con il pattern
// usato per i film (vedi festival-images.ts).

import { editorial } from './festival-images';

export type NewsArticle = {
	slug: string;
	image: string;
	date: { it: string; en: string };
	category: { it: string; en: string };
	title: { it: string; en: string };
	excerpt: { it: string; en: string };
	body: { it: string; en: string };
};

export const newsArticles: NewsArticle[] = [
	{
		slug: 'good-boy-apre-xxiii',
		image: editorial.goodBoyStill,
		date: { it: '14 ottobre 2025', en: '14 October 2025' },
		category: { it: 'Programmazione', en: 'Programme' },
		title: {
			it: '«Good Boy» è il film d\'apertura della XXIII edizione',
			en: '«Good Boy» opens the XXIII edition'
		},
		excerpt: {
			it: 'L\'horror d\'esordio di Ben Leonberg — raccontato dal punto di vista di un cane — apre la XXIII edizione di Alice nella Città. Dopo l\'anteprima a SXSW, il film è diventato un caso virale, con il 95% su Rotten Tomatoes.',
			en: 'Ben Leonberg\'s debut horror — told entirely from a dog\'s perspective — opens the XXIII edition of Alice in the City. After premiering at SXSW, the film went viral, hitting 95% on Rotten Tomatoes.'
		},
		body: {
			it: `<p>L'horror <em>Good Boy</em>, diretto da Ben Leonberg, apre la ventitreesima edizione di Alice nella Città, in programma dal 15 al 26 ottobre a Roma tra l'Auditorium Parco della Musica e gli altri luoghi del festival.</p>
<p>Esordio indipendente nato da un processo creativo durato tre anni, il film è esploso dopo l'anteprima al SXSW Film &amp; TV Festival 2025: 95% di gradimento su Rotten Tomatoes e una valanga di attenzione critica.</p>
<p>La storia segue Indy — il cane di Leonberg, nella vita reale — unico testimone delle minacce sovrannaturali che si annidano in una casa. Niente animali antropomorfi: il film costruisce la tensione esplorando ciò che i cani percepiscono al di là dei sensi umani. La sceneggiatura è firmata da Leonberg con Alex Cannon.</p>
<blockquote>«E se l'unico a sapere che la casa è infestata fosse il cane di famiglia?»</blockquote>
<p>Da questa domanda Leonberg ha costruito un thriller paranormale sulla fedeltà messa alla prova dalle circostanze più estreme.</p>
<p>I direttori di Alice nella Città, Gianluca Giannelli e Fabia Bettini, raccontano un horror che intercetta le paure delle nuove generazioni, mostrando la paura come prossimità, non come idea lontana.</p>
<p>In Italia il film sarà distribuito nelle sale da <strong>Maestro Distribution</strong>.</p>`,
			en: `<p>The horror film <em>Good Boy</em>, directed by Ben Leonberg, opens the twenty-third edition of Alice in the City, running 15–26 October in Rome at the Auditorium Parco della Musica and the festival's other venues.</p>
<p>An independent debut three years in the making, the film took off after its premiere at SXSW Film &amp; TV Festival 2025: 95% on Rotten Tomatoes and a wave of critical acclaim.</p>
<p>The story follows Indy — Leonberg's real-life dog — as the only witness to the supernatural threats hidden inside a house. No talking animals: tension is built by exploring what dogs sense beyond human perception. The screenplay is written by Leonberg with Alex Cannon.</p>
<blockquote>"What if the family dog was the only one who knew the house was haunted?"</blockquote>
<p>From that question Leonberg built a paranormal thriller about loyalty pushed to its limits.</p>
<p>Festival co-directors Gianluca Giannelli and Fabia Bettini frame it as a horror film that taps into the anxieties of younger audiences, presenting fear as proximity rather than as a distant abstraction.</p>
<p>The film will be theatrically distributed in Italy by <strong>Maestro Distribution</strong>.</p>`
		}
	},
	{
		slug: 'fuori-sala-format',
		image: 'https://alicenellacitta.com/wp-content/uploads/2025/09/75.png',
		date: { it: '18 settembre 2025', en: '18 September 2025' },
		category: { it: 'Festival', en: 'Festival' },
		title: {
			it: 'Nasce Fuori Sala, il nuovo format ideato da Alice nella Città',
			en: 'Fuori Sala: the new format created by Alice in the City'
		},
		excerpt: {
			it: 'Fuori Sala è il programma che porta il festival fuori dalle proiezioni: cinema, letteratura ed empowerment femminile attraverso ottobre e l\'inizio di novembre, con l\'arrivo di Robert De Niro a Roma a chiudere il cartellone.',
			en: 'Fuori Sala takes the festival beyond screenings: cinema, literature and women\'s empowerment across October and early November, with Robert De Niro arriving in Rome to close the line-up.'
		},
		body: {
			it: `<p>Nasce <strong>FUORI SALA</strong>, format ideato da <strong>Alice nella Città</strong> in collaborazione e con il sostegno dell'Assessorato ai Grandi Eventi, Sport, Turismo e Moda di Roma Capitale, che si snoderà con diversi appuntamenti <strong>durante il mese di ottobre</strong>, anticipando e attraversando la ventitreesima edizione del festival diretto da <strong>Fabia Bettini</strong> e <strong>Gianluca Giannelli</strong>, per concludersi nei primi giorni di novembre con l'arrivo a Roma di <strong>Robert De Niro</strong>.</p>
<p>La programmazione spazierà tra incontri, letture ad alta voce, presentazioni letterarie legate a cinema e libri, premi e gli appuntamenti di Womenlands, dedicati a una nuova immagine della donna nella società di oggi. L'intento: valorizzare le aziende e il centro storico della Capitale attraverso l'audiovisivo.</p>
<p>Il FUORI SALA partirà a ottobre nel triangolo che va da <strong>Via Condotti, Piazza di Spagna, Via del Babuino, Via Margutta e Piazza del Popolo</strong>, per spostarsi a novembre nel <strong>distretto Via Veneto, Barberini, Via Bissolati</strong>. Tra gli spazi che hanno aderito: Hotel De La Ville, Hotel De Russie, Splendide Royal, Hotel Parco dei Principi, JK Place, Hotel Hassler, Hotel Eden, Palazzo Ripetta e Palazzo Talia.</p>
<h3>Le experience</h3>
<p>Via Condotti, Via del Babuino e Via Margutta ospiteranno percorsi pensati per riscoprire il centro storico, gli scatti iconici nelle vie e le passeggiate legate alla moda e alle botteghe storiche della città.</p>
<h3>La Notte Bianca</h3>
<p>La Notte Bianca di Via Margutta, in programma il <strong>14 ottobre</strong>, aprirà idealmente il Fuori Sala con aperture straordinarie fino a mezzanotte di oltre 30 gallerie: mostre, performance, experience e letture ad alta voce del ciclo Womenlands. Tra gli appuntamenti, lo spettacolo di stand up comedy <em>Esagerate! Più che un aggettivo un'esortazione</em> di Cinzia Spanò, presidente dell'Associazione Amleta.</p>
<h3>Womenlands</h3>
<p>Linea di programma nata tre anni fa per mettere in luce un nuovo ruolo della donna nella società contemporanea, si articola in diversi momenti come <strong>I Am Womenlands</strong>, sodalizio tra Alice nella Città e la casa di produzione no profit <strong>We Do It Together</strong> fondata da Chiara Tilesi. La campagna è partita da New York nel settembre 2024 con la proiezione sulla Torre Nasdaq di Times Square delle immagini di oltre quaranta donne dell'industria mondiale dell'intrattenimento. Per il Fuori Sala arriva una versione ampliata con più di 50 immagini, con un flash mob alla <strong>scalinata di Piazza di Spagna sabato 18 ottobre alle ore 20.00</strong>, alla presenza della cantante <strong>Tosca</strong>.</p>
<p>Tra le premiate con il Womenlands Excellence Award: Tosca, la regista Orso d'Oro <strong>Carla Simón</strong> — a cui sarà dedicato un omaggio con <em>Estate 1993</em>, <em>Alcarràs</em> e la premiere italiana di <em>Romería</em> — e la candidata al Nobel per la Pace <strong>Reem Hajajreh</strong>, attivista palestinese fondatrice del gruppo Women of the Sun.</p>
<h3>Cinema e libri</h3>
<p>La programmazione letteraria si articola in più percorsi: il ciclo "Dal libro allo schermo", "Registi e attori che amano scrivere" con <strong>Rocco Papaleo</strong> e <em>Perdere tempo mi viene facile</em> (Mondadori), "Storie che raccontano la Capitale" con <em>Hamartìa</em> di Rossana Soldano (Mondadori), e l'incontro speciale con Alessandro Ferrucci sul suo <em>Non sai cosa è successo</em> (Paper First).</p>
<h3>Il Premio Via Condotti</h3>
<p>Istituito nel 1977 e conferito ogni anno "a chi, non romano, ama Roma e ne è riamato", il Premio Via Condotti segnala le eccellenze che promuovono Roma nel mondo. Tra i premiati storici: Eduardo De Filippo, Federico Fellini, Renato Guttuso, Luchino Visconti, Audrey Hepburn, Rita Levi-Montalcini, Mariangela Melato, Giuseppe Tornatore. Nelle giornate festivaliere Via Condotti, Via Margutta e Via del Babuino saranno allestite con gonfaloni e un photocall a Largo Goldoni.</p>
<h3>Robert De Niro</h3>
<p>Il FUORI SALA si chiuderà a novembre nel <strong>distretto Barberini</strong>, con l'arrivo a Roma di <strong>Robert De Niro</strong>, Nobu Matsuisha e Meyer Teper in occasione della tradizionale <strong>Kagami Biraki</strong> — la rottura della botte contenente il sake, l'antica cerimonia giapponese che simboleggia l'apertura verso l'armonia. La cerimonia si terrà a via Veneto davanti al Nobu Roma e darà l'avvio alla <strong>due giorni di celebrazioni il 6 e 7 novembre</strong> dedicate al grande attore.</p>
<p>Tutti gli appuntamenti del Fuori Sala saranno aperti al pubblico e a ingresso libero su prenotazione fino a esaurimento posti. Per gli accreditati di Alice nella Città sarà attivata una linea dedicata.</p>
<blockquote>«Le strade di Roma sono da sempre strade di cinema. Da <em>La dolce vita</em> a <em>Mission Impossible</em>, da Fellini a Ridley Scott, Nanni Moretti, Carlo Verdone, Paolo Sorrentino e Ferzan Ozpetek. FUORI SALA è un'operazione semplice, quasi fisiologica, partendo dal Festival per portare il cinema nelle strade della città, ai cittadini, ai turisti. Cinema aperto per la città aperta.»</blockquote>
<p>— <strong>Fabia Bettini</strong> e <strong>Gianluca Giannelli</strong>, direttori di Alice nella Città</p>`,
			en: `<p><strong>FUORI SALA</strong>, the format created by <strong>Alice in the City</strong> in collaboration with Rome Capital's Department of Major Events, Sports, Tourism and Fashion, unfolds with several events across October, anticipating and running through the twenty-third edition of the festival directed by <strong>Fabia Bettini</strong> and <strong>Gianluca Giannelli</strong>, before closing in early November with <strong>Robert De Niro</strong>'s arrival in Rome.</p>
<p>The programme spans meetings, live readings, literary presentations on cinema and books, awards and the Womenlands events dedicated to a new image of women in today's society — all aimed at amplifying Rome's businesses and historic centre through the audiovisual.</p>
<p>FUORI SALA starts in October in the triangle of <strong>Via Condotti, Piazza di Spagna, Via del Babuino, Via Margutta and Piazza del Popolo</strong>, then moves in November to the <strong>Via Veneto, Barberini, Via Bissolati district</strong>. Participating venues include Hotel De La Ville, Hotel De Russie, Splendide Royal, Hotel Parco dei Principi, JK Place, Hotel Hassler, Hotel Eden, Palazzo Ripetta and Palazzo Talia.</p>
<h3>The Experiences</h3>
<p>Via Condotti, Via del Babuino and Via Margutta will host guided rediscoveries of Rome's historic centre, iconic photo stops and walking routes tied to fashion and the city's historic shops.</p>
<h3>The White Night</h3>
<p>Via Margutta's White Night on <strong>14 October</strong> kicks off the Fuori Sala with over 30 galleries open late into the night: exhibitions, performances, experiences and live readings from the Womenlands cycle. Among the highlights, Cinzia Spanò's stand-up show <em>Esagerate! Più che un aggettivo un'esortazione</em>.</p>
<h3>Womenlands</h3>
<p>This three-year-old programme line highlights women's contemporary role through <strong>I Am Womenlands</strong>, a partnership between Alice in the City and the non-profit production company <strong>We Do It Together</strong> founded by director Chiara Tilesi. After premiering at Times Square's Nasdaq Tower in September 2024 with over forty women from the entertainment industry, the campaign returns expanded to more than 50 portraits, with a flash mob at the <strong>Spanish Steps on Saturday 18 October at 8:00 PM</strong>, joined by singer <strong>Tosca</strong>.</p>
<p>Womenlands Excellence Award recipients include Tosca, Golden Bear-winning director <strong>Carla Simón</strong> — honoured with screenings of <em>Estate 1993</em>, <em>Alcarràs</em> and the Italian premiere of <em>Romería</em> — and Nobel Peace Prize nominee <strong>Reem Hajajreh</strong>, Palestinian activist and founder of Women of the Sun.</p>
<h3>Cinema and Books</h3>
<p>The literary programme spans the "From book to screen" cycle, "Directors and actors who love to write" with <strong>Rocco Papaleo</strong> and <em>Perdere tempo mi viene facile</em> (Mondadori), "Stories that tell the Capital" with <em>Hamartìa</em> by Rossana Soldano (Mondadori), and a special encounter with Alessandro Ferrucci around <em>Non sai cosa è successo</em> (Paper First).</p>
<h3>The Via Condotti Award</h3>
<p>Established in 1977 and given each year "to those who, though not Roman, love Rome and are loved in return", the Via Condotti Award celebrates excellence that promotes Rome abroad. Past recipients include Eduardo De Filippo, Federico Fellini, Audrey Hepburn, Rita Levi-Montalcini, Mariangela Melato and Giuseppe Tornatore. During festival days Via Condotti, Via Margutta and Via del Babuino will be dressed with banners and a photocall at Largo Goldoni.</p>
<h3>Robert De Niro</h3>
<p>FUORI SALA closes in November in the <strong>Barberini district</strong>, with the arrival of <strong>Robert De Niro</strong>, Nobu Matsuisha and Meyer Teper for the traditional <strong>Kagami Biraki</strong> — the breaking of the sake barrel, an ancient Japanese ceremony symbolising the opening towards harmony and good fortune. The ceremony will take place on Via Veneto in front of Nobu Roma, opening the <strong>two days of celebrations on 6 and 7 November</strong> dedicated to the actor.</p>
<p>All Fuori Sala events are open to the public and free of charge upon booking, until seats run out. A dedicated line will be activated for Alice in the City accredited guests.</p>
<blockquote>"The streets of Rome have always been streets of cinema. From <em>La dolce vita</em> to <em>Mission Impossible</em>, from Fellini to Ridley Scott, Nanni Moretti, Carlo Verdone, Paolo Sorrentino and Ferzan Ozpetek. FUORI SALA is a simple, almost physiological operation: to start from the Festival and bring cinema into the streets of the city, to its citizens, to its visitors. Open cinema for an open city."</blockquote>
<p>— <strong>Fabia Bettini</strong> and <strong>Gianluca Giannelli</strong>, directors of Alice in the City</p>`
		}
	},
	{
		slug: 'preselezione-giuria-2025',
		image: 'https://alicenellacitta.com/wp-content/uploads/2025/09/giuria.jpg',
		date: { it: '12 settembre 2025', en: '12 September 2025' },
		category: { it: 'Giurie', en: 'Juries' },
		title: {
			it: 'Partecipa alla preselezione della Giuria 2025',
			en: 'Apply for the 2025 Jury pre-selection'
		},
		excerpt: {
			it: 'Apertura delle candidature per gli studenti delle scuole secondarie italiane che vogliono far parte della giuria di Alice nella Città. Recensione di un film e modulistica entro il 18 settembre 2025.',
			en: 'Applications are open for Italian high-school students who want to join the Alice in the City jury. Submit a film review and the required forms by 18 September 2025.'
		},
		body: {
			it: `<p>Alice nella Città, sezione autonoma e parallela della Festa del Cinema di Roma in programma <strong>dal 15 al 26 ottobre 2025</strong> presso l'Auditorium Parco della Musica e l'Auditorium della Conciliazione, sta avviando le selezioni per la nuova giuria, che coinvolgeranno gli alunni e le famiglie interessate a titolo gratuito.</p>
<h3>Chi può partecipare</h3>
<p>Possono candidarsi gli studenti iscritti alle <strong>scuole secondarie di II grado italiane</strong> nell'anno scolastico 2025/2026.</p>
<h3>Cosa serve</h3>
<p>I candidati devono scrivere una <strong>recensione e critica</strong> di un film uscito nelle sale durante l'anno 2024/2025, con una lunghezza compresa <strong>da un minimo di 1.100 a un massimo di 3.600 battute</strong> (spazi inclusi).</p>
<p>Insieme alla recensione vanno compilate la <strong>scheda di preselezione</strong> e l'<strong>informativa sui dati sensibili</strong>, entrambe firmate da un genitore.</p>
<h3>Scadenza e contatti</h3>
<p>Il materiale va inviato via email a <a href="mailto:scuolaalicenellacitta@gmail.com">scuolaalicenellacitta@gmail.com</a> <strong>entro il 18 settembre 2025</strong>.</p>
<h3>Come funziona la selezione</h3>
<p>Tutte le recensioni saranno esaminate dall'Ufficio Giurie del Festival. Le candidature che supereranno la prima selezione cartacea verranno ricontattate per un colloquio conoscitivo con i ragazzi e le famiglie. I selezionati entreranno a far parte della giuria della <strong>XXIII edizione</strong> del Festival.</p>
<h3>Attestato e PCTO</h3>
<p>Agli studenti selezionati sarà rilasciato un attestato di partecipazione. L'ufficio scuole si rende disponibile a riconoscere l'attività di giurato per il <strong>PCTO</strong>, se necessario.</p>`,
			en: `<p>Alice in the City, the independent and parallel section of the Rome Film Fest running <strong>15–26 October 2025</strong> at the Auditorium Parco della Musica and the Auditorium della Conciliazione, is opening applications for its new jury — free of charge for participating students and families.</p>
<h3>Who can apply</h3>
<p>Applicants must be enrolled in <strong>Italian secondary schools</strong> for the 2025/2026 school year.</p>
<h3>What to submit</h3>
<p>Candidates write a <strong>review and critical piece</strong> on a film released theatrically during 2024/2025, with a length of <strong>between 1,100 and 3,600 characters</strong> (spaces included).</p>
<p>Along with the review, candidates must fill in the <strong>pre-selection form</strong> and the <strong>data privacy statement</strong>, both signed by a parent.</p>
<h3>Deadline &amp; contact</h3>
<p>Send everything by email to <a href="mailto:scuolaalicenellacitta@gmail.com">scuolaalicenellacitta@gmail.com</a> <strong>by 18 September 2025</strong>.</p>
<h3>How the selection works</h3>
<p>All reviews are evaluated by the Festival's Jury Office. Applications that pass the first paper-based round will be contacted for an in-person interview with students and families. Those selected will join the jury of the <strong>XXIII edition</strong> of the Festival.</p>
<h3>Certificate &amp; PCTO</h3>
<p>Selected students will receive a participation certificate. The schools office is available to recognise jury activity as <strong>PCTO</strong> (Italian school-to-work programme) where applicable.</p>`
		}
	}
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
	return newsArticles.find((n) => n.slug === slug);
}
