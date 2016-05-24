```
Twoim zadaniem jest napisać taki projekt:

Przeszukiwarka zasobów Flickr'a z możliwością stworzenia swojej listy ulubionych.
- Wyszukiwarka zdjęć korzystająca z publicznego API Flickr'a https://www.flickr.com/services/api/explore/flickr.photos.search
  - Umożliwia wyszukiwanie po tytule zdjęć
- Każde z wyszukanych zdjęć można umieścić (klikając na nim) w specjalnej liście "ulubione", która jest widoczna obok listy wyszukiwania
- Lista ulubionych jest na bieżąco zapisywana do localStorage (po każdej jej zmianie) oraz ładowana z localStorage przy starcie aplikacji (aplikacja pamięta naszą kolekcję zdjęć pomiędzy uruchomieniami/odświerzeniami strony)

Sugerowane technolgie:
- Angular 1.5
- Pełna dowolność w wyborze innych jeśli uważasz że są potrzebne.

```


Install project with following commands

```
git clone https://github.com/jmwierzbicki/flickr_browser.git
cd flickr_browser
npm install
gulp
```

site will be available at localhost:80

change port in gulpfile.js
