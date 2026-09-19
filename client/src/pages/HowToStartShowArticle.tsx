import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

type TocItem = { id: string; title: string };

function SubscribeCard({ compact = false }: { compact?: boolean }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    window.localStorage.setItem("sgnl-read-the-room-signup", JSON.stringify({ firstName: firstName.trim(), email: email.trim() }));
    setSubmitted(true);
  };
  return <aside className={`brand-article-subscribe ${compact ? "is-inline" : ""}`} aria-label="Subscribe to Read The Room">
    <span>Read The Room</span>
    {submitted ? <div className="brand-article-subscribe-success"><strong>You’re in, {firstName}.</strong><p>The next edition will land in {email}.</p></div> : <><strong>A clearer signal, weekly.</strong><p>Strategy and media notes for people building a category.</p><form onSubmit={submit}><label>First name<input value={firstName} onChange={event => setFirstName(event.target.value)} autoComplete="given-name" required /></label><label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required /></label><button type="submit">Subscribe <ArrowUpRight size={14} /></button></form></>}
  </aside>;
}

function Contents({ activeId, items }: { activeId: string; items: TocItem[] }) {
  return <nav className="brand-article-contents" aria-label="Table of contents">
    <span>On this page</span>
    {items.map((section, index) => <a className={activeId === section.id ? "is-active" : ""} href={`#${section.id}`} key={section.id}><b>{String(index + 1).padStart(2, "0")}</b><em>{section.title}</em></a>)}
  </nav>;
}

export default function HowToStartShowArticle() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("why-most-brand-shows-fail-in-the-first-ten-episodes");
  const [progress, setProgress] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [progressDocked, setProgressDocked] = useState(false);
  const published = useMemo(() => "September 17, 2026", []);

  useEffect(() => {
    const previousTitle = document.title;
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existing?.content;
    const meta = existing ?? document.head.appendChild(document.createElement("meta"));
    meta.name = "description";
    document.title = "How to Start a Show for Your Brand | SGNL Media";
    meta.content = "Most brand shows die at episode eight. Here is how to pick a format, name it, set a cadence and build a show your brand actually owns.";
    return () => {
      document.title = previousTitle;
      if (previousDescription !== undefined) meta.content = previousDescription;
      else meta.remove();
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const body = bodyRef.current;
      if (!body) return;
      const y = window.scrollY;
      const start = body.offsetTop;
      const end = start + body.offsetHeight - window.innerHeight;
      const value = end > start ? ((y - start) / (end - start)) * 100 : 100;
      setProgress(Math.min(100, Math.max(0, value)));
      if (!window.matchMedia("(max-width: 700px)").matches || y < 72) setHeaderHidden(false);
      else if (y > lastY + 1) setHeaderHidden(true);
      else if (y < lastY - 1) setHeaderHidden(false);
      const inlineProgress = document.querySelector<HTMLElement>(".brand-reading-progress-mobile");
      setProgressDocked(Boolean(inlineProgress && inlineProgress.getBoundingClientRect().bottom <= 0));
      lastY = y;
    };
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-19% 0px -67% 0px", threshold: [0, .2, .6] });
    const headings = Array.from(bodyRef.current?.querySelectorAll<HTMLHeadingElement>("h2[id]") ?? []);
    setTocItems(headings.map(heading => ({ id: heading.id, title: heading.textContent?.trim() ?? "" })));
    headings.forEach(heading => observer.observe(heading));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen]);

  const backToTop = () => document.getElementById("brand-article-top")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return <div className="brand-article-page" id="brand-article-top">
    <div className={`brand-reading-progress ${progressDocked ? "is-mobile-docked" : ""}`} aria-label={`${Math.round(progress)}% complete`}><i style={{ width: `${progress}%` }} />{[25, 50, 75].map(marker => <b key={marker} style={{ left: `${marker}%` }} />)}<span>{Math.round(progress)}% / 5 min</span></div>
    <header className={`brand-article-header ${headerHidden ? "is-hidden" : ""} ${progressDocked ? "has-docked-progress" : ""}`}><Link href="/" className="editorial-mark">SGNL <span>Media</span></Link><nav><Link href="/">Home</Link><Link href="/read-the-room">Read the Room</Link></nav><button type="button" onClick={() => setBookingOpen(true)}>Book a call <ArrowUpRight size={14} /></button></header>

    <main>
      <section className="brand-article-hero">
        <div className="brand-article-category">Content Strategy</div>
        <div className="brand-article-title"><h1>How to Start a Show for Your Brand</h1><div className="brand-reading-progress-mobile" aria-label={`${Math.round(progress)}% complete`}><div><i style={{ width: `${progress}%` }} />{[25, 50, 75].map(marker => <b key={marker} style={{ left: `${marker}%` }} />)}</div><span>{Math.round(progress)}% complete / 5 min read</span></div><div className="brand-article-byline"><span>SGNL Media</span><span>{published}</span><span>5 min read</span></div></div>
        <figure><img src="/media/editorial-founder_7a71b679.jpg" alt="Creative strategist reviewing a wall of show concepts in a studio" /></figure>
      </section>

      <details className="brand-article-mobile-toc"><summary>On this page <ChevronDown size={17} /></summary><Contents activeId={activeId} items={tocItems} /></details>

      <div className="brand-article-shell">
        <aside className="brand-article-left-rail"><Contents activeId={activeId} items={tocItems} /></aside>

        <article className="brand-article-body"><div className="brand-article-prose" ref={bodyRef}>
          <div className="brand-article-opening">
            <p>Most brand shows die at episode eight.</p>
            <p>Not because the content was bad. Because nobody decided what the show actually was before they turned the camera on. They booked a guest, bought a microphone, called it a podcast, and ran out of road the moment scheduling got hard.</p>
            <p>A show is not content. A show is an asset you own, with a name, a premise, and a format that runs without you improvising every week. Get that part right and the episodes almost make themselves. Get it wrong and you will be negotiating with your own calendar by month two.</p>
            <p>Here is how to start one that survives.</p>
          </div>

          <section><h2 id="why-most-brand-shows-fail-in-the-first-ten-episodes">Why most brand shows fail in the first ten episodes</h2><p>Two traps kill almost all of them.</p><p>The first is the guest trap. You build a format that requires someone else to say yes. Now your publishing schedule belongs to other people's assistants. One bad month of bookings and the show has a gap, and a show with a gap is a show that quietly ended.</p><p>The second is the season trap. You plan twelve episodes, film them in two days, release them weekly, and then face the same blank page you started with, except now you are tired and the numbers were smaller than you hoped.</p><p>Both traps come from the same mistake. Treating the episode as the product instead of the format.</p></section>

          <section><h2 id="the-format-is-the-asset-not-the-episodes">The format is the asset, not the episodes</h2><p>The episodes are inventory. The format is the thing that compounds.</p><p>A format is a premise plus a structure you can run a hundred times. "Founders talk about business" is not a format. "We stop strangers on the street and ask them to guess which of two products is real" is a format. One requires a booking. The other requires a sidewalk.</p><p>Before you film anything, write your premise in one sentence. If you cannot describe the show without naming a specific guest, you do not have a format yet.</p></section>

          <section><h2 id="step-one-pick-a-premise-you-can-run-a-hundred-times">Step one: pick a premise you can run a hundred times</h2><p>Test it against three questions.</p><p>Can you make episode fifty without a guest? Can you explain it to someone in one sentence and have them understand what they would watch? Could a viewer predict the shape of the next episode while still wanting to see it?</p><p>If any answer is no, narrow the premise until they are all yes. Narrow is not a limitation. Narrow is what makes a show recognizable.</p></section>

          <section><h2 id="step-two-name-the-show-not-the-brand">Step two: name the show, not the brand</h2><p>"The [Company Name] Podcast" is not a name. It is a filing label.</p><p>A show with its own name can outgrow you, get shared by people who do not care about your company, and eventually become the reason people find you rather than a thing they discover after they already have. Read The Room does not have our company name in it. That is deliberate.</p><p>Name it for the premise. Make it searchable. Make it repeatable in conversation.</p></section>

          <div className="brand-article-mobile-subscribe"><SubscribeCard compact /></div>

          <section><h2 id="step-three-prove-the-format-before-you-build-a-set">Step three: prove the format before you build a set</h2><p>The most expensive mistake is building production infrastructure around a format nobody has tested.</p><p>Film one episode. Not a pilot with a lighting package and a set build. One episode, shot as simply as you can manage, cut to the length you intend to publish. Put it out.</p><p>You are not testing whether people love it. You are testing whether you can make it. If producing one episode was miserable, producing forty will be impossible, and no amount of production value fixes a format that fights you.</p></section>

          <section><h2 id="step-four-set-cadence-at-your-worst-week-not-your-best">Step four: set cadence at your worst week, not your best</h2><p>Pick the frequency you could still hit during your busiest month, when someone is sick and a client is on fire.</p><p>Weekly sounds ambitious. Every other week that never misses beats weekly that skips twice a quarter. Audiences forgive small. They do not forgive absent.</p><p>Write the cadence down and treat it as a commitment, not an aspiration.</p></section>

          <section><h2 id="step-five-design-for-the-clip-not-the-episode">Step five: design for the clip, not the episode</h2><p>Nobody finds your show by watching your show. They find a forty second cut of it.</p><p>So build the long-form piece knowing you will mine it. Set up moments that stand alone. Ask the question that produces a quotable answer. Leave space around the good parts so they cut clean.</p><p>This is the Waterfall Distribution Method. One pillar piece, mined for standalone moments, packaged natively for each platform, published without agonizing over timing. The show feeds the clips. The clips feed the show.</p><p>If you are editing the episode first and hunting for clips afterward, you are working backwards.</p></section>

          <section><h2 id="step-six-put-a-conversion-path-underneath-it">Step six: put a conversion path underneath it</h2><p>A show with no next step is a hobby.</p><p>Decide before launch what someone does after watching. Not a link to your homepage. One specific action tied to one specific offer. It does not have to be aggressive, and on most episodes it should barely register. But it has to exist, and it has to be the same one every time.</p></section>

          <div className="brand-article-mobile-subscribe"><SubscribeCard compact /></div>

          <section><h2 id="how-to-know-whether-it-is-working">How to know whether it is working</h2><p>Ignore view counts for the first ninety days. They will be small and they will tell you nothing.</p><p>Watch three things instead. Retention, because it tells you whether the format holds. Share rate, because it tells you whether the premise travels. And whether you published on schedule, because a show that ships is already beating most of its competition.</p><p>At ninety days you will have enough signal to decide what to cut and what to double.</p></section>

          <section><h2 id="the-part-nobody-tells-you">The part nobody tells you</h2><p>The first ten episodes are not for the audience. They are for you.</p><p>They are where you find out what the show actually is, which is never quite what you wrote down. The brands that win are the ones still publishing when that becomes clear, because a format you have run ten times teaches you more than a strategy document ever will.</p><p>Pick the premise. Name it. Ship one. Then ship it again next week.</p></section>

        </div></article>
        <aside className="brand-article-right-rail"><SubscribeCard /></aside>
      </div>

      <div className="brand-article-after">
        <section className="brand-article-cta" aria-labelledby="article-cta"><span>Build the asset</span><h2 id="article-cta">Want help building a show your brand actually owns?</h2><p>We build and run the whole thing, from format to distribution to the page that converts.</p><button type="button" onClick={() => setBookingOpen(true)}>Book a call <ArrowUpRight size={16} /></button></section>

        <section className="brand-related" aria-labelledby="related-articles"><div className="brand-related-heading"><span>Continue reading</span><h2 id="related-articles">Related articles</h2></div><div className="brand-related-grid">{["How to build a repeatable content format", "The distribution system behind a show", "Why authority compounds before reach"].map((title, index) => <article key={title}><span>0{index + 1} / Coming soon</span><strong>{title}</strong><button type="button" onClick={() => toast("Article coming soon")}>Read next <ArrowUpRight size={14} /></button></article>)}</div></section>
      </div>
    </main>

    <footer className="editorial-footer"><span>SGNL Media / Tampa, FL</span><span>© 2026</span><Link href="/read-the-room">More from the Room <ArrowUpRight size={14} /></Link></footer>

    <button type="button" className={`article-back-top ${progress > 5 ? "is-visible" : ""}`} onClick={backToTop} aria-label="Back to top"><ArrowUp size={16} /><span>Top</span></button>

    {bookingOpen && <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setBookingOpen(false)}><section className="modal-card cal-modal" role="dialog" aria-modal="true" aria-label="Book a call"><button type="button" className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X size={18} /></button><iframe src="https://cal.com/andrew-moullin-qldwj3/content-engine-strategy-call?layout=month_view&useSlotsViewOnSmallScreen=true" title="Book a content engine strategy call" /></section></div>}
  </div>;
}
