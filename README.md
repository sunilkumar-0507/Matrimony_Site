# Kalyana Matrimony – Business Website

Single-page business website for a matrimonial service provider, built with React (JavaScript), Vite, plain CSS and Lucide icons.
It is a business profile and enquiry site only. It has no logins, profiles, matchmaking or payments.

## Quick start

```bash
npm install
npm run server   # enquiry backend on http://localhost:5174
npm run dev      # site on http://localhost:5173 (forwards /api to the backend)
```

Production (one process serves the site and the enquiry API):

```bash
npm run build
npm start        # http://localhost:5174
```

## Before going live

1. **Business details**: edit [src/config/businessConfig.js](src/config/businessConfig.js). It holds the name, phone, WhatsApp, email, location, social URLs, hero text, services and enquiry settings.
   Also update the matching values in [index.html](index.html): the SEO meta, Open Graph tags and LocalBusiness structured data.
2. **Logo**: replace [src/assets/logo/logo.svg](src/assets/logo/logo.svg) with the original logo (an SVG or PNG; if it's a PNG, update the import in `businessConfig.js`). Copy it to `public/favicon.svg` too.
3. **Hero photograph**: save the original wedding couple photo as `public/images/hero-couple.jpg`. Use about 1400px wide and under 300 KB; a `.webp` file also works if you change `heroImage` in the config.
   Until you add it, the site shows a decorative placeholder.
4. **Enquiry destination**: choose one in `.env` (copy `.env.example`):
   - `server` (default): enquiries are stored in `server/data/enquiries.json` by the bundled Node server.
     Set `ENQUIRY_WEBHOOK_URL` to also forward each one, for example to a Zapier, Make or Google Apps Script webhook that emails your team.
     This needs Node hosting (VPS, Render, Railway and similar).
   - `web3forms`: set `VITE_WEB3FORMS_ACCESS_KEY`. Enquiries are emailed to the address you registered. Works on any static host (Netlify, Vercel, Hostinger).
   - `formspree`: set `VITE_FORMSPREE_ENDPOINT`.

   Rebuild after you change `.env`.

## Enquiry form behaviour

- Checks the required fields, accepts Indian mobile numbers (with or without +91 or 0, starting 6–9) and checks the email format.
- Shows a loading state, then a success or error message. The success message appears only after the backend accepts the enquiry.
- Prevents duplicates three ways: the button is locked while sending, the browser blocks repeating the same mobile number and option within 10 minutes, and the server does the same check.
- Includes a hidden honeypot field to catch spam bots. The bundled server also rate-limits each IP address.

## Deployment checklist

- `npm run build`. Upload `dist/` to a static host (with web3forms or formspree), or run `npm start` on a Node host (with `server`).
- Point your domain at the host and turn on HTTPS. Most hosts provide a free SSL certificate.
- Submit a test enquiry on the live site and confirm it arrives.

## Structure

```
src/
  assets/logo/          logo.svg
  components/           TopBar, Navbar, HeroSection, TrustHighlights, AboutSection, ServicesSection,
                        EnquiryForm, WhyChooseUs, ProcessSection, CallToAction, Footer, + shared helpers
  config/businessConfig.js
  pages/Home.jsx
  styles/global.css
  utils/                enquiry submission + validation, smooth scroll
server/index.js         enquiry API + static server (no dependencies)
public/images/          hero photograph (+ placeholder)
```
