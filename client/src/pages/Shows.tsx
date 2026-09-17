import { ArrowUpRight } from "lucide-react";

const shows = [
  { href: "/shows/read-the-room", number: "01", title: "Read the room", type: "Weekly newsletter", description: "A sharp read on the language, signals, and decisions shaping the next category." },
  { href: "/shows/what-is-marketing", number: "02", title: "What is marketing?", type: "Lecture series", description: "A field guide to the operating principles behind memorable, measurable growth." },
  { href: "/shows/sgnl-ceo", number: "03", title: "SGNL CEO", type: "Interview series", description: "Conversations with founders who built the system before they built the story." },
];

export default function Shows() {
  return <main className="shows-hub"><header className="shows-header"><a href="/" className="editorial-mark">SGNL <span>Media</span></a><span>SHOWS / EDITORIAL INDEX</span><a href="/" className="shows-home">Back to home <ArrowUpRight size={15} /></a></header><section className="shows-intro"><span className="shows-kicker">Independent media by SGNL</span><h1>Ideas worth<br /><em>staying with.</em></h1><p>Three editorial formats for the people building the next category.</p></section><section className="shows-list">{shows.map(show => <a className={`show-index show-index--${show.number}`} href={show.href} key={show.href}><span className="show-index-number">{show.number}</span><div><span className="show-index-type">{show.type}</span><h2>{show.title}</h2><p>{show.description}</p></div><ArrowUpRight className="show-index-arrow" size={22} /></a>)}</section><footer className="shows-footer"><span>SGNL Media / Tampa, FL</span><span>© 2026</span></footer></main>;
}
