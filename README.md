# Cosy Corner Companion

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cosy Corner Guest House & Spa | eMalahleni</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<style>
  :root {
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.15);
    --bg:    #2e2e2e;
    --bg2:   #363636;
    --bg3:   #424242;
    --bg4:   #1c1c1c;
    --border: rgba(201,168,76,0.2);
    --text:  #f0ede8;
    --muted: #aaaaaa;
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--text); font-family:'Montserrat',sans-serif; font-weight:300; overflow-x:hidden; }

  /* NAV */
  nav {
    position:fixed; top:0; width:100%; z-index:1000;
    padding:1rem 2.5rem;
    display:flex; align-items:center; justify-content:space-between;
    background:rgba(28,28,28,0.98);
    border-bottom:1px solid var(--border);
    box-shadow:0 2px 20px rgba(0,0,0,0.4);
  }
  .logo { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:300; letter-spacing:0.12em; color:var(--gold); }
  .logo span { font-style:italic; color:var(--text); }
  .nav-links { display:flex; gap:2rem; list-style:none; }
  .nav-links a { color:var(--text); text-decoration:none; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; transition:color 0.3s; }
  .nav-links a:hover { color:var(--gold); }
  .nav-btn { background:var(--gold); border:none; color:var(--bg4); padding:0.65rem 1.6rem; font-family:'Montserrat',sans-serif; font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; font-weight:500; }
  .nav-btn:hover { background:var(--gold-light); transform:translateY(-1px); box-shadow:0 4px 15px rgba(201,168,76,0.4); }

  /* HERO */
  .hero { height:100vh; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .hero-bg { position:absolute; inset:0; background:linear-gradient(160deg, #1c1c1c 0%, #2a2a2a 50%, #1c1c1c 100%); }
  .hero-bg::before { content:''; position:absolute; inset:0; background: radial-gradient(ellipse at 25% 60%, rgba(201,168,76,0.07) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(150,150,150,0.04) 0%, transparent 50%); }
  .hero-bg::after { content:''; position:absolute; inset:0; background-image:repeating-linear-gradient(-45deg, transparent, transparent 50px, rgba(201,168,76,0.018) 50px, rgba(201,168,76,0.018) 51px); }
  .hero-content { position:relative; text-align:center; z-index:2; animation:fadeUp 1.4s ease forwards; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(35px)} to{opacity:1;transform:translateY(0)} }
  .hero-rating { display:inline-flex; align-items:center; gap:0.6rem; background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.35); padding:0.5rem 1.2rem; margin-bottom:1.5rem; animation:fadeUp 1.4s ease 0.1s both; }
  .hero-rating .stars { color:var(--gold); font-size:0.85rem; }
  .hero-rating span { font-size:0.65rem; letter-spacing:0.15em; color:var(--text); }
  .hero-tag { font-size:0.62rem; letter-spacing:0.45em; text-transform:uppercase; color:var(--gold); margin-bottom:1.2rem; animation:fadeUp 1.4s ease 0.2s both; }
  .hero h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(2.8rem,8vw,6.5rem); font-weight:300; line-height:1.05; letter-spacing:0.05em; animation:fadeUp 1.4s ease 0.4s both; }
  .hero h1 em { font-style:italic; color:var(--gold); }
  .hero-sub { font-size:0.72rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--muted); margin-top:1.2rem; animation:fadeUp 1.4s ease 0.6s both; }
  .hero-divider { width:60px; height:1px; background:var(--gold); margin:1.8rem auto; animation:fadeUp 1.4s ease 0.8s both; }
  .hero-actions { display:flex; gap:1.2rem; justify-content:center; flex-wrap:wrap; animation:fadeUp 1.4s ease 1s both; }
  .btn-primary { background:var(--gold); color:var(--bg4); border:none; padding:1rem 2.5rem; font-family:'Montserrat',sans-serif; font-size:0.62rem; letter-spacing:0.25em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; text-decoration:none; display:inline-block; font-weight:500; }
  .btn-primary:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 25px rgba(201,168,76,0.4); }
  .btn-outline { background:transparent; color:var(--text); border:1px solid rgba(255,255,255,0.3); padding:1rem 2.5rem; font-family:'Montserrat',sans-serif; font-size:0.62rem; letter-spacing:0.25em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; text-decoration:none; display:inline-block; }
  .btn-outline:hover { border-color:var(--gold); color:var(--gold); }
  .btn-book-room { display:block; width:100%; background:var(--gold); color:var(--bg4); border:none; padding:0.85rem; font-family:'Montserrat',sans-serif; font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; font-weight:500; margin-top:1.2rem; }
  .btn-book-room:hover { background:var(--gold-light); box-shadow:0 4px 20px rgba(201,168,76,0.4); }
  .scroll-hint { position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem; animation:fadeUp 1.4s ease 1.5s both; }
  .scroll-hint span { font-size:0.58rem; letter-spacing:0.3em; color:var(--muted); text-transform:uppercase; }
  .scroll-line { width:1px; height:50px; background:linear-gradient(to bottom,var(--gold),transparent); animation:scrollPulse 2s ease-in-out infinite; }
  @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

  /* SHARED */
  section { padding:6rem 3rem; }
  .section-tag { font-size:0.58rem; letter-spacing:0.5em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem; }
  .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:300; line-height:1.2; }
  .section-title em { font-style:italic; color:var(--gold); }

  /* ABOUT */
  .about-wrap { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; }
  .about-image-stack { position:relative; height:450px; }
  .about-img-main { position:absolute; top:0; left:0; right:60px; bottom:60px; background:linear-gradient(135deg,var(--bg3),var(--bg2)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; }
  .about-img-accent { position:absolute; bottom:0; right:0; width:55%; height:55%; background:linear-gradient(135deg,var(--gold-dim),rgba(201,168,76,0.06)); border:1px solid var(--gold); display:flex; align-items:center; justify-content:center; }
  .img-placeholder { font-family:'Cormorant Garamond',serif; font-size:0.85rem; color:var(--gold); opacity:0.7; text-align:center; padding:1rem; line-height:1.8; }
  .about-text p { color:var(--muted); line-height:2; font-size:0.83rem; margin-bottom:1.2rem; }
  .about-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:1.2rem; margin-top:2.5rem; padding-top:2.5rem; border-top:1px solid var(--border); }
  .stat-num { font-family:'Cormorant Garamond',serif; font-size:2.5rem; font-weight:300; color:var(--gold); }
  .stat-label { font-size:0.62rem; letter-spacing:0.2em; color:var(--muted); text-transform:uppercase; }

  /* ROOMS */
  .rooms-wrap { max-width:1200px; margin:0 auto; }
  .rooms-header { text-align:center; margin-bottom:3.5rem; }
  .rooms-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3px; }
  .room-card { background:var(--bg3); transition:transform 0.4s,box-shadow 0.4s; border:1px solid transparent; display:flex; flex-direction:column; }
  .room-card:hover { transform:translateY(-6px); border-color:var(--border); box-shadow:0 20px 40px rgba(0,0,0,0.4); }
  .room-img { height:240px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; background:linear-gradient(135deg,var(--bg2),var(--bg4)); }
  .room-img::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,var(--bg3) 0%,transparent 60%); }
  .room-img-icon { font-size:3rem; opacity:0.12; }
  .room-info { padding:1.5rem; flex:1; display:flex; flex-direction:column; }
  .room-name { font-family:'Cormorant Garamond',serif; font-size:1.4rem; margin-bottom:0.4rem; }
  .room-desc { font-size:0.73rem; color:var(--muted); line-height:1.85; margin-bottom:0.8rem; flex:1; }
  .room-highlights { list-style:none; margin-bottom:1rem; }
  .room-highlights li { font-size:0.68rem; color:var(--muted); padding:0.25rem 0; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; gap:0.5rem; }
  .room-highlights li::before { content:'✦'; color:var(--gold); font-size:0.5rem; flex-shrink:0; }
  .room-price { font-family:'Cormorant Garamond',serif; font-size:1.4rem; color:var(--gold); }
  .room-price span { font-size:0.62rem; color:var(--muted); font-family:'Montserrat',sans-serif; }
  .room-amenities { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.8rem; }
  .amenity { font-size:0.58rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.3rem 0.6rem; border:1px solid rgba(201,168,76,0.3); color:var(--gold); }

  /* SPA */
  .spa-section { background:var(--bg4); position:relative; overflow:hidden; }
  .spa-section::before { content:''; position:absolute; top:-50%; right:-20%; width:600px; height:600px; background:radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%); pointer-events:none; }
  .spa-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; }
  .spa-services { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; margin-top:2.5rem; }
  .spa-service { padding:1.4rem; border:1px solid rgba(201,168,76,0.12); background:rgba(255,255,255,0.02); transition:border-color 0.3s,background 0.3s; }
  .spa-service:hover { border-color:var(--gold); background:rgba(201,168,76,0.04); }
  .spa-icon { font-size:1.4rem; margin-bottom:0.7rem; }
  .spa-service h4 { font-family:'Cormorant Garamond',serif; font-size:1.1rem; margin-bottom:0.3rem; }
  .spa-service p { font-size:0.68rem; color:var(--muted); line-height:1.7; }

  /* BOOKING */
  .booking-section { background:var(--bg2); }
  .booking-inner { max-width:860px; margin:0 auto; text-align:center; }
  .booking-form { display:grid; grid-template-columns:repeat(2,1fr); gap:1.4rem; margin-top:2.5rem; text-align:left; }
  .form-group { display:flex; flex-direction:column; gap:0.5rem; }
  .form-group.full { grid-column:1/-1; }
  .form-group label { font-size:0.58rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--gold); }
  .form-group input,.form-group select,.form-group textarea { background:transparent; border:none; border-bottom:1px solid rgba(255,255,255,0.12); color:var(--text); padding:0.8rem 0; font-family:'Montserrat',sans-serif; font-size:0.8rem; outline:none; transition:border-color 0.3s; width:100%; }
  .form-group input:focus,.form-group select:focus,.form-group textarea:focus { border-color:var(--gold); }
  .form-group input.error { border-color:#f44336; }
  .form-group .error-msg { font-size:0.6rem; color:#f44336; margin-top:0.2rem; display:none; }
  .form-group input.error ~ .error-msg { display:block; }
  .form-group select option { background:var(--bg2); }
  .form-group textarea { resize:vertical; min-height:90px; }
  .form-submit { grid-column:1/-1; text-align:center; margin-top:1rem; }
  #form-status { grid-column:1/-1; text-align:center; font-size:0.78rem; padding:0.9rem; display:none; margin-top:0.5rem; }
  #form-status.success { color:#4caf50; border:1px solid rgba(76,175,80,0.3); background:rgba(76,175,80,0.05); }
  #form-status.error   { color:#f44336; border:1px solid rgba(244,67,54,0.3); background:rgba(244,67,54,0.05); }

  /* REVIEWS */
  .reviews-wrap { max-width:1200px; margin:0 auto; }
  .reviews-header { text-align:center; margin-bottom:3.5rem; }
  .reviews-rating { display:flex; align-items:center; justify-content:center; gap:1rem; margin-top:1.2rem; }
  .stars { color:var(--gold); font-size:1.2rem; }
  .rating-num { font-family:'Cormorant Garamond',serif; font-size:3rem; color:var(--gold); }
  .reviews-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
  .review-card { padding:1.8rem; background:var(--bg3); border:1px solid rgba(201,168,76,0.08); transition:border-color 0.3s; }
  .review-card:hover { border-color:rgba(201,168,76,0.3); }
  .review-quote { font-family:'Cormorant Garamond',serif; font-size:3rem; color:var(--gold); opacity:0.3; line-height:1; }
  .review-text { font-size:0.77rem; color:var(--muted); line-height:1.8; margin:0.8rem 0; }
  .reviewer { font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); }

  /* CONTACT */
  .contact-section { background:var(--bg4); }
  .contact-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:5rem; }
  .contact-info p { font-size:0.8rem; color:var(--muted); line-height:2; margin-bottom:2rem; }
  .contact-detail { display:flex; flex-direction:column; gap:1.2rem; }
  .contact-item { display:flex; gap:1rem; align-items:flex-start; }
  .contact-item-icon { color:var(--gold); font-size:1rem; margin-top:0.1rem; }
  .contact-item-text h4 { font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:0.3rem; }
  .contact-item-text p { font-size:0.8rem; color:var(--muted); }
  .map-placeholder { height:280px; background:var(--bg3); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; color:var(--muted); font-style:italic; }

  /* FOOTER */
  footer { background:#111; padding:3rem; text-align:center; border-top:1px solid var(--border); }
  .footer-logo { font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:var(--gold); margin-bottom:0.8rem; }
  footer p { font-size:0.62rem; color:var(--muted); letter-spacing:0.15em; }

  /* FLOATING WHATSAPP */
  .whatsapp-fab { position:fixed; bottom:7.2rem; right:2rem; z-index:997; width:54px; height:54px; border-radius:50%; background:#25D366; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 20px rgba(37,211,102,0.5); transition:all 0.3s; text-decoration:none; font-size:1.5rem; }
  .whatsapp-fab:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(37,211,102,0.7); }
  .whatsapp-tooltip { position:absolute; right:66px; top:50%; transform:translateY(-50%); background:var(--bg4); color:var(--text); font-size:0.65rem; padding:0.4rem 0.8rem; white-space:nowrap; letter-spacing:0.1em; opacity:0; pointer-events:none; transition:opacity 0.3s; border:1px solid var(--border); font-family:'Montserrat',sans-serif; }
  .whatsapp-fab:hover .whatsapp-tooltip { opacity:1; }

  /* AI CHAT */
  .chat-fab { position:fixed; bottom:2rem; right:2rem; z-index:999; width:54px; height:54px; border-radius:50%; background:var(--gold); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 30px rgba(201,168,76,0.45); transition:all 0.3s; font-size:1.3rem; }
  .chat-fab:hover { transform:scale(1.1); }
  .chat-window { position:fixed; bottom:6.5rem; right:2rem; z-index:998; width:380px; height:580px; background:var(--bg2); border:1px solid rgba(201,168,76,0.3); display:flex; flex-direction:column; box-shadow:0 20px 60px rgba(0,0,0,0.7); opacity:0; pointer-events:none; transform:translateY(20px); transition:all 0.3s; }
  .chat-window.open { opacity:1; pointer-events:all; transform:translateY(0); }
  .chat-header { padding:1.1rem 1.4rem; background:linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04)); border-bottom:1px solid rgba(201,168,76,0.2); display:flex; align-items:center; justify-content:space-between; }
  .chat-header-info { display:flex; align-items:center; gap:0.8rem; }
  .chat-avatar { width:36px; height:36px; border-radius:50%; background:var(--gold); display:flex; align-items:center; justify-content:center; font-size:0.9rem; color:var(--bg4); font-family:'Cormorant Garamond',serif; font-weight:600; }
  .chat-header-name { font-family:'Cormorant Garamond',serif; font-size:1.1rem; color:var(--gold); }
  .chat-header-sub { font-size:0.58rem; color:#4caf50; letter-spacing:0.1em; }
  .chat-close { background:none; border:none; color:var(--muted); cursor:pointer; font-size:1.1rem; }
  .chat-messages { flex:1; overflow-y:auto; padding:1.1rem; display:flex; flex-direction:column; gap:0.9rem; scrollbar-width:thin; scrollbar-color:rgba(201,168,76,0.2) transparent; }
  .msg { max-width:88%; }
  .msg.bot { align-self:flex-start; }
  .msg.user { align-self:flex-end; }
  .msg-bubble { padding:0.75rem 0.9rem; font-size:0.76rem; line-height:1.65; }
  .msg.bot .msg-bubble { background:var(--bg3); border-left:2px solid var(--gold); color:var(--text); }
  .msg.user .msg-bubble { background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.3); color:var(--text); }
  .msg-time { font-size:0.55rem; color:var(--muted); margin-top:0.25rem; padding:0 0.2rem; }
  .msg.user .msg-time { text-align:right; }

  /* "Continue on WhatsApp" handover button */
  .whatsapp-handover {
    display:flex; align-items:center; gap:0.5rem; justify-content:center;
    background:#25D366; color:#fff; border:none;
    padding:0.6rem 1rem; font-family:'Montserrat',sans-serif;
    font-size:0.62rem; letter-spacing:0.15em; text-transform:uppercase;
    cursor:pointer; width:100%; margin-top:0.5rem; transition:background 0.3s;
    text-decoration:none;
  }
  .whatsapp-handover:hover { background:#1fad55; }

  .chat-input-area { padding:0.9rem; border-top:1px solid rgba(201,168,76,0.15); display:flex; gap:0.7rem; }
  .chat-input { flex:1; background:var(--bg3); border:1px solid rgba(255,255,255,0.08); color:var(--text); padding:0.65rem 0.9rem; font-family:'Montserrat',sans-serif; font-size:0.73rem; outline:none; transition:border-color 0.3s; }
  .chat-input:focus { border-color:rgba(201,168,76,0.4); }
  .chat-send { background:var(--gold); border:none; color:var(--bg4); padding:0.65rem 0.9rem; cursor:pointer; font-size:0.95rem; transition:background 0.3s; }
  .chat-send:hover { background:var(--gold-light); }
  .quick-replies { display:flex; flex-wrap:wrap; gap:0.4rem; padding:0.5rem 1.1rem 0; }
  .quick-reply { font-size:0.6rem; padding:0.35rem 0.7rem; border:1px solid rgba(201,168,76,0.3); color:var(--gold); background:none; cursor:pointer; transition:all 0.2s; font-family:'Montserrat',sans-serif; }
  .quick-reply:hover { background:rgba(201,168,76,0.1); }
  .typing-indicator { display:flex; gap:4px; padding:0.75rem 0.9rem; background:var(--bg3); border-left:2px solid var(--gold); width:fit-content; align-self:flex-start; }
  .typing-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); opacity:0.5; animation:typingPulse 1.2s ease-in-out infinite; }
  .typing-dot:nth-child(2){animation-delay:0.2s} .typing-dot:nth-child(3){animation-delay:0.4s}
  @keyframes typingPulse { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-4px)} }

  /* RESPONSIVE */
  @media(max-width:900px) {
    nav{padding:0.9rem 1.4rem} .nav-links{display:none} section{padding:4.5rem 1.4rem}
    .about-wrap{grid-template-columns:1fr;gap:2.5rem} .about-image-stack{height:300px}
    .rooms-grid{grid-template-columns:1fr;gap:1rem}
    .spa-inner{grid-template-columns:1fr;gap:2.5rem} .spa-services{grid-template-columns:1fr 1fr}
    .booking-form{grid-template-columns:1fr} .form-group.full{grid-column:1} .form-submit{grid-column:1} #form-status{grid-column:1}
    .reviews-grid{grid-template-columns:1fr;gap:1rem}
    .contact-inner{grid-template-columns:1fr;gap:2.5rem}
    .hero-actions{flex-direction:column;align-items:center}
    .chat-window{width:calc(100vw - 2rem);right:1rem}
  }
  @media(max-width:500px) {
    .hero h1{font-size:2.4rem} .spa-services{grid-template-columns:1fr}
  }






Cosy Corner Guest House & Spa


    

About


    

Rooms


    

Spa


    

Reviews


    

Contact

Book Now




    


      ★★★★★
      4.9 · 26 Reviews on Google
    


    

★  eMalahleni, Mpumalanga  ★


    

Cosy Corner
Guest House & Spa


    

Where Comfort Meets Luxury


    


    


      Reserve Your Stay
      Explore Rooms
    

Scroll






    


      

🏠
Modern Exterior
eMalahleni's Finest


      

✨
Luxury Spa


    


    


      

Our Story


      

A Sanctuary in the
Heart of Mpumalanga



      

Nestled in the vibrant community of Hlalanikahle, Cosy Corner Guest House & Spa offers a rare blend of modern luxury and warm South African hospitality. Our sleek contemporary grey design creates an atmosphere of refined comfort that feels both exclusive and welcoming.


      

From our serene spa treatments to our thoughtfully designed rooms with Smart TV and WiFi, every detail has been crafted to ensure your stay is nothing short of extraordinary — whether for a day visit, overnight, or a full day escape.


      


        

4.9★

Guest Rating


        

26+

Reviews


        

3

Booking Options


      


    






    


      

Accommodation


      

Thoughtfully Designed Rooms


      

Day Time · Night Time · Full Day Bookings Available


    


    


      


        

🛏


        


          

Deluxe Room


          

Sink into a plush queen-size bed surrounded by sleek grey interiors and warm gold accents. The perfect retreat after a long day — refined, restful and entirely yours.


          


            

Queen-size bed with premium linen


            

Private en-suite bathroom


            

Smart TV with DStv & high-speed WiFi


            

Air conditioning & blackout curtains


          


          

R850 / night


          

En-suiteSmart TVWiFiAC


          Book This Room
        


      


      


        

👑


        


          

Executive Suite


          

Our most prestigious space — a king-size bed, a generous sitting area, and exclusive spa access combine to create an experience of pure indulgence. This is where you come to truly unwind.


          


            

King-size bed with luxury bedding


            

Private sitting lounge area


            

Complimentary spa treatment included


            

Smart TV, WiFi & premium minibar


          


          

R1,350 / night


          

King BedSpa AccessSmart TVMinibar


          Book This Room
        


      


      


        

🌿


        


          

Garden Room


          

Wake up to the gentle sounds of nature from your private patio. The Garden Room blends the tranquility of the outdoors with modern comforts — a breath of fresh air in every sense.


          


            

Double bed with quality linen


            

Private patio with garden views


            

Smart TV with DStv & high-speed WiFi


            

Air conditioning & en-suite shower


          


          

R750 / night


          

Garden ViewSmart TVWiFiPatio


          Book This Room
        


      


    






    


      

Wellness & Relaxation


      

Our Signature
Spa Experience



      

Indulge in our world-class spa treatments designed to restore balance, rejuvenate the body, and calm the mind. Our expert therapists use premium products to deliver truly transformative experiences.



      Book a Treatment
    


    


      

💆

Full Body Massage

60 or 90-minute sessions to melt away tension and restore vitality.


      

✨

Facial Treatments

Customised facials using premium skincare for radiant, glowing skin.


      

💅

Manicure & Pedicure

Luxurious nail treatments with premium polishes and hand care.


      

🌸

Aromatherapy

Essential oil blends tailored to your mood and wellness needs.


    






    

Reserve Your Stay


    

Make a Booking


    

Fill in your details and we'll confirm your reservation within a few hours


    


      

Full NamePlease enter your full name


      

Email Address@email.com" required>Please enter a valid email
      

Phone / WhatsAppPlease enter a valid SA number


      

Booking TypeDay Time BookingNight Time BookingFull Day BookingSpa Treatment Only


      

Room TypeDeluxe Room — R850/nightExecutive Suite — R1,350/nightGarden Room — R750/nightSpa Treatment (No Room)


      

Number of Guests1 Guest2 Guests3 Guests4+ Guests


      

Check-in / Arrival DatePlease select a check-in date


      

Check-out / Departure DateCheck-out must be after check-in


      

Special Requests or Notes


      
      

✦ Reserve Now ✦


    
  





    


      

Guest Experiences


      

What Our Guests Say


      

★★★★★4.9/ 5.0 · 26 Reviews on Google


    


    


      

"

Absolutely stunning place! The rooms are modern and spotlessly clean. The spa treatment was the highlight — I felt completely rejuvenated. Will definitely be back!

Nomsa T. — Johannesburg


      

"

Exceptional service from the moment we arrived. Smart TV in every room was a lovely touch. The staff are warm and professional. Highly recommend!

Michael D. — Pretoria


      

"

Best guest house in eMalahleni by far. Beautiful modern grey design, incredibly comfortable beds, and the spa treatments are divine. Worth every rand!

Zanele M. — Durban


    






    


      

Find Us


      

Get in Touch



      

We'd love to hear from you. Whether you have a question about our rooms, spa services, or want to make a special arrangement, our team is here to help.


      


        

📍

Address

4763, Hlalanikahle
eMalahleni, 1045
Mpumalanga, South Africa


        

📞

Phone & WhatsApp

064 123 6760


        

🕐

Booking Options

Day Time · Night Time · Full Day Bookings


        

📺

In Every Room

High-Speed WiFi · Smart TV


      


    


    


      

📍 Hlalanikahle, eMalahleni, Mpumalanga



      


        Book Now
        Chat With Thandi
      


    





Cosy Corner

Guest House & Spa  ·  eMalahleni, Mpumalanga  ·  064 123 6760




© 2025 Cosy Corner Guest House & Spa. All rights reserved.




  💬Chat on WhatsApp

✨


    


      

T


      


        

Thandi — Digital Concierge


        

● Online · Replies instantly


      


    


    ✕


    Rooms
    Spa
    Loadshedding
    Parking
    Check-in


    


      

Warm welcome to Cosy Corner Guest House & Spa! 🌟 I'm Thandi, your digital concierge. I'm here to help with rooms, the spa, bookings, directions or any questions about your stay. How may I assist you today?


      

Just now


    


    
    ➤



@\S+\.\S+/.test(e.value)){e.classList.add('error');ok=false;}else e.classList.remove('error');
  if(!/^(\+27|0)[6-8][0-9]{8}$/.test(p.value.replace(/\s/g,''))){p.classList.add('error');ok=false;}else p.classList.remove('error');
  if(!ci.value){ci.classList.add('error');ok=false;}else ci.classList.remove('error');
  if(co.value&&co.value= 21;
}

function addMessage(text, isBot) {
  const msgs = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = `msg ${isBot?'bot':'user'}`;
  el.innerHTML = `

${text}

${getTime()}

`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

// "Continue on WhatsApp" handover button — appears after 3 exchanges
function addWhatsAppHandover(chatHistory) {
  const msgs = document.getElementById('chatMessages');
  const summary = encodeURIComponent(
    `Hi! I was just chatting with Thandi on the Cosy Corner website. Here's my conversation so far:\n\n${chatHistory}`
  );
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.innerHTML = `
    

Would you like to continue this conversation on WhatsApp? 📱


    
      💬 Continue on WhatsApp
    
    

${getTime()}


  `;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const t = document.createElement('div');
  t.className='typing-indicator'; t.id='typingIndicator';
  t.innerHTML='';
  msgs.appendChild(t); msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping(){ const t=document.getElementById('typingIndicator'); if(t) t.remove(); }

function sendQuick(text){
  document.getElementById('chatInput').value=text;
  sendMessage();
  document.getElementById('quickReplies').style.display='none';
}

function buildChatSummary() {
  return conversationHistory
    .map(m => `${m.role==='user'?'Guest':'Thandi'}: ${m.content}`)
    .join('\n');
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if(!text) return;
  addMessage(text, false);
  input.value = '';
  showTyping();
  messageCount++;
  conversationHistory.push({role:'user', content:text});

  // Build context variables
  const now        = new Date();
  const timeStr    = now.toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'});
  const dateStr    = now.toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const afterHours = isAfterHours();
  const greeting   = getHourGreeting();

  const SYSTEM_PROMPT = `You are "Thandi," the dedicated Digital Concierge for Cosy Corner Guest House & Spa in Hlalanikahle, eMalahleni (Witbank), Mpumalanga, South Africa.

ROLE & PERSONALITY:
Your goal is to make every guest feel welcomed, safe, and well-informed. Embody the spirit of Ubuntu — "I am because we are." Be professional, warm and helpful. Use polite South African hospitality language. Occasionally use friendly terms like "Kind regards," "Warm welcome," or "You are most welcome." Avoid over-the-top slang.

CURRENT CONTEXT:
- Current date: ${dateStr}
- Current time: ${timeStr}
- After hours: ${afterHours ? 'YES — note that the office is closed but you are available 24/7' : 'NO — office is open'}
- Greeting to use: ${greeting}

GUESTHOUSE FACT SHEET:
- Name: Cosy Corner Guest House & Spa
- Address: 4763, Hlalanikahle, eMalahleni, 1045, Mpumalanga
- Phone & WhatsApp: 064 123 6760
- Check-in: 14:00 | Check-out: 11:00
- WiFi: Available in all rooms (password provided at check-in)
- Booking types: Day Time Bookings, Night Time Bookings, Full Day Bookings
- Rooms: Deluxe Room (R850/night, queen bed, en-suite, AC, Smart TV, DStv, WiFi), Executive Suite (R1,350/night, king bed, sitting area, spa access included, minibar, Smart TV, WiFi), Garden Room (R750/night, double bed, private patio, garden views, Smart TV, WiFi)
- Spa services: Full Body Massage (60 or 90 min), Facials, Manicure & Pedicure, Aromatherapy
- Google Rating: 4.9 stars — 26 reviews

SOUTH AFRICAN SPECIFIC INSTRUCTIONS:
- LOADSHEDDING: If asked about power cuts, WiFi or electricity say: "We have a backup power system that keeps the WiFi, lights and essential services running during loadshedding — so you won't be left in the dark. Your stay will not be disrupted."
- SAFETY: If asked about security say: "Your safety is our priority. We have secure premises with controlled access to ensure you have a peaceful and safe stay."
- BOOKINGS: If a guest wants to book, ask for their Name, Dates, and Number of Guests, then say you are checking the calendar and will confirm via WhatsApp shortly.
- AFTER HOURS: If after 21:00 or before 07:00, add: "Please note our office is currently closed, but I will make sure your message reaches the team first thing in the morning."

STRICT CONSTRAINTS:
1. NEVER make up prices not listed above.
2. NEVER promise early check-in without saying "subject to availability."
3. NEVER promise late check-out without saying "subject to availability."
4. If you cannot find an answer in the Fact Sheet say: "That is a great question. Let me check with the team and get back to you via WhatsApp as soon as possible."
5. Keep responses concise — 2 to 4 sentences or use bullet points for lists. WhatsApp users dislike reading long paragraphs.
6. Always sign off as: "Warm regards, Thandi — Cosy Corner Concierge 🌟"`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key':'YOUR_ANTHROPIC_API_KEY',  // ← replace with your key
        'anthropic-version':'2023-06-01'
      },
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:500,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      })
    });
    const data  = await res.json();
    const reply = data.content?.[0]?.text || `${greeting}! I'm having a small technical issue right now. Please WhatsApp us directly on 064 123 6760 and our team will assist you immediately. Warm regards, Thandi 🌟`;
    removeTyping();
    conversationHistory.push({role:'assistant', content:reply});
    addMessage(reply, true);

    // Show "Continue on WhatsApp" handover after 3 exchanges
    if(messageCount === 3) {
      setTimeout(() => addWhatsAppHandover(buildChatSummary()), 800);
    }

  } catch {
    removeTyping();
    addMessage(`${greeting}! I'm experiencing a small technical difficulty right now. Please WhatsApp us on 064 123 6760 — our team responds quickly! Warm regards, Thandi 🌟`, true);
  }
}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c75ee4b2-a327-4d81-ba8e-1cb62afc74e9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
