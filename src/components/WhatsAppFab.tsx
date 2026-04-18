export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/27641236760"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[7.2rem] right-6 z-[997] w-[54px] h-[54px] rounded-full bg-[#25D366] flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all group"
      aria-label="Chat on WhatsApp"
    >
      💬
      <span className="absolute right-[66px] top-1/2 -translate-y-1/2 bg-[oklch(0.18_0.005_270)] text-foreground text-[0.65rem] px-3 py-1.5 whitespace-nowrap tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity border border-border pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
