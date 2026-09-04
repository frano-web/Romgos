// ============================================================
// AKADEMIA UNIHOKEJA ROMGOS — SZYBKA KONFIGURACJA STRONY
// W większości przypadków wystarczy później edytować ten plik.
// ============================================================

window.SITE_CONFIG = {
  academyName: "Akademia Unihokeja Romgos",
  city: "Kotlin",

  // Uzupełnić po otrzymaniu danych:
  orderEmail: "",
  phone: "",
  contactEmail: "",
  facebook: "",
  instagram: "",

  // Oficjalny profil drużyny w serwisie Polskiego Związku Unihokeja:
  leagueUrl: "https://www.polskiunihokej.pl/component/joomsport/team/756/718",

  // Jeżeli później podepniemy Formspree / własny endpoint,
  // wstawimy go tutaj. Puste = strona przygotuje wiadomość e-mail.
  formEndpoint: "",

  products: [
    {
      id: "dres",
      name: "Dres klubowy",
      description: "Oficjalny dres Akademii — bluza + spodnie.",
      price: 0,
      image: "assets/images/dres-klubowy.jpg",
      sizes: ["128", "140", "152", "164", "S", "M", "L", "XL"]
    },
    {
      id: "komplet-meczowy",
      name: "Komplet meczowy",
      description: "Koszulka + spodenki. Główny komplet Akademii.",
      price: 0,
      image: "",
      sizes: ["128", "140", "152", "164", "S", "M", "L", "XL"]
    },
    {
      id: "koszulka-treningowa",
      name: "Koszulka treningowa",
      description: "Lekka koszulka do treningów i na co dzień.",
      price: 0,
      image: "",
      sizes: ["128", "140", "152", "164", "S", "M", "L", "XL"]
    },
    {
      id: "spodenki",
      name: "Spodenki",
      description: "Spodenki klubowe dopasowane do stroju.",
      price: 0,
      image: "",
      sizes: ["128", "140", "152", "164", "S", "M", "L", "XL"]
    },
    {
      id: "czapka",
      name: "Czapka klubowa",
      description: "Dodatek klubowy — model do ustalenia.",
      price: 0,
      image: "",
      sizes: ["Uniwersalny"]
    },
    {
      id: "inne",
      name: "Inny produkt",
      description: "Miejsce na kolejny element kolekcji klubowej.",
      price: 0,
      image: "",
      sizes: ["Do ustalenia"]
    }
  ]
};
