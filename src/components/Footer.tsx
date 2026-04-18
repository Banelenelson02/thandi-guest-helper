export function Footer() {
  return (
    <footer className="bg-[#111] py-12 px-6 text-center border-t border-border">
      <div className="font-display text-3xl text-gold mb-3">Cosy Corner</div>
      <p className="text-[0.65rem] text-muted-foreground tracking-[0.15em]">
        Guest House &amp; Spa &middot; eMalahleni, Mpumalanga &middot; 064 123 6760
      </p>
      <p className="text-[0.6rem] text-muted-foreground tracking-[0.15em] mt-3">
        © {new Date().getFullYear()} Cosy Corner Guest House &amp; Spa. All rights reserved.
      </p>
    </footer>
  );
}
