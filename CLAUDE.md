@AGENTS.md

# Portofolio Faris Zain As-Shadiq

One-page portfolio. Working language with Faris: Indonesian. Code, identifiers and commit messages: English.
The full brief is `BRIEF_CLAUDE_CODE.md` (local only, gitignored). Read it when a rule here is not enough.

## Hard rules

1. **Never invent facts.** Every claim must be traceable to the CVs (`public/cv/`) or a certificate. If data is missing, write `TODO(faris)` and list it in the stage report.
2. **Git is Faris's job.** Never run `git init`, `git add`, `git commit`, `git push`, and never touch history or the remote. Read-only git (`status`, `diff`, `check-ignore`) is fine. At the end of each stage, stop and list the files added, changed and deleted, plus a suggested commit message.
3. **Never publish private material.** `sertif/`, raw `CV/` and `BRIEF_CLAUDE_CODE.md` stay in `.gitignore`. Only cropped certificate previews (title, name, award; no signatures, NIP/NPM or QR) may be copied into `public/`.
4. **Reference sites are inspiration only.** Do not copy code, text, assets, exact layout order or section names from other portfolios.
5. **No secrets** in code: passwords, tokens, cookies, `.env`.
6. Do not touch Faris's other repositories without explicit approval.

## Content rules

- Position: full-stack web developer, ML when needed (applied ML).
- Toolbox lists only technologies proven in the CVs. Never list TensorFlow or Scikit-Learn.
- MosqRisk: homepage visual only; do not repeat its "Kemenkes RI & BMKG" claim or its testimonials.
- PHOM: Frontend Developer in a team; no users yet; RAG works. No impact numbers.
- CSIRT BPMA: text case study, frontend and backend only; ML/data was a teammate's; no testing claims.
- SmartInsect: Next.js interface plus inference and Gemini integration; do not claim Faris trained the model.
- Awards: exactly the four in the brief (UTU Awards 3rd place, DAC Find IT! 17/339, Fasilkom Fest UI/UX 1st place, PIA XXVIII Top 10). Add no others.
- Lab assistant period: Aug - Dec 2025 (follows the CV; the certificate says 2024/2025).
- Copy: short, confident, honest. No "passionate" or "highly motivated". All text lives in `messages/en.json` and `messages/id.json`; `en.json` is the reference shape.

## Stack and structure

- Next.js 16 App Router (Cache Components on), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis.
- Routes `/en` and `/id` under `src/app/[lang]/`, statically generated. `src/proxy.ts` redirects `/` using the `lang` cookie, then `Accept-Language`.
- `src/config/site.ts` is the single source for contact details, links and CV files. Email and phone are assembled client-side only, never as plain text in static HTML.
- Design tokens live in `src/app/globals.css` (palette A: `--bg --surface --line --text --muted --red --maroon`). Fonts: Anton (display), Inter Tight (body), IBM Plex Mono (labels).
- Red `#E11D2E` on `#0A0A0A` is about 4.2:1, so use it for large text and accents only, not small body text.

## Motion rules

- Lenis `lerp` about 0.1, driven by `gsap.ticker`, synced with ScrollTrigger. Animate through `useGSAP` so triggers are cleaned up.
- `prefers-reduced-motion` turns off the intro, parallax and curtain (short fades instead). Cursor effects are off on touch devices.
- No heavy 3D, background video, autoplay audio or scroll-jacking.

## Definition of done

Build without errors; Lighthouse mobile Performance >= 90 and Accessibility >= 95; LCP < 2.5 s; every section correct in EN and ID; test at 360 px, tablet, 1440 and 1920 px.
