"use server";

import { SurveyParams } from "@/types/survey";
import { Resend } from "resend";

export async function sendSurveyNotificationEmail(
  surveyData: SurveyParams,
  userInfo: {
    email: string;
    firstName?: string;
    lastName?: string;
  }
) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error("ADMIN_EMAIL nije postavljen u environment varijablama");
      return { success: false, error: "ADMIN_EMAIL nije konfigurisan" };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY nije postavljen u environment varijablama");
      return { success: false, error: "RESEND_API_KEY nije konfigurisan" };
    }

    const userName =
      userInfo.firstName && userInfo.lastName
        ? `${userInfo.firstName} ${userInfo.lastName}`
        : userInfo.firstName || userInfo.lastName || "Korisnik";

    // Formatiranje datuma
    const formattedDate = surveyData.datumRodjenja
      ? new Date(surveyData.datumRodjenja).toLocaleDateString("sr-RS", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Nije unet";

    // Kreiranje HTML emaila sa svim podacima ankete
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #667eea;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
              margin-left: 10px;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📋 Nova Anketa Popunjena</h1>
          </div>
          <div class="content">
            <div class="section">
              <h2>Informacije o korisniku</h2>
              <p><span class="label">Ime:</span> <span class="value">${userName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${
                userInfo.email
              }</span></p>
            </div>

            <div class="section">
              <h2>Osnovni podaci</h2>
              <p><span class="label">Telefon:</span> <span class="value">${
                surveyData.telefon || "Nije unet"
              }</span></p>
              <p><span class="label">Visina:</span> <span class="value">${
                surveyData.visina || "Nije unet"
              }</span></p>
              <p><span class="label">Težina:</span> <span class="value">${
                surveyData.tezina || "Nije unet"
              }</span></p>
              <p><span class="label">Datum rođenja:</span> <span class="value">${formattedDate}</span></p>
            </div>

            <div class="section">
              <h2>Zaposlenje</h2>
              <p><span class="label">Status zaposlenja:</span> <span class="value">${
                surveyData.radniStatus || "Nije unet"
              }</span></p>
              ${
                surveyData.radnoVreme
                  ? `<p><span class="label">Radno vreme:</span> <span class="value">${surveyData.radnoVreme}</span></p>`
                  : ""
              }
            </div>

            <div class="section">
              <h2>Ishrana i životni stil</h2>
              <p><span class="label">Broj obroka dnevno:</span> <span class="value">${
                surveyData.brojObroka || "Nije unet"
              }</span></p>
              <p><span class="label">Sati spavanja:</span> <span class="value">${
                surveyData.satiSpavanja || "Nije unet"
              }</span></p>
              <p><span class="label">Tip osobe:</span> <span class="value">${
                surveyData.tipOsobe || "Nije unet"
              }</span></p>
              ${
                surveyData.zdravstveniProblem
                  ? `<p><span class="label">Zdravstveni problemi:</span> <span class="value">${surveyData.zdravstveniProblem}</span></p>`
                  : ""
              }
            </div>

            <div class="section">
              <h2>Iskustvo sa treningom</h2>
              <p><span class="label">Ranije trenirali:</span> <span class="value">${
                surveyData.ranijeTrenirali || "Nije unet"
              }</span></p>
              ${
                surveyData.imaliTrenera
                  ? `<p><span class="label">Imali trenera:</span> <span class="value">${surveyData.imaliTrenera}</span></p>`
                  : ""
              }
              ${
                surveyData.razlogPrestanka
                  ? `<p><span class="label">Razlog prestanka:</span> <span class="value">${surveyData.razlogPrestanka}</span></p>`
                  : ""
              }
            </div>

            ${
              surveyData.ocekivanja
                ? `
            <div class="section">
              <h2>Očekivanja</h2>
              <p><span class="value">${surveyData.ocekivanja}</span></p>
            </div>
            `
                : ""
            }

            ${
              surveyData.dodatno
                ? `
            <div class="section">
              <h2>Dodatne napomene</h2>
              <p><span class="value">${surveyData.dodatno}</span></p>
            </div>
            `
                : ""
            }

            <div class="footer">
              <p>Ova anketa je automatski poslata sa vašeg sajta.</p>
              <p>Vreme: ${new Date().toLocaleString("sr-RS")}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Slanje emaila
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Personal Trainer <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `Nova anketa od ${userName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Greška pri slanju emaila:", error);
      return { success: false, error: error.message };
    }

    console.log("Email uspešno poslat:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Greška pri slanju emaila:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Nepoznata greška",
    };
  }
}

export async function sendNewsletterSubscriptionEmail(email: string) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error("ADMIN_EMAIL nije postavljen u environment varijablama");
      return { success: false, error: "ADMIN_EMAIL nije konfigurisan" };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY nije postavljen u environment varijablama");
      return { success: false, error: "RESEND_API_KEY nije konfigurisan" };
    }

    // Kreiranje HTML emaila o pretplati na newsletter
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #667eea;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 Nova Pretplata na Newsletter</h1>
          </div>
          <div class="content">
            <div class="section">
              <h2>Novi pretplatnik</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Datum pretplate:</strong> ${new Date().toLocaleString("sr-RS")}</p>
            </div>
            <div class="footer">
              <p>Ova notifikacija je automatski poslata sa vašeg sajta.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Slanje emaila
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Personal Trainer <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `Nova pretplata na newsletter - ${email}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Greška pri slanju emaila:", error);
      return { success: false, error: error.message };
    }

    console.log("Email o pretplati uspešno poslat:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Greška pri slanju emaila:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Nepoznata greška",
    };
  }
}
