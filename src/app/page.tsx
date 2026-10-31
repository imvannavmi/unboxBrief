
const features = [
  {
    number: "01",
    icon: "âœ³",
    title: "Tantangan Nyata",
    description:
      "Bangun proyek dengan kebutuhan dan batasan yang terasa seperti brief dari klien sungguhan.",
  },
  {
    number: "02",
    icon: "âœ¦",
    title: "Rarity System",
    description:
      "Common hingga Legendary. Setiap kombinasi punya peluang dan tantangan yang berbeda.",
  },
  {
    number: "03",
    icon: "â—·",
    title: "Batas Waktu",
    description:
      "Dari sprint singkat hingga proyek kompleks. Seberapa jauh kamu bisa melangkah?",
  },
  {
    number: "04",
    icon: "âŒ˜",
    title: "Build Your Portfolio",
    description:
      "Ubah brief yang kamu dapatkan menjadi proyek nyata untuk mengasah skill dan portfolio.",
  },
];

function MysteryBox() {
  return (
    <div className="box-stage" aria-label="Ilustrasi kotak misteri unboxBrief">
      <div className="box-orbit orbit-one" />
      <div className="box-orbit orbit-two" />
      <span className="spark spark-one">âœ¦</span>
      <span className="spark spark-two">âœ§</span>
      <span className="spark spark-three">âœ¦</span>
      <span className="spark spark-four">âœ§</span>
      <span className="spark spark-five">âœ¦</span>
      <div className="box-glow" />

      <div className="mystery-box">
        <div className="box-lid">
          <span className="lid-ribbon" />
          <span className="lid-shine" />
        </div>
        <div className="box-front">
          <span className="front-ribbon" />
          <span className="question-mark">?</span>
          <span className="box-highlight" />
        </div>
        <div className="box-side">
          <span className="side-ribbon" />
        </div>
      </div>

      <div className="box-platform" />
      <div className="box-caption">
        <span className="live-dot" />
        YOUR NEXT CHALLENGE AWAITS
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="navbar">
        <a href="#" className="brand" aria-label="unboxBrief beranda">
          <span className="brand-mark">
            <span />
            <span />
            <span />
          </span>
          <span>
            unbox<span className="brand-accent">Brief</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#home" className="nav-link active">
            Home
          </a>

          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </div>


              <div className="nav-auth">
          <button type="button" className="nav-login">
            Log In
          </button>
          <button type="button" className="nav-signup">
            Sign In
          </button>
        </div></nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            THE UNEXPECTED PROJECT GENERATOR
          </div>

          <h1>
            Open a box.
            <br />
            <span className="gradient-text">Get a real project</span>
            <br />
            challenge.
          </h1>

          <p className="hero-description">
            Pilih kategori, buka mystery box, dan temukan project brief berisi misi, requirements, deliverables, serta twist tak terduga untuk menantang skill-mu.
          </p>

          <div className="hero-actions">
            <a href="/quest" className="button-primary">
              Mulai Sekarang <span>â†’</span>
            </a>
            <a href="#about" className="button-secondary">
              Cara Kerja <span>â†—</span>
            </a>
          </div>

          <div className="hero-note">
            <span className="note-icon">âœ³</span>
            No client needed. Just your skills and curiosity.
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-label label-top">
            <span className="label-dot" />
            RANDOMIZED QUEST
          </div>
          <MysteryBox />
          <div className="floating-card floating-card-top">
            <span className="floating-icon purple">âœ¦</span>
            <span>
              <strong>Legendary?</strong>
              <small>Only one way to find out</small>
            </span>
          </div>
          <div className="floating-card floating-card-bottom">
            <span className="floating-icon cyan">â—·</span>
            <span>
              <strong>Time is ticking</strong>
              <small>Your deadline, your challenge</small>
            </span>
          </div>
          <div className="visual-label label-bottom">
            <span className="label-line" />
            EVERY BOX IS DIFFERENT
          </div>
        </div>

        <div className="hero-bottom-line">
          <span>001 / THE BEGINNING</span>
          <span>BUILT FOR CURIOUS DEVELOPERS</span>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              WHY UNBOXBRIEF
            </div>
            <h2>
              More than a brief.
              <br />
              <span className="gradient-text">A challenge to conquer.</span>
            </h2>
          </div>

        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-topline">
                <span className="feature-number">{feature.number}</span>
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-bottom">
                <span>DISCOVER MORE</span>
                <span className="feature-arrow">â†—</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quest-section" id="quest">
        <div className="quest-card">
          <div className="quest-card-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR NEXT QUEST
            </div>
            <h2>
              Ready to build
              <br />
              <span className="gradient-text">something unexpected?</span>
            </h2>
            <p>
              Pilih kategori, buka kotaknya, lalu ungkap brief dan twist yang akan menentukan tantangan proyekmu.
            </p>
            <span className="coming-soon">
              <span className="live-dot" />
              CHOOSE. UNBOX. BUILD.
            </span>
          </div>

          <div className="quest-card-action">
            <div className="mini-box-icon">?</div>
            <p>Brief-mu menunggu untuk diungkap.</p>
            <span className="coming-soon-text">
              READY FOR YOUR NEXT QUEST
            </span>
          </div>
        </div>
      </section>

      <footer className="footer" id="about">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark">
            <span />
            <span />
            <span />
          </span>
          <span>
            unbox<span className="brand-accent">Brief</span>
          </span>
        </a>
        <p>Less guessing. More building.</p>
        <span className="footer-copy">A PROJECT FOR CURIOUS BUILDERS.</span>
      </footer>
    </main>
  );
}
