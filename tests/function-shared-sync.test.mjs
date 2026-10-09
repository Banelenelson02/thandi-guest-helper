import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(p, 'utf8').trim();
for (const f of ['booking.mjs', 'chat.mjs']) {
  test(`chat function copy of ${f} matches shared/${f}`, () =>
    assert.equal(read(`supabase/functions/thandi-chat/${f}`), read(`shared/${f}`)));
}
