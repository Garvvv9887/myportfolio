# Garv Tanwar — Portfolio

A custom React portfolio site with 3D particle canvas, magnetic buttons, and tilt card effects.

## Stack
- **React 18** + **Vite**
- Canvas 2D particle system (no library, pure JS)
- CSS 3D transforms for tilt cards
- CSS animations for floating orbs
- Google Fonts: Space Grotesk + Inter

## Get Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build       # outputs to /dist
```

Deploy `/dist` to Vercel (auto-detected as Vite project).

## File Structure

```
├── index.html          # SEO-optimised entry (all meta tags, JSON-LD)
├── main.jsx            # React entry point
├── App.jsx             # Full single-file portfolio component
├── vite.config.js
├── vercel.json         # Headers + SPA routing
├── robots.txt
├── sitemap.xml         # Update with your domain
├── site.webmanifest    # PWA support
└── public/
    ├── favicon.svg     # Add your favicon
    ├── og-image.png    # 1200×630 social preview (add this!)
    └── resume.pdf      # Drop your resume here
```

## SEO Checklist
- [x] Title + meta description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] JSON-LD structured data (Person + WebSite)
- [x] Canonical URL
- [x] robots.txt
- [x] sitemap.xml
- [x] Web manifest
- [x] Skip link for accessibility
- [ ] Add og-image.png (1200×630)
- [ ] Replace `garvtanwar.dev` with your custom domain everywhere
- [ ] Submit sitemap to Google Search Console

## Custom Domain
1. Buy domain (e.g. garvtanwar.dev on Namecheap/Google Domains)
2. In Vercel → Project Settings → Domains → Add domain
3. Point your DNS to Vercel nameservers
4. Update `canonical`, `og:url`, `sitemap.xml` with real domain
5. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console

---

## Antigravity Prompt

Use this prompt in Antigravity to generate a matching OG social preview image:

---

**PROMPT FOR ANTIGRAVITY:**

Deep space dark background (#050B18). A developer portfolio preview card for "Garv Tanwar". Left side: large bold white text "Garv Tanwar" in a geometric sans-serif, below it "Web Developer & CS Student" in indigo-blue (#818CF8), then smaller text "B.Tech CS · Parul University · Vadodara" in slate gray. Right side: a glowing 3D wireframe sphere or icosahedron in electric indigo and cyan gradient, with a faint particle network constellation surrounding it. Bottom left: subtle indigo gradient glow bleed from corner. Top right: a faint grid pattern overlay. Small "garvtanwar.dev" URL in the bottom right corner in monospace, light gray. Overall mood: premium, technical, modern, developer aesthetic. Aspect ratio 1200x630.

---

## Pre-Launch Checklist

- [ ] Replace all instances of `garvtanwar.dev` with your real domain
- [ ] Add `public/og-image.png` (1200×630) ✅ Generated
- [ ] Add `public/favicon.svg` and `public/favicon.png` ✅ SVG created
- [ ] Add `public/resume.pdf`
- [ ] Submit sitemap to Google Search Console
- [ ] Verify JSON-LD at https://search.google.com/test/rich-results
- [ ] Test on Chrome, Firefox, Safari, and mobile
- [ ] Run Lighthouse audit — target 95+ on Performance, 100 on SEO
- [ ] Enable Vercel Analytics (free tier)
- [ ] Add custom domain in Vercel → Project Settings → Domains
