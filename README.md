# ONMOGELIJK? — versie 0.1

Even anders kijken. Een statische webapp met drie **tijdelijke proefkaarten**. De drie concepten hebben AI-gegenereerde fotorealistische proefbeelden in WebP-formaat. Kaarten 001 en 002 zijn door de gebruiker goedgekeurd en hebben geen proefmarkering meer. Kaart 003 blijft een tijdelijke proefkaart. De oorspronkelijke SVG-illustraties en neutrale beeldplaatsen blijven bewaard maar worden niet meer getoond. Er worden geen externe afbeeldingen, lettertypen of diensten geladen.

## Lokaal testen

Vereist: Python 3. Geen installatie of build nodig.

```sh
cd /workspace/Onmogeliijk
python3 -m http.server 8000 --bind 0.0.0.0
```

Open lokaal `http://localhost:8000`. Gebruik een webserver: rechtstreeks openen via `file://` ondersteunt het laden van JSON niet. Stop met Ctrl+C.

Controleer: Verras me → beeld → Ontdek de vraag → Andere vraag → Verras me opnieuw. Een nieuw beeld verschilt van het vorige. Vragen herhalen pas nadat alle vragen van de kaart zijn getoond; ook bij het begin van een nieuwe ronde wordt directe herhaling vermeden. De vraagvolgorde wordt per kaart onthouden zolang de pagina open blijft, ook na het wisselen naar een andere kaart. Tab en Enter/Spatie bedienen de knoppen. De interface respecteert verminderde beweging.

## Kaarten toevoegen of vervangen

Bewerk `data/cards.json`. Elke kaart heeft een unieke `id`, een relatief `image`-pad, een beschrijvende `alt` en meerdere unieke `questions`. Plaats eigen of aantoonbaar gelicentieerde beelden in `assets/`. Gebruik relatieve paden zodat de app ook onder een GitHub Pages-projectpad werkt. Gebruik `status: "placeholder"` voor lege beeldplaatsen, `status: "trial"` voor proefbeelden en `status: "approved"` alleen na afzonderlijke beeldbeoordeling. De proefkaartmarkering wordt automatisch verborgen bij goedgekeurde kaarten. `title` en `concept` documenteren het idee zonder de bezoeker een interpretatie voor te schrijven. Gebruik bij voorkeur geoptimaliseerde WebP-beelden (circa 1600–2000 pixels breed); belangrijke details blijven zichtbaar doordat beelden niet worden bijgesneden. Verwijder ongebruikte proefbestanden en leg de rechten van nieuwe beelden vast.

## Publiceren met GitHub Pages

1. Commit en push de bestanden naar `main` in de GitHub-repository.
2. Ga naar **Settings → Pages**.
3. Kies **Deploy from a branch**, branch **main**, map **/ (root)** en klik **Save**.
4. Wacht tot de Pages-deployment slaagt en open de URL die GitHub toont.
5. Controleer daar de volledige klikvolgorde en of de drie beelden laden.

Geen backend, database, account, API-sleutel of buildstap nodig. Publicatie is een aparte handeling; deze bestanden publiceren zichzelf niet.

## Bestanden

- `index.html`: toegankelijke schermstructuur.
- `style.css`: responsieve vormgeving.
- `app.js`: kaartselectie, vraagvolgorde en laadfouten.
- `data/cards.json`: inhoud.
- `assets/`: eigen tijdelijke illustraties.
- `tests/flow.mjs`: interactietest zonder externe testafhankelijkheden; uitvoeren met `node --test tests/flow.mjs` (Node 20+).

## Ontwikkelronde: droomlogica

De drie proefconcepten zijn Het gevolg vóór de oorzaak, Het huis dat zich iets herinnert en De regen die binnen blijft. Ieder concept heeft de opgegeven hoofdvraag en één extra vraag. Er zijn drie AI-gegenereerde proefbeelden toegevoegd, geen definitief goedgekeurde kunstwerken. Beoordeel kandidaten afzonderlijk op fotografische geloofwaardigheid, originaliteit, zichtbare onmogelijkheid en nieuwsgierigheid. Een aantrekkelijk beeld zonder de bedoelde paradox valt af.

De initiatiefvermelding linkt naar Je Kern tot Bloei. De referentiesite kon vanuit de ontwikkelomgeving niet worden opgehaald (HTTP 403). Het aangeleverde logo is als visuele referentie gebruikt: wit, donkergrijs en twee roze tinten. Het roze accent is voor knoptekstcontrast verdiept. Dit zijn visueel afgeleide kleuren, geen bevestigde huisstijlwaarden. De precieze lettertypen zijn onbekend; de app gebruikt lokale systeemlettertypen. Het door de gebruiker aangeleverde SVG-logo staat ongewijzigd in `assets/logo.svg` en verschijnt bij de initiatiefvermelding. Het wordt lokaal geladen, zonder externe afhankelijkheden.

Browsercontrole met Chromium: volledige klikvolgorde op 390 × 844 en 1440 × 1000, geladen beelden, geen horizontale overflow en geen JavaScript-fouten. Geautomatiseerde interactietests controleren ook vraaggeschiedenis bij terugkeer naar een kaart.

### Beeldbeoordeling van de proefversie

De drie afbeeldingen zijn speciaal voor deze app gegenereerd, zonder externe stockbeelden of nabootsing van genoemde kunstenaars. `source` in de kaartdata vermeldt de herkomst. Alle bestanden zijn 1536 × 1024 pixels, geoptimaliseerd als WebP onder 500 KB; de PNG-originelen blijven buiten de repository in de cloudwerkruimte bewaard.

- **001:** overtuigende stoep, terracotta en daglicht. De intacte pot boven zijn scherven maakt de tegenspraak zichtbaar; de tijdsvolgorde blijft open voor interpretatie.
- **002:** geloofwaardig interieur en textiel. De lege hals en gedragen deken suggereren afwezigheid; kan ook als een verborgen persoon worden gelezen. Dit is de minst eenduidige proef en vraagt verdere artistieke beoordeling.
- **003:** zichtbaar lokale regen en spatten op de tafel, zonnige droge omgeving. De oorsprong van de regen valt buiten beeld; bij een volgende versie kan het beginpunt in de lucht explicieter worden.

Kaarten 001 (bloempot) en 002 (lege stoel met de deken) zijn door de gebruiker goedgekeurd; de proefmarkeringen zijn verwijderd. Kaart 003 wacht nog op afzonderlijke goedkeuring.

### Herziening kaart 003

De eerste keukenregen kon als lekkage worden gelezen en is niet langer actief. De nieuwe proef `regen-omhoog.webp` toont druppelsporen boven de ontbijttafel, met zichtbaar droog plafond en een vrije ruimte boven het water. Het idee is opwaartse regen; de bewegingsrichting is in een stilstaand beeld nog dubbelzinnig. Deze versie is daarom nadrukkelijk een proef, geen definitief goedgekeurd werk. De vragen zijn aangepast aan het nieuwe concept. Het oude beeld blijft als niet-actieve versie bewaard.
