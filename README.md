# ASH Digital — Website (Next.js + Tailwind CSS + Framer Motion)

## Run on Zorin OS
1. System terminal (Ctrl+Alt+T), one time only:
   `sudo apt update && sudo apt install -y curl unzip`
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`
   Close and reopen the terminal, then: `nvm install --lts`
2. Unzip: `cd ~/Downloads && unzip ash-digital-v5.zip -d ~/` then `code ~/ash-digital`
3. VS Code terminal (Ctrl+`):  `npm install`  then  `npm run dev`
4. Open http://localhost:3000

## Admin panel
Click "Admin Login" in the top menu or the footer, or open http://localhost:3000/admin


Edit projects (with image upload), services (add / delete / icons) and contact info. Click "Save changes".

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
