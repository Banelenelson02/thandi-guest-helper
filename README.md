# Cosy Corner Guest House

A React and TanStack Start website for the guesthouse in Hlalanikahle, eMalahleni. It includes real room photos, a pool and grounds page, GPS directions, WhatsApp booking requests and the Lindo AI concierge.

## Local setup

Use Node.js 22 or newer.

```sh
npm ci
cp .env.example .env
npm run dev
```

The map embeds existing GPS coordinates and does not need an API key. Keep the pin unchanged unless the owner requests a correction.

## Booking flow

The guest fills in the form, reviews a clean request, opens WhatsApp and presses Send. Opening WhatsApp alone does not deliver the request. The owner checks availability, explains room arrangements for groups, provides the final price and payment instructions, and confirms the booking manually after payment.

The 3 and 4+ guest options are intentional. Each room holds at most two guests; larger groups need arrangements with the owner. Night and full day bookings require a later departure date. Day, short and pool visits can use the same date. Dates use South African time.

Breakfast is R70 or R90 per person. Hot chocolate costs an additional R11 per serving. There is no automatic quote, charge or payment processing.

Lindo collects details in chat. Prepare Booking Summary extracts the guest-provided fields, validates them and displays the summary inside the chat. Missing details and corrections are handled in the same conversation. The guest reviews it before opening WhatsApp. The standalone booking form remains available. The frontend also supports the currently deployed reply-only chat service: it extracts only labelled booking fields from the latest assistant reply into the WhatsApp draft. It never sends the full transcript. Incomplete summaries have no booking handover button. Structured replies from the newer function still use server-side booking validation.

## Chat deployment

Apply the migration before deploying the updated function:

```sh
supabase db push
supabase functions deploy thandi-chat
```

Set server secrets in the target Supabase project:

* `LOVABLE_API_KEY`: AI gateway key.
* `CHAT_ALLOWED_ORIGINS`: comma-separated exact live origins, such as `https://your-domain.co.za`. Add localhost only for local development.
* `CHAT_RATE_LIMIT_SALT`: a long random server-only value used to hash network identifiers.
* Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted functions. Never put the service role key or other server secrets in VITE variables.

The database RPC permits 12 requests per network identifier per ten-minute window and 100 requests total per UTC day. The global count includes blocked attempts and is a conservative cost guard, not a guaranteed currency spend limit. It resets at midnight UTC. Tune both limits to the owner's traffic and budget.

Confirm that the platform overwrites `x-forwarded-for` at its trusted ingress. Per-network limiting is weaker if that header can be forged; the global quota still applies. Origin checks limit browser access but are not authentication and do not stop direct scripted requests. For higher traffic or active abuse, add a verified bot challenge and provider-level spending controls.

Requests reject system/developer roles, invalid JSON, bodies over 24 KB, more than 24 messages, messages over 2,000 characters and conversations over 16,000 characters. The AI request has a 20-second timeout and 500-token output cap. Missing quota configuration fails closed and the guest can still use WhatsApp.

## Checks

```sh
npm test
npm run build
npm run typecheck
```

GitHub Actions runs these checks on pushes and pull requests and checks the Deno edge function. Docker is not required. Unit tests cover booking rules, group requests, WhatsApp encoding and chat validation. These are not a substitute for real device and deployed service checks.

## Before release

1. Apply the migration and configure the origins and server secrets before deploying the function.
2. Review the privacy notice with the owner and confirm the provider terms and actual correspondence retention practices. The notice is not a claim of full legal compliance.
3. Verify the live booking link on Android and iPhone, including pressing Send and owner receipt.
4. Verify successful chat, invalid requests, limits and a simulated AI outage in the target Supabase project.
5. Confirm business facts and review attribution with the owner. Testimonials mentioning unavailable treatments have been removed rather than rewritten.
6. Publish the website and verify the pool and privacy routes. The former treatments page is now `/pool`.
