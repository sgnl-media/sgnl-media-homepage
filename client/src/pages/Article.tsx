import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const sections = ["The thesis", "The system", "The evidence", "The operating rule"];

export default function Article() {
  const [progress, setProgress] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [progressDocked, setProgressDocked] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0);
      if (!window.matchMedia("(max-width: 700px)").matches || y < 72) setHeaderHidden(false);
      else if (y > lastY + 1) setHeaderHidden(true);
      else if (y < lastY - 1) setHeaderHidden(false);
      const inlineProgress = document.querySelector<HTMLElement>(".editorial-reading-progress-mobile");
      setProgressDocked(Boolean(inlineProgress && inlineProgress.getBoundingClientRect().bottom <= 0));
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const backToTop = () => document.getElementById("editorial-article-top")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return <main className="editorial-page" id="editorial-article-top">
    <div className={`editorial-reading-progress ${progressDocked ? "is-mobile-docked" : ""}`}><i style={{ width: `${progress}%` }} /><span>{Math.round(progress)}% / 12 min</span></div>
    <header className={`editorial-header ${headerHidden ? "is-hidden" : ""} ${progressDocked ? "has-docked-progress" : ""}`}><a href="/" className="editorial-mark">SGNL <span>Media</span></a><span className="editorial-issue">FIELD NOTE / 01—2026</span><a className="editorial-back" href="/">Back to SGNL <ArrowUpRight size={15} /></a></header>
    <div className="editorial-grid editorial-hero-grid">
      <div className="editorial-kicker">Strategy memo <span>·</span> Independent business magazine</div>
      <div className="editorial-hero-copy"><h1>We build the media systems behind category-leading brands and experts.</h1><div className="editorial-reading-progress-mobile"><div><i style={{ width: `${progress}%` }} /></div><span>{Math.round(progress)}% complete / 12 min read</span></div><p>Positioning, production, distribution, and conversion infrastructure—built to turn real expertise into authority, demand, and pipeline.</p><div className="editorial-byline"><span>By SGNL Media</span><span>12 min read</span><span>September 2026</span></div></div>
      <figure className="editorial-hero-image"><img src="/manus-storage/editorial-founder_7a71b679.jpg" alt="Founder studying a wall of editorial images and notes in a studio" /><figcaption><span>01</span> The work begins before the camera turns on.</figcaption></figure>
    </div>
    <div className="editorial-rule" />
    <div className="editorial-layout">
      <aside className="editorial-sidebar"><div className="sticky-index"><span className="editorial-label">On this page</span>{sections.map((section, index) => <a href={`#section-${index + 1}`} key={section}><span>0{index + 1}</span>{section}</a>)}<div className="sidebar-note">A field note on building the operating system behind attention.</div></div></aside>
      <article className="editorial-reading">
        <section id="section-1" className="article-section"><p className="article-dek">The thesis</p><h2>Content is not the asset. The system is.</h2><p>Most companies treat media as a sequence of deliverables. A video gets made. A post gets published. A campaign gets reported. The work is measured one piece at a time, and the business is left to hope the pieces add up.</p><p>That is the wrong unit of analysis. The strategic asset is the system that turns expertise into a repeatable signal: a point of view that can be recognized, a format that can be produced without heroics, a distribution path that compounds, and a conversion layer that gives attention somewhere to go.</p><div className="evidence-callout"><span className="evidence-number">01</span><div><strong>The operating question</strong><p>Can the company produce the next 25 useful pieces without starting from zero?</p></div></div></section>
        <section id="section-2" className="article-section"><p className="article-dek">The system</p><h2>Four layers. One signal.</h2><p>A media system is not a content calendar. It is a set of connected decisions that make good work easier to repeat and easier to recognize.</p><div className="systems-diagram" aria-label="SGNL media systems diagram"><div className="diagram-axis"><span>INPUT</span><i /><span>OUTPUT</span></div><div className="diagram-node diagram-node--one"><b>01</b><strong>Positioning</strong><small>What do we believe?</small></div><div className="diagram-node diagram-node--two"><b>02</b><strong>Production</strong><small>How do we make it?</small></div><div className="diagram-node diagram-node--three"><b>03</b><strong>Distribution</strong><small>Where does it travel?</small></div><div className="diagram-node diagram-node--four"><b>04</b><strong>Conversion</strong><small>What happens next?</small></div><div className="diagram-loop">↻</div></div><p>Each layer should make the next one more effective. Positioning sharpens production. Production creates a library for distribution. Distribution surfaces the language that converts. Conversion data feeds the next positioning decision.</p></section>
        <section id="section-3" className="article-section"><p className="article-dek">The evidence</p><h2>Proof is a production advantage.</h2><p>When a brand can show its thinking in public, every sales conversation starts further downstream. The buyer has already seen the standard of thought, the taste of execution, and the shape of the outcome.</p><div className="evidence-grid"><div className="evidence-stat"><strong>10K <i>→</i> 100K</strong><span>Instagram followers<br />for Hardly Initiated</span></div><div className="evidence-stat evidence-stat--orange"><strong>11.3M</strong><span>views from one tested<br />Vaunt format</span></div><div className="evidence-quote">“The strongest content does not perform because it is content. It performs because it makes the company easier to understand.”</div></div></section>
        <section id="section-4" className="article-section article-section--last"><p className="article-dek">The operating rule</p><h2>Make the next good decision obvious.</h2><p>Founder-level authority is not volume. It is consistency under pressure. The job of the system is to preserve the founder's judgment while removing the friction between an insight and its useful expression.</p><div className="rule-line"><span>SGNL / FIELD NOTE</span><span>Build the system behind the signal.</span><ArrowUpRight size={17} /></div></section>
      </article>
    </div>
    <footer className="editorial-footer"><span>SGNL Media / Tampa, FL</span><span>© 2026</span><a href="/">Return to home <ArrowUpRight size={14} /></a></footer>
    <button className={`article-back-top ${progress > 8 ? "is-visible" : ""}`} type="button" onClick={backToTop} aria-label="Back to top"><ArrowUp size={16} /><span>Top</span></button>
  </main>;
}
