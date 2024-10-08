export const headerLinks = [
  {
    label: "Admin",
    route: "/admin",
  },
  {
    label: "Početna",
    route: "/",
  },
  {
    label: "Moj plan",
    route: "/plan",
  },
  {
    label: "Anketa",
    route: "/survey",
  },
];

export const testimonials = [
  {
    name: "rezultat1.jpeg",
  },
  {
    name: "rezultat3.jpeg",
  },
  {
    name: "rezultat4.JPG",
  },
];

export const pricingCardContent = [
  {
    text: "Personalizovani Plan Treninga",
  },
  {
    text: "Personalizovani Plan Ishrane",
  },
  {
    text: "Monitoring I Korigovanje Plana",
  },
  {
    text: "Snimci Vežbi",
  },
  {
    text: "Podrška 24/7",
  },
];

export const aboutSectionQuestions = [
  {
    text: "Da li si dobro sastavio svoj plan treninga?",
    class: "our-p-tag",
  },
  {
    text: "Da li ti je dovoljno da treniraš 3 puta nedeljno ili ti je to malo?",
    class: "our-p-tag",
  },
  {
    text: "Da li ti je izbor namirnica adekvatan za ono što želiš postići?",
    class: "our-p-tag",
  },
  {
    text: "Da li jedeš dovoljno hrane?",
    class: "our-p-tag",
  },

  // {
  //   text: "Došao si na pravo mesto.",
  // },

  // {
  //   text: "Ne moraš se više brinuti oko ovih pitanja i zamarati mišlju: 'Da li sam sve dobro napravio ili sam mogao i bolje?'.",
  //   class: "our-p-tag",
  // },
];

export const surveyDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: 0,
  isFree: false,
  url: "",
};

export const youtubeEmbedUrlPattern =
  /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}(?:\?.*)?$/;
