import { NextRequest } from 'next/server';
import { getOctokit, repoConfig } from '@/lib/github';
import { slugify } from '@/lib/utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
]);

function extFromMime(mime: string): string {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/heic':
      return 'heic';
    case 'image/heif':
      return 'heif';
    default:
      return 'bin';
  }
}

export async function POST(request: NextRequest) {
  const expectedPin = process.env.UPLOAD_PIN;
  if (!expectedPin) {
    return Response.json({ error: 'Server misconfigured: UPLOAD_PIN missing' }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const pin = String(form.get('pin') ?? '');
  if (pin !== expectedPin) {
    return Response.json({ error: 'Wrong PIN' }, { status: 401 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }
  if (file.size === 0) {
    return Response.json({ error: 'Empty file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: `File too big (max ${MAX_BYTES / 1024 / 1024} MB)` }, { status: 413 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json({ error: `Unsupported file type: ${file.type}` }, { status: 415 });
  }

  const rawCaption = String(form.get('caption') ?? '').trim();
  const rawUploader = String(form.get('uploader') ?? '').trim();
  const caption = rawCaption.slice(0, 80);
  const uploader = rawUploader.slice(0, 40);

  const captionSlug = slugify(caption) || 'memory';
  const uploaderSlug = slugify(uploader) || 'anon';
  const timestamp = Date.now();
  const ext = extFromMime(file.type);
  const filename = `${timestamp}__${uploaderSlug}__${captionSlug}.${ext}`;
  const path = `memories/${filename}`;

  const buf = Buffer.from(await file.arrayBuffer());
  const base64 = buf.toString('base64');

  const octokit = getOctokit();
  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: repoConfig.owner,
      repo: repoConfig.repo,
      branch: repoConfig.branch,
      path,
      message: `memory: ${caption || 'untitled'}${uploader ? ` (by ${uploader})` : ''}`,
      content: base64,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'GitHub commit failed';
    return Response.json({ error: msg }, { status: 502 });
  }

  return Response.json({ ok: true, path });
}
