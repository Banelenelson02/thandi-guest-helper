import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('public pages use a verified Google business listing, rating and review count', () => {
  const about = readFileSync('src/routes/about.tsx', 'utf8');
  const reviews = readFileSync('src/routes/reviews.tsx', 'utf8');
  const google = readFileSync('src/data/googleReviews.ts', 'utf8');
  assert.match(google, /GOOGLE_RATING = 4\.9;/);
  assert.match(google, /GOOGLE_REVIEW_COUNT = 27;/);
  assert.match(google, /query_place_id=ChIJp0-pTs-V6h4RVcHlKz9No7k/);
  assert.match(about, /GOOGLE_RATING/);
  assert.match(about, /View All Reviews on Google/);
  assert.match(reviews, /GOOGLE_REVIEW_COUNT/);
  assert.match(reviews, /GOOGLE_REVIEWS_URL/);
  assert.match(reviews, /View All Reviews on Google/);
  assert.doesNotMatch(reviews, /Michael D\.|const REVIEWS\s*=/);
  assert.doesNotMatch(about + reviews, /26\+?\s+Reviews/i);
});
