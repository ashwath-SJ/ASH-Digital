# ASH Digital — Website (Next.js + Tailwind CSS + Framer Motion)

## Run on Zorin OS
1. System terminal (Ctrl+Alt+T), one time only:
   `sudo apt update && sudo apt install -y curl unzip`
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`
   Close and reopen the terminal, then: `nvm install --lts`
2. Unzip: `cd ~/Downloads && unzip ash-digital-v6-offers.zip -d ~/` then `code ~/ash-digital`
3. VS Code terminal (Ctrl+`):  `npm install`  then  `npm run dev`
4. Open http://localhost:3000

## Admin panel
Click "Admin Login" in the top menu or the footer, or open http://localhost:3000/admin

- Default username: `admin`
- Default password: `Ash@Admin#2026`

Edit projects (with image upload), services (add / delete / icons), recipient email, LinkedIn URL, Instagram URL and location. Click "Save changes".

### Change the default login (do this before publishing!)
1. `cp .env.local.example .env.local`
2. Open `.env.local` and fill in `ADMIN_USERNAME`, `ADMIN_PASSWORD` and your real `NEXT_PUBLIC_SITE_URL`
3. Restart the site (Ctrl+C, then `npm run dev`)

When `NEXT_PUBLIC_SITE_URL` is a public website address, the default login is switched off automatically.

## Where things are
- `lib/siteData.js` — default text, navigation, "How we work" steps, About cards
- `data/content.json` — created automatically when you save in /admin
- Projects: none yet. Add your first one in /admin → Projects; the "Our Projects" section then appears on the site automatically
- `public/logo.png`, `public/logo-mark.png` — your logo (replace to change)

## Production
`npm run build` then `npm start`. Admin edits are saved to files, so use a normal Node server/VPS
(not Vercel's free hosting, which resets files).

## Offers section
In `/admin` → **Offers**: switch the section ON/OFF, add posters (upload an image), add or remove the link shown under each poster (Instagram or any website), reorder, or delete posters. Click "Save changes". When the switch is OFF (or there is no poster), the Offers section and its menu link are hidden on the website.

## Contact form email delivery

The enquiry form sends email through SMTP; it does not rely on the visitor having a mail app installed.

1. Copy `.env.local.example` to `.env.local` if you have not already done so.
2. Enquiries are delivered to **ashdigital121@gmail.com** (change it any time in `/admin` → Contact info). Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `ENQUIRY_FROM_EMAIL`. For Gmail, use `smtp.gmail.com`, port `465`, and a Google App Password. Do not use your normal Gmail password.
3. In `/admin` → **Contact info**, set the recipient email where enquiries should arrive, plus your LinkedIn and Instagram profile URLs.
4. Restart the server after editing `.env.local`: stop it with `Ctrl+C`, then run `npm run dev` again.

If SMTP is not configured, the form displays a clear error instead of falsely claiming that the enquiry was sent. Never commit `.env.local` or share your SMTP password.
