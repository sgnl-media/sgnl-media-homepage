import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Menu, Play, Plus, Radio, Sparkles, X } from "lucide-react";
import { Link } from "wouter";

const process = [
  ["01", "Diagnose", "We start with a Signal Session to find what's holding your growth back and whether we're the right team to fix it."],
  ["02", "Build", "We build your brand system: your voice, recurring formats, visual identity, and the path from attention to booked calls."],
  ["03", "Capture", "You give us 90 minutes on camera once a month. We turn that into 25 to 30 pieces made for each platform."],
  ["04", "Scale", "Every month we tie your content to pipeline, not view count. We cut what isn't working and double down on what is."],
];

const tags = ["Organic first", "Paid behind proven creative", "Tested landing pages", "Monthly capture session", "Waterfall distribution", "Brand systems", "Lead magnets"];

const recentWork = [
  { client: "Tom Park", video: "/manus-storage/A-T-1-web_32011964.mp4", tone: "tone-one" },
  { client: "Professor Lee Braver", video: "/manus-storage/A-E-4-web_71383a36.mp4", tone: "tone-three" },
  { client: "Stephanie Moullin", video: "/manus-storage/S-S-4-web_e865066d.mp4", tone: "tone-one" },
  { client: "Tom Park", video: "/manus-storage/A-T-11-web_e3852aaf.mp4", tone: "tone-two" },
  { client: "Parslee AI", video: "/manus-storage/Parlseevideo1_22-web_63963a38.mp4", tone: "tone-two" },
  { client: "Vaunt", video: "/manus-storage/June3_8566eb30.mp4", tone: "tone-one" },
  { client: "Tom Park", video: "/manus-storage/S-T-2_a0a4c032.mp4", tone: "tone-one" },
  { client: "Dr.Pandit", video: "/manus-storage/July2_5a535c6c.mp4", tone: "tone-two" },
  { client: "Andrew Moullin", video: "/manus-storage/A-P-11_52388ec7.mp4", tone: "tone-three" },
] as const;

const clientStories = [
  { video: "/manus-storage/videoplayback(1)_835177cd.mp4", label: "Tysean / Hardly Initiated", mark: "HI" },
  { video: "/manus-storage/videoplayback(2)_00861b22.mp4", label: "Client story / 02", mark: "02" },
  { video: "/manus-storage/videoplayback(3)_25619c8f.mp4", label: "Client story / 03", mark: "03" },
] as const;

const quizQuestions = [
  { title: "First off—how long have you been in your industry?", options: [
    ["I’m still pretty new to it.", "Less than two years of experience."],
    ["We’ve been around a little while.", "Two to five years operating."],
    ["We know the ropes by now.", "Six to ten years of experience."],
    ["We’ve earned our stripes.", "Eleven to twenty years in industry."],
    ["This has been our life’s work.", "More than twenty years of experience."],
  ]},
  { title: "Alright—where are you guys at right now?", detail: "When someone finds you online, what do they see?", options: [
    ["We look sharp.", "Clear message, strong website, consistent content."],
    ["The work is good, but scattered.", "Messaging and visual identity lack consistency."],
    ["We’ve posted before, just not consistently.", "Content exists, but no repeatable system."],
    ["We look quieter than the business is.", "Outdated website, low activity, weak visibility."],
    ["Honestly, we barely show up online.", "No clear digital presence or content engine."],
  ]},
  { title: "If you could wave a wand and fix one thing, what would it be?", options: [
    ["People need to get us faster.", "Positioning and differentiation need more clarity."],
    ["Our content needs more pull.", "Creative formats lack relevance or consistency."],
    ["We need to look more credible.", "Trust signals and proof need strengthening."],
    ["We need more of the right eyes.", "Reach and distribution remain too limited."],
    ["We need attention to become revenue.", "Conversion journey needs better structure."],
  ]},
  { title: "Be honest—how do you think people see you online right now?", options: [
    ["We’re one of the stronger names.", "High perceived authority within your market."],
    ["People trust us, they just forget us.", "Credibility exists, but differentiation is weak."],
    ["We’re good, but hard to explain.", "Value proposition lacks immediate clarity."],
    ["The online version undersells the business.", "Digital perception trails real-world reputation."],
    ["Honestly, I have no idea.", "Market perception is not currently measured."],
  ]},
  { title: "What kind of business are you running?", options: [
    ["We sell expertise and outcomes.", "Founder-led service or professional firm."],
    ["We’re building something with technology.", "Software, technology, or app company."],
    ["We make and sell a product.", "Consumer product or ecommerce brand."],
    ["We help people make meaningful changes.", "Healthcare, education, coaching, or expert business."],
    ["We don’t fit neatly in a box.", "Other business model or category."],
  ]},
  { title: "Roughly, where is the business at revenue-wise?", options: [
    ["We’re still getting the wheels turning.", "Pre-revenue or under $250K annually."],
    ["We’re starting to build real momentum.", "Between $250K and $1M annually."],
    ["We have a real business here.", "Between $1M and $5M annually."],
    ["We’re growing and need infrastructure.", "Between $5M and $20M annually."],
    ["We’re ready to play a bigger game.", "More than $20M in annual revenue."],
  ]},
  { title: "When someone is interested, what happens next?", detail: "If they see a post, hear about you, or land on your site—how do they actually become a customer?", options: [
    ["Our sales team takes it from there.", "Dedicated team qualifies and closes opportunities."],
    ["They book a call through us.", "Website routes prospects into a sales conversation."],
    ["They can take action right away.", "Landing page supports direct buying or applying."],
    ["Usually, it happens through relationships.", "Referrals, DMs, and word-of-mouth drive sales."],
    ["Honestly, it is not very clear.", "No defined path from attention to sale."],
  ]},
  { title: "Where do your best customers actually spend time online?", options: [
    ["They are on LinkedIn.", "Professional discovery and trust drive decisions."],
    ["They live on Instagram.", "Visual storytelling builds attention and affinity."],
    ["They are already on TikTok.", "Discovery-led culture drives customer attention."],
    ["They learn through YouTube.", "Depth and education build buyer confidence."],
    ["They start with a Google search.", "Search intent creates higher-conversion discovery."],
    ["It happens in real-world circles.", "Communities, events, and referrals drive demand."],
    ["We are not totally sure yet.", "Buyer media habits need customer research."],
  ]},
] as const;

const quizFlow = ["intro", "question-0", "interlude-1", "question-1", "question-2", "question-3", "question-4", "interlude-2", "question-5", "question-6", "interlude-3", "question-7", "capture", "loading", "result"] as const;
type QuizCategory = "Brand Foundation" | "Market Perception" | "Authority & Story" | "Conversion Path" | "Distribution Fit";
const categoryCopy: Record<QuizCategory, { strong: string; leak: string }> = {
  "Brand Foundation": { strong: "Your buyer-facing foundation is clear enough to support repeatable media.", leak: "The business is stronger than the way it currently presents itself online." },
  "Market Perception": { strong: "You have meaningful trust and authority to build from.", leak: "Buyers are not getting a distinct, memorable read on why you are the right choice." },
  "Authority & Story": { strong: "There is real expertise here, with enough proof to carry a stronger point of view.", leak: "Your expertise is not yet packaged into stories and formats people can recognize." },
  "Conversion Path": { strong: "Attention has a credible route into a sales conversation or purchase.", leak: "Interest is arriving without one obvious, reliable next step." },
  "Distribution Fit": { strong: "You have a useful read on where your best buyers already pay attention.", leak: "Distribution is spreading effort before buyer media habits are fully understood." },
};

function GrowthCard({ client, multiple, label, before, after }: { client: string; multiple: string; label: string; before: string; after: string }) {
  return <article className="case-card growth-card">
    <div className="chip-row"><span className="chip">{label}</span><span className="chip chip-lime">{multiple}</span></div>
    <div className="growth-number"><span>{before}</span><b>→</b><strong>{after}</strong></div>
    <div className="bar-stack">
      <div className="bar-label"><span>Before</span><b>{before}</b></div><div className="bar"><i className="bar-before" /></div>
      <div className="bar-label"><span>Now</span><b>{after}</b></div><div className="bar"><i className="bar-after" /></div>
    </div>
    <div className="card-footer"><span>{client === "Hardly Initiated" ? "We built the brand, the look and the edit style." : "Research first. Format tested. Attention into revenue."}</span><b>{client === "Hardly Initiated" ? "Still going viral daily" : "6 months with SGNL"}</b></div>
  </article>;
}

function StoryCard({ video, label, mark }: { video: string; label: string; mark: string }) {
  const [playing, setPlaying] = useState(false);
  return <article className="story-card">
    <div className="story-layout story-layout--single">
      <button className={`story-video ${playing ? "is-playing" : ""}`} type="button" onClick={() => setPlaying(true)} aria-label={`Play ${label}`}>
        {playing ? <video src={video} title={label} controls autoPlay playsInline /> : <><video className="story-video-poster" src={video} muted autoPlay loop playsInline preload="metadata" /><span className="story-video-mark">{mark}</span><span className="play-button"><Play size={24} fill="currentColor" /></span><span className="story-video-caption">{label}</span></>}
      </button>
    </div>
  </article>;
}

function ReelCard({ index, tone, video, client }: { index: string; tone: string; video: string; client: string }) {
  return <article className="reel-card"><div className={`reel-visual ${tone}`}><video className="reel-video" src={video} muted autoPlay loop playsInline preload="metadata" /><span className="reel-code">{index}</span><span className="reel-vertical">SGNL / MEDIA</span><span className="reel-scan" /><span className="reel-orb" /><span className="reel-play"><Play size={13} fill="currentColor" /></span></div><div className="reel-meta"><span>{client}</span><ArrowUpRight size={15} /></div></article>;
}

function SgnlScore({ onClose, onBook }: { onClose: () => void; onBook: () => void }) {
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(8).fill(-1));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const flow = quizFlow[stage];
  const questionIndex = flow.startsWith("question-") ? Number(flow.replace("question-", "")) : -1;
  const answered = answers.filter(answer => answer >= 0).length;

  const result = useMemo(() => {
    const q = answers;
    const foundation = Math.max(2, [20, 15, 11, 6, 2][q[1]] - (q[2] === 0 ? 4 : 0));
    const perception = [20, 14, 10, 6, 4][q[3]];
    const authority = Math.max(4, [12, 14, 16, 18, 20][q[0]] - (q[2] === 2 ? 5 : 0) - (q[1] >= 3 ? 3 : 0));
    const conversion = [18, 17, 20, 10, 3][q[6]];
    const distribution = q[2] === 3 ? Math.min([20, 20, 20, 20, 20, 15, 5][q[7]], 10) : [20, 20, 20, 20, 20, 15, 5][q[7]];
    const scores: Record<QuizCategory, number> = {
      "Brand Foundation": foundation,
      "Market Perception": perception,
      "Authority & Story": authority,
      "Conversion Path": conversion,
      "Distribution Fit": distribution,
    };
    const ranked = (Object.entries(scores) as [QuizCategory, number][]).sort((a, b) => b[1] - a[1]);
    const score = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0));
    const strengths = ranked.slice(0, 2).map(([category]) => categoryCopy[category].strong).join(" ");
    const leaks = ranked.slice(-2).reverse().map(([category]) => categoryCopy[category].leak).join(" ");
    const priority = ranked[ranked.length - 1][0];
    const recommendations = [
      "Clarify the message and buyer-facing story",
      "Build content formats around real expertise and proof",
      "Focus distribution on the highest-leverage platform",
      "Build or improve the route from attention to conversion",
    ];
    if (priority === "Conversion Path") recommendations.unshift(recommendations.pop()!);
    if (priority === "Distribution Fit") recommendations.unshift(recommendations.splice(2, 1)[0]);
    return { scores, score, strengths, leaks, recommendations };
  }, [answers]);

  useEffect(() => {
    if (flow !== "loading") return;
    const timer = window.setTimeout(() => setStage(current => current + 1), 1450);
    return () => window.clearTimeout(timer);
  }, [flow]);

  const chooseAnswer = (answer: number) => {
    const next = [...answers];
    next[questionIndex] = answer;
    setAnswers(next);
    setStage(current => current + 1);
  };

  const downloadResult = () => {
    const text = `THE SGNL SCORE\n\n${name}\n${email}\n\nScore: ${result.score} / 100\n\nWhat You’re Doing Well\n${result.strengths}\n\nWhere Attention Is Leaking\n${result.leaks}\n\nWhat We’d Do First\n${result.recommendations.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
    const safe = text.replace(/[()\\]/g, "\\$&").split("\n").map(line => `(${line}) Tj 0 -14 Td`).join("\n");
    const pdf = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n5 0 obj<</Length ${safe.length + 35}>>stream\nBT /F1 11 Tf 54 740 Td ${safe} ET\nendstream endobj\ntrailer<</Root 1 0 R>>\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-sgnl-score.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareResult = async () => {
    const text = `My SGNL Score is ${result.score}/100. ${result.leaks}`;
    if (navigator.share) await navigator.share({ title: "My SGNL Score", text, url: window.location.href });
    else { await navigator.clipboard?.writeText(`${text} ${window.location.href}`); window.alert("Your SGNL Score was copied to the clipboard."); }
  };

  const interludes: Record<string, { eyebrow: string; title: string; body: string; button: string }> = {
    "interlude-1": { eyebrow: "Signal note / 01", title: "Nearly two-thirds of marketers post less than once a day.", body: "The point is not more noise; it is enough strategic signal for the right people to notice, understand, and remember you.", button: "Shall we continue?" },
    "interlude-2": { eyebrow: "Signal note / 02", title: "A good brand gets attention. A great one knows what to do with it.", body: "The best systems turn attention into a next step.", button: "Keep going" },
    "interlude-3": { eyebrow: "Signal note / 03", title: "One more left.", body: "You do not need to be everywhere—you need to show up where the right people already pay attention.", button: "Finish the assessment" },
  };

  return <div className="modal-backdrop quiz-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="sgnl-score" role="dialog" aria-modal="true" aria-label="The SGNL Score">
      <div className="sgnl-score-topbar">
        <span className="wordmark">SGNL <i>Score</i></span>
        <div className="sgnl-score-top-actions">{stage > 0 && flow !== "result" && flow !== "loading" && <button onClick={() => setStage(current => Math.max(0, current - 1))}><ChevronLeft size={15} /> Back</button>}<button onClick={onClose} aria-label="Close SGNL Score"><X size={18} /></button></div>
      </div>

      <div className="sgnl-score-progress"><i style={{ width: `${(answered / 8) * 100}%` }} />{Array.from({ length: 7 }, (_, index) => <b key={index} style={{ left: `${((index + 1) / 8) * 100}%` }} />)}<span>{flow === "result" ? "Complete" : `${answered} / 8`}</span></div>

      <div className="sgnl-score-screen" key={flow}>
        {flow === "intro" && <div className="sgnl-score-intro"><span>The SGNL Score</span><h2>Eight quick questions.<br /><em>One clear signal.</em></h2><p>A clear read on what is working, what is not, and what we would do first.</p><button className="button lime large" onClick={() => setStage(1)}>Start the assessment <ArrowUpRight size={17} /></button><small>About 3 minutes. No generic agency audit.</small></div>}

        {questionIndex >= 0 && <div className="sgnl-score-question"><div className="sgnl-score-question-head"><span>Question {String(questionIndex + 1).padStart(2, "0")} / 08</span><h2>{quizQuestions[questionIndex].title}</h2>{"detail" in quizQuestions[questionIndex] && <p>{quizQuestions[questionIndex].detail}</p>}</div><div className="sgnl-answer-grid">{quizQuestions[questionIndex].options.map(([subjective, objective], index) => <button key={subjective} onClick={() => chooseAnswer(index)}><span><strong>{subjective}</strong><small>{objective}</small></span><ArrowUpRight size={16} /></button>)}</div></div>}

        {flow.startsWith("interlude-") && <div className="sgnl-score-interlude"><span>{interludes[flow].eyebrow}</span><h2>{interludes[flow].title}</h2><p>{interludes[flow].body}</p><button className="button lime large" onClick={() => setStage(current => current + 1)}>{interludes[flow].button} <ArrowUpRight size={17} /></button></div>}

        {flow === "capture" && <form className="sgnl-score-capture" onSubmit={event => { event.preventDefault(); if (!name.trim() || !email.trim()) return; window.localStorage.setItem("sgnl-score-lead", JSON.stringify({ name: name.trim(), email: email.trim(), answers })); setStage(current => current + 1); }}><span>Very interesting.</span><h2>I think you will want to know what we would do in your situation.</h2><p>Who are we speaking to, and where should we send your results?</p><div><label>Name<input value={name} onChange={event => setName(event.target.value)} autoComplete="name" required placeholder="Your name" /></label><label>Email<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required placeholder="you@company.com" /></label></div><button className="button lime large" type="submit">Show me my SGNL Score <ArrowUpRight size={17} /></button><small>We’ll send your score, your strongest opportunities, and a practical next step. No generic agency spam.</small></form>}

        {flow === "loading" && <div className="sgnl-score-loading"><Radio size={33} /><span>Reading the signal…</span><p>Mapping your brand, attention, and conversion system.</p><i /></div>}

        {flow === "result" && <div className="sgnl-score-result"><div className="sgnl-score-result-head"><span>Your SGNL Score</span><strong>{result.score}<small>/ 100</small></strong><p>{quizQuestions[4].options[answers[4]]?.[1]} {quizQuestions[5].options[answers[5]]?.[1]}</p></div><div className="sgnl-score-bars">{Object.entries(result.scores).map(([category, score]) => <div key={category}><span>{category}</span><i><b style={{ width: `${score * 5}%` }} /></i><em>{score * 5}</em></div>)}</div><div className="sgnl-score-diagnosis"><section><span>01 / What you’re doing well</span><h3>There is a signal to build on.</h3><p>{result.strengths}</p></section><section><span>02 / Where attention is leaking</span><h3>The system loses clarity here.</h3><p>{result.leaks}</p></section><section><span>03 / What we’d do first</span><ol>{result.recommendations.map(item => <li key={item}>{item}</li>)}</ol></section><section className="sgnl-score-reading"><span>Recommended reading</span><Link href="/article">Which Platform Should I Be Focusing On? <ArrowUpRight size={15} /></Link></section></div><div className="sgnl-score-result-actions"><button className="button lime large" onClick={onBook}>Talk to SGNL about my score <ArrowUpRight size={17} /></button><button onClick={downloadResult}>Download PDF</button><button onClick={shareResult}>Share result</button></div></div>}
      </div>
    </section>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false); const [bookingOpen, setBookingOpen] = useState(false); const [quizOpen, setQuizOpen] = useState(false); const [announcement, setAnnouncement] = useState(true);
  useEffect(() => { document.body.style.overflow = menuOpen || bookingOpen || quizOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen, bookingOpen, quizOpen]);
  const openBooking = () => setBookingOpen(true); const startQuiz = () => setQuizOpen(true);
  const closeMenu = () => setMenuOpen(false);
  return <div className="site-shell" id="top">
    {announcement && <div className="announcement-bar"><button onClick={() => startQuiz()}>Free tool: find where attention is leaking in 3 minutes <span>Take the SGNL Score ↗</span></button><button aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={14} /></button></div>}
      <header className="site-header"><a href="#top" className="wordmark">SGNL <span>Media</span></a><nav><a href="#top">Home</a><i>/</i><Link href="/shows">Shows</Link><i>/</i><a href="#services">Services</a></nav><div className="header-actions"><button className="header-cta" onClick={openBooking}>Book a call <ArrowUpRight size={15} /></button><button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button></div></header>
    {menuOpen && <div className="mobile-menu"><div className="mobile-menu-top"><span className="eyebrow">Menu</span><button onClick={closeMenu}><X size={19} /></button></div><div className="mobile-links"><a href="#top" onClick={closeMenu}>Home <ArrowUpRight size={18} /></a><Link href="/shows" onClick={closeMenu}>Shows <ArrowUpRight size={18} /></Link><a href="#services" onClick={closeMenu}>Services <ArrowUpRight size={18} /></a><button onClick={() => { closeMenu(); startQuiz(); }}>Take the quiz <ArrowUpRight size={18} /></button></div><button className="mobile-book" onClick={() => { closeMenu(); openBooking(); }}>Book a call <ArrowUpRight size={16} /></button></div>}
    <main>
      <section className="hero section-rule"><div className="hero-glow" aria-hidden="true" /><div className="hero-split"><div className="hero-copy"><h1 className="hero-reveal hero-reveal--headline">We build the media teams behind category-leading brands and experts.</h1><p className="hero-subline hero-reveal hero-reveal--subline">Positioning, production, distribution, and conversion infrastructure—built to turn real expertise into authority, demand, and pipeline.</p><div className="hero-actions hero-reveal hero-reveal--actions"><button className="button lime" onClick={() => startQuiz()}>Take the quiz <ArrowUpRight size={16} /></button><button className="button ghost" onClick={openBooking}>Book a call <ArrowUpRight size={16} /></button></div><div className="hero-mobile-reels hero-reveal hero-reveal--reel"><div className="hero-mobile-reels-track">{[...recentWork, ...recentWork].map((item, index) => <div className="hero-mobile-reel" key={`mobile-${item.client}-${index}`}><video src={item.video} muted autoPlay loop playsInline preload="metadata" /><span>{item.client}</span></div>)}</div></div></div><div className="hero-reel hero-reveal hero-reveal--reel"><div className="hero-reel-frame"><video src="/manus-storage/June3_8566eb30.mp4" muted autoPlay loop playsInline /><div className="hero-reel-overlay" /><span className="hero-reel-kicker">CLIENT WORK / 01—02</span><span className="hero-reel-label">SGNL / MEDIA</span><span className="hero-reel-scan" /><span className="hero-reel-play"><Play size={16} fill="currentColor" /></span></div><div className="hero-reel-meta"><span>Recent work</span><span>June 3 — July 2 <ArrowUpRight size={14} /></span></div></div></div></section>
      <section className="reels section-rule" id="shows"><div className="section-head"><div><span className="eyebrow">Recent work</span><h2>Content that<br /><em>finds the right audience.</em></h2></div><span className="section-count">01—09</span></div><div className="reel-track">{[...recentWork, ...recentWork].map((item, index) => <ReelCard key={`${item.client}-${index}`} index={String((index % recentWork.length) + 1).padStart(2, "0")} tone={item.tone} video={item.video} client={item.client} />)}</div></section>
      <section className="manifesto section-rule"><div className="manifesto-label"><span className="eyebrow">What we believe</span><Sparkles size={17} /></div><h2>Great brands and experts don't need another content vendor. They need a marketing team that knows what works and can prove it.</h2></section>
      <section className="process section-rule" id="services"><div className="section-head"><div><span className="eyebrow">Four steps</span><h2>How we build<br /><em>your marketing team.</em></h2></div><div className="signal-bars"><i /><i /><i /><i /><i /></div></div><div className="process-list">{process.map(([num, title, body]) => <article className="process-step" key={num}><span className="process-number">{num}</span><h3>{title}</h3><p>{body}</p><span className="process-plus"><Plus size={17} /></span></article>)}</div><button className="button outline" onClick={openBooking}>Book a Signal Session <ArrowUpRight size={16} /></button></section>
      <section className="results section-rule" id="results"><div className="results-intro"><h2>Proof over<br /><em>promises.</em></h2><p>Real accounts, real numbers. Here's what happens when a brand finally gets a system behind its content.</p></div><div className="testimonial-marquee"><div className="testimonial-track">{[...clientStories, ...clientStories].map((story, index) => <div className="testimonial-slide" key={`${story.mark}-${index}`} aria-hidden={index >= clientStories.length}><StoryCard {...story} /></div>)}</div></div></section>
      <section className="closing section-rule"><span className="closing-spark"><Sparkles size={27} /></span><h2>We'd love to partner with you <em>& your team.</em></h2><button className="button lime large" onClick={openBooking}>Book a call <ArrowUpRight size={17} /></button></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a href="#top" className="wordmark">SGNL <span>Media</span></a><p>We build marketing teams behind brands and experts.</p></div><div className="footer-links"><div><b>Company</b><a href="#top">Home</a><a href="#services">Services</a><a href="#shows">Shows</a></div><div><b>Shows</b><a href="#shows">Read the room</a><a href="#shows">What is marketing?</a><a href="#shows">SGNL CEO</a></div><div><b>Start</b><button onClick={() => startQuiz()}>Take the quiz</button><button onClick={openBooking}>Book a call</button></div></div></div><div className="footer-bottom"><span>© 2026 SGNL Media. Tampa, FL.</span><span>Privacy&nbsp;&nbsp;/&nbsp;&nbsp; Terms</span></div></footer>
    {bookingOpen && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setBookingOpen(false)}><section className="modal-card cal-modal" role="dialog" aria-modal="true" aria-label="Book a call"><button className="modal-close" onClick={() => setBookingOpen(false)}><X size={18} /></button><iframe src="https://cal.com/andrew-moullin-qldwj3/content-engine-strategy-call?layout=month_view&useSlotsViewOnSmallScreen=true" title="Book a content engine strategy call" /></section></div>}
    {quizOpen && <SgnlScore onClose={() => setQuizOpen(false)} onBook={() => { setQuizOpen(false); setBookingOpen(true); }} />}
  </div>;
}
