import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Lindo does not contain an unverified numeric review claim', () => {
  const source = readFileSync('supabase/functions/thandi-chat/index.ts', 'utf8');
  assert.doesNotMatch(source, /Google Rating:\s*\d/i);
  assert.match(source, /Do not quote numerical review ratings or counts/);
});
