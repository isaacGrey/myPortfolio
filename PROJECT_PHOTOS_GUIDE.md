# Selected Work — adding project photos and details

Only the **Selected Work** section has been changed. No backend, upload service, or additional libraries are needed.

## 1. Add cover photos

Place your own screenshots/photos in `public/projects/`. You can use subfolders to keep projects organized. For example:

```text
public/projects/
  her-opportunity/
    cover.webp
    onboarding.webp
    dashboard.webp
    campaign-discovery.webp
  trello-integration/
    cover.png
    integration-flow.png
```

Recommended cover ratio: **16:9**, ideally 1200 × 675 px or larger. `.webp`, `.png`, and `.jpg` are supported. Images of confidential work should be redacted or approved for public sharing.

## 2. Connect the photos to the project

Edit `src/data/portfolio.js`. Each project in `projects` has two new, optional properties:

```js
{
  cover: '/projects/her-opportunity/cover.webp',
  screenshots: [
    {
      src: '/projects/her-opportunity/onboarding.webp',
      alt: 'Invitation onboarding screen',
      caption: 'Invitation-based creator onboarding'
    },
    {
      src: '/projects/her-opportunity/dashboard.webp',
      alt: 'Admin dashboard',
      caption: 'Administrative management dashboard'
    },
    '/projects/her-opportunity/campaign-discovery.webp', // strings also work
  ],
  number: '01',
  // ...existing project data remains unchanged
}
```

The path starts with `/projects/`, because `public/` is the site's web root. Do **not** include `/public/` in the URL.

All 12 projects start with `cover: null` and `screenshots: []`; replace these values as your images become available. With no cover image, the card shows a designed fallback rather than a broken picture. With no screenshots, the screenshot gallery is hidden.

## 3. Optional: add richer project details

The modal automatically displays **all existing information** for the project: description, problem, delivered work, technologies, status, and the existing project link. To add more detail without changing the main card, you can add an optional `details` property to any project:

```js
  details: {
    role: 'Describe your responsibilities here.',
    approach: 'Explain your design decisions and implementation process.',
    implementation: 'Additional architectural or technical information.',
    outcome: 'Describe verified outcomes; avoid unsubstantiated metrics.',
    highlights: [
      'Feature or result one',
      'Feature or result two',
    ],
  },
```

You can omit any detail property you don't need.

## 4. How it behaves

- Click **anywhere on a card** (except its external project link) to open the detail modal.
- Close with **X**, **Escape**, or by clicking outside the modal.
- Browse screenshots with **arrows**, **thumbnail clicks**, or **left/right arrow keys**.
- The popup is keyboard-accessible and mobile-friendly. It does not change the rest of the site.

## 5. Start locally

```powershell
npm.cmd install
npm.cmd run dev
```

Upload your pictures before publishing, then run `npm.cmd run build` to check for any errors.
