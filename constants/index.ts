import { FaHome } from "react-icons/fa";

export const headerLinks = [
  {
    label: "Početna",
    route: "/",
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

export const eventDefaultValues = {
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
