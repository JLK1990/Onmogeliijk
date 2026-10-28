# ONMOGELIJK? — versie 0.1

Even anders kijken. Een statische webapp met vijftien kaarten. De vijftien concepten hebben AI-gegenereerde fotorealistische beelden in WebP-formaat. Kaarten 001 en 002 zijn door de gebruiker goedgekeurd en hebben geen proefmarkering meer. Kaarten 003 tot en met 015 blijven tijdelijke proefkaarten. De oorspronkelijke SVG-illustraties en neutrale beeldplaatsen blijven bewaard maar worden niet meer getoond. Er worden geen externe afbeeldingen, lettertypen of diensten geladen.

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
5. Controleer daar de volledige klikvolgorde en of alle beelden laden.

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

De drie afbeeldingen zijn speciaal voor deze app gegenereerd, zonder externe stockbeelden of nabootsing van genoemde kunstenaars. `source` in de kaartdata vermeldt de herkomst. Alle actieve kaartbeelden zijn 1536 × 1024 pixels, geoptimaliseerd als WebP onder 500 KB; de PNG-originelen blijven buiten de repository in de cloudwerkruimte bewaard.

- **001:** overtuigende stoep, terracotta en daglicht. De intacte pot boven zijn scherven maakt de tegenspraak zichtbaar; de tijdsvolgorde blijft open voor interpretatie.
- **002:** geloofwaardig interieur en textiel. De lege hals en gedragen deken suggereren afwezigheid; kan ook als een verborgen persoon worden gelezen. Dit is de minst eenduidige proef en vraagt verdere artistieke beoordeling.
- **003:** zichtbaar lokale regen en spatten op de tafel, zonnige droge omgeving. De oorsprong van de regen valt buiten beeld; bij een volgende versie kan het beginpunt in de lucht explicieter worden.

Kaarten 001 (bloempot) en 002 (lege stoel met de deken) zijn door de gebruiker goedgekeurd; de proefmarkeringen zijn verwijderd. Kaart 003 wacht nog op afzonderlijke goedkeuring.

### Herziening kaart 003

De eerste keukenregen kon als lekkage worden gelezen en is niet langer actief. De nieuwe proef `regen-omhoog.webp` toont druppelsporen boven de ontbijttafel, met zichtbaar droog plafond en een vrije ruimte boven het water. Het idee is opwaartse regen; de bewegingsrichting is in een stilstaand beeld nog dubbelzinnig. Deze versie is daarom nadrukkelijk een proef, geen definitief goedgekeurd werk. De vragen zijn aangepast aan het nieuwe concept. Het oude beeld blijft als niet-actieve versie bewaard.

### Twee aanvullende concepten

De bestaande kaart-id’s blijven stabiel. De twee nieuwe ideeën zijn daarom toegevoegd als 004 en 005, zonder de eerder geselecteerde beelden te vervangen. Beide bevatten letterlijk de twee aangeleverde vragen.

- **004 — Vier tijden aan één tafel:** één doorlopende tafel en kamer met vier lichtmomenten, ontbijt tot nacht. De verschillende tijden zijn duidelijk zichtbaar, ook in het raam; het beeld blijft een proef voor inhoudelijke beoordeling.
- **005 — De boekenkast die groter wordt:** een kleine kast naast een grote spiegel met een diepe bibliotheek. Fotografisch overtuigend, maar de spiegel kan ook als doorgang worden gelezen en de exacte overeenkomst van de kast is niet volledig. Daarom nog niet definitief goedgekeurd.

### Inhoudsronde — De gang van vroeger

De vragen voor water op tafel (003), sofa/deken (002) en spiegel/boekenkast (005) zijn letterlijk vervangen door de aangeleverde selectie. Bloempot (001) en vier mensen aan tafel (004) zijn volledig ongewijzigd.

Kaart **006 — De gang van vroeger** heeft drie aangeleverde vragen en een eigen fotorealistisch AI-beeld: een volwassene naast een deurklink ver boven haar hoofd, een enorme kapstok en een steile trap. Het natuurlijke licht, terrazzo, hout en textiel ondersteunen de geloofwaardigheid; de afwijkende schaal is zichtbaar. Het WebP-bestand is 1536 × 1024 pixels en kleiner dan 500 KB. Geen placeholder of definitief vervangend beeld nodig; inhoudelijke goedkeuring staat nog open, daarom blijft de proefmarkering actief.

### Vergrote gang en twee nieuwe kaarten

Op verzoek is alleen het beeld van 006 herzien: ook de jassen, achterdeur en traptreden zijn nu fors vergroot ten opzichte van de volwassene. De vragen zijn behouden. De vorige afbeelding blijft als niet-actief bestand bewaard.

- **007 — De tuin met twee waarheden:** fotorealistische boom met één doorlopende stam en wortelstelsel, bloesem en groene bladeren tegenover kale wintertakken. De twee opgegeven vragen zijn letterlijk overgenomen. De seizoenswisseling kleurt ook delen van de tuin; dit blijft een proefbeeld voor beoordeling.
- **008 — Het boek dat jou leest:** close-up over de schouder met een fotografische herhaling van de lezer, het boek en de bibliotheek op de bladzijden. De echte lezer kijkt omlaag, haar afgebeelde gezicht kijkt terug. De drie opgegeven vragen zijn letterlijk overgenomen. Volledig eigen scène, zonder verwijzingen naar The NeverEnding Story.

Beide nieuwe beelden zijn geoptimaliseerde WebP-bestanden van 1536 × 1024 pixels en blijven gemarkeerd als proefkaarten tot afzonderlijke goedkeuring. Alle overige bestaande kaartgegevens zijn tegen de vorige Git-versie gecontroleerd en ongewijzigd.

### Vijf nieuwe scenario’s (009–013)

De straat met meerdere benedenkanten, Het schuurtje dat een bos bevat, De gang met deuren naar overal, Het raam dat naar binnen kijkt en De schaduwen van wie je had kunnen zijn zijn toegevoegd, elk met de twee exact aangeleverde vragen. Alle eerdere kaarten zijn ongewijzigd. De tekst ‘KIJK MAAR EVEN. JE HOEFT NIETS OP TE LOSSEN.’ is uit de interface verwijderd zonder vervanging.

De vijf eigen AI-beelden zijn WebP-bestanden van 1536 × 1024, ieder onder 500 KB. Beeldbeoordeling: de gevelwandelaars tonen een andere zwaartekrachtrichting; het bos heeft onmogelijk veel diepte achter het kleine schuurtje; de drie deurwerelden zijn tegelijk zichtbaar; het raam heeft open scharnierende ramen en een zichtbare buitenmuur in plaats van een spiegel; de vier verschillende schaduwen komen samen bij één werkelijk aanwezige persoon. De straatwandelaars zijn enigszins schuin in plaats van exact horizontaal. De raamherhaling kan als identieke kamers tegenover elkaar worden gelezen. Daarom blijven de beelden proefkaarten voor afzonderlijke inhoudelijke goedkeuring; er ontbreken geen beeldbestanden.

### Kaarten 014 en 015 — collectie van vijftien

**De voetstappen die vooruitlopen** toont verse afdrukken vóór de wandelaar, met opspattende modder rond een afdruk zonder voet erboven. De vorming is zichtbaar; de exacte overeenkomst tussen alle zooldetails blijft een aandachtspunt bij beoordeling. **Het gesprek dat zichtbaar wordt** toont doorzichtige trillingen vanaf de monden, inclusief een afbuigende, uiteenvallende golf. De rimpelingen zijn vrij nadrukkelijk; de precieze aankomst bij het oor is minder eenduidig dan het ontstaan bij de monden. Beide beelden zijn daarom gemarkeerde proefversies. De vier opgegeven vragen zijn letterlijk overgenomen.

De collectie bevat exact vijftien unieke kaart-id’s (001–015). De zeven nieuwe beelden uit deze ontwikkelronde zijn beschikbaar als WebP; er ontbreken geen beeldbestanden. Definitieve inhoudelijke goedkeuring blijft apart. De acht eerder gepubliceerde kaarten zijn object voor object vergeleken met Git en ongewijzigd. De dertien kaarten die voorafgingen aan de laatste twee zijn ook behouden.

Controle van deze ronde: alle zeven nieuwe kaarten apart in Chromium op 390 en 1440 pixels breed gecontroleerd op geladen beelden, exact gekoppelde vragen zonder herhaling, verborgen vragen bij een nieuwe kaart en afwezigheid van horizontale overflow. De verwijderde figcaption is niet meer aanwezig. Tests uitgevoerd onder het projectpad `/Onmogeliijk/`. Rechtstreekse controle van de live GitHub Pages-site werd door de netwerkproxy geblokkeerd met HTTP 403; dit is geen vastgestelde fout in de website en de live deployment is hier niet bevestigd.

### Privacy en browserbeveiliging

`privacy.html` beschrijft de daadwerkelijk gebruikte gegevensverwerking: geen eigen analytics, cookies, invoer of permanente browseropslag; GitHub Pages verzorgt de hosting. De footer bevat een kleine Privacy-link. Externe websites worden alleen via aangeklikte links bezocht.

Beide HTML-pagina’s bevatten vóór scripts en stylesheets een Content Security Policy-metatag en `no-referrer`. Scripts, stylesheets, afbeeldingen en kaartverzoeken zijn beperkt tot dezelfde origin. Inline scripts, eval, externe resources, objecten, frames, workers, formulieren en een gewijzigde basis-URL zijn niet toegestaan. De CSP laat gewone uitgaande links toe. GitHub Pages ondersteunt in deze opzet geen eigen HTTP-responseheaders; daarom is dit een meta-CSP. Header-only bescherming zoals `frame-ancestors` (tegen embedding van deze site) en CSP-reporting is hiermee niet geregeld. Voeg zulke directives niet toe aan de metatag alsof ze daar werken.

Kaartafbeeldingen moeten het formaat `assets/naam-met-streepjes.webp` of `assets/naam-met-streepjes.svg` volgen: alleen kleine letters, cijfers en enkele koppeltekens in de bestandsnaam. Externe URL’s, absolute paden, submappen, padtraversal, escapes, querystrings en fragmenten worden afgewezen voordat de startknop beschikbaar komt. Toegestane namen moeten nog steeds naar bestaande bestanden verwijzen; de bestandscontrole gebeurt ook in de tests.

Validatie: vier Node-tests slagen, inclusief afwijzing van onveilige afbeeldingspaden. Alle vijftien kaarten met alle vragen, afbeeldingen, logo, knoppen en de privacypagina zijn in Chromium gecontroleerd op 390 en 1440 pixels breed, onder `/Onmogeliijk/`. Ook serveren vanaf `/` werkt. Geen normale CSP-overtredingen; proefinjecties van inline script, externe afbeelding en base-element werden geblokkeerd. Een onderschepte uitgaande link bevatte geen Referer-header. De bereikbaarheid van de externe bestemmingen en de uiteindelijke live Pages-deployment zijn daarmee niet bevestigd.
