# AWS Learning Club – Cardinals · Application site

Plain HTML/CSS/JS. No build step, no database. Applications go to your Google Form.

## Open locally
Double-click `index.html`, or in VS Code use the Live Server extension.

## Deploy on Vercel
Push the folder to GitHub, import it in Vercel, keep the defaults, deploy.

## Edit
- Lead name, photo, quote and social links: top of `app.js` (`CONFIG`). Put the Lead's photo in this folder and set `photo: './lead.jpg'`.
- Roles, benefits, FAQs: `app.js`.
- Colors and fonts: `:root` in `styles.css`.
- Google Form link: the iframe `src` and the "Open in new tab" link in `index.html`.
