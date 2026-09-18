import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "wouter";

const readTheRoomFormats = [
  {
    name: "Podcast",
    body: "Marketing Decoded—long-form conversations that make expertise impossible to miss.",
    video: "/manus-storage/marketing-decoded-web_d3e81489.mp4",
    embed: undefined,
    href: "/shows/read-the-room",
  },
  {
    name: "Live Selling",
    body: "A live format that turns attention into a clear next action.",
    video: "/manus-storage/live-selling-web_99481ca7.mp4",
    embed: undefined,
    href: "/shows/read-the-room",
  },
  {
    name: "In The Room",
    body: "Candid field conversations with operators doing the work.",
    video: "/manus-storage/S-S-4-web_e865066d.mp4",
    embed: undefined,
    href: "/shows/read-the-room",
  },
];

function FormatCard({ name, body, video, embed, href }: (typeof readTheRoomFormats)[number]) {
  return (
    <article className="show-format-card">
      <div className="show-format-video">
        {embed ? <iframe src={embed} title={`${name} Instagram reel`} allow="autoplay; encrypted-media; picture-in-picture" loading="lazy" allowFullScreen /> : <video src={video} muted autoPlay loop playsInline preload="metadata" />}
        <span>SGNL / ORIGINAL</span>
      </div>
      <div className="show-format-copy">
        <h3>{name}</h3>
        <p>{body}</p>
        <Link href={href}>Explore the format <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}

export default function Shows() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, bookingOpen]);

  return (
    <div className="shows-page site-shell" id="top">
      <header className="site-header">
        <Link href="/" className="wordmark">SGNL <span>Media</span></Link>
        <nav><Link href="/">Home</Link><i>/</i><Link href="/shows">Shows</Link><i>/</i><a href="/#services">Services</a></nav>
        <div className="header-actions">
          <button className="header-cta" onClick={() => setBookingOpen(true)}>Book a call <ArrowUpRight size={15} /></button>
          <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        </div>
      </header>

      {menuOpen && <div className="mobile-menu"><div className="mobile-menu-top"><span className="eyebrow">Menu</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></div><div className="mobile-links"><Link href="/" onClick={() => setMenuOpen(false)}>Home <ArrowUpRight size={18} /></Link><Link href="/shows" onClick={() => setMenuOpen(false)}>Shows <ArrowUpRight size={18} /></Link><a href="/#services" onClick={() => setMenuOpen(false)}>Services <ArrowUpRight size={18} /></a></div><button className="mobile-book" onClick={() => { setMenuOpen(false); setBookingOpen(true); }}>Book a call <ArrowUpRight size={16} /></button></div>}

      <main className="shows-main">
        <section className="shows-portfolio-hero">
          <span className="shows-portfolio-label">Our shows</span>
          <div>
            <h1>We run the system<br />on ourselves.</h1>
            <p>These are our own properties, built with the same system our clients buy. Nothing here was outsourced.</p>
          </div>
        </section>

        <section className="shows-portfolio-section shows-portfolio-featured">
          <div className="shows-portfolio-heading">
            <span className="shows-portfolio-label">Read The Room</span>
            <h2>Three formats,<br />one ecosystem.</h2>
          </div>
          <div className="show-format-grid">{readTheRoomFormats.map(format => <FormatCard {...format} key={format.name} />)}</div>
        </section>

        <section className="shows-newsletter">
          <div className="shows-newsletter-copy">
            <span className="shows-portfolio-label">Read The Room</span>
            <h2>Read the room<br />before it changes.</h2>
            <p>Our newsletter on positioning, media, demand, and the signals shaping what people buy next.</p>
          </div>
          {subscribed ? <div className="shows-newsletter-success" role="status"><span>Subscription received</span><strong>You’re in, {firstName}.</strong><p>The next edition of Read The Room will land in {email}.</p></div> : <form className="shows-newsletter-form" onSubmit={event => { event.preventDefault(); if (!firstName.trim() || !email.trim()) return; window.localStorage.setItem("sgnl-read-the-room-signup", JSON.stringify({ firstName: firstName.trim(), email: email.trim() })); setSubscribed(true); }}><label><span>First name</span><input type="text" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="First name" autoComplete="given-name" required /></label><label><span>Email address</span><input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" autoComplete="email" required /></label><button className="button lime large" type="submit">Subscribe <ArrowUpRight size={17} /></button><small>No noise. Just the signal.</small></form>}
        </section>

        <section className="shows-close">
          <span className="shows-portfolio-label">You’ve seen the system work.</span>
          <h2>Now put it behind<br />your expertise.</h2>
          <button className="button lime large" onClick={() => setBookingOpen(true)}>Book a call <ArrowUpRight size={17} /></button>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><div><Link href="/" className="wordmark">SGNL <span>Media</span></Link><p>We build the media teams behind category-leading brands and experts.</p></div><div className="footer-links"><div><b>Company</b><Link href="/">Home</Link><a href="/#services">Services</a><Link href="/shows">Shows</Link></div><div><b>Shows</b><Link href="/shows/read-the-room">Read the room</Link></div><div><b>Start</b><button onClick={() => setBookingOpen(true)}>Book a call</button></div></div></div><div className="footer-bottom"><span>© 2026 SGNL Media. Tampa, FL.</span><span>Privacy&nbsp;&nbsp;/&nbsp;&nbsp; Terms</span></div></footer>

      {bookingOpen && <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setBookingOpen(false)}><section className="modal-card cal-modal" role="dialog" aria-modal="true" aria-label="Book a call"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X size={18} /></button><iframe src="https://cal.com/andrew-moullin-qldwj3/content-engine-strategy-call?layout=month_view&useSlotsViewOnSmallScreen=true" title="Book a content engine strategy call" /></section></div>}
    </div>
  );
}
