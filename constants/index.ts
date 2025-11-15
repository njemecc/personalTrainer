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
    label: "Ishrana",
     route:"/ishrana"
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
    text: "Izgubiš kilograme i oblikuješ svoje telo.",
    class: "our-p-tag",
  },
  {
    text: "Dobiješ mišićnu masu i povećaš snagu.",
    class: "our-p-tag",
  },
  {
    text: "Poboljšaš kondiciju i osećaćaš se energičnije.",
    class: "our-p-tag",
  },
  {
    text: "Usvojiš zdrav način života koji će trajati zauvek!",
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
