import { FaHome } from "react-icons/fa";

export const headerLinks = [
  {
    label: "Početna",
    route: "/survey",
  },
  {
    label: "Moj plan",
    route: "/plan/:id",
  },
  {
    label: "Planovi",
    route: "/plans",
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
    text: "✔ Personalizovani Plan Treninga",
  },
  {
    text: "✔ Personalizovani Plan Treninga",
  },
  {
    text: "✔ Monitoring I Korigovanje Plana",
  },
  {
    text: "✔ Snimci Vežbi",
  },
  {
    text: "✔ Podrška 24/7",
  },
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
