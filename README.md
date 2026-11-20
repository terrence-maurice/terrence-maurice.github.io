# Tereza Muric — portfolio

Statický web pro GitHub Pages (bez build kroku). Publikuje se z větve `main` na https://terrence-maurice.github.io.

## O mně

Vizuální umělkyně a filmařka z Prahy. Fascinuje mě aplikace videoklipové estetiky 20. století do filmového vyprávění, průzkum vztahů mezi technologií, nástrojem a námi. Pracuji s principem fúze starých a současných médií (analog s digitálem, digitál s analogem), ať už v galerijním prostředí nebo v projekci. Považuji za zásadní odkazovat na kořeny pohyblivého obrazu a reagovat na dění v současné radikalizující se společnosti.

## About me

Visual artist and filmmaker based in Prague. I am fascinated by applying 20th-century music video aesthetics to film storytelling, and by exploring the relationships between technology, the tool and us. I work with the principle of fusing old and contemporary media (analog with digital, digital with analog), whether in a gallery setting or in a projection room. I consider it essential to refer back to the roots of the moving images and to respond to what is happening in today’s radicalising society.

## Soubory webu

- `index.html` — kostra stránky (horní lišta, menu, patička), načtení písem a skriptů. Odkazy na soubory v `assets/` mají `?v=N`; při každé změně souboru se `N` zvýší, aby návštěvníci nedostali starou verzi z mezipaměti.
- `assets/content.js` — **veškerý obsah**: CV a bio, texty CZ/EN, kapitoly s díly, videa, galerie obrázků, zvuky a text k dílu *Smrt auta, které s námi vyrůstalo*. Nová díla se přidávají sem.
- `assets/app.js` — stránky a navigace (`#/`, `#/famu-cas`, `#/volna-tvorba`, `#/galerie`, `#/kontakt`, `#/text/<dílo>`), přepínání jazyka CZ/EN, galerie obrázků (každý obrázek ve vlastním formátu, klik = další obrázek, swipe na mobilu) a prapor k dílu *Smrt auta*, který vyjíždí z horní lišty jako papír z tiskárny. Kapitolu *Galerie pohyblivého obrazu* skládá automaticky ze všech videí v ostatních kapitolách.
- `assets/sound.js` — nahrávky *Zvuků Izmiru*: místo lišty přehrávače tlačítko přehrát/pauza a tvar zvuku (waveform), který slouží jako posuvník; vždy hraje jen jedna nahrávka. Živě analyzuje hrající zvuk pro třpytivé pozadí.
- `assets/waveforms.js` — tvar každé nahrávky *Zvuků Izmiru* (240 hodnot hlasitosti), spočítaný z audia přes ffmpeg.
- `assets/glitter.js` — třpytivé pozadí (p5.js), které se leskne při scrollování a reaguje na hrající nahrávku: flitry jemně pulzují a podle hlasitosti na náhodných místech vyskakují malé hvězdičky, které pomalu krouží.
- `assets/style.css` — vzhled; písma Bricolage Grotesque, Instrument Sans, Bellota a Almendra Display (Google Fonts).
- `media/` — webově zkomprimovaná videa (H.264 720p), obrázky (WebP) a zvuky (M4A), uspořádané podle kapitol a let.
- `CLAUDE.md` — podrobnější popis architektury a pravidla pro úpravy obsahu.

GitHub omezuje velikost souboru na 100 MB a celý web na ~1 GB, proto jsou videa zmenšená. Originály zůstávají v nadřazené složce.
