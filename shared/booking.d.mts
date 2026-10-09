export const TYPES: Record<string, string>;
export function todaySA(now?: Date): string;
export function validateBooking(data: Record<string, string>, today?: string): Record<string, string>;
export function bookingSummary(data: Record<string, string>): string;
export function whatsappUrl(data: Record<string, string>): string;
export function parseBookingDraft(raw: unknown, today?: string): { booking: Record<string, string> | null; errors: Record<string, string> };
export function parseHandoverDraft(raw: unknown, today?: string): { summary: string | null; errors: Record<string, string> };
