# FootballFacts

Prosta strona o piłce nożnej z informacjami, ciekawostkami i terminarzem najbliższych meczów.

## Technologie

- HTML
- CSS
- JavaScript
- Node.js
- TheSportsDB API
- Formspree

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

Formularz kontaktowy korzysta z Formspree i przekazuje wiadomości na skonfigurowany adres e-mail, bez potrzeby tworzenia własnej bazy danych.

## Jak powstał projekt

W wolnym czasie chciałem stworzyć coś związanego z tematyką, którą naprawdę lubię, dlatego zrobiłem prostą stronę piłkarską. Czerwone akcenty wybrałem ze względu na moje upodobania.

Projekt zacząłem od HTML, następnie dodałem CSS, a później JavaScript, między innymi do obsługi trybu ciemnego. Dodałem również integrację z TheSportsDB API, aby wyświetlać najbliższe mecze.

Aplikację można uruchomić bezpośrednio przez `npm start`. Klucz API jest przechowywany w pliku `.env`, który jest ignorowany przez Git dzięki wpisowi w `.gitignore`, więc nie trafia do publicznego repozytorium.

Plik `server.js` uruchamia prosty serwer Node.js, udostępnia pliki strony i pobiera dane z API po stronie serwera. Dzięki temu klucz API nie jest umieszczony bezpośrednio w kodzie JavaScript widocznym w przeglądarce.

## Dalsze pomysły

- rozbudować sekcję ciekawostek,
- dodać filtrowanie lub wyszukiwanie,
- rozwinac api
