# FootballFacts

Prosta strona o piłce nożnej z informacjami, ciekawostkami i terminarzem najbliższych meczów.

## Technologie

- HTML
- CSS
- JavaScript
- Node.js
- TheSportsDB API

## Uruchomienie lokalne

1. Zainstaluj Node.js.
2. Sklonuj repozytorium i przejdź do jego katalogu.
3. Uruchom aplikację:

```bash
npm start
```

4. Otwórz w przeglądarce `http://localhost:5500`.

## Jak działa projekt

Frontend korzysta z prostego serwera Node.js. Serwer udostępnia pliki strony oraz pośredniczy w pobieraniu terminarza z TheSportsDB przez endpoint `/api/matches`. Dzięki temu klucz API nie znajduje się bezpośrednio w kodzie uruchamianym w przeglądarce.

## Dalsze pomysły

- dodać screeny strony,
- rozbudować sekcję ciekawostek,
- dodać filtrowanie lub wyszukiwanie,
- opisać proces powstania projektu.