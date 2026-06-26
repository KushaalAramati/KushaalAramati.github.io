# kushaalaramati.github.io

Personal portfolio site for **Aramati Kushaal Reddy** — UW–Madison student working
across bioinformatics, data mining, AI prototyping, and 3D design.

Built as a static site (HTML + CSS + vanilla JS), no build step — perfect for GitHub Pages.

## Files
- `index.html` — all content/sections
- `styles.css` — styling, layout, animations
- `script.js` — nav, scroll reveals, count-up stats, hero typewriter
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Run locally
Just open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages
This repo is named `kushaalaramati.github.io`, so GitHub serves it as a **user site**
at https://kushaalaramati.github.io automatically once pushed to the default branch.

```bash
git add .
git commit -m "Add personal portfolio site"
git push origin main
```

In the repo's **Settings → Pages**, confirm the source is the default branch / root.
