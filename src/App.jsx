import Assessment from './Assessment';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

// ── FORM ──
const FORM_ID = "1FAIpQLScoZS3JTdxpwc_qLCSWhj5Nrz7GN0faa_ai7aYBeFnLZBJi0w";
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?embedded=true`;

// ── WHITELABEL PARTNERS ──
// To add a new partner: add a key here, upload their logo to /public/partners/
// Then share link: sageducations.in/assessment?partner=KEY
const PARTNERS = {
  aspirants: { name: "Aspirants College & Academy", logo: "/partners/aspirants.png" },
  adhyapan:  { name: "Adhyapan Tutorials",           logo: "/partners/adhyapan.png" },
  ace:       { name: "Ace, The Science Academy",      logo: "/partners/ace.png" },
  shetes:    { name: "Shete's Institute",             logo: "/partners/shetes.png" },
  isha:      { name: "Isha Group Tuitions",           logo: "/partners/isha.png" },
  wisdom:    { name: "Wisdom Tutorials",              logo: "/partners/wisdom.png" },
};

// ── PALETTE ──
const C = {
  white:   "#FFFFFF",
  off:     "#F8F9FF",
  g50:     "#F0F2F8",
  g200:    "#CBD5E1",
  g400:    "#94A3B8",
  g600:    "#475569",
  g800:    "#1E293B",
  black:   "#0F172A",
  pink:    "#E8197D",
  pinkL:   "#FFE4F2",
  cyan:    "#00C8D4",
  blue:    "#1A56DB",
  green:   "#10B981",
  orange:  "#F97316",
};

const F = "'DM Sans', 'Segoe UI', sans-serif";
const FD = "'Syne', 'DM Sans', sans-serif";

// inject fonts once
if (typeof document !== "undefined" && !document.getElementById("sage-fonts")) {
  const l = document.createElement("link");
  l.id = "sage-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap";
  document.head.appendChild(l);
}

// ─────────────────────────
// NAVBAR
// ─────────────────────────
function Navbar({ onAssessment }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => scrollEl(id), 300); }
    else scrollEl(id);
  };
  const scrollEl = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const links = [
    ["Products",   "products"],
    ["Institutes", "institutes"],
    ["Students",   "students"],
    ["Clients",    "clients"],
    ["Contact",    "footer"],
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
      borderBottom: scrolled ? `2px solid ${C.pink}` : "1px solid #E2E8F0",
      transition: "border-color 0.3s", fontFamily: F,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <img src="/Sage Ed - Logo.png" alt="SAGE" style={{ height: 46, cursor: "pointer", objectFit: "contain" }} onClick={() => { navigate("/"); scrollEl("home"); }} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 500, color: C.g600, padding: "6px 12px", borderRadius: 8 }}
              onMouseEnter={e => e.currentTarget.style.color = C.pink}
              onMouseLeave={e => e.currentTarget.style.color = C.g600}
            >{label}</button>
          ))}
          <button onClick={() => navigate("/about")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 500, color: C.g600, padding: "6px 12px", borderRadius: 8 }}
            onMouseEnter={e => e.currentTarget.style.color = C.pink}
            onMouseLeave={e => e.currentTarget.style.color = C.g600}
          >About</button>
          <button onClick={onAssessment} style={{ background: C.pink, color: C.white, border: "none", borderRadius: 10, padding: "10px 22px", fontFamily: F, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 15px ${C.pink}40`, marginLeft: 8 }}>Take Assessment →</button>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────
// HERO
// ─────────────────────────
function Hero({ onAssessment }) {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "linear-gradient(135deg,#FFF0F8 0%,#F0F8FF 50%,#F0FFF8 100%)", position: "relative", overflow: "hidden", fontFamily: F }}>
      <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: `${C.pink}12`, filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: `${C.cyan}12`, filter: "blur(70px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", width: "100%" }}>
        <div style={{ flex: "1 1 460px" }}>
          <div style={{ display: "inline-block", background: C.pinkL, color: C.pink, borderRadius: 20, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}>
            🚀 India's Personalised Career Discovery Platform
          </div>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(30px,5vw,54px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px", color: C.black }}>
            We Let You Know,<br />
            Your <span style={{ color: C.pink }}>BRIGHT</span> <span style={{ color: C.blue }}>Future</span>
          </h1>
          <p style={{ fontSize: 17, color: C.g600, lineHeight: 1.8, marginBottom: 32, maxWidth: 520 }}>
            Hello Pal! 👋 We're SAGE Educations — passionate about guiding students toward their ideal careers. For 3+ years, we've helped Mumbai students navigate career paths through Personalised Career Reports and Counselling Sessions.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={onAssessment} style={{ background: C.pink, color: C.white, border: "none", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: F, boxShadow: `0 8px 24px ${C.pink}40` }}>
              Take Free Assessment →
            </button>
            <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} style={{ background: C.white, color: C.g800, border: `2px solid ${C.g200}`, borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: F }}>
              Explore Products
            </button>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
            {[["3+","Years Experience"],["9+","Partner Institutes"],["500+","Students Helped"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: FD, fontSize: 30, fontWeight: 800, color: C.pink }}>{n}</div>
                <div style={{ fontSize: 13, color: C.g400, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <img src="/Sage Ed - Logo.png" alt="SAGE Mascot" style={{ width: "100%", maxWidth: 420, objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(232,25,125,0.2))" }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────
// PRODUCTS
// ─────────────────────────
function Products() {
  const products = [
    {
      grade: "8th–9th Grade", title: "Career Navigator", icon: "🌱", color: C.green, colorL: "#ECFDF5",
      points: ["RIASEC & Clifton analysis","Introduction to career planning","Career introspection activities","Basic career group suggestions","Strength & personality revelations","Prelude to 10th grade assessment"],
    },
    {
      grade: "10th Grade", title: "Career Report", icon: "🎯", color: C.pink, colorL: C.pinkL, highlight: true,
      points: ["20-Page Career Report","5-dimensional psychometric assessment","NEP 2020 aligned","Top 5 career cluster recommendations","Stream & subject suggestions","Primary, secondary & backup plans"],
    },
    {
      grade: "11th–12th Grade", title: "Career Finder", icon: "🗺️", color: C.blue, colorL: "#EFF6FF",
      points: ["12-Page Career Report","Subjective + psychometric assessment","Actionable strategic plan","Entrance exam focus","Post-graduation insights","Study abroad preparation"],
    },
  ];

  return (
    <section id="products" style={{ background: C.white, padding: "80px 24px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", background: C.pinkL, color: C.pink, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Our Products</div>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: C.black, margin: "0 0 16px" }}>
            We Cater to <span style={{ color: C.pink }}>Three Categories</span> of Students
          </h2>
          <p style={{ color: C.g600, fontSize: 16, maxWidth: 580, margin: "0 auto" }}>
            At the end, we become the student's best friend — solving career doubts and making them happy to begin their journey.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {products.map(p => (
            <div key={p.grade} style={{
              background: p.highlight ? p.color : C.white,
              border: `2px solid ${p.highlight ? p.color : C.g200}`,
              borderRadius: 20, padding: 32,
              boxShadow: p.highlight ? `0 20px 60px ${p.color}30` : "0 4px 20px rgba(0,0,0,0.06)",
              transform: p.highlight ? "translateY(-8px)" : "none",
              position: "relative",
            }}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: C.black, color: C.white, borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>⭐ MAIN PRODUCT</div>
              )}
              <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.highlight ? "rgba(255,255,255,0.8)" : p.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{p.grade}</div>
              <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 800, color: p.highlight ? C.white : C.black, margin: "0 0 20px" }}>{p.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {p.points.map(pt => (
                  <li key={pt} style={{ display: "flex", gap: 10, fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.9)" : C.g600, lineHeight: 1.5 }}>
                    <span style={{ color: p.highlight ? C.white : p.color, flexShrink: 0 }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────
// FOR INSTITUTES
// ─────────────────────────
function ForInstitutes() {
  return (
    <section id="institutes" style={{ background: C.g800, padding: "80px 24px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 420px" }}>
          <div style={{ display: "inline-block", background: "rgba(232,25,125,0.2)", color: "#FF6EB4", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>For Institute Owners</div>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: C.white, margin: "0 0 20px", lineHeight: 1.2 }}>
            Personalised Career Books<br /><span style={{ color: C.pink }}>On Your Brand.</span> Your Letterhead.
          </h2>
          <p style={{ color: C.g200, lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
            Imagine creating personalised 20-page career books for every student — psychologically sound, easy to understand, personally crafted according to their personality, interests and everything of theirs.
          </p>
          <p style={{ color: C.g200, lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
            <strong style={{ color: C.white }}>Which stream? Which subjects? Which career? Which entrances? Which degree? EVERYTHING!</strong>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {[["📈","Quadruple Your Footfalls"],["🎓","Triple Your Admissions"],["⭐","Double Your Goodwill"],["🏆","Stand Out as an Institute"]].map(([icon,text]) => (
              <div key={text} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 13, color: C.white, fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
          <a href="https://wa.me/917875363745?text=Hi SAGE, I am an institute owner interested in your services." target="_blank" rel="noreferrer"
            style={{ display: "inline-block", background: C.pink, color: C.white, borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 24px ${C.pink}40` }}>
            WhatsApp Us for Partnership →
          </a>
        </div>
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32 }}>
            <h3 style={{ fontFamily: FD, color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 24 }}>What's Included</h3>
            {["20-Page personalised psychometric career report","On YOUR brand and letterhead","5-dimensional assessment framework","NEP 2020 compliant methodology","Stream, subject & career recommendations","Primary, secondary & backup plans","Personal counselling support","Doubt-solving assistance for students"].map(i => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.pink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ color: C.white, fontSize: 10, fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ color: C.g200, fontSize: 14, lineHeight: 1.5 }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────
// CLIENTS
// ─────────────────────────
function Clients() {
  const institutes = [
    { name: "Aspirants College & Academy", detail: "XI–XII Science, JEE, NEET, MHT CET", loc: "Kalyan & Badlapur" },
    { name: "Adhyapan Tutorials", detail: "School, XI–XII Science, Commerce, CA, CS", loc: "Multiple, Mumbai" },
    { name: "Ace, The Science Academy", detail: "XI–XII Science, JEE, NEET, MHT CET", loc: "Ambernath" },
    { name: "Shete's Institute of Academics", detail: "School, Science, Commerce, CA, CS", loc: "Kalyan & Badlapur" },
    { name: "Isha Group Tuitions", detail: "School section", loc: "Ulhasnagar" },
    { name: "Wisdom Tutorials", detail: "School section", loc: "Ambernath" },
  ];
  const schools = [
    { name: "Cambria International School", loc: "Kalyan" },
    { name: "Leeway School", loc: "Palegaon" },
    { name: "Holy Faith English School", loc: "Ambernath" },
  ];

  return (
    <section id="clients" style={{ background: C.off, padding: "80px 24px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", background: C.pinkL, color: C.pink, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Our Clients</div>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: C.black, margin: "0 0 16px" }}>
            Institutes & Schools We've <span style={{ color: C.pink }}>Helped</span>
          </h2>
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.g400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Coaching Institutes</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 40 }}>
          {institutes.map(i => (
            <div key={i.name} style={{ background: C.white, borderRadius: 16, padding: 24, border: `1px solid ${C.g200}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏫</div>
              <h4 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.black, margin: "0 0 6px" }}>{i.name}</h4>
              <p style={{ fontSize: 13, color: C.g400, margin: "0 0 4px" }}>{i.detail}</p>
              <p style={{ fontSize: 12, color: C.pink, fontWeight: 600, margin: 0 }}>📍 {i.loc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.g400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Schools</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {schools.map(s => (
            <div key={s.name} style={{ background: C.white, borderRadius: 16, padding: 24, border: `1px solid ${C.g200}`, display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ fontSize: 28 }}>🏛️</span>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.black, margin: "0 0 4px" }}>{s.name}</h4>
                <p style={{ fontSize: 13, color: C.pink, fontWeight: 600, margin: 0 }}>📍 {s.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────
// FOR STUDENTS
// ─────────────────────────
function ForStudents({ onAssessment }) {
  return (
    <section id="students" style={{ background: `linear-gradient(135deg,${C.pinkL} 0%,#EFF6FF 100%)`, padding: "80px 24px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: C.pinkL, color: C.pink, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 20, border: `1px solid ${C.pink}30` }}>For Students & Parents</div>
        <h2 style={{ fontFamily: FD, fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, color: C.black, margin: "0 0 16px" }}>
          Get Your Queries on Page,<br /><span style={{ color: C.pink }}>Not Stuck in Mind</span>
        </h2>
        <p style={{ color: C.g600, fontSize: 16, maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.8 }}>
          A detailed personalised psychometric career report providing primary, secondary & backup plans — clearing every career doubt.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 48, textAlign: "left" }}>
          {[
            ["🧠","Personality Assessment","Understand your DISC, HEXACO & RIASEC profile"],
            ["🎯","Stream Alignment","Science, Commerce or Arts — we'll find your fit"],
            ["💡","Skill & Aptitude","Discover your natural strengths and abilities"],
            ["🗺️","Career Roadmap","Primary, secondary and backup career plans"],
            ["🎓","College & Exams","Right colleges and entrance exams for your path"],
            ["💬","Counselling Sessions","Personal doubt-solving with Team SAGE"],
          ].map(([icon,title,desc]) => (
            <div key={title} style={{ background: C.white, borderRadius: 16, padding: 24, border: `1px solid ${C.g200}`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
              <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.black, margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: 13, color: C.g600, margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
        <button onClick={onAssessment} style={{ background: C.pink, color: C.white, border: "none", borderRadius: 12, padding: "18px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: F, boxShadow: `0 8px 32px ${C.pink}40` }}>
          Start My Free Assessment →
        </button>
        <p style={{ marginTop: 12, fontSize: 13, color: C.g400 }}>⏱ 90–120 mins &nbsp;|&nbsp; 🔒 Confidential &nbsp;|&nbsp; 📊 Personalised Report</p>
      </div>
    </section>
  );
}

// ─────────────────────────
// FOOTER
// ─────────────────────────
function Footer() {
  return (
    <footer id="footer" style={{ background: C.black, padding: "60px 24px 32px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginBottom: 48 }}>
          <div style={{ flex: "2 1 280px" }}>
            <img src="/Sage Ed - Logo.png" alt="SAGE" style={{ height: 52, marginBottom: 16, objectFit: "contain" }} />
            <p style={{ color: C.g400, fontSize: 14, lineHeight: 1.8, maxWidth: 320, margin: "0 0 20px" }}>
              We let you know, your BRIGHT future.<br />India's personalised career discovery platform.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://wa.me/917875363745" target="_blank" rel="noreferrer" style={{ background: "#25D366", color: C.white, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>💬 WhatsApp</a>
              <a href="mailto:Sageducations@gmail.com" style={{ background: "rgba(255,255,255,0.1)", color: C.white, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>✉️ Email</a>
            </div>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <h4 style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:Sageducations@gmail.com" style={{ color: C.g400, fontSize: 14, textDecoration: "none" }}>📧 Sageducations@gmail.com</a>
              <a href="tel:+917875363745" style={{ color: C.g400, fontSize: 14, textDecoration: "none" }}>📞 +91 78753 63745</a>
              <a href="tel:+919022843340" style={{ color: C.g400, fontSize: 14, textDecoration: "none" }}>📞 +91 90228 43340</a>
              <p style={{ color: C.g400, fontSize: 13, lineHeight: 1.6, margin: 0 }}>📍 1st Floor, Navre Arcade, Shop 6 & 7, C-Wing, Shivaji Chowk, Ambernath East, Maharashtra 421501</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: C.g600, fontSize: 13, margin: 0 }}>© {new Date().getFullYear()} SAGE Educations — Sole Proprietorship, Gaurav Chotaliya</p>
          <p style={{ color: C.g600, fontSize: 13, margin: 0 }}>Udyam No. UDYAM-MH-33-0543565</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────
// FLOATING WHATSAPP
// ─────────────────────────
function FloatingWA() {
  return (
    <a href="https://wa.me/917875363745?text=Hi SAGE Educations!" target="_blank" rel="noreferrer" style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 998,
      background: "#25D366", color: C.white, borderRadius: 50,
      padding: "13px 22px", fontFamily: F, fontSize: 14, fontWeight: 700,
      textDecoration: "none", boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
    }}>💬 Contact Us</a>
  );
}

// ─────────────────────────
// ASSESSMENT PAGE
// ─────────────────────────
// Add this import at top of App.jsx:
// import Assessment from './Assessment';

// Replace the AssessmentPage function in App.jsx with this:
function AssessmentPage() {
  const [params] = useSearchParams();
  const partner = params.get("partner");
  const info = partner ? PARTNERS[partner.toLowerCase()] : null;

  return (
    <Assessment
      partnerLogo={info ? info.logo : null}
      partnerName={info ? info.name : null}
    />
  );
}

// ─────────────────────────
// ABOUT PAGE
// ─────────────────────────
function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: F, background: C.white, minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(135deg,${C.pinkL},#EFF6FF)`, padding: "120px 24px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: C.black }}>About <span style={{ color: C.pink }}>SAGE Educations</span></h1>
        <p style={{ color: C.g600, fontSize: 16, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.8 }}>Passionate about guiding students toward their ideal careers. Based in Ambernath, Mumbai.</p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        <p style={{ color: C.g600, lineHeight: 1.9, fontSize: 16, marginBottom: 24 }}>
          We are SAGE Educations — and yes, we've poured our heart and money to prove that SAGE is a genuine career counselling firm. For 3+ years, we've helped Mumbai students navigate their career paths through Personalised Career Reports and Counselling Sessions.
        </p>
        <p style={{ color: C.g600, lineHeight: 1.9, fontSize: 16, marginBottom: 40 }}>
          What does a firm with an astronaut in their logo do? We help students explore the universe of career possibilities and land on the path that's right for them. Our approach is psychologically sound, NEP 2020 aligned, and completely personalised.
        </p>
        <button onClick={() => navigate("/")} style={{ background: C.pink, color: C.white, border: "none", borderRadius: 12, padding: "14px 28px", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>← Back to Home</button>
      </div>
    </div>
  );
}

// ─────────────────────────
// HOME PAGE
// ─────────────────────────
function HomePage({ onAssessment }) {
  return (
    <>
      <Hero onAssessment={onAssessment} />
      <Products />
      <ForInstitutes />
      <Clients />
      <ForStudents onAssessment={onAssessment} />
      <Footer />
      <FloatingWA />
    </>
  );
}

// ─────────────────────────
// APP
// ─────────────────────────
function AppInner() {
  const navigate = useNavigate();
  const goAssessment = () => navigate("/assessment");

  return (
    <Routes>
      <Route path="/" element={<><Navbar onAssessment={goAssessment} /><div style={{ paddingTop: 68 }}><HomePage onAssessment={goAssessment} /></div></>} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/about" element={<><Navbar onAssessment={goAssessment} /><div style={{ paddingTop: 68 }}><AboutPage /></div></>} />
    </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>;
}
