import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { Link } from "wouter";

const articles = [
  {
    href: "/read-the-room/the-market-is-telling-you-what-it-wants",
    issue: "Issue 01",
    category: "Positioning",
    title: "The market is telling you what it wants. Are you listening?",
    excerpt: "A weekly field note on language, timing, and the signals that move a category before the numbers catch up.",
    read: "8 min read",
    date: "September 2026",
    featured: true,
  },
  {
    href: "/read-the-room/how-to-start-a-show-for-your-brand",
    issue: "Field Guide 02",
    category: "Owned media",
    title: "How to start a show for your brand",
    excerpt: "A practical operating memo for turning expertise into a recurring media property people choose to return to.",
    read: "5 min read",
    date: "September 2026",
  },
  {
    href: "/read-the-room/which-platform-should-i-focus-on",
    issue: "Strategy Memo 03",
    category: "Distribution",
    title: "Which platform should I be focusing on?",
    excerpt: "Choose distribution from buyer behavior, message depth, and conversion mechanics—not whichever feed is loudest this week.",
    read: "12 min read",
    date: "September 2026",
  },
] as const;

export default function ReadTheRoom() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.title = "Read the Room — SGNL Media";
    const description = "SGNL Media field notes on positioning, production, distribution, conversion, SEO, GEO, and building category authority.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingOpen ? "hidden" : "";
  }, [menuOpen, bookingOpen]);

  const filtered = articles.filter(article => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase()));
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    window.localStorage.setItem("sgnl-read-the-room-signup", JSON.stringify({ firstName: firstName.trim(), email: email.trim() }));
    setSubscribed(true);
  };

  return <div className="read-room-page site-shell" id="top">
    <header className="site-header">
      <Link href="/" className="wordmark">SGNL <span>Media</span></Link>
      <nav><Link href="/">Home</Link><i>/</i><Link href="/shows">Shows</Link><i>/</i><Link href="/read-the-room" className="is-active">Read the Room</Link><i>/</i><a href="/#services">Services</a></nav>
      <div className="header-actions"><button type="button" className="header-cta" onClick={() => setBookingOpen(true)}>Book a call <ArrowUpRight size={15} /></button><button type="button" className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button></div>
    </header>

    {menuOpen && <div className="mobile-menu"><div className="mobile-menu-top"><span className="eyebrow">Menu</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></div><div className="mobile-links"><Link href="/" onClick={() => setMenuOpen(false)}>Home <ArrowUpRight size={18} /></Link><Link href="/shows" onClick={() => setMenuOpen(false)}>Shows <ArrowUpRight size={18} /></Link><Link href="/read-the-room" onClick={() => setMenuOpen(false)}>Read the Room <ArrowUpRight size={18} /></Link><a href="/#services" onClick={() => setMenuOpen(false)}>Services <ArrowUpRight size={18} /></a></div><button type="button" className="mobile-book" onClick={() => { setMenuOpen(false); setBookingOpen(true); }}>Book a call <ArrowUpRight size={16} /></button></div>}

    <main>
      <section className="read-room-hero">
        <div className="read-room-hero-meta"><span>SGNL Editorial / 2026</span><span>Positioning · Production · Distribution · Conversion</span></div>
        <h1>Read<br /><em>the Room.</em></h1>
        <div className="read-room-hero-bottom"><p>Field notes for founders building authority, demand, and category position in public.</p><span>Independent thinking for a search-and-answer world.</span></div>
      </section>

      <section className="read-room-featured">
        <div className="read-room-section-label"><span>Latest signal</span><span>01 / {String(articles.length).padStart(2, "0")}</span></div>
        <Link href={articles[0].href} className="read-room-feature-link">
          <div className="read-room-feature-copy"><div><span>{articles[0].category} / {articles[0].issue}</span><span>{articles[0].date} · {articles[0].read}</span></div><h2>{articles[0].title}</h2><p>{articles[0].excerpt}</p><strong>Read the field note <ArrowUpRight size={18} /></strong></div>
          <figure><img src="/manus-storage/editorial-founder_7a71b679.jpg" alt="Founder studying a wall of editorial images and notes" /><figcaption>Signal precedes scale.</figcaption></figure>
        </Link>
      </section>

      <section className="read-room-library">
        <div className="read-room-library-head"><div><span className="read-room-label">The library</span><h2>Ideas built to<br />survive the feed.</h2></div><label><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the room" aria-label="Search articles" /></label></div>
        <div className="read-room-article-list">{filtered.length ? filtered.map((article, index) => <Link href={article.href} className="read-room-article-row" key={article.href}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{article.category} / {article.issue}</small><h3>{article.title}</h3><p>{article.excerpt}</p></div><aside><span>{article.read}</span><ArrowUpRight size={19} /></aside></Link>) : <div className="read-room-empty"><span>No signal found.</span><p>Try a broader search term.</p></div>}</div>
      </section>

      <section className="read-room-principle"><span>Our editorial standard</span><blockquote>Useful enough to act on.<br />Specific enough to cite.<br />Clear enough to find.</blockquote><p>Every Read the Room article is structured for human readers, search engines, and AI answer systems without writing for algorithms instead of people.</p></section>

      <section className="read-room-signup">
        <div><span>Read the Room / Newsletter</span><h2>Get the signal<br />before the recap.</h2><p>One useful field note on positioning, media, demand, SEO, and GEO—sent when it is worth reading.</p></div>
        {subscribed ? <div className="read-room-signup-success" role="status"><span>Subscription received</span><strong>You’re in, {firstName}.</strong><p>The next Read the Room field note will land in {email}.</p></div> : <form onSubmit={subscribe}><label><span>First name</span><input value={firstName} onChange={event => setFirstName(event.target.value)} required autoComplete="given-name" placeholder="First name" /></label><label><span>Email</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" placeholder="you@company.com" /></label><button className="button lime large" type="submit">Join the room <ArrowUpRight size={17} /></button><small>No content treadmill. Just useful signals.</small></form>}
      </section>
    </main>

    <footer className="footer"><div className="footer-main"><div><Link href="/" className="wordmark">SGNL <span>Media</span></Link><p>We build the media teams behind category-leading brands and experts.</p></div><div className="footer-links"><div><b>Company</b><Link href="/">Home</Link><a href="/#services">Services</a><Link href="/shows">Shows</Link></div><div><b>Editorial</b><Link href="/read-the-room">Read the Room</Link>{articles.map(article => <Link href={article.href} key={article.href}>{article.category}</Link>)}</div><div><b>Start</b><button type="button" onClick={() => setBookingOpen(true)}>Book a call</button></div></div></div><div className="footer-bottom"><span>© 2026 SGNL Media. Tampa, FL.</span><span>Privacy&nbsp;&nbsp;/&nbsp;&nbsp; Terms</span></div></footer>

    {bookingOpen && <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setBookingOpen(false)}><section className="modal-card cal-modal" role="dialog" aria-modal="true" aria-label="Book a call"><button type="button" className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X size={18} /></button><iframe src="https://cal.com/andrew-moullin-qldwj3/content-engine-strategy-call?layout=month_view&useSlotsViewOnSmallScreen=true" title="Book a content engine strategy call" /></section></div>}
  </div>;
}
