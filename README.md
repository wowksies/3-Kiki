# 3 Kirwan · Three Years at Coláiste na Mí

A small Next.js site celebrating three years of Junior Cycle. Class photo timeline, a
draggable circular gallery of uploaded memories, and a PIN-gated upload page that commits
photos straight to this GitHub repo.

## Stack

- Next.js 16 (App Router)
- Tailwind v4
- [react-bits] CircularGallery (WebGL via `ogl`)
- `@octokit/rest` to read + write `memories/` in this repo
- Vercel for hosting

## Local setup

```bash
npm install
cp .env.example .env.local
# fill in GITHUB_TOKEN with a fine-grained token (see below)
npm run dev
```

Site runs at `http://localhost:3000`. Upload form at `/upload`.

## Environment variables

| Var | What | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | Fine-grained PAT with `Contents: Read and write` on `wowksies/3-Kirwan` | — (required) |
| `GITHUB_OWNER` | Repo owner | `wowksies` |
| `GITHUB_REPO` | Repo name | `3-Kirwan` |
| `GITHUB_BRANCH` | Branch to commit to | `main` |
| `UPLOAD_PIN` | Shared PIN classmates type on `/upload` | `122334` |

### Creating the GitHub token

1. https://github.com/settings/personal-access-tokens/new
2. **Resource owner:** `wowksies`
3. **Repository access:** Only select repositories → pick `3-Kirwan`
4. **Repository permissions:** Contents → **Read and write**. Metadata → Read-only (auto).
5. Copy the token, paste into `.env.local` (local) **and** Vercel project env vars (deploy).

> **Never** paste this token into chat, Slack, or commit it to git.

## Class photos

The three class photos for the homepage timeline go in `public/class-photos/`:

- `1st-year.jpg`
- `2nd-year.jpg`
- `3rd-year.jpg`

Cards crop to 4:3.

## Memory uploads

Submitting `/upload` calls `POST /api/upload`, which:

1. Checks the PIN against `UPLOAD_PIN`.
2. Validates the file (≤ 8 MB, image MIME type).
3. Commits the image to `memories/{timestamp}__{uploader-slug}__{caption-slug}.{ext}` on `main`.

The homepage gallery (`GET /api/memories`) lists that folder via the GitHub Contents API and
pipes the raw URLs into `CircularGallery`. New uploads show up after a hard refresh (no client cache).

## Deploy to Vercel

```bash
npx vercel link
npx vercel env add GITHUB_TOKEN
npx vercel env add UPLOAD_PIN
npx vercel --prod
```

Or push to GitHub and import the repo on https://vercel.com/new — then add the env vars in the
Project Settings.

## Project layout

```
src/
  app/
    page.tsx                # hero + timeline + gallery
    upload/page.tsx         # PIN-gated upload form
    api/
      upload/route.ts       # commits to GitHub
      memories/route.ts     # lists memories from GitHub
    layout.tsx
    globals.css
  components/
    CircularGallery.jsx     # react-bits, drop-in
    CircularGallery.css
    MemoriesGallery.tsx     # client wrapper that fetches /api/memories
  lib/
    github.ts               # Octokit factory + repo config
    utils.ts                # cn + slugify
public/
  class-photos/             # drop 1st-year.jpg / 2nd-year.jpg / 3rd-year.jpg
```
