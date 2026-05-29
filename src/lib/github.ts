import { Octokit } from '@octokit/rest';

const owner = process.env.GITHUB_OWNER || 'wowksies';
const repo = process.env.GITHUB_REPO || '3-Kiki';
const branch = process.env.GITHUB_BRANCH || 'main';

export function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN env var missing');
  }
  return new Octokit({ auth: token });
}

export const repoConfig = { owner, repo, branch };

export function rawUrl(path: string): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}
