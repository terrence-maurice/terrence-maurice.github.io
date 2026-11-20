/* Veškerý obsah webu. Texty pocházejí výhradně z CV a z explikace ve složce.
   All site content. Texts come only from the CV and the explication found in the folder. */

var CONTACT = {
  email: 'tessabaggins@gmail.com',
  phone: '+420 775 995 151',
  phoneHref: '+420775995151',
  city: { cs: 'Praha', en: 'Prague' }
};

var ABOUT = {
  role: { cs: 'Vizuální umělec, filmař', en: 'Visual artist, filmmaker' },
  // bio jen česky (text od autorky); zobrazuje se i v EN režimu, dokud nedodá anglickou verzi
  lead: {
    cs: 'Vizuální umělkyně a filmařka z Prahy. Fascinuje mě aplikace videoklipové estetiky 20. století do filmového vyprávění, průzkum vztahů mezi technologií, nástrojem a námi. Pracuji s estetikou fúze starých a současných médií (analog s digitálem, digitál s analogem), ať už v galerijním prostředí nebo v projekci. Považuji za zásadní odkazovat na kořeny pohyblivého obrazu a reagovat na dění v současné radikalizující se společnosti.',
    en: 'Visual artist and filmmaker based in Prague. I am fascinated by applying 20th-century music video aesthetics to film storytelling, and by exploring the relationships between technology, the tool and us. I work with an aesthetic that fuses old and contemporary media (analog with digital, digital with analog), whether in a gallery setting or in a projection room. I consider it essential to refer back to the roots of the moving images and to respond to what is happening in today’s radicalising society.'
  },
  study: [
    { title: 'FAMU CAS', when: { cs: '2023–dnes', en: '2023–present' },
      text: { cs: 'Bakalářské studium (BcA.)', en: 'Bachelor studies (BcA.)' } },
    { title: 'IEU Cinema and Digital Media', when: { cs: 'Fall Semester 2025', en: 'Fall Semester 2025' },
      text: { cs: 'Erasmus program v Izmiru, Turecko', en: 'Erasmus programme in Izmir, Turkey' } },
    { title: { cs: 'Filozofická fakulta Univerzity Karlovy', en: 'Faculty of Arts, Charles University' }, when: { cs: '2020–2024', en: '2020–2024' },
      text: { cs: 'Etnologie a kulturní antropologie (Bc.)', en: 'Ethnology and cultural anthropology (Bc.)' } }
  ],
  practice: [
    { title: { cs: 'Mentoring', en: 'Mentoring' },
      text: { cs: 'pod industry comp artist <strong>Levent Haseki</strong> (IEU Izmir)', en: 'under industry comp artist <strong>Levent Haseki</strong> (IEU Izmir)' } },
    { title: { cs: 'Humří chlapec <span class="muted">(2025)</span>', en: 'Humří chlapec / Lobster Boy <span class="muted">(2025)</span>' },
      text: { cs: 'klauzurní autorský film o klukovi, jenž má možná trochu moc starostlivé rodiče a plné zuby života ve vaně',
              en: 'an auteur end-of-semester film about a boy whose parents may be a little too caring and who is fed up with life in the bathtub' } },
    { title: { cs: 'Light instalace', en: 'Light installation' },
      text: { cs: 'se světlomety auta Škoda Felicia a banery technického průkazu z 90. let<br><strong>FAMU FEST</strong>, březen 2025, Holešovická šachta',
              en: 'with the headlights of a Škoda Felicia car and banners of a 1990s vehicle registration document<br><strong>FAMU FEST</strong>, March 2025, Holešovická šachta' } },
    { title: { cs: 'Mutanti Infranetu 2.0', en: 'Mutanti Infranetu 2.0 <span class="muted">(Infranet Mutants 2.0)</span>' },
      text: { cs: 'klauzurní výstava CAS, <strong>GAMU</strong>', en: 'CAS end-of-semester exhibition, <strong>GAMU</strong>' } },
    { title: { cs: 'Národní filmové muzeum NaFilm', en: 'National Film Museum NaFilm' },
      text: { cs: 'operátor filmu ve VR, průvodce', en: 'VR film operator, guide' } },
    { title: { cs: 'Scénograf a rekvizitář', en: 'Set designer and props master' },
      text: { cs: '<em>Dancing at the edge</em>, dir. Emma Kappeyne van de Coppello (2024)', en: '<em>Dancing at the edge</em>, dir. Emma Kappeyne van de Coppello (2024)' } }
  ],
  skills: [
    { name: 'DaVinci Resolve', note: { cs: 'editing, colourgrading, sound design', en: 'editing, colour grading, sound design' } },
    { name: 'Blender', note: { cs: 'modeling, texturing, animation', en: 'modelling, texturing, animation' } },
    { name: 'Unity', note: { cs: 'beginner level', en: 'beginner level' } },
    { name: 'Reality Capture', note: null },
    { name: 'Nuke', note: { cs: 'beginner level comp artist', en: 'beginner level comp artist' } },
    { name: 'Reaper', note: { cs: 'basic sound mixing', en: 'basic sound mixing' } }
  ],
  languages: [
    { cs: 'Angličtina (C1)', en: 'English (C1)' },
    { cs: 'Francouzština (A2)', en: 'French (A2)' },
    { cs: 'Řidičský průkaz sk. B', en: 'Driving licence, category B' }
  ]
};

var M = 'media/';

var CHAPTERS = {
  'famu-cas': {
    title: { cs: 'FAMU CAS', en: 'FAMU CAS' },
    sections: [
      {
        year: '2023', season: { cs: 'Zimní klauzura', en: 'Winter end-of-semester exam' },
        works: [
          {
            title: { cs: 'Mutanti Infranetu 2.0', en: 'Mutanti Infranetu 2.0 <span class="muted">(Infranet Mutants 2.0)</span>' },
            video: { src: M + 'famu-cas/2023-zimni/mutanti-infranetu-2-0.mp4', poster: M + 'famu-cas/2023-zimni/mutanti-infranetu-2-0.webp' },
            textTitle: { cs: '<strong>The Great Glitch Paradox:</strong> <em>When You Become The Porn You Are Watching</em>',
                         en: '<strong>The Great Glitch Paradox:</strong> <em>When You Become The Porn You Are Watching</em>' },
            text: {
              cs: ['<strong>The Great Glitch Paradox</strong> pojednává o fiktivní budoucnosti naší planety. Pracuje s konceptem, který se ke mně dostavil až po začátku vytváření 3D objektů (hlavních postav ve videu) za pomocí online 3D generátoru z 2D obrázku <em>3d.csm.ai</em>.<sup>1</sup> Jedná se o motiv, který bych chtěla v budoucnu rozpracovat do komiksové podoby.'],
              en: ['<strong>The Great Glitch Paradox</strong> deals with a fictional future of our planet. It works with a concept that came to me only after I had started creating the 3D objects (the main characters of the video) with <em>3d.csm.ai</em>, an online generator that turns 2D images into 3D.<sup>1</sup> It is a motif I would like to develop into a comic in the future.']
            },
            more: {
              cs: [
                'Samotní mutanti vznikli ze snímků obrazovky různých druhů porno videí. Napadlo mě, že by bylo vtipné pozorovat, jak si generativní AI pohraje s takovým materiálem. Některé oplzlosti prošly, jiné musely být více skryté. Také to něco říká o tom, jak lidé tento systém naprogramovali, aby rozeznával a prostorově dotvářel lidská těla a tváře z 2D obrázků - s tím rozdílem, že ještě musel domodelovávat lidskou nahotu a nevědomky tím ovlivňovat náš pohled na sexuální pozice a sexualitu obecně. Jak vypadají lidé, co mají sex nebo jsou v sexuální situaci?',
                'V úvodu videa promlouvá nám dobře známý vysvětlivkový narátor ze špatných fantasy nebo sci-fi filmů, který vždy má co objasňovat, ještě než film stačí začít. Jedná se o hommage a nadsázku narátorskému fenoménu “uvaděčů”.',
                'Video na pozadí v první polovině filmu bylo natočeno na telefon u pankráckých mrakodrapů, stejně i ruch dětského smíchu. Ostatní videa jsou záběry z Černobylu - šlo mi o to, aby diváctvo tuto skutečnost nepoznalo. Potřebovala jsem prázdná a opuštěná místa. Další aspekt, zároveň klíčový pro sluchovou stimulaci, byl zvuk krkavého praskání. Opět nahráno na telefon, můj hlas (vzduch deroucí se ven z bránice). Hudba v pozadí druhé části je Queen z gramofonu zapojeného do basového pedálu, autorem je Jakub Kolář.',
                'Printy nebo plakátky po stranách a nad obrazovkou jsou texturami zobrazených objektů. Některé s mým drobným zásahem, ale většina bez. Je to propojení se světem za pixely. S něčím abstraktním, čeho se nemůžeme dotknout a nezbývá než jen hledět a poslouchat. Chtěla jsem tím diváctvo více vtáhnout do světa mutantů, nebo jen do toho chvilkového zážitku, a zhmotnit ho pro ně, aby si jej mohli odnést domů nebo si s ním dělat, co by si přáli oni.',
                'Objekty ležící pod televizí jsou relikviemi mého života, jsou tam pro můj osobní perverzní pocit, netouží po tom být pochopeny. I když některé by s tím možná nesouhlasily. Mají přeci jen všechny něco společného. Čas. Jsou zosobněním ubíhajícího času…svým způsobem. Kde se nachází budoucnost, o které video pojednává? - Za - uběhnutým časem. Tedy až se onen čas rozplyne, přijde obávaná budoucnost, jen s tím rozdílem, že jí už budeme říkat trochu jinak.',
                '<small><sup>1</sup> Stránka dnes již neexistuje.</small>'
              ],
              en: [
                'The mutants themselves were made from screenshots of various kinds of porn videos. I thought it would be funny to watch how generative AI would play with such material. Some obscenities got through, others had to be hidden more. It also says something about how people programmed this system to recognise and spatially complete human bodies and faces from 2D images – except that it also had to model human nudity, unwittingly shaping our view of sexual positions and of sexuality in general. What do people look like when they are having sex or are in a sexual situation?',
                'At the beginning of the video we hear the familiar explanatory narrator of bad fantasy or sci-fi films, who always has something to explain before the film has even started. It is an homage to, and an exaggeration of, the narrator phenomenon of the “introducers”.',
                'The background video in the first half of the film was shot on a phone by the Pankrác skyscrapers, as was the sound of children’s laughter. The rest of the footage is from Chernobyl – I did not want the audience to recognise this. I needed empty, abandoned places. Another aspect, also key for auditory stimulation, was the sound of crackling burps. Again recorded on a phone, my own voice (air forcing its way out of the diaphragm). The music in the background of the second part is Queen played from a record player plugged into a bass pedal, by Jakub Kolář.',
                'The prints or small posters at the sides of and above the screen are the textures of the objects shown. Some carry a small intervention of mine, but most do not. They are a link to the world behind the pixels – to something abstract that we cannot touch, that we can only look at and listen to. I wanted to draw the audience further into the world of the mutants, or just into that fleeting experience, and to make it physical for them, so they could take it home or do with it whatever they wished.',
                'The objects lying under the television are relics of my life; they are there for my own personal perverse feeling and do not wish to be understood. Although some of them might disagree. After all, they all have something in common. Time. They are the embodiment of passing time… in a way. Where is the future the video speaks of? – Beyond – time that has passed. So once that time dissolves, the dreaded future will come, only we will call it something slightly different.',
                '<small><sup>1</sup> The website no longer exists.</small>'
              ]
            },
            moreLabel: { cs: 'Celá explikace', en: 'Full explication' },
            galleries: [
              { title: { cs: 'Galerie textur mutantů', en: 'Gallery of mutant textures' },
                base: M + 'famu-cas/2023-zimni/galerie-textur-mutantu/',
                images: ['albedo2', 'palvky', 'patriarchy', 'strap', 'tied'] }
            ]
          }
        ]
      },
      {
        year: '2024', season: { cs: 'Zimní klauzura', en: 'Winter end-of-semester exam' },
        works: [
          {
            id: 'smrt-auta',
            title: { cs: 'Smrt auta, které s námi vyrůstalo', en: 'Death of the car that grew up with us' },
            // prapor: vyjede přes celou šířku okna (app.js, openSheet) / banner: slides out across the window
            print: { src: M + 'famu-cas/2024-zimni/smrt-auta/novy-lepsi-prapor-pro-tisk-technicak.webp', w: 827, h: 4724 },
            galleries: [
              { title: null,
                base: M + 'famu-cas/2024-zimni/smrt-auta/',
                images: ['img-9476', 'img-9477', 'img-9487', 'img-9489'] }
            ],
            // text autorky (CZ originál, EN překlad), stránka #/text/smrt-auta / the author's text (Czech original, English translation)
            page: {
              cs: [
              '<h1 class="text-main">SMRT AUTA CO S NÁMA VYRŮSTALO</h1>',
              '<p class="text-place">Libeňská synagoga, zimní klauzury 2024/2025</p>',
              '<p class="text-credit"><strong>ELEKTROTECHNICI:</strong> Jiří a Václav Muric</p>',
              '<p class="text-credit"><strong>KONCEPT, VIZUALIZACE, GRAFIKA:</strong> Tereza Muric</p>',
              '<p class="text-credit"><strong>DÍLNA:</strong> Ekologie tvorby, Georgy Bagdasarov</p>',
              '<p>LIGHT INSTALACE se světlomety auta <em>Škoda Felicia</em>, které rodiče zakoupili v roce 2009, je založena na estetizaci původního TECHNICKÉHO PRŮKAZU z roku 1997, jenž nadživotně zvětšený a graficky upravený ční nad exponátem. Objekt připomíná roli Felicie v národní identitě i v osobní zkušenosti.</p>',
              '<p class="text-quote"><em>„Jezdili jsme s ním kus dětství a celé dospívání. Bylo hlavně autem mamky, kterým nás vozila, kde bylo třeba, když táta býval pracovně dlouho pryč. Teď už jsme dospělí a jezdí s ním především bratr Václav...potom, co své autíčko vytunil a bylo už nadobro jeho, si ho jednoho rána po letech půjčila zase naše mamka...auto havarovalo v listopadu 2024. Zároveň jsem sama, autorka, havarovala v srpnu 2023 a mám od té doby vracející se fóbii z řízení strojů. Je tedy docela ironické, že o stroji, který mě děsí, vytvářím instalaci. Možná je to forma jakéhosi tributu symbolu naší rodiny a dětství, možná je to způsob, jak se vyrovnat s traumatem bourání a možná rituál přechodu, jistý pohřeb pro náš stroj, kdy techničák – jeho rodný list, chcete-li – se stává jakýmsi parte. Kronikou života této mašiny a spolu s ní i nás.“</em></p>',
              '<p>Estetizace úředních dokumentů neboli administrativní estetika sahá na našem území do 70. až 80. let, kdy se tato forma hojně využívala. Co je to administrativní estetika? V Americe ji přejímá konceptuální umění 60. let. Tváří se, že rezignuje na jakékoliv vizuální zobrazení. Chce se redukovat na pouhé jazykové vyjádření. Zároveň však přece jen přebírá estetiku – administrace. Mně se líbí, že z něčeho, co má být nudné, jasné, funkční a přehledné a opravdu především sloužit svému účelu – můžeme vytvořit něco, co má svou vlastní cenu a svůj vlastní kontext mimo ten, jenž mu byl násilně dán nějakou institucí. Teoretik moderního a současného umění Karel Císař tvrdí, že na přelomu 60. a 70. let byl určitý typ práce, který proměnil umění a umožnil jeho existenci. Jaký typ práce umožňuje konceptuální umění? Konceptuální umění nevnímá jako pouze nějakou jednoduchou reakci na vzniklé formy umění, ale je zároveň typem umění, který je umožněný určitými změnami ve sféře práce (Císař, Karel. <em>Od administrativní estetiky k institucionální kritice?</em> <a href="https://artlist.cz/" target="_blank" rel="noopener">Artlist — Centrum pro současné umění Praha</a>, 2016. 2:23–2:53.).</p>',
              '<p>Když se běžně vykládá konceptuální umění, uvažuje se o něm jako o reakci na určité projevy, např. jistého formalismu v americkém umění 50. a 60. let. Tedy že je nutnou reakcí. Jiní o konceptualismu mluví jako o globálním fenoménu. Každé umění od určité doby je v jejich očích konceptuálním. Užší definice může být, že konceptuální umění je to, které bytostně pracuje s nějakým jazykem. Karel Císař odkazuje na text z roku 1989 od Benjamina H. D. Buchloha <em>Conceptual Art 1962 – 1969: From the Aesthetic of Administration to the Critique of Institution</em>, kde se autor pokusil napsat dějiny konceptuálního umění jako historického fenoménu. Buchloh tvrdí, že je podstatné, z jaké pozice konceptuální umění mluví. Píše o něm zhruba 20 let poté, co bylo konceptuální umění nejvýraznější, což mu dává historickou perspektivu. Text byl psaný z pozice prohry konceptuálního umění. Představuje též reakci na minimalismus (v mém případě odpovídá maximalismem a kýčem). Používání formálních prostředků místo klasicky výstavních. Vytváří se tak jazyk komunikace s návštěvníky, který je víc intimní. Umělci přicházejí s něčím novým, ale zároveň tam též pozitivně přijímají něco z historické tradice, což je podle Buchloha velmi důležité.</p>',
              '<p>Např. minimalistické dílo od Sola LeWitta, Untitled (Red Square, White Letters), 1962, performativně nakládá s tím, co před ním prožívá jeho divák. Ten to dílo musí jednak číst (je tam text), ale zároveň ho musí vidět. Modernistická sebereflexe? Ukazuje věc takovou, jaká je.</p>',
              '<p>Robert Morris. Untitled (Statement of Aesthetic Withdrawal), 1963 neboli <em>Prohlášení o odnětí estetiky</em>. Dílo mělo původně estetickou hodnotu, ale on (autor) ho po tomto vyjádření té hodnoty zbavil.</p>',
              '<p><strong>Já svému dílu onu estetickou hodnotu chci dát. Něco (techničák), co bylo vždy praktické a již v dnešní době vypadá úplně jinak, je najednou vystaveno, jen protože se jedná o jakousi relikvii starého řádu fungování věcí.</strong> Není to velmi základní princip fungování muzejnictví? Baví mě vystavovat předměty denní potřeby mimo jejich původní kontext.</p>',
              '<h2 class="text-head">ŠKODA FELICIA COMBI (facelift)</h2>',
              '<p><strong>Škoda Felicia</strong> je osobní automobil, který v letech 1994–2001 vyráběla automobilka Škoda Auto. Jednalo se o model, na kterém se velmi projevilo začlenění automobilky do koncernu Volkswagen, např. zavedením výrobních specifikací, definovaných bázovým modelem a systémem indexů mimořádných výbav. Koncepčně vůz vycházel z předchozího modelu Škoda Favorit, jeho design byl však pokročilejší, vůz byl osazován různými typy motorů a byl výrazně spolehlivější. Oproti modelu Favorit byly zavedeny do vybraných verzí některé nové prvky jako ABS, posilovač řízení aj. Jméno Felicia továrna převzala od předchozího sportovního modelu Felicia vyráběného v 60. letech 20. století ve verzích s pevnou nebo skládací střechou.</p>',
              '<blockquote class="text-cite"><p>(6) Felicia znamenala v roce 1994 první výrazný krok Škodovky k moderním automobilům schopným konkurence nejen ve střední Evropě, ale i na těch nejnáročnějších trzích. V roce 1991, po vstupu Volkswagenu do státem vlastněné automobilky, se postupně začalo pracovat na mnoho let trvající přestavbě prakticky všeho, co se v Mladé Boleslavi dělalo. Novinky v produkci na sebe zpočátku nechávaly čekat, ale německý spoluvlastník ujišťoval všechny škarohlídy, že se ze Škodovky nestane jen montážní závod zastaralých automobilů určených jen pro východ Evropy. Modelový rok 1993 byl v Boleslavi ve znamení 548 změn provedených na Favoritu a v roce 1994 to přišlo. Zcela „nový“ automobil nesl staronové jméno Felicia, které Škodovka použila u kabrioletu ze 60. let. Ve skutečnosti nešlo o automobil úplně nový, ale spíše o důkladně přepracovaný Favorit, kterému v té době táhlo na sedmý rok života. K takovému postupu přivedlo manažery zřejmě více argumentů. V prvé řadě byl o Favority stále poměrně velký zájem, a to i přes velkou inflaci na počátku 90. let (v řádu desítek procent), která znamenala zdražování prakticky všeho včetně Škodovek. Na druhou stranu základní koncepce a proporce Favorita byly dobrým základem pro časově i finančně méně náročné změny. Vývoj automobilů samozřejmě musel respektovat ekonomickou situaci obyvatel České republiky, protože ti tvoří až dodnes nejpodstatnější skupinu zákazníků. Škoda Auto poměrně stabilně drží přibližně 50&nbsp;% trhu s novými automobily (platné k roku 2010). –<br><span class="text-source">LÁNÍK, Ondřej. <em>Škoda Felicia – Felda</em> [online]. auto.cz, 2003-05-21 [cit. 2025-02-03].</span></p></blockquote>',
              '<p>Výroba typu Felicia byla ukončena 20. června 2001, kdy v 9:25 hodin ráno vyjel vůz Felicia LX 1,9D bílá s číslem karosérie 7 367 379. Následníkem modelu se stala Škoda Fabia.</p>'
            ],
            en: [
              '<h1 class="text-main">THE DEATH OF THE CAR THAT GREW UP WITH US</h1>',
              '<p class="text-place">Libeň Synagogue, winter end-of-semester exams 2024/2025</p>',
              '<p class="text-credit"><strong>ELECTRICAL ENGINEERS:</strong> Jiří and Václav Muric</p>',
              '<p class="text-credit"><strong>CONCEPT, VISUALISATION, GRAPHICS:</strong> Tereza Muric</p>',
              '<p class="text-credit"><strong>WORKSHOP:</strong> Ekologie tvorby (Ecology of Creation), Georgy Bagdasarov</p>',
              '<p>The LIGHT INSTALLATION with the headlights of a <em>Škoda Felicia</em> car, which my parents bought in 2009, is based on the aestheticisation of the original VEHICLE REGISTRATION DOCUMENT from 1997, which, enlarged to larger than life and graphically reworked, towers above the exhibit. The object recalls the role of the Felicia in national identity as well as in personal experience.</p>',
              '<p class="text-quote"><em>“We rode in it for part of our childhood and all of our adolescence. It was mainly Mum’s car; she drove us wherever we needed to go when Dad was away for work for long stretches. Now we are grown up and it is mostly my brother Václav who drives it...after he had tuned up his little car and it had become his for good, one morning, years later, our mum borrowed it again...the car crashed in November 2024. At the same time I myself, the author, had a crash in August 2023, and since then I have had a recurring phobia of operating machines. So it is rather ironic that I am making an installation about a machine that frightens me. Perhaps it is a kind of tribute to a symbol of our family and childhood, perhaps it is a way of coming to terms with the trauma of crashing, and perhaps a rite of passage, a kind of funeral for our machine, in which the registration document – its birth certificate, if you like – becomes a kind of death notice. A chronicle of the life of this machine, and together with it, of us.”</em></p>',
              '<p>The aestheticisation of official documents, or administrative aesthetics, goes back in our region to the 1970s and 1980s, when this form was widely used. What is administrative aesthetics? In America it was taken up by the conceptual art of the 1960s. It pretends to renounce any visual representation. It wants to reduce itself to mere linguistic expression. At the same time, however, it does take on an aesthetic – that of administration. I like that from something that is meant to be boring, clear, functional and orderly, and above all to serve its purpose, we can create something that has its own value and its own context, apart from the one forcibly given to it by some institution. The theorist of modern and contemporary art Karel Císař argues that at the turn of the 1960s and 1970s there was a certain type of work that transformed art and made its existence possible. What type of work makes conceptual art possible? He does not see conceptual art merely as a simple reaction to existing forms of art, but also as a type of art made possible by certain changes in the sphere of work (Císař, Karel. <em>Od administrativní estetiky k institucionální kritice?</em> [From Administrative Aesthetics to Institutional Critique?] <a href="https://artlist.cz/" target="_blank" rel="noopener">Artlist — Centrum pro současné umění Praha</a>, 2016. 2:23–2:53.).</p>',
              '<p>When conceptual art is commonly interpreted, it is thought of as a reaction to certain tendencies, e.g. a certain formalism in American art of the 1950s and 1960s – that is, as a necessary reaction. Others speak of conceptualism as a global phenomenon; in their eyes, all art from a certain point on is conceptual. A narrower definition may be that conceptual art is art that fundamentally works with some kind of language. Karel Císař refers to the 1989 text by Benjamin H. D. Buchloh <em>Conceptual Art 1962 – 1969: From the Aesthetic of Administration to the Critique of Institution</em>, in which the author tried to write a history of conceptual art as a historical phenomenon. Buchloh argues that the position from which conceptual art speaks is essential. He writes about it some 20 years after conceptual art was at its most prominent, which gives him a historical perspective. The text was written from the position of conceptual art’s defeat. It is also a reaction to minimalism (in my case the response is maximalism and kitsch). The use of formal means instead of classic exhibition ones. This creates a language of communication with visitors that is more intimate. Artists come up with something new, but at the same time they also positively take on something from historical tradition, which, according to Buchloh, is very important.</p>',
              '<p>For example, the minimalist work by Sol LeWitt, Untitled (Red Square, White Letters), 1962, performatively deals with what its viewer experiences in front of it. The viewer has to read the work (there is text in it), but at the same time has to see it. Modernist self-reflection? It shows the thing as it is.</p>',
              '<p>Robert Morris. Untitled (<em>Statement of Aesthetic Withdrawal</em>), 1963. The work originally had aesthetic value, but he (the author) stripped it of that value with this statement.</p>',
              '<p><strong>I want to give my work that aesthetic value. Something (the registration document) that was always practical and today looks completely different is suddenly put on display, just because it is a kind of relic of an old order of how things worked.</strong> Isn’t that a very basic principle of how museums work? I enjoy exhibiting everyday objects outside their original context.</p>',
              '<h2 class="text-head">ŠKODA FELICIA COMBI (facelift)</h2>',
              '<p>The <strong>Škoda Felicia</strong> is a passenger car produced by Škoda Auto from 1994 to 2001. It was a model that clearly showed the carmaker’s integration into the Volkswagen group, for example through the introduction of production specifications defined by a base model and a system of special-equipment codes. Conceptually the car was based on the previous Škoda Favorit model, but its design was more advanced, it was fitted with various types of engines and it was considerably more reliable. Compared with the Favorit, some new features such as ABS and power steering were introduced in selected versions. The factory took the name Felicia from an earlier sports model, the Felicia, produced in the 1960s with a fixed or folding roof.</p>',
              '<blockquote class="text-cite"><p>(6) In 1994 the Felicia marked Škoda’s first significant step towards modern cars able to compete not only in Central Europe but also in the most demanding markets. In 1991, after Volkswagen entered the state-owned carmaker, work gradually began on a reconstruction, lasting many years, of practically everything that was done in Mladá Boleslav. New products were slow to come at first, but the German co-owner assured all the sceptics that Škoda would not become just an assembly plant for outdated cars intended only for Eastern Europe. Model year 1993 in Boleslav was marked by 548 changes made to the Favorit, and in 1994 it came. The completely “new” car bore the old-new name Felicia, which Škoda had used for a convertible in the 1960s. In reality it was not an entirely new car, but rather a thoroughly reworked Favorit, which at that time was approaching its seventh year. The managers were probably led to this approach by several arguments. First of all, there was still considerable interest in the Favorit, even despite high inflation in the early 1990s (in the tens of percent), which meant that practically everything became more expensive, including Škoda cars. On the other hand, the basic concept and proportions of the Favorit were a good basis for changes that were less demanding in time and money. The development of cars naturally had to respect the economic situation of the people of the Czech Republic, as they remain the most important group of customers to this day. Škoda Auto fairly steadily holds approximately 50% of the new-car market (as of 2010). –<br><span class="text-source">LÁNÍK, Ondřej. <em>Škoda Felicia – Felda</em> [online]. auto.cz, 2003-05-21 [cited 2025-02-03].</span></p></blockquote>',
              '<p>Production of the Felicia ended on 20 June 2001, when at 9:25 a.m. a white Felicia LX 1.9D with body number 7 367 379 rolled off the line. The model was succeeded by the Škoda Fabia.</p>'
            ]
            }
          }
        ]
      },
      {
        year: '2024', season: { cs: 'Letní klauzura', en: 'Summer end-of-semester exam' },
        works: [
          {
            title: { cs: 'BREJLE PROJECT', en: 'BREJLE PROJECT' },
            video: { src: M + 'famu-cas/2024-letni/brejle-project.mp4', poster: M + 'famu-cas/2024-letni/brejle-project.webp' }
          },
          {
            title: { cs: 'PÁJIM', en: 'PÁJIM' },
            video: { src: M + 'famu-cas/2024-letni/pajim.mp4', poster: M + 'famu-cas/2024-letni/pajim.webp' }
          },
          {
            title: { cs: 'Dokument – Slávy otec', en: 'Documentary – Slávy otec <span class="muted">(Sláva&rsquo;s Father)</span>' },
            video: { src: M + 'famu-cas/2024-letni/dokument-slavy-otec.mp4', poster: M + 'famu-cas/2024-letni/dokument-slavy-otec.webp' }
          },
          {
            title: { cs: 'Galerie', en: 'Gallery' },
            galleries: [
              { title: null,
                base: M + 'famu-cas/2024-letni/galerie/',
                images: ['2-tesla-pmd-85-bez-loga', '555', 'an-20elliott-20803', 'banjo'] }
            ]
          },
          {
            title: { cs: 'Fotky výstavy', en: 'Exhibition photos' },
            galleries: [
              { title: null,
                base: M + 'famu-cas/2024-letni/fotky-vystavy/',
                images: ['gamu-cas-ceasefire-8', 'gamu-cas-ceasefire-10', 'gamu-cas-ceasefire-12', 'gamu-cas-ceasefire-13', 'gamu-cas-ceasefire-14', 'gamu-cas-ceasefire-18', 'gamu-cas-ceasefire-19', 'gamu-cas-ceasefire-20', 'gamu-cas-ceasefire-22', 'gamu-cas-ceasefire-24', 'gamu-cas-ceasefire-25'] }
            ]
          }
        ]
      },
      {
        year: '2025', season: { cs: 'Letní klauzura', en: 'Summer end-of-semester exam' },
        works: [
          {
            title: { cs: 'Humří chlapec', en: 'Humří chlapec <span class="muted">(Lobster Boy)</span>' },
            meta: { cs: '2025', en: '2025' },
            text: {
              cs: ['Klauzurní autorský film o klukovi, jenž má možná trochu moc starostlivé rodiče a plné zuby života ve vaně.'],
              en: ['An auteur end-of-semester film about a boy whose parents may be a little too caring and who is fed up with life in the bathtub.']
            },
            galleries: [
              { title: { cs: 'Stills z filmu', en: 'Film stills' },
                base: M + 'famu-cas/2025-letni/humri-chlapec-stills/',
                images: ['v01-portfolio-pohybliveho-obrazu', 'v01-portfolio-pohybliveho-obrazu-1', 'v01-portfolio-pohybliveho-obrazu-2', 'v01-portfolio-pohybliveho-obrazu-3', 'v01-portfolio-pohybliveho-obrazu-4', 'v01-portfolio-pohybliveho-obrazu-5'] },
              { title: { cs: '3D inspirované filmem', en: '3D inspired by the film' },
                base: M + 'famu-cas/2025-letni/humri-chlapec-3d/',
                images: ['humr', 'detajl5', 'detajl6', 'shell3', 'tv1'] }
            ]
          }
        ]
      },
      {
        year: '2025', season: { cs: 'Erasmus Izmir — Cinema and Digital Media', en: 'Erasmus Izmir — Cinema and Digital Media' },
        note: {
          cs: 'IEU Cinema and Digital Media (Fall Semester 2025), Erasmus program v Izmiru, Turecko.',
          en: 'IEU Cinema and Digital Media (Fall Semester 2025), Erasmus programme in Izmir, Turkey.'
        },
        works: [
          {
            title: { cs: 'Brejle Dream', en: 'Brejle Dream' },
            video: { src: M + 'famu-cas/2025-erasmus/brejle-dream.mp4', poster: M + 'famu-cas/2025-erasmus/brejle-dream.webp' }
          },
          {
            title: 'Nuke – beginner level comp artist',
            video: { src: M + 'famu-cas/2025-erasmus/nuke-showreel.mp4', poster: M + 'famu-cas/2025-erasmus/nuke-showreel.webp' },
            text: {
              cs: ['Showreel vznikl jako atestace k předmětu Digital Image Compositing Techniques and Special Effects v rámci mentoringu pod industry comp artist Leventem Hasekim. Vizuální efekty byly vytvořeny v nekomerční verzi programu Nuke.'],
              en: ['The showreel was created as the final assessment for the course Digital Image Compositing Techniques and Special Effects, as part of mentoring under industry comp artist Levent Haseki. The visual effects were created in the non-commercial version of Nuke.']
            }
          },
          {
            title: { cs: 'Zvuky Izmiru', en: 'Sounds of Izmir' },
            audio: {
              base: M + 'famu-cas/2025-erasmus/zvuky-izmiru/',
              visual: true,    // moře zvuku + tvar každé nahrávky (assets/sound.js, assets/waveforms.js)
              tracks: [
                ['131-sk-57', '131. Sk. 57'],
                ['anil-izci-kuafor-washing-blues-with-4-figs', 'Anıl İzci Kuaför – washing blues with 4 figs'],
                ['body-positivity-for-mein-herr', 'Body positivity for Mein Herr'],
                ['fahretin-altay-song', 'Fahretin Altay song'],
                ['izmir-tram', 'Izmir tram'],
                ['modlitba-pro-izmir', { cs: 'Modlitba pro Izmir', en: 'Modlitba pro Izmir (Prayer for Izmir)' }],
                ['rain', 'Rain'],
                ['u-r-a-person-u-r-not-a-reflection', 'U R a person, U R NOT a reflection'],
                ['washing-machine', 'Washing machine'],
                ['waves-breaking-sunset', 'Waves breaking sunset']
              ]
            }
          }
        ]
      }
    ]
  },

  'volna-tvorba': {
    title: { cs: 'Volná tvorba', en: 'Independent work' },
    sections: [
      {
        year: '2022', season: null,
        works: [
          {
            title: { cs: 'Track 01 – Horny Cousin EME', en: 'Track 01 – Horny Cousin EME' },
            video: { src: M + 'volna-tvorba/2022/horny-cousin-eme.mp4', poster: M + 'volna-tvorba/2022/horny-cousin-eme.webp' }
          },
          {
            title: { cs: 'Manifest bolesti – záznam', en: 'Manifest bolesti <span class="muted">(Manifesto of Pain)</span> – recording' },
            videos: [
              { src: M + 'volna-tvorba/2022/manifest-bolesti/mah01395.mp4', poster: M + 'volna-tvorba/2022/manifest-bolesti/mah01395.webp' },
              { src: M + 'volna-tvorba/2022/manifest-bolesti/mah01396.mp4', poster: M + 'volna-tvorba/2022/manifest-bolesti/mah01396.webp' },
              { src: M + 'volna-tvorba/2022/manifest-bolesti/mah01397.mp4', poster: M + 'volna-tvorba/2022/manifest-bolesti/mah01397.webp' }
            ]
          }
        ]
      }
    ]
  }
};
