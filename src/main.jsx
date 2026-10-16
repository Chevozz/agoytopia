import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleAlert, Coins, Copy, Gauge, LogIn, Menu, MessageCircle, Mic, Shuffle, ShieldCheck, Sparkles, Swords, TreePine, X, ClipboardList } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { serverConfig, tutorialSteps, features, rules } from './data/serverConfig';
import './styles.css';

const featureIcons = { Gauge, Mic, ClipboardList, Swords, Shuffle, LogIn, TreePine, ShieldCheck, Coins };

function CopyIpButton({ label = 'Copy IP' }) {
  const [state, setState] = useState('idle');
  async function copy() {
    try { await navigator.clipboard.writeText(serverConfig.ip); setState('success'); }
    catch { setState('error'); }
    setTimeout(() => setState('idle'), 2400);
  }
  const Icon = state === 'success' ? Check : state === 'error' ? CircleAlert : Copy;
  return <button className="button button-gold" onClick={copy} aria-label={`${label}: ${serverConfig.ip}`}>
    <Icon size={15} aria-hidden="true" />
    {state === 'success' ? 'IP berhasil disalin!' : state === 'error' ? 'Salin manual: IP terlihat di atas' : label}
  </button>;
}

function Logo() {
  return <a className="logo" href="#top">
    <img src={serverConfig.icon} alt="Ikon server Agoytopia"/>
    <span>Agoytopia<small>ADVENTURE AWAITS</small></span>
  </a>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="navbar"><div className="nav-inner"><Logo/><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Buka menu navigasi">{open ? <X size={27}/> : <Menu size={27}/>}</button><nav className={open ? 'nav-links open' : 'nav-links'}>{[['top','Home'],['join','Cara Bergabung'],['features','Fitur Server'],['rules','Rules']].map(([href, text]) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>{text}</a>)}<CopyIpButton label="Copy IP"/></nav></div></header>;
}

function Hero() { return <section className="hero" id="top"><div className="hero-sun"/><div className="hero-grid"/><div className="hero-content"><div className="eyebrow"><span/> MINECRAFT MULTIPLAYER SERVER</div><h1>Dunia baru untuk<br/><em>petualanganmu.</em></h1><p>Temukan tempat untuk membangun, menjelajah, dan bermain bersama di dunia Agoytopia.</p><div className="hero-actions"><a className="button button-gold" href="#join">Main Sekarang <ArrowUpRight size={15}/></a><a className="button button-outline" href="#features">Lihat Fitur</a></div><div className="server-address"><span className="status-dot"/><div><small>SERVER ADDRESS · PAPER {serverConfig.paperVersion}</small><strong>{serverConfig.ip}</strong></div><CopyIpButton label="Copy"/></div></div><div className="hero-icon"><div className="icon-ring"><img src={serverConfig.icon} alt="Ikon pixel Agoytopia"/></div><span>WELCOME, EXPLORER</span></div><div className="hero-ground"/></section>; }

function Intro() { return <section className="intro section-pad"><div className="section-kicker">01 / THE WORLD</div><div className="intro-grid"><h2>Masuk ke dunia<br/><span>yang kamu ciptakan.</span></h2><div><p className="lead">Agoytopia adalah ruang bermain bersama untuk kamu yang ingin menikmati Minecraft dengan cara sendiri.</p><p className="muted">Bangun sesuatu yang berarti, temukan tempat baru, dan jaga komunitas tetap nyaman untuk semua. Jelajahi fitur yang tersedia dan kenali aturan sebelum memulai perjalananmu.</p><a className="text-link" href="#join">Mulai perjalanan <ArrowRight size={16}/></a><a className="discord-help" href={serverConfig.discord} target="_blank" rel="noreferrer"><MessageCircle size={19}/><div><small>Ada pertanyaan?</small><strong>Hubungi admin di Discord</strong><b>Tag {serverConfig.adminTag} <ArrowUpRight size={12}/></b></div></a></div></div></section>; }

function Join() { return <section className="join-section section-pad" id="join"><div className="section-kicker light">02 / GET STARTED</div><div className="join-heading"><h2>Cara <em>bergabung.</em></h2><p>Ikuti langkah sederhana ini. Dalam beberapa menit, kamu sudah siap memasuki dunia Agoytopia.</p></div><div className="steps">{tutorialSteps.map(([title, desc], i) => <article className="step" key={title}><div className="step-number">0{i + 1}</div><div><h3>{title}</h3><p>{desc}</p>{i === 3 && <code>{serverConfig.ip}</code>}</div></article>)}</div><div className="join-note"><Sparkles size={18}/><p><strong>Catatan untuk pemain baru</strong><br/>Pastikan koneksi internet stabil dan baca rules sebelum mulai bermain bersama.</p><CopyIpButton label="Salin IP Server"/></div></section>; }

function Features() { return <section className="features section-pad" id="features"><div className="section-kicker">03 / BUILT FOR PLAYERS</div><div className="section-title-row"><h2>Yang ada<br/><em>di dalamnya.</em></h2><p>Fitur yang dirancang untuk menjaga pengalaman bermain tetap seru, nyaman, dan fair. Server berjalan di Paper {serverConfig.paperVersion}.</p></div><div className="feature-grid">{features.map(([num, title, desc, icon]) => { const Icon = featureIcons[icon]; return <article className="feature-card" key={title}><div className="feature-top"><span>{num}</span><Icon size={23} strokeWidth={1.8}/></div><h3>{title}</h3><p>{desc}</p><div className="card-line"/></article>; })}</div></section>; }

function Rules() { return <section className="rules-section section-pad" id="rules"><div className="rules-intro"><div className="section-kicker light">04 / PLAY FAIR</div><h2>Rules<br/><em>Agoytopia.</em></h2><p>Dunia yang menyenangkan dimulai dari pemain yang saling menghormati. Jadikan ini tempat yang ingin kamu kunjungi lagi.</p></div><div className="rules-list">{rules.map(([title, items], i) => <article className="rule-group" key={title}><div className="rule-mark">0{i + 1}</div><div><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}</div></section>; }

function CTA() { return <section className="cta section-pad"><div className="cta-decoration"><Sparkles size={20}/></div><div className="section-kicker">05 / YOUR TURN</div><h2>Petualanganmu menunggu<br/><em>di Agoytopia.</em></h2><p>Masuk, jelajah, dan buat cerita versimu sendiri.</p><div className="cta-address">{serverConfig.ip}</div><div className="cta-actions"><CopyIpButton label="Copy IP Server"/><a className="button button-dark" href="#join">Lihat Tutorial <ArrowDown size={15}/></a></div></section>; }

function Footer() { return <footer><div className="footer-main"><Logo/><p>Tempat untuk bermain, membangun,<br/>dan menemukan petualangan baru.</p><div className="footer-ip"><small>SERVER ADDRESS</small><strong>{serverConfig.ip}</strong><a className="footer-discord" href={serverConfig.discord} target="_blank" rel="noreferrer">Pertanyaan? Discord admin {serverConfig.adminTag} <ArrowUpRight size={12}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Agoytopia. Built for explorers.</span><div><a href="#top">Home</a><a href="#join">Cara Bergabung</a><a href="#rules">Rules</a></div></div></footer>; }
function App() { return <><Navbar/><main><Hero/><Intro/><Join/><Features/><Rules/><CTA/></main><Footer/></>; }

createRoot(document.getElementById('root')).render(<App/>);