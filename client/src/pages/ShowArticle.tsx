import { ArrowUp, ArrowUpRight, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const data = {
  "/shows/read-the-room": {
    style: "room",
    kicker: "Read the room / Issue 01",
    title: "The market is telling you what it wants. Are you listening?",
    subhead: "A weekly field note on language, timing, and the signals that move a category before the numbers catch up.",
    sections: [
      ["The signal", "The strongest companies do not wait for a market to explain itself. They listen for the phrase a customer repeats, the workaround they have normalized, and the objection that keeps appearing in the room."],
      ["The read", "This week, attention is not scarce. Confidence is. The brands gaining ground are the ones making a precise promise and proving it in public."],
      ["The move", "Name the tension your buyer is already carrying. Then build the simplest useful response around it."],
    ],
  },
  "/shows/what-is-marketing": {
    style: "lecture",
    kicker: "What is marketing? / Lecture 04",
    title: "Marketing is a system for making belief easier.",
    subhead: "A lecture series on positioning, distribution, and the operating choices that turn attention into demand.",
    sections: [
      ["The premise", "Marketing is not the decoration around a business. It is the system that makes the business legible to the people it is built to serve."],
      ["The distinction", "Promotion asks for attention. Strategy earns a place in memory. The difference is a point of view that survives contact with the market."],
      ["The practice", "Find the smallest repeatable act that makes your expertise more obvious. Then make it often enough to become evidence."],
    ],
  },
  "/shows/sgnl-ceo": {
    style: "ceo",
    kicker: "SGNL CEO / Conversation 07",
    title: "The founder's real job is to make the next decision clearer.",
    subhead: "Long-form conversations with the people building durable companies, systems, and categories.",
    sections: [
      ["The question", "What changes when a founder stops being the source of every answer and starts designing the conditions for better answers?"],
      ["The pattern", "The best operators are not louder than the market. They are closer to the work. Their advantage is a higher resolution view of what is actually happening."],
      ["The takeaway", "Authority is not a performance. It is the residue of making sound decisions in public, over time."],
    ],
  },
} as const;

export default function ShowArticle() {
  const [location] = useLocation();
  const article = data[location as keyof typeof data] ?? data["/shows/read-the-room"];
  const [activeSection, setActiveSection] = useState("1");
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

      const inlineProgress = document.querySelector<HTMLElement>(".show-reading-progress-mobile");
      setProgressDocked(Boolean(inlineProgress && inlineProgress.getBoundingClientRect().bottom <= 0));
      lastY = y;
    };

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id.replace("show-section-", ""));
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0.1, 0.4, 0.8] });

    document.querySelectorAll(".show-article-body section[id^='show-section-']").forEach(section => observer.observe(section));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [location]);

  const backToTop = () => document.getElementById("show-article-top")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return <main className={`show-article show-article--${article.style}`} id="show-article-top">
    <div className={`show-reading-progress-track ${progressDocked ? "is-mobile-docked" : ""}`}>
      <div className="show-reading-progress" style={{ width: `${progress}%` }} />
      {[25, 50, 75].map(marker => <i key={marker} style={{ left: `${marker}%` }} />)}
      <span className="show-reading-progress-meta">{Math.round(progress)}% complete <b>·</b> 8 min read</span>
    </div>

    <header className={`show-article-header ${headerHidden ? "is-hidden" : ""} ${progressDocked ? "has-docked-progress" : ""}`}>
      <a href="/shows" className="editorial-mark">SGNL <span>Media</span></a>
      <span>{article.kicker}</span>
      <a href="/shows">All shows <ArrowUpRight size={14} /></a>
    </header>

    <div className="show-article-top">
      <span className="show-article-kicker">{article.kicker}</span>
      <h1>{article.title}</h1>
      <div className="show-reading-progress-mobile" aria-label={`${Math.round(progress)}% complete`}>
        <div><i style={{ width: `${progress}%` }} />{[25, 50, 75].map(marker => <b key={marker} style={{ left: `${marker}%` }} />)}</div>
        <span>{Math.round(progress)}% complete / 8 min read</span>
      </div>
      <p>{article.subhead}</p>
      <div className="show-article-meta">SGNL Media <span>·</span> September 2026 <span>·</span> 8 min read</div>
    </div>

    <div className="show-article-rule" />

    <details className="show-article-mobile-index">
      <summary>On this page <ChevronDown size={16} /></summary>
      {article.sections.map(([title], index) => <a className={activeSection === String(index + 1) ? "is-active" : ""} href={`#show-section-${index + 1}`} key={title}><b>0{index + 1}</b>{title}</a>)}
    </details>

    <div className="show-article-layout">
      <aside className="show-article-index">
        <span>FIELD NOTE <em>8 MIN READ</em></span>
        {article.sections.map(([title], index) => <a className={activeSection === String(index + 1) ? "is-active" : ""} href={`#show-section-${index + 1}`} key={title}><b>0{index + 1}</b>{title}<small>{Math.round((index / article.sections.length) * 100)}%</small></a>)}
        <small>Part of the SGNL editorial system: point of view, evidence, and an operating rule.</small>
      </aside>

      <article className="show-article-body">
        {article.sections.map(([title, body], index) => <section id={`show-section-${index + 1}`} key={title}>
          <span>0{index + 1}</span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
            {index === 0 && <figure className="show-cinematic-photo"><img src="/manus-storage/editorial-founder_7a71b679.jpg" alt="Founder studying a wall of editorial images in a studio" /><figcaption><span>FIELD NOTE / 01</span> Strategy starts in the room before the room is ready.</figcaption></figure>}
            {index === 1 && <><div className="show-systems-placeholder"><div className="systems-placeholder-head"><span>PROPRIETARY SYSTEM / SGNL—04</span><span>DIAGRAM PLACEHOLDER</span></div><div className="placeholder-flow"><i>POSITIONING</i><b>→</b><i>PRODUCTION</i><b>→</b><i>DISTRIBUTION</i><b>→</b><i>CONVERSION</i></div><small>Replace with the final show-specific systems diagram.</small></div><div className="show-article-callout"><strong>The memo</strong><span>Make the next good decision obvious.</span></div></>}
          </div>
        </section>)}
        <div className="show-article-end"><span>End of dispatch</span><ArrowUpRight size={17} /></div>
      </article>
    </div>

    <button className={`article-back-top ${progress > 8 ? "is-visible" : ""}`} type="button" onClick={backToTop} aria-label="Back to top"><ArrowUp size={16} /><span>Top</span></button>
  </main>;
}
