# Akademia Unihokeja Romgos — wersja biało-czerwona

Gotowy statyczny projekt pod GitHub Pages. Wersja po poprawkach: biało-czerwona identyfikacja, prawdziwe zdjęcie Akademii, zdjęcie dresu, nowe hero, rozbudowana stopka i mikroanimacje.

## Pliki
- `index.html` — cała strona
- `style.css` — wygląd i wersja mobilna
- `config.js` — najważniejsze dane, produkty, ceny, linki, kontakt
- `script.js` — koszyk, formularz, menu mobilne i tabela rozmiarów
- `assets/images/` — tutaj wrzucamy logo, stroje, sponsorów i zdjęcia

## Co jest już przygotowane
- główny przycisk „Zamów strój”
- produkty i wybór rozmiaru
- ilość sztuk
- koszyk / podsumowanie zamówienia
- dane rodzica/opiekuna i zawodnika
- e-mail i telefon kontaktowy
- grupa / rocznik
- sposób odbioru
- uwagi
- informacja „płatność przy odbiorze”
- tabela rozmiarów
- sekcje Akademia, treningi, sponsorzy, rozgrywki, kontakt
- responsywność pod telefon
- mobilne menu
- oficjalny link do rozgrywek Polskiego Związku Unihokeja

## Ważne: wysyłanie zamówień na e-mail
GitHub Pages jest hostingiem statycznym, więc sam z siebie nie wysyła e-maili z formularza.

W szkielecie są dwa tryby:
1. `formEndpoint` pusty — formularz przygotowuje gotową wiadomość w aplikacji pocztowej użytkownika.
2. `formEndpoint` ustawiony — można podpiąć np. Formspree albo własny endpoint i wysyłać zamówienie bez otwierania poczty.

Do finalnej wersji rekomendowane jest rozwiązanie nr 2.

## Szybka edycja
Większość informacji zmieniasz w `config.js`, np.:

```js
orderEmail: "zamowienia@twojadomena.pl",
phone: "+48 000 000 000",
contactEmail: "kontakt@twojadomena.pl",
facebook: "https://facebook.com/...",
instagram: "https://instagram.com/..."
```

Produkty też znajdują się w `config.js`.

## Publikacja na GitHub Pages
1. Utwórz repozytorium.
2. Wrzuć zawartość tego folderu do głównego katalogu repozytorium.
3. GitHub → Settings → Pages.
4. Source: `Deploy from a branch`.
5. Branch: `main`, folder `/root`.
6. Zapisz.

Po chwili strona będzie działała jako GitHub Pages.

## Materiały potrzebne do finalnej wersji
- logo Akademii (najlepiej SVG, PDF lub PNG z przezroczystością)
- kolorystyka / brandbook, jeśli istnieje
- 1–3 dobre zdjęcia główne
- zdjęcia lub wizualizacje każdego produktu
- nazwa każdego produktu
- cena
- dostępne rozmiary
- oficjalna tabela rozmiarów producenta
- informacja o personalizacji: nazwisko / numer / inicjały i ewentualna dopłata
- zasady i miejsce odbioru
- orientacyjny termin realizacji
- czy zamówienia mają być otwarte cały czas czy np. do konkretnej daty
- e-mail, na który mają wpadać zamówienia
- telefon i e-mail kontaktowy
- link Facebook
- link Instagram
- grafik treningów
- dokładne miejsce treningów
- krótki opis Akademii
- logotypy sponsorów + linki do ich stron (jeśli mają)
- informacja, kto jest administratorem danych / dane stowarzyszenia do polityki prywatności
- decyzja, czy w formularzu wpisujemy imię i nazwisko zawodnika, czy tylko np. imię + grupa
