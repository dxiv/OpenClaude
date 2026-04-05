import assert from 'node:assert/strict'
import test from 'node:test'

import { extractGitHubRepoSlug } from './repoSlug.ts'

test('keeps owner/repo input as-is', () => {
  assert.equal(extractGitHubRepoSlug('dxiv/OpenClaude'), 'dxiv/OpenClaude')
})

test('extracts slug from https GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('https://github.com/dxiv/OpenClaude'),
    'dxiv/OpenClaude',
  )
  assert.equal(
    extractGitHubRepoSlug('https://www.github.com/dxiv/OpenClaude.git'),
    'dxiv/OpenClaude',
  )
})

test('extracts slug from ssh GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('git@github.com:dxiv/OpenClaude.git'),
    'dxiv/OpenClaude',
  )
  assert.equal(
    extractGitHubRepoSlug('ssh://git@github.com/dxiv/OpenClaude'),
    'dxiv/OpenClaude',
  )
})

test('rejects malformed or non-GitHub URLs', () => {
  assert.equal(extractGitHubRepoSlug('https://gitlab.com/dxiv/OpenClaude'), null)
  assert.equal(extractGitHubRepoSlug('https://github.com/dxiv'), null)
  assert.equal(extractGitHubRepoSlug('not actually github.com/dxiv/OpenClaude'), null)
  assert.equal(
    extractGitHubRepoSlug('https://evil.example/?next=github.com/dxiv/OpenClaude'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://github.com.evil.example/dxiv/OpenClaude'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://example.com/github.com/dxiv/OpenClaude'),
    null,
  )
})
