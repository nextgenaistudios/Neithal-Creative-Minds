# Neithal Creatives — Website

A 5-page site (Home, About, Services, Portfolio, Contact) built with plain HTML/CSS/JS —
no build tools, no npm, nothing to install. It's designed to be hosted for free on
**GitHub Pages**, with the contact form backed by **Google Apps Script**, logging
every enquiry into a **Google Sheet** and emailing you.

Total cost: ₹0/month. Follow the steps below in order — none of them require coding experience.

---

## Step 1 — Put the site on GitHub Pages (free hosting)

1. Go to [github.com](https://github.com) and create a free account if you don't have one.
2. Click the **+** icon (top right) → **New repository**.
   - Name it `neithal-creatives` (or anything you like).
   - Set it to **Public**.
   - Don't add a README (you already have one).
   - Click **Create repository**.
3. On the new repo's page, click **uploading an existing file**.
4. Drag in **every file and folder** from this project (index.html, about.html,
   services.html, portfolio.html, contact.html, the `css` folder, the `js` folder,
   and the `images` folder). Leave out the `google-apps-script` folder — that one
   doesn't go on GitHub Pages, it goes into Google (Step 2).
5. Scroll down, click **Commit changes**.
6. Go to the repo's **Settings** tab → **Pages** (left sidebar).
7. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Click **Save**.
8. Wait about a minute, then refresh — GitHub shows your live URL, something like:
   `https://your-username.github.io/neithal-creatives/`

Your site is now live. It just can't send you emails yet — that's Step 2.

---

## Step 2 — Connect the contact form (Google Apps Script + Sheet)

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank
   spreadsheet**. Name it "Neithal Creatives Leads".
2. In the Sheet, click **Extensions → Apps Script**. A code editor opens.
3. Delete anything in the editor, then open the file **google-apps-script/Code.gs**
   from this project, copy all of it, and paste it into the Apps Script editor.
4. Near the top, find this line:
   ```
   const NOTIFY_EMAIL = "your-email@gmail.com";
   ```
   Replace `your-email@gmail.com` with the email address you want lead
   notifications sent to.
5. Click the **Save** icon (or Ctrl+S).
6. From the function dropdown at the top (next to the Run/Debug buttons),
   select **setupSheet**, then click **Run**. The first time, Google will ask you
   to authorize the script — click **Review permissions**, choose your account,
   click **Advanced**, then **Go to (project name) (unsafe)**, then **Allow**.
   (This warning appears because it's your own unpublished script — it's expected.)
7. Check your spreadsheet — a new tab called **Leads** should now have a header row.
8. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - Description: "Contact form" (anything is fine).
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click **Deploy**. Authorize again if asked.
9. Copy the **Web app URL** it gives you (starts with `https://script.google.com/macros/s/...`).
10. Back in your website files, open **js/script.js** and find this line near the top:
    ```
    const APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
    ```
    Replace the placeholder text with the URL you copied, keeping the quotes.
11. Upload the updated **js/script.js** back to your GitHub repo (same "upload
    file" method as Step 1 — it will ask to overwrite the old one, confirm that).

Test it: open your live site's Contact page, submit the form with a test message,
and check that a row appears in your Google Sheet and an email lands in your inbox.

**Whenever you edit Code.gs in the future**, you must click **Deploy → Manage
deployments → edit (pencil icon) → New version → Deploy** for the changes to go live.
Just clicking Save is not enough.

---

## Step 3 — Add your real content

- **Logo**: the current logo is a simple wave-and-play-button mark drawn directly
  in the HTML (no image file). If you have your own logo file, replace the `<svg>`
  block inside the `.brand` link at the top of each HTML page with
  `<img src="images/logo.png" alt="Neithal Creatives">`, and upload your logo file
  to the `images` folder.
- **Portfolio images**: on `portfolio.html` (and the 3 preview items on `index.html`),
  each project is a `<div class="portfolio-thumb">` with placeholder text. Add your
  images to `images/portfolio/` (the file already suggests names like
  `project-1.jpg`), then replace each placeholder `<div>` with:
  ```html
  <img src="images/portfolio/project-1.jpg" alt="Project name">
  ```
- **Project titles & tags**: replace "Project title" and the tag text
  (e.g. "Promotional video") in each `.portfolio-caption` with the real details.
- **Contact info**: search each HTML file for `hello@neithalcreatives.com`,
  `+91 00000 00000`, and "Tamil Nadu, India" and replace with your real details.
  Update them in all 5 pages' footers plus the Contact page's info card.
- **Social links**: in `contact.html`, the four social icons currently link to `#`.
  Replace each `href="#"` with your real Instagram / YouTube / Facebook / WhatsApp links.

---

## Step 4 — Optional: use your own domain (e.g. neithalcreatives.com)

1. Buy a domain from any registrar (GoDaddy, Namecheap, Google Domains, etc.).
2. In the registrar's DNS settings, add a **CNAME** record pointing to
   `your-username.github.io`.
3. In your GitHub repo → Settings → Pages → "Custom domain", enter your domain
   and save. GitHub will verify it (can take up to 24 hours).

---

## Project structure

```
neithal-creatives/
├── index.html              Home
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── css/style.css           All styling — one file, shared by every page
├── js/script.js            Nav menu, footer year, contact form logic
├── images/
│   └── portfolio/          Put your project images here
└── google-apps-script/
    └── Code.gs             Paste this into Google Apps Script (Step 2) —
                             does NOT get uploaded to GitHub
```

## Troubleshooting

- **Form says "not connected yet"** — you haven't pasted the Apps Script URL into
  `js/script.js` yet (Step 2, item 10).
- **Form submits but nothing appears in the Sheet** — re-check Step 2, item 8: the
  deployment must have "Execute as: Me" and "Who has access: Anyone".
- **No notification email arrives** — check your Spam folder first; also confirm
  `NOTIFY_EMAIL` in Code.gs matches the account you authorized the script with.
- **Changed Code.gs but nothing changed on the live form** — you need to deploy a
  *new version* (Deploy → Manage deployments → edit → New version), not just Save.
