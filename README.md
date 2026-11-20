# Tereza Muric — portfolio

Statický web pro GitHub Pages (bez build kroku). Publikuje se z větve `main` na https://terrence-maurice.github.io.

- `index.html` — kostra stránky (horní lišta, menu, patička), načtení písem a skriptů. Odkazy na soubory v `assets/` mají `?v=N`; při každé změně souboru se `N` zvýší, aby návštěvníci nedostali starou verzi z mezipaměti.
- `assets/content.js` — **veškerý obsah**: CV a bio, texty CZ/EN, kapitoly s díly, videa, galerie obrázků, zvuky a text k dílu *Smrt auta, které s námi vyrůstalo*. Nová díla se přidávají sem.
- `assets/app.js` — stránky a navigace (`#/`, `#/famu-cas`, `#/volna-tvorba`, `#/galerie`, `#/kontakt`, `#/text/<dílo>`), přepínání jazyka CZ/EN, galerie obrázků (každý obrázek ve vlastním formátu, klik = další obrázek, swipe na mobilu) a prapor k dílu *Smrt auta*, který vyjíždí z horní lišty jako papír z tiskárny. Kapitolu *Galerie pohyblivého obrazu* skládá automaticky ze všech videí v ostatních kapitolách.
- `assets/glitter.js` — třpytivé pozadí (p5.js) reagující na scrollování.
- `assets/style.css` — vzhled; písma Bricolage Grotesque, Instrument Sans, Bellota a Almendra Display (Google Fonts).
- `media/` — webově zkomprimovaná videa (H.264 720p), obrázky (WebP) a zvuky (M4A), uspořádané podle kapitol a let.
- `CLAUDE.md` — podrobnější popis architektury a pravidla pro úpravy obsahu.

GitHub omezuje velikost souboru na 100 MB a celý web na ~1 GB, proto jsou videa zmenšená. Originály zůstávají v nadřazené složce.
