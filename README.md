# ONMOGELIJK? — versie 0.1

Even anders kijken. Een statische webapp met drie **tijdelijke proefkaarten**. De eigen SVG-illustraties zijn placeholders, geen definitieve fotorealistische beelden. Er worden geen externe afbeeldingen, lettertypen of diensten geladen.

## Lokaal testen

Vereist: Python 3. Geen installatie of build nodig.

```sh
cd /workspace/Onmogeliijk
python3 -m http.server 8000 --bind 0.0.0.0
```

Open lokaal `http://localhost:8000`. Gebruik een webserver: rechtstreeks openen via `file://` ondersteunt het laden van JSON niet. Stop met Ctrl+C.

Controleer: Verras me → beeld → Ontdek de vraag → Andere vraag → Verras me opnieuw. Een nieuw beeld verschilt van het vorige. Vragen herhalen pas nadat alle vragen van de kaart zijn getoond; ook bij het begin van een nieuwe ronde wordt directe herhaling vermeden. Tab en Enter/Spatie bedienen de knoppen. De interface respecteert verminderde beweging.

## Kaarten toevoegen of vervangen

Bewerk `data/cards.json`. Elke kaart heeft een unieke `id`, een relatief `image`-pad, een beschrijvende `alt` en meerdere unieke `questions`. Plaats eigen of aantoonbaar gelicentieerde beelden in `assets/`. Gebruik relatieve paden zodat de app ook onder een GitHub Pages-projectpad werkt. De proefkaartmarkering staat in `index.html`; pas die pas aan wanneer de proefbeelden zijn vervangen. Verwijder ongebruikte proefbestanden en leg de rechten van nieuwe beelden vast.

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
