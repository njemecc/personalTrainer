This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started !

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Environment Variables

Za funkcionalnost slanja email notifikacija kada neko popuni anketu, potrebno je postaviti sledeće environment varijable u `.env.local` fajlu:

```env
# Resend API Key (dobijate na https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email adresa sa koje se šalje email (mora biti verifikovana u Resend)
RESEND_FROM_EMAIL=Personal Trainer <noreply@yourdomain.com>

# Email adresa na koju želite da primate notifikacije o novim anketama
ADMIN_EMAIL=your-email@example.com
```

### Kako dobiti Resend API Key:

1. Registrujte se na [Resend](https://resend.com)
2. Kreirajte API Key u dashboard-u
3. Verifikujte domen ili koristite `onboarding@resend.dev` za testiranje
4. Dodajte API Key u `.env.local` fajl

**Napomena:** Email notifikacije se šalju automatski nakon što korisnik uspešno popuni anketu. Ako slanje emaila ne uspe, anketa će i dalje biti sačuvana u bazi podataka.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
