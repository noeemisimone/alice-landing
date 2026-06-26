// Immagini editoriali: stock cinematografiche (Unsplash).
// Le locandine e gli still dei film restano invece dal sito del festival.

const UNSPLASH = 'https://images.unsplash.com';

export const editorial = {
	heroBg: `${UNSPLASH}/photo-1485846234645-a62644f84728?w=2400&q=85&auto=format&fit=crop`,
	chiSiamoBg: `${UNSPLASH}/photo-1478720568477-152d9b164e26?w=2400&q=85&auto=format&fit=crop`,
	manifesto: `${UNSPLASH}/photo-1574267432553-4b4628081c31?w=2000&q=85&auto=format&fit=crop`,
	contattiBg: `${UNSPLASH}/photo-1536440136628-849c177e76a1?w=2400&q=85&auto=format&fit=crop`,

	// Immagini di eventi (sostituite con stock cinema)
	anemone: `${UNSPLASH}/photo-1574267432553-4b4628081c31?w=2000&q=85&auto=format&fit=crop`,
	lonergan: `${UNSPLASH}/photo-1542204165-65bf26472b9b?w=2000&q=85&auto=format&fit=crop`,
	footloose: `${UNSPLASH}/photo-1517604931442-7e0c8ed2963c?w=2000&q=85&auto=format&fit=crop`,

	// Immagini di film (still / locandine) — invariate dal sito del festival
	goodBoyStill:
		'https://alicenellacitta.com/wp-content/uploads/2025/09/GOODBOY_STILL.00_26_00_04.Still108-1568x848.jpg',
	regrettingYou:
		'https://alicenellacitta.com/wp-content/uploads/2025/10/regretting_you.jpg'
};

// Carosello hero della homepage: 3 immagini in loop (crossfade).
// TEMPORANEE — stock cinematografiche casuali, da sostituire con le immagini ufficiali.
export const heroCarousel = [
	`${UNSPLASH}/photo-1485846234645-a62644f84728?w=2400&q=85&auto=format&fit=crop`,
	`${UNSPLASH}/photo-1517604931442-7e0c8ed2963c?w=2400&q=85&auto=format&fit=crop`,
	`${UNSPLASH}/photo-1536440136628-849c177e76a1?w=2400&q=85&auto=format&fit=crop`
];

const IMG_BASE = 'https://alicenellacitta.com/wp-content/uploads';

// Biglietteria ufficiale esterna (Clappit). Fonte unica usata da pagina Biglietti,
// landing e schede film. Aggiornare qui per propagare ovunque.
export const TICKETS_URL =
	'https://www.clappit.com/biglietti-alice-nella-citta/lista-prodotti-it-99795.html?cdProductTypes=TICKET';

// Contenuto multimediale della scheda film (trailer + clip).
// `kind` rende il sistema neutro: ogni elemento può essere un video o un'immagine,
// così da gestire l'incertezza "clip = video o foto?" senza rifare il layout.
export type FilmMedia = {
	kind: 'video' | 'image';
	// video: URL di YouTube/Vimeo oppure file .mp4 locale; image: URL dell'immagine.
	src: string;
	poster?: string; // anteprima mostrata prima del play (solo video file)
	caption?: { it: string; en: string };
};

export type Film = {
	slug: string;
	src: string;
	title: string;
	section: string;
	originalTitle?: string;
	director: string;
	country: string;
	year: number;
	duration: string;
	language: string;
	cast: string[];
	synopsis: { it: string; en: string };
	// Crediti tecnici (opzionali, dalla scheda festival)
	genre?: string;
	screenplay?: string[];
	cinematography?: string[];
	editing?: string[];
	music?: string[];
	producers?: string[];
	production?: string[];
	directorBio?: { it: string; en: string };
	// Foto del regista (opzionale): URL dell'immagine mostrata nella sezione "Regista".
	directorPhoto?: string;
	// Trailer + clip (opzionale): primo elemento = trailer, successivi = clip.
	media?: FilmMedia[];
	// Pubblico: opera adatta alle famiglie / al pubblico più giovane.
	// Alimenta il filtro "Famiglie" nella pagina Programma.
	family?: boolean;
	// Età consigliata mostrata sulla scheda/locandina (es. "Dai 6 anni").
	ageAdvice?: string;
};

// Mantengo l'alias per non rompere i consumatori esistenti che usano `Poster`.
export type Poster = Film;

// Locandine ufficiali del festival con informazioni dettagliate.
export const films: Film[] = [
	{
		slug: 'good-boy',
		src: `${IMG_BASE}/2025/09/GOODBOY_250927_101517-pdf.jpg`,
		title: 'Good Boy',
		section: 'Film di apertura',
		originalTitle: 'Good Boy',
		director: 'Ben Leonberg',
		country: 'Stati Uniti',
		year: 2025,
		duration: '73 min',
		language: 'Inglese',
		genre: 'Horror',
		cast: ['Shane Jensen', 'Arielle Friedman', 'Larry Fessenden'],
		screenplay: ['Alex Cannon', 'Ben Leonberg'],
		cinematography: ['Ben Leonberg'],
		editing: ['Michael Cacioppo Belantara', 'Peter Vaughan'],
		producers: ['Kari Fischer', 'Ben Leonberg'],
		production: ["What's Wrong With Your Dog"],
		// BOZZA / SEGNAPOSTO — sostituire con trailer e clip ufficiali.
		// Il trailer è un link YouTube (riconosciuto in automatico); le clip sono immagini.
		// Per Vimeo o file .mp4: stesso kind 'video' con l'URL relativo.
		// Se le clip saranno video: cambiare kind in 'video' e mettere l'URL.
		media: [
			{
				kind: 'video',
				src: 'https://www.youtube.com/watch?v=HVqoyMi98OI',
				caption: { it: 'Trailer ufficiale', en: 'Official trailer' }
			},
			{
				kind: 'image',
				src: editorial.goodBoyStill,
				caption: { it: 'Clip 1', en: 'Clip 1' }
			},
			{
				kind: 'image',
				src: editorial.regrettingYou,
				caption: { it: 'Clip 2', en: 'Clip 2' }
			}
		],
		synopsis: {
			it: 'Un cane percepisce entità e minacce nascoste nel buio della notte. Il film esplora i misteri dietro i comportamenti canini inspiegabili — fissare angoli vuoti, abbaiare senza motivo, rifiutarsi di entrare nel seminterrato — trasformandoli in un\'esperienza horror autentica e inquietante. Una narrazione sovrumana che resta profondamente umana, senza ricorrere ad animali antropomorfi.',
			en: 'A dog senses entities and threats hidden in the dark of night. The film explores the mysteries behind unexplained canine behaviour — staring at empty corners, barking at nothing, refusing to enter the basement — turning them into a genuine and unsettling horror experience. A supernatural narrative that remains deeply human, without resorting to anthropomorphic animals.'
		},
		directorBio: {
			it: 'Ben Leonberg costruisce film di genere con un approccio artigianale, mescolando eventi fantastici e storie quotidiane attraverso effetti pratici e soluzioni inventive. Il suo lungometraggio d\'esordio è stato selezionato dalla Columbia Blue List ed è arrivato finalista allo ScreenCraft Film Fund.',
			en: 'Ben Leonberg builds genre cinema with a handcrafted approach, weaving fantastical events into recognisable stories through practical effects and inventive techniques. His feature debut was picked for the Columbia Blue List and named a ScreenCraft Film Fund finalist.'
		}
	},
	{
		slug: 'anemone',
		src: `${IMG_BASE}/2025/09/IMG_5698-2.jpg`,
		title: 'Anemone',
		section: 'Eventi Speciali',
		originalTitle: 'Anemone',
		director: 'Ronan Day-Lewis',
		country: 'Regno Unito, Stati Uniti',
		year: 2025,
		duration: '125 min',
		language: 'Inglese',
		genre: 'Drammatico',
		cast: ['Daniel Day-Lewis', 'Sean Bean', 'Samantha Morton'],
		screenplay: ['Ronan Day-Lewis', 'Daniel Day-Lewis'],
		production: ['Focus Features', 'Plan B Entertainment'],
		synopsis: {
			it: 'Esordio alla regia di Ronan Day-Lewis, con sceneggiatura firmata insieme al padre Daniel, che torna sul grande schermo dopo anni di assenza. Anemone scava nei legami che uniscono — e dividono — padri, figli e fratelli, dando voce all\'amore complesso e ai sacrifici irrisolti che attraversano gli uomini di una stessa famiglia.',
			en: 'The directorial debut of Ronan Day-Lewis, co-written with his father Daniel — who returns to the screen after years away. Anemone digs into the bonds that hold together (and pull apart) fathers, sons and brothers, giving voice to the complex love and unresolved sacrifices that run through the men of a single family.'
		}
	},
	{
		slug: 'the-choral',
		src: `${IMG_BASE}/2025/09/official-poster-for-the-choral-starring-ralph-fiennes-set-v0-3gmgy9hx58hf1.jpeg-1568x1960.webp`,
		title: 'The Choral',
		section: 'Concorso',
		originalTitle: 'The Choral',
		director: 'Nicholas Hytner',
		country: 'Regno Unito',
		year: 2025,
		duration: '113 min',
		language: 'Inglese',
		genre: 'Drammatico',
		cast: ['Ralph Fiennes', 'Roger Allam', 'Robert Emms'],
		screenplay: ['Alan Bennett'],
		cinematography: ['Mike Eley'],
		editing: ['Tariq Anwar'],
		producers: ['Kevin Loader', 'Damian Jones', 'Nicholas Hytner'],
		production: ['Sony Pictures Classics'],
		synopsis: {
			it: 'Yorkshire, 1916. La Ramsden Choral Society ha perso quasi tutti i suoi tenori e i suoi bassi, partiti per il fronte. Il comitato decide di reclutare i giovani del paese e affida la direzione al dottor Henry Guthrie, appena tornato dalla Germania. Mentre le cartoline di precetto arrivano una dopo l\'altra, la comunità scopre che la migliore risposta al caos che li sta divorando è fare musica insieme.',
			en: 'Yorkshire, 1916. The Ramsden Choral Society has lost most of its tenors and basses to the front. The committee recruits the village\'s young men and hires Dr. Henry Guthrie, just back from Germany, as its new conductor. As conscription notices pile up, the community discovers that the best answer to the chaos devouring their lives is to make music together.'
		},
		directorBio: {
			it: 'Regista teatrale e cinematografico britannico, già direttore artistico del National Theatre di Londra. The Choral è la sua quarta collaborazione con lo sceneggiatore Alan Bennett, dopo The Madness of King George, The History Boys e The Lady in the Van.',
			en: 'British stage and screen director, former artistic director of the National Theatre in London. The Choral is his fourth collaboration with screenwriter Alan Bennett, after The Madness of King George, The History Boys and The Lady in the Van.'
		}
	},
	{
		slug: 'eden',
		src: `${IMG_BASE}/2025/09/POSTER_EDEN-1568x2240.png`,
		title: 'Eden',
		section: 'Onde Corte',
		originalTitle: 'Eden',
		director: 'Lisaly Martinez',
		country: 'Italia',
		year: 2025,
		duration: '8 min',
		language: 'Arabo, Italiano',
		genre: 'Cortometraggio di finzione',
		cast: ['Nofel Ajaara', 'Younes Ferrad', 'Samy Maalouf', 'Osama Hilmi'],
		screenplay: ['Lisaly Martinez', 'Loris Occhiogrosso'],
		cinematography: ['Giacomo Garampelli'],
		editing: ['Lisaly Martinez'],
		producers: ['Lisaly Martinez'],
		production: ['NABA — Nuova Accademia di Belle Arti'],
		synopsis: {
			it: 'Zayd, adolescente nordafricano adottato da una famiglia italiana, incontra dei coetanei che condividono le sue origini culturali. L\'incontro lo spinge a interrogarsi sulla propria identità e sul senso di appartenenza. Insieme costruiscono un\'amicizia sospesa tra due culture e una terra mai vista — un Eden idealizzato che esiste solo nel desiderio di tornarci.',
			en: 'Zayd, a North African teenager adopted by an Italian family, meets peers who share his cultural origins. The encounter prompts him to question his identity and sense of belonging. Together they build a friendship suspended between two cultures and a homeland none of them has ever seen — an idealised Eden that lives only in the longing to return.'
		},
		directorBio: {
			it: 'Lisaly Martinez, di origini dominicane, nata nel 2003, studia Cinema e Animazione alla NABA di Milano. Il cinema è il linguaggio attraverso cui esplora i temi dell\'identità e del sentirsi fuori posto.',
			en: 'Lisaly Martinez, of Dominican origin, born in 2003, studies Cinema and Animation at NABA in Milan. Cinema is the medium through which she explores identity and the feeling of being out of place.'
		}
	},
	{
		slug: 'scarlet',
		src: `${IMG_BASE}/2025/09/SCRLT_INTL_Online_6072x9000_TSR_Kaikin_02_IT-2-1568x2324.jpg`,
		title: 'Scarlet',
		section: 'Concorso',
		originalTitle: 'Scarlet',
		director: 'Mamoru Hosoda',
		country: 'Giappone',
		year: 2025,
		duration: '110 min',
		language: 'Giapponese',
		genre: 'Animazione',
		family: true,
		ageAdvice: 'Dai 8 anni',
		cast: ['Mana Ashida', 'Masaki Okada'],
		production: ['Studio Chizu'],
		synopsis: {
			it: 'Una principessa medievale di nome Scarlet, tradita e privata del proprio regno, intraprende un viaggio attraverso epoche e mondi differenti per inseguire la vendetta. Mamoru Hosoda firma un nuovo lungometraggio d\'animazione che intreccia mito cavalleresco e fantascienza, interrogandosi su cosa resti della rabbia quando incontra la possibilità di un nuovo inizio.',
			en: 'A medieval princess named Scarlet, betrayed and stripped of her kingdom, sets out on a journey across eras and worlds to chase her revenge. Mamoru Hosoda delivers a new animated feature that weaves together chivalric myth and science fiction, asking what remains of rage when it meets the chance of a new beginning.'
		}
	},
	{
		slug: 'squali',
		src: `${IMG_BASE}/2025/09/Squali_1080x1350_def.jpg`,
		title: 'Squali',
		section: 'Panorama Italia',
		originalTitle: 'Squali',
		director: 'Daniele Barbiero',
		country: 'Italia, Spagna, Polonia',
		year: 2025,
		duration: '88 min',
		language: 'Italiano, Inglese',
		genre: 'Teen Dramedy',
		cast: [
			'Lorenzo Zurzolo',
			'James Franco',
			'Francesco Centorame',
			'Ginevra Francesconi'
		],
		screenplay: ['Mauro Graiani'],
		cinematography: ['Andrea Reitano'],
		editing: ['Monica Verzolini', 'Gianluca Conca'],
		producers: ['Camaleo', 'Eagle Pictures'],
		production: ['Camaleo', 'Eagle Pictures', 'Neo Art Producciones', 'Agresywna Banda'],
		synopsis: {
			it: 'Max, diciannovenne veneto, vive l\'estate dopo la maturità sospeso tra scelte cruciali. Aveva pianificato un viaggio in Spagna con Filippo e Anna, ma una proposta inattesa di un imprenditore interessato alla sua app universitaria lo porta su un treno per la capitale. Lì dovrà confrontarsi con un mondo competitivo, le proprie paure e l\'incertezza di non sapere quale strada intraprendere.',
			en: 'Max, a nineteen-year-old from Veneto, drifts through the summer after high-school graduation, caught between crucial choices. He had planned a trip to Spain with Filippo and Anna, but an unexpected offer from an entrepreneur interested in his college app puts him on a train to the capital. There he must face a competitive world, his own fears and the uncertainty of not knowing which road to take.'
		},
		directorBio: {
			it: 'Regista italiano cresciuto tra videoclip, spot e cortometraggi premiati nei festival. Ha lavorato sulla serie Clan e firma con Squali il suo nuovo lungometraggio dopo una serie di esordi nel formato breve.',
			en: 'Italian director who came up through music videos, commercials and award-winning short films. He worked on the series Clan and signs his new feature Squali after a string of debuts in the short format.'
		}
	},
	{
		slug: 'sunday',
		src: `${IMG_BASE}/2025/09/SUNDAY_poster_sRGB_low2-1568x2218.jpg`,
		title: 'Sunday',
		section: 'Onde Corte',
		originalTitle: 'Sunday',
		director: 'Giulio Tonincelli',
		country: 'Italia',
		year: 2025,
		duration: '15 min',
		language: 'Acholi, Inglese',
		genre: 'Documentario',
		cast: ['Sunday Ayoo', 'Sabina Ayero'],
		synopsis: {
			it: 'Un cortometraggio documentario ambientato nel nord dell\'Uganda, dove superstizione, infrastrutture carenti e povertà estrema costringono le persone a fare — o subire — scelte difficili. Attraverso lo sguardo della giovane Sunday, il film racconta come la resistenza si intrecci con la quotidianità, restituendo dignità a una storia di forza silenziosa.',
			en: 'A documentary short set in northern Uganda, where superstition, fragile infrastructure and extreme poverty force people to make — or endure — difficult choices. Through young Sunday\'s eyes, the film shows how resilience weaves itself into daily life, giving dignity to a story of quiet strength.'
		}
	},
	{
		slug: 'romeria',
		src: `${IMG_BASE}/2025/09/locandina-romeria.jpg`,
		title: 'Romería',
		section: 'Sintonie',
		originalTitle: 'Romería',
		director: 'Carla Simón',
		country: 'Spagna, Germania',
		year: 2025,
		duration: '112 min',
		language: 'Spagnolo, Catalano, Francese',
		genre: 'Drammatico',
		cast: ['Llúcia Garcia', 'Mitch', 'Tristán Ulloa', 'Alberto Gracia'],
		screenplay: ['Carla Simón'],
		cinematography: ['Hélène Louvart'],
		editing: ['Sergio Jiménez', 'Ana Pfaff'],
		production: ['Ventall Cinema', 'Dos Soles Media'],
		synopsis: {
			it: 'Marina, diciottenne orfana, raggiunge la costa atlantica della Spagna per ottenere la firma dei nonni paterni — che non ha mai conosciuto — su una richiesta di borsa di studio. Si ritrova circondata da zii, zie e cugini, incerta se troverà accoglienza o rifiuto. L\'incontro risveglia emozioni a lungo sopite e ricuce, frammento dopo frammento, il ritratto contraddittorio dei genitori che ricorda appena.',
			en: 'Marina, an eighteen-year-old orphan, travels to Spain\'s Atlantic coast to get her paternal grandparents — whom she has never met — to sign a scholarship application. She finds herself surrounded by aunts, uncles and cousins, unsure whether she will be welcomed or turned away. The encounter awakens long-buried emotions and stitches together, fragment by fragment, the contradictory portrait of the parents she barely remembers.'
		},
		directorBio: {
			it: 'Sceneggiatrice e regista catalana (1986), il suo esordio Estate 1993 ha vinto l\'Orso d\'oro all\'opera prima e tre Premi Goya. Alcarràs, il suo secondo lungometraggio, ha vinto l\'Orso d\'oro alla Berlinale 2022 e ha rappresentato la Spagna agli Oscar 2023.',
			en: 'Catalan screenwriter and director (born 1986). Her debut Summer 1993 won the Berlinale Best First Feature award and three Goyas. Alcarràs, her second feature, took the Golden Bear at Berlinale 2022 and represented Spain at the 2023 Oscars.'
		}
	},
	{
		slug: 'forastera',
		src: `${IMG_BASE}/2025/09/forastera-poster-international-alice.jpg.webp`,
		title: 'Forastera',
		section: 'Concorso',
		originalTitle: 'Forastera',
		director: 'Lucía Aleñar Iglesias',
		country: 'Spagna, Italia, Svezia',
		year: 2025,
		duration: '97 min',
		language: 'Catalano, Spagnolo, Inglese',
		genre: 'Drammatico',
		cast: [
			'Zoe Stein',
			'Lluís Homar',
			'Núria Prims',
			'Nonni Ardal',
			'Martina García'
		],
		screenplay: ['Lucía Aleñar Iglesias'],
		cinematography: ['Agnès Piqué'],
		editing: ['Paola Freddi'],
		producers: [
			'Ariadna Dot',
			'Tono Folguera',
			'Bàrbara Ferrer',
			'Cesc Mulet',
			'Marta Cruañas Compés',
			'Oliver Guerpillon',
			'Marta Reguera',
			'Giovanni Pompili'
		],
		production: [
			'Lastor Media',
			'Kino Produzioni',
			'Vilaüt Films',
			'Presenta',
			'La Perifèrica Produccions',
			'Fox in the Snow'
		],
		synopsis: {
			it: 'Le vacanze estive di Cata vengono spezzate dalla morte improvvisa e assurda della nonna, di cui è l\'unica testimone. Per elaborare il lutto, comincia a impersonarla come fosse un gioco. Quello che inizia come un semplice travestimento finisce per confondere i confini tra realtà e ruoli familiari, in un\'estate sospesa tra l\'identità che si era e quella che ci si ritrova a indossare.',
			en: 'Cata\'s summer holiday is shattered by the sudden, absurd death of her grandmother — a death she alone witnesses. To process her grief, she begins impersonating her, almost like a game. What starts as a simple disguise ends up blurring the line between reality and family roles, in a summer suspended between the identity she had and the one she finds herself wearing.'
		},
		directorBio: {
			it: 'Sceneggiatrice e regista spagnola con base a Los Angeles, si è formata alla NYU e alla Columbia University. Il suo cortometraggio Forastera è stato selezionato in numerosi festival e il lungometraggio omonimo è stato sviluppato nel programma Next Step della Semaine de la Critique.',
			en: 'Spanish writer-director based in Los Angeles, with degrees from NYU and Columbia. Her short film Forastera travelled widely on the festival circuit, and the feature version was developed through the Semaine de la Critique\'s Next Step programme.'
		}
	},
	{
		slug: 'mix-estate-83',
		src: `${IMG_BASE}/2025/09/Mix-estate-83_Crisitan-Vassallo_POSTER-1568x2352.jpg`,
		title: "Mix Estate '83",
		section: 'Panorama Italia',
		originalTitle: "Mix Estate '83",
		director: 'Cristian Vassallo',
		country: 'Italia',
		year: 2025,
		duration: '20 min',
		language: 'Italiano',
		genre: 'Cortometraggio di finzione',
		cast: ['Lorenzo Casti', 'Alexia Cozzi'],
		screenplay: ['Cristian Vassallo', 'Andrea Pugliese'],
		cinematography: ['Cristian Vassallo'],
		editing: ['Andrea Brandovardi', 'Cristian Vassallo'],
		producers: ['Cristian Vassallo'],
		production: ['NABA — Nuova Accademia di Belle Arti', 'Cristian Vassallo'],
		synopsis: {
			it: 'Mattia attraversa la notte sull\'A24 in compagnia della musica vintage della radio. All\'alba, sulle montagne abruzzesi, incontra Diana — una donna misteriosa che dirotta il suo viaggio verso una destinazione inattesa. Tesi di laurea del regista, il film fa dei paesaggi i protagonisti silenziosi della narrazione, riflesso dei suoi spostamenti quotidiani tra Como e Milano.',
			en: 'Mattia drives through the night on the A24, accompanied by vintage radio music. At dawn, in the mountains of Abruzzo, he meets Diana — a mysterious woman who reroutes his journey toward an unexpected destination. The director\'s thesis film turns landscapes into the silent leads of the story, a reflection of his daily commutes between Como and Milan.'
		},
		directorBio: {
			it: 'Nato nel 2002 vicino a Como, studia cinema e animazione alla NABA di Milano. La sua tesi — questo cortometraggio — racconta paesaggi che diventano protagonisti silenziosi, plasmati dai suoi spostamenti quotidiani tra Como e Milano.',
			en: 'Born in 2002 near Como, he studies cinema and animation at NABA in Milan. His thesis film — this short — turns landscapes into silent protagonists shaped by his daily commutes between Como and Milan.'
		}
	},
	{
		slug: 'manolo',
		src: `${IMG_BASE}/2025/09/MANOLO_POSTER_ALICE.png`,
		title: 'Manolo',
		section: 'Onde Corte',
		originalTitle: 'Manolo',
		director: 'Simone Cignitti',
		country: 'Italia',
		year: 2025,
		duration: '13 min',
		language: 'Italiano',
		genre: 'Drammatico',
		cast: ['Francesco Ferranti', 'Vittorio Allegra', 'Alessandro Zaccheo'],
		screenplay: ['Simone Cignitti', 'Francesco Cignitti'],
		cinematography: ['Mattia De Gennaro'],
		editing: ['Giovanni De Muro'],
		producers: ['Simone Cignitti', 'Francesco Cignitti'],
		production: ['Officina Pasolini'],
		synopsis: {
			it: 'Sulle coste del Lazio, Manolo ed Elia inseguono l\'illusione di un colpo capace di cambiare la loro vita. Il viaggio del protagonista si fa via via più introspettivo, attraverso un bosco che lo conduce a un incontro inaspettato con il proprio destino. Un racconto breve sulla giovinezza, sui sogni che la attraversano e su quello che resta quando l\'illusione si dissolve.',
			en: 'On the coast of Lazio, Manolo and Elia chase the illusion of a heist that could change their lives. The protagonist\'s journey turns inward, leading him through a wood toward an unexpected encounter with his own destiny. A short tale about youth, the dreams that run through it and what remains when the illusion finally dissolves.'
		},
		directorBio: {
			it: 'Laureato in Ingegneria Informatica e diplomato alla sezione Multimediale di Officina delle Arti Pier Paolo Pasolini. Firma cortometraggi e videoclip, dopo aver fatto l\'assistente sul documentario premiato Non chiudete quella porta.',
			en: 'Holds a degree in Computer Engineering and a diploma from the Multimedia section of Officina delle Arti Pier Paolo Pasolini. He directs short films and music videos, after assisting on the award-winning documentary Non chiudete quella porta.'
		}
	},
	{
		slug: 'bluey-al-cinema',
		src: `${IMG_BASE}/2025/09/Bluey_LPC_Cinema_Italian_Key-Art_9x16_Date.png`,
		title: 'Bluey al Cinema',
		section: 'Eventi Speciali',
		originalTitle: 'Bluey al cinema: Collezione giocare agli chef',
		director: 'Joe Brumm',
		country: 'Australia',
		year: 2025,
		duration: '55 min',
		language: 'Italiano',
		genre: 'Animazione',
		family: true,
		ageAdvice: 'Dai 3 anni',
		cast: ['Bluey', 'Bingo', 'Bandit', 'Chilli'],
		producers: ['Ludo Studio'],
		production: ['Ludo Studio', 'BBC Studios Kids & Family'],
		synopsis: {
			it: 'Bluey è una cagnolina di razza Blue Heeler che vive in Australia con la sua famiglia: la sorellina Bingo, papà Bandit e mamma Chilli. Sulla scia del successo planetario della serie, arriva al cinema una collezione di episodi che vede Bluey usare la sua energia inesauribile per trasformare ogni angolo di casa in un nuovo mondo da giocare. Un appuntamento pensato per le famiglie, da vivere sul grande schermo.',
			en: 'Bluey is a Blue Heeler puppy living in Australia with her family: little sister Bingo, dad Bandit and mum Chilli. On the wave of the show\'s global success, a collection of episodes arrives in cinemas, with Bluey using her boundless energy to turn every corner of the house into a world to play in. A theatrical event made for families to share on the big screen.'
		},
		directorBio: {
			it: 'Sceneggiatore e regista australiano, ideatore della serie Bluey (2018) e dei nuovi capitoli Bluey: the movie e The Meek (2025).',
			en: 'Australian writer-director, creator of the series Bluey (2018) and of the new chapters Bluey: the movie and The Meek (2025).'
		}
	}
];

// Alias retrocompatibile: i componenti esistenti continuano a importare `posters`.
export const posters: Film[] = films;

export function getFilmBySlug(slug: string): Film | undefined {
	return films.find((f) => f.slug === slug);
}
