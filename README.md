# Isaac Greyole S. Balingit — FDE-Focused Portfolio

Your existing React portfolio, updated to support **Forward Deployed Engineer / Solutions Engineer** applications. It preserves the interactive living portrait, portrait audio and local images, dark/light themes, responsive navigation, project filters, and personal links.

## What's different

- Forward Deployed Engineering is clearly identified as a **target role**, not a previous job title.
- The hero leads with real client-facing enterprise solution delivery.
- A four-step **How I Work** section explains discovery, integration, hands-on delivery, and demos.
- Relevant case studies appear first: **Her Opportunity Portal**, **1C ↔ Trello**, and **AccountingSuite customizations**.
- Cards explain the problem, implementation, relevant technologies, and honest project status. Private work isn't presented as a public demo.
- Skills emphasize REST/OData integrations, cross-functional delivery, client demonstrations, and AI-assisted coding with ChatGPT, Gemini, Claude Code, and Codex.
- The uploaded updated résumé is available as a working download in the hero, sidebar, and contact section.
- Recognition years and work dates reflect the newly supplied résumé.

## Run locally

Requires **Node.js 20.19+ or 22.12+** and npm.

```powershell
cd "C:\path\to\isaac-portfolio"
npm install
npm run dev
```

If Windows PowerShell blocks `npm.ps1`, you can call the bundled Windows command instead **without changing execution policy**:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open the localhost URL printed by Vite (normally `http://localhost:5173`).

## Production build

```powershell
npm run build
npm run preview
```

To deploy on Netlify, push the project to GitHub, connect that repository, and use **`npm run build`** with the **`dist`** publish folder. `netlify.toml` includes those settings. On Vercel, select **Vite** and the default build output `dist`.

You can also upload the generated `dist` folder to a static hosting service. **Do not upload the source code folder as if it were a built HTML site.**

## Where to edit

| What to change | File |
| --- | --- |
| Name, email, links, role, About, jobs, skills, projects, achievements | `src/data/portfolio.js` |
| FDE hero, headline, buttons | `src/sections/Hero.jsx` |
| Solution-delivery steps | `src/sections/About.jsx` (content in `src/data/portfolio.js`) |
| Project filters and cards | `src/sections/Projects.jsx` |
| Contact CTA and email copy | `src/sections/Contact.jsx` |
| Styling and responsive adjustments | `src/index.css` |
| Search metadata and social preview | `index.html`, `public/og-image.png` |
| Resume download | `public/Isaac_Greyole_Balingit_Resume.pdf` |
| Portrait image variants | `public/portrait/` |
| Portrait sound effects | `public/sounds/` |

### Important notes before applying

1. Verify your public links and final wording before sharing the portfolio.
2. Some project descriptions are deliberately high-level to avoid exposing client-specific implementation details.
3. **Her Opportunity Portal:** Stripe billing and social APIs are marked *pending*, consistent with the supplied résumé. Update this when completed.
4. **Payroll SaaS** is marked ongoing. Change it only when the development status changes.
5. Your résumé identifies your current job title as **DevOps Officer**, not Forward Deployed Engineer. The site's FDE positioning is a **career direction**.
6. Your resume-listed portfolio domain is `https://isaacbalingit.netlify.app/`. That URL is used for canonical and Open Graph metadata; adjust it if hosting elsewhere.
7. All portrait and audio assets from the source archive are preserved, including the `- old` variants.
8. The original `node_modules` folder is intentionally **excluded** from this ZIP. Use `npm install` on your computer to restore dependencies.

## Project structure

```text
isaac-portfolio/
├─ index.html
├─ package.json
├─ package-lock.json
├─ netlify.toml
├─ vite.config.js
├─ public/
│  ├─ Isaac_Greyole_Balingit_Resume.pdf
│  ├─ og-image.png
│  ├─ favicon.svg
│  ├─ portrait/              # Original interactive portrait frames
│  └─ sounds/                # Original portrait audio
└─ src/
   ├─ components/           # Original reusable navigation / portrait pieces
   ├─ data/portfolio.js     # Primary profile and content source
   ├─ hooks/
   ├─ sections/
   ├─ App.jsx
   ├─ main.jsx
   └─ index.css
```

**Original portfolio design and portrait interactions are retained.** This is a career-positioning revision, not a replacement starter template.
