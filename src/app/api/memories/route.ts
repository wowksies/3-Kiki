import { getOctokit, repoConfig, rawUrl } from '@/lib/github';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type MemoryItem = {
  image: string;
  text: string;
  uploader: string;
  uploadedAt: number;
};

function parseFilename(name: string): { caption: string; uploader: string; ts: number } | null {
  const base = name.replace(/\.[^.]+$/, '');
  const parts = base.split('__');
  if (parts.length < 3) return null;
  const [tsStr, uploaderSlug, captionSlug] = parts;
  const ts = Number(tsStr);
  if (!Number.isFinite(ts)) return null;
  const deslug = (s: string) => s.replace(/-+/g, ' ').trim();
  return {
    ts,
    uploader: deslug(uploaderSlug),
    caption: deslug(captionSlug),
  };
}

export async function GET() {
  let octokit;
  try {
    octokit = getOctokit();
  } catch {
    return Response.json({ items: [], error: 'No GITHUB_TOKEN configured' });
  }

  try {
    const res = await octokit.repos.getContent({
      owner: repoConfig.owner,
      repo: repoConfig.repo,
      ref: repoConfig.branch,
      path: 'memories',
    });
    const data = res.data;
    if (!Array.isArray(data)) {
      return Response.json({ items: [] });
    }

    const items: MemoryItem[] = data
      .filter((entry) => entry.type === 'file' && /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(entry.name))
      .map((entry) => {
        const parsed = parseFilename(entry.name);
        return {
          image: rawUrl(entry.path),
          text: parsed?.caption || entry.name,
          uploader: parsed?.uploader || '',
          uploadedAt: parsed?.ts || 0,
        };
      })
      .sort((a, b) => b.uploadedAt - a.uploadedAt);

    return Response.json({ items });
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status === 404) {
      return Response.json({ items: [] });
    }
    const msg = err instanceof Error ? err.message : 'Failed to fetch memories';
    return Response.json({ items: [], error: msg }, { status: 502 });
  }
}
