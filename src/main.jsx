import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleAlert,
  Coins,
  Copy,
  Gauge,
  LogIn,
  MapPinned,
  Menu,
  MessageCircle,
  Mic,
  Shuffle,
  ShieldCheck,
  Sparkles,
  Swords,
  TreePine,
  X,
  Store,
  ShoppingBag,
  Handshake,
} from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { serverConfig, tutorialSteps, features, rules } from './data/serverConfig';
import './styles.css';

const featureIcons = { Gauge, Mic, Swords, Shuffle, LogIn, TreePine, ShieldCheck, Coins, MapPinned };

/* ─── Copy IP Button ─── */
function CopyIpButton({ label = 'Copy IP' }) {
  const [state, setState] = useState('idle');

  function copy() {
    navigator.clipboard
      .writeText(serverConfig.ip)
      .then(() => setState('success'))
      .catch(() => setState('error'));
    setTimeout(() => setState('idle'), 2400);
  }

  const Icon = state === 'success' ? Check : state === 'error' ? CircleAlert : Copy;

  return (
    <button
      className="button button-gold"
      onClick={copy}
      aria-label={`${label}: ${serverConfig.ip}`}
    >
      <Icon size={15} aria-hidden="true" />
      {state === 'success'
        ? 'IP berhasil disalin!'
        : state === 'error'
          ? `Gagal menyalin — ${serverConfig.ip}`
          : label}
    </button>
  );
}

/* ─── Copy Command Chip ─── */
function CopyCommand({ command }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard
      .writeText(command)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      className="command-chip"
      onClick={copy}
      aria-label={`Salin perintah ${command}`}
    >
      <code>{command}</code>
      <span>{copied ? 'Tersalin!' : 'Salin'}</span>
    </button>
  );
}

/* ─── Logo ─── */
function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Beranda Agoytopia">
      <img src={serverConfig.icon} alt="" />
      <span>
        Agoytopia
        <small>PETUALANGAN MENANTI</small>
      </span>
    </a>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    ['top', 'Beranda'],
    ['join', 'Cara Bergabung'],
    ['features', 'Fitur Server'],
    ['rules', 'Peraturan'],
  ];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Logo />

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Buka/tutup menu navigasi"
          aria-expanded={open}
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>

        <nav
          className={open ? 'nav-links open' : 'nav-links'}
          aria-label="Navigasi utama"
        >
          {navLinks.map(([href, text]) => (
            <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>
              {text}
            </a>
          ))}
          <CopyIpButton label="Salin IP" />
        </nav>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-sun" />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="eyebrow">
          <span />
          SERVER MULTIPLAYER MINECRAFT
        </div>

        <h1>
          Dunia baru untuk
          <br />
          <em>petualanganmu.</em>
        </h1>

        <p>Bangun, jelajahi, dan bermain bersama di dunia Agoytopia.</p>

        <div className="hero-actions">
          <a className="button button-gold" href="#join">
            Mulai Petualangan <ArrowUpRight size={15} />
          </a>
          <a className="button button-outline" href="#features">
            Jelajahi Fitur
          </a>
        </div>

        <div className="server-address">
          <span className="status-dot" />
          <div>
            <small>ALAMAT SERVER · JAVA {serverConfig.paperVersion}</small>
            <strong>{serverConfig.ip}</strong>
          </div>
          <CopyIpButton label="Salin" />
        </div>
      </div>

      <div className="hero-icon">
        <div className="icon-ring">
          <img src={serverConfig.icon} alt="Ikon server Agoytopia" />
        </div>
        <span>SELAMAT DATANG, PETUALANG</span>
      </div>

      <div className="hero-ground" />
    </section>
  );
}

/* ─── Intro ─── */
function Intro() {
  return (
    <section className="intro section-pad">
      <div className="section-kicker">01 / DUNIA AGOYTOPIA</div>

      <div className="intro-grid">
        <h2>
          Masuki dunia
          <br />
          <span>yang kamu ciptakan.</span>
        </h2>

        <div>
          <p className="lead">
            Agoytopia adalah tempat bermain bersama untuk menikmati Minecraft
            dengan caramu sendiri.
          </p>
          <p className="muted">
            Bangun sesuatu yang bermakna, temukan tempat baru, dan jaga komunitas
            tetap ramah bagi semua. Jelajahi fitur yang tersedia dan kenali
            peraturan sebelum memulai petualangan.
          </p>

          <a className="text-link" href="#join">
            Mulai petualangan <ArrowRight size={16} />
          </a>

          <a
            className="discord-help"
            href={serverConfig.discord}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} />
            <div>
              <small>Ada pertanyaan?</small>
              <strong>Hubungi admin melalui Discord</strong>
              <b>
                Tag {serverConfig.adminTag} <ArrowUpRight size={12} />
              </b>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Join / Cara Bergabung ─── */
function Join() {
  return (
    <section className="join-section section-pad" id="join">
      <div className="section-kicker light">02 / MULAI BERMAIN</div>

      <div className="join-heading">
        <h2>
          Cara <em>bergabung.</em>
        </h2>
        <p>
          Ikuti langkah sederhana ini untuk segera memasuki dunia Agoytopia.
        </p>
      </div>

      <div className="steps">
        {tutorialSteps.map(([title, desc], i) => (
          <article className="step" key={title}>
            <div className="step-number">0{i + 1}</div>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
              {i === 3 && <code>{serverConfig.ip}</code>}
            </div>
          </article>
        ))}
      </div>

      <div className="join-note">
        <Sparkles size={18} />
        <p>
          <strong>Untuk pemain baru</strong>
          <br />
          Pastikan koneksi internet stabil dan baca peraturan sebelum mulai
          bermain.
        </p>
        <CopyIpButton label="Salin IP Server" />
      </div>
    </section>
  );
}

/* ─── Features / Fitur Server ─── */
function Features() {
  return (
    <section className="features section-pad" id="features">
      <div className="section-kicker">03 / FITUR UNTUK PEMAIN</div>

      <div className="section-title-row">
        <h2>
          Fitur yang
          <br />
          <em>tersedia.</em>
        </h2>
        <p>
          Fitur yang dirancang untuk menjaga pengalaman bermain tetap seru,
          nyaman, dan adil. Server berjalan pada Java {serverConfig.paperVersion}.
        </p>
      </div>

      <div className="feature-grid">
        {features.map(([num, title, desc, icon]) => {
          const Icon = featureIcons[icon];
          return (
            <article className="feature-card" key={title}>
              <div className="feature-top">
                <span>{num}</span>
                <Icon size={23} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="card-line" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Economy / Ekonomi & Perdagangan ─── */
function Economy() {
  return (
    <section className="economy-section section-pad" id="economy">
      <div className="section-kicker">04 / EKONOMI & PERDAGANGAN</div>

      <div className="economy-heading">
        <div>
          <h2>
            Mulai dari Nol.
            <br />
            <em>Bangun Kekayaanmu.</em>
          </h2>
          <p>
            Setiap petualangan dimulai dengan $0. Kumpulkan sumber daya,
            perdagangkan barang berharga, dan bangun kekayaanmu di Agoytopia.
          </p>
        </div>

        <div className="balance-stamp">
          <Coins size={26} />
          <small>MODAL AWAL</small>
          <strong>$0</strong>
        </div>
      </div>

      <div className="economy-grid">
        {/* Sistem Ekonomi */}
        <article className="economy-feature economy-main">
          <div className="economy-icon">
            <Coins size={22} />
          </div>
          <span className="economy-label">SISTEM EKONOMI</span>
          <h3>Raih kekayaan dengan caramu.</h3>
          <p>
            Bangun kekayaan melalui permainan, mengumpulkan sumber daya,
            bertani, berdagang, dan aktivitas lain yang tersedia di server.
            Perjalananmu dimulai dengan saldo kosong.
          </p>
          <a className="economy-link" href="#join">
            Pelajari cara bergabung <ArrowRight size={15} />
          </a>
        </article>

        {/* Toko Server */}
        <article className="economy-feature">
          <div className="economy-icon">
            <Store size={22} />
          </div>
          <span className="economy-label">TOKO SERVER</span>
          <h3>Sumber Dayamu Bernilai.</h3>
          <p>
            Gunakan toko dalam game untuk membeli bahan bertahan hidup dan
            menjual barang yang memenuhi syarat sesuai pengaturan toko. Stok
            penjualan dan batas pemain masih dikonfigurasi; ketersediaannya dapat
            berubah.
          </p>
          <CopyCommand command="/shop" />
        </article>

        {/* Rumah Lelang */}
        <article className="economy-feature">
          <div className="economy-icon">
            <Handshake size={22} />
          </div>
          <span className="economy-label">RUMAH LELANG · BELI LANGSUNG</span>
          <h3>Berdagang dengan Komunitas.</h3>
          <p>
            Pasang barang yang memenuhi syarat dengan harga tetap agar dapat
            langsung dibeli pemain lain. Listing memiliki durasi terbatas dan
            dapat kedaluwarsa; ketersediaan serta harga diatur melalui sistem
            lelang dalam game.
          </p>
          <CopyCommand command="/ah" />
        </article>
      </div>

      <aside className="trade-rules">
        <ShieldCheck size={22} />
        <div>
          <h3>Berdagang dengan adil.</h3>
          <p>
            Eksploitasi bug toko atau rumah lelang serta duplikasi uang maupun
            barang dilarang. Periksa barang dan harganya sebelum membeli, lalu
            laporkan transaksi mencurigakan kepada staf server.
          </p>
        </div>
        <a href="#rules">
          Baca peraturan server <ArrowUpRight size={14} />
        </a>
      </aside>
    </section>
  );
}

/* ─── Rules / Peraturan ─── */
function Rules() {
  return (
    <section className="rules-section section-pad" id="rules">
      <div className="rules-intro">
        <div className="section-kicker light">05 / BERMAIN DENGAN ADIL</div>
        <h2>
          Peraturan
          <br />
          <em>Agoytopia.</em>
        </h2>
        <p>
          Dunia yang menyenangkan dimulai dari pemain yang saling menghormati.
          Jadikan ini tempat yang ingin dikunjungi kembali oleh semua orang.
        </p>
      </div>

      <div className="rules-list">
        {rules.map(([title, items], i) => (
          <article className="rule-group" key={title}>
            <div className="rule-mark">0{i + 1}</div>
            <div>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="cta section-pad">
      <div className="cta-decoration">
        <Sparkles size={20} />
      </div>

      <div className="section-kicker">06 / GILIRANMU</div>

      <h2>
        Petualanganmu menanti
        <br />
        <em>di Agoytopia.</em>
      </h2>

      <p>Bergabunglah, jelajahi dunia, dan ciptakan kisahmu sendiri.</p>

      <div className="cta-address">{serverConfig.ip}</div>

      <div className="cta-actions">
        <CopyIpButton label="Salin IP Server" />
        <a className="button button-dark" href="#join">
          Lihat Panduan Bergabung <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <Logo />
        <p>
          Tempat untuk bermain, membangun,
          <br />
          dan menemukan petualangan baru.
        </p>
        <div className="footer-ip">
          <small>ALAMAT SERVER</small>
          <strong>{serverConfig.ip}</strong>
          <a
            className="footer-discord"
            href={serverConfig.discord}
            target="_blank"
            rel="noreferrer"
          >
            Ada pertanyaan? Hubungi admin {serverConfig.adminTag}{' '}
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Agoytopia. Dibuat untuk para petualang.
        </span>
        <div>
          <a href="#top">Beranda</a>
          <a href="#join">Cara Bergabung</a>
          <a href="#features">Fitur Server</a>
          <a href="#rules">Peraturan</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Join />
        <Features />
        <Economy />
        <Rules />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);