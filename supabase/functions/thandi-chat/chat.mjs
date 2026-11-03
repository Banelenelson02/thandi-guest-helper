export function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 24) return false;
  let size = 0;
  for (const message of messages) {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 2000) return false;
    size += message.content.length;
  }
  return size <= 16000 && messages.at(-1).role === 'user';
}
export async function readLimitedBody(req, maxBytes = 24000) {
  if (!req.body) throw new Error('missing_body');
  const reader = req.body.getReader();
  const chunks = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new Error('body_too_large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

/** A guest can request a summary in chat without pressing the summary button. */
export function wantsBookingSummary(action, lastUserMessage) {
  if (action === 'summary') return true;
  if (typeof lastUserMessage !== 'string') return false;
  return /\b(?:prepare|show|give|create|generate|make|see)\b.{0,60}\b(?:booking\s+)?summary\b/i.test(lastUserMessage)
    || /\b(?:booking\s+)?summary\b.{0,40}\bplease\b/i.test(lastUserMessage);
}
