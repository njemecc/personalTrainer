"use server";

import { sendNewsletterSubscriptionEmail } from "../utils/email";

export const subscribeToNewsletter = async (email: string) => {
  try {
    // Validacija emaila
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Nevažeća email adresa" };
    }

    // Slanje emaila o pretplati
    try {
      await sendNewsletterSubscriptionEmail(email);
      return {
        success: true,
        message: "Uspešno ste se pretplatili na newsletter!",
      };
    } catch (emailError) {
      console.error("Greška pri slanju emaila:", emailError);
      // Ne prekidamo proces ako email ne uspe - samo logujemo grešku
      return {
        success: true,
        message: "Uspešno ste se pretplatili na newsletter!",
      };
    }
  } catch (error) {
    console.error("Greška pri pretplati na newsletter:", error);
    return {
      success: false,
      error: "Greška pri pretplati. Molimo pokušajte ponovo.",
    };
  }
};
