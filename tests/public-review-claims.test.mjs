import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('public About and Reviews pages do not publish unverified review claims', () => {
  const about = readFileSync('src/routes/about.tsx', 'utf8');
  const reviews = readFileSync('src/routes/reviews.tsx', 'utf8');
  for (const text of [about, reviews]) {
    assert.doesNotMatch(text, /4\.9\s*★|26\+?\s+Reviews|Guest Rating/i);
  }
  assert.doesNotMatch(reviews, /Michael D\.|const REVIEWS\s*=/);
  assert.match(reviews, /Ask the Owner on WhatsApp/);
});
