ASAP Conversation Counter

Upload index.html, style.css, and script.js together to any static host such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

The counter stores all data in the browser's localStorage on that device. No server or account is required.

Important: clearing browser/site data, using a different browser/device, or some private-browsing modes can remove or isolate the saved data. Export CSV periodically if the data matters.

Logic:
- Meat Eater, Vegetarian, and Vegan each add one to Total Conversations.
- Receptive and Committed are additional outcome tags, so they do NOT add to Total Conversations.
- Undo reverses the most recent button tap.
- Reset clears counts/history but preserves Campus and Outreach Person.
