import { useState, useEffect, useRef, useCallback } from "react";

// ─── CUSTOM FANCY CURSOR ──────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0) scale(${hovering ? 2.5 : 1})`;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hovering]);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, [role="button"] { cursor: none !important; }
        @media (max-width: 768px) {
          .custom-cursor { display: none !important; }
          body, a, button { cursor: auto !important; }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "20px", height: "20px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "2px solid #000",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.15s ease-out, background-color 0.15s ease",
          willChange: "transform"
        }}
      />
    </>
  );
}

// ─── 3D TILT EFFECT WRAPPER ───────────────────────────────────────────────────
function TiltCard({ children, style, maxRotation = 10, scale = 1.02 }) {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (-1 to 1)
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setRotation({
      x: percentY * -maxRotation,
      y: percentX * maxRotation
    });
  }, [maxRotation]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        ...style,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: "100%", height: "100%",
          transition: "transform 0.1s ease-out",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? scale : 1})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── FLAT CHARACTER SVG ILLUSTRATION ──────────────────────────────────────────
function FlatIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "460px", display: "block", filter: "drop-shadow(8px 8px 0px rgba(0,0,0,0.15))" }}>
      {/* Base line */}
      <path d="M40 360 L360 360" stroke="#000" strokeWidth="3" strokeLinecap="square" />
      
      {/* Legs (cross-legged) */}
      <path d="M120 360 C120 280, 200 280, 200 360" stroke="#000" strokeWidth="3" fill="#fff" />
      <path d="M280 360 C280 260, 180 260, 180 360" stroke="#000" strokeWidth="3" fill="#fff" />
      
      {/* Torso/Sweater (Black fill) */}
      <path d="M260 120 C290 130, 310 160, 310 210 C310 260, 300 280, 280 280 L180 280 C150 280, 140 230, 160 170 C170 140, 200 120, 220 120 Z" fill="#000" />
      {/* Abstract sweater white lines */}
      <path d="M260 120 C270 150, 260 180, 280 210" stroke="#fff" strokeWidth="1.5" fill="none" />
      <path d="M290 140 C300 160, 290 190, 310 220" stroke="#fff" strokeWidth="1.5" fill="none" />
      <path d="M310 240 C280 240, 270 260, 270 280" stroke="#fff" strokeWidth="1.5" fill="none" />
      
      {/* Neck & Head */}
      <path d="M230 95 L230 130" stroke="#000" strokeWidth="12" />
      <path d="M230 95 L230 130" stroke="#fff" strokeWidth="8" />
      <circle cx="230" cy="80" r="22" fill="#fff" stroke="#000" strokeWidth="3" />
      {/* Hair */}
      <path d="M205 80 C205 50, 255 50, 255 80 C255 70, 240 60, 230 65 C220 70, 215 75, 205 80 Z" fill="#000" />
      <path d="M255 80 C265 80, 260 60, 250 55 C240 50, 210 50, 205 70 C210 65, 230 55, 245 70 C250 75, 255 80, 255 80 Z" fill="#000" />
      
      {/* Face details */}
      <path d="M230 85 Q235 90, 240 85" stroke="#000" strokeWidth="1.5" fill="none" />
      
      {/* Subtle accent line (like the green one in inspo) */}
      <path d="M240 150 L240 240" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />

      {/* Laptop */}
      {/* Screen */}
      <path d="M120 210 L190 210 L210 280 L140 280 Z" fill="#fff" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M120 210 L135 275 L140 280" fill="#000" />
      {/* Base */}
      <path d="M140 280 L280 280 L290 288 L130 288 Z" fill="#fff" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      {/* Logo on laptop */}
      <circle cx="165" cy="245" r="7" fill="#000" />
      
      {/* Hands holding laptop */}
      <path d="M210 270 C220 270, 230 275, 230 285" fill="#fff" stroke="#000" strokeWidth="2" />
      <path d="M215 275 L225 275 M218 279 L228 279 M220 283 L230 283" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

// ─── SHARP BUTTON ─────────────────────────────────────────────────────────────
function SharpBtn({ children, href, onClick, variant = "primary", style, download }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px",
    padding: "12px 24px", cursor: "none",
    border: "2px solid #000",
    textDecoration: "none",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    boxShadow: "4px 4px 0 #000",
    borderRadius: "2px"
  };

  const variants = {
    primary: { background: "#000", color: "#fff" },
    outline: { background: "#fff", color: "#000" },
    square: { padding: "10px", minWidth: "44px", height: "44px" } // for social icons
  };

  const activeStyle = {
    transform: "translate(4px, 4px)",
    boxShadow: "0px 0px 0 #000"
  };

  const [active, setActive] = useState(false);
  const Tag = href ? "a" : "button";

  return (
    <Tag 
      href={href} 
      onClick={onClick}
      download={download}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      style={{ ...base, ...variants[variant], ...style, ...(active ? activeStyle : {}) }}
    >
      {children}
    </Tag>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Education", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #000",
        height: "72px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Logo - Signature style */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "none" }}>
            <div style={{ width: "8px", height: "8px", background: "#000" }} />
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "28px", fontWeight: 700, color: "#000", letterSpacing: "1px", transform: "rotate(-2deg)" }}>
              Garv Tanwar
            </span>
          </button>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none",
                fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700,
                color: "#000", transition: "color 0.2s", cursor: "none"
              }}>
                {l}
              </button>
            ))}
          </div>

          <div className="desktop-nav">
            <SharpBtn href="/resume.pdf" variant="outline" style={{ padding: "8px 20px" }}>
              Resume <span style={{ fontSize: "16px" }}>↓</span>
            </SharpBtn>
          </div>

          {/* Mobile menu (simplified) */}
          <button className="mobile-nav-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "2px solid #000", padding: "6px", boxShadow: "2px 2px 0 #000", cursor: "none", zIndex: 101 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="square">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "#fff", zIndex: 99,
        display: menuOpen ? "flex" : "none",
        flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px",
        padding: "2rem"
      }}>
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{
            background: "none", border: "none",
            fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 800,
            color: "#000", textTransform: "uppercase", cursor: "none"
          }}>
            {l}
          </button>
        ))}
        <SharpBtn href="/resume.pdf" variant="outline" style={{ marginTop: "16px" }}>
          Resume ↓
        </SharpBtn>
      </div>
    </>
  );
}

// ─── SKILL CARD (B&W Flat) ────────────────────────────────────────────────────
function SkillCard({ label, icon }) {
  return (
    <div className="skill-card" style={{
      padding: "24px 20px",
      background: "#fff",
      border: "2px solid #000",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "6px 6px 0 #000",
      borderRadius: "2px"
    }}>
      <span style={{ fontSize: "32px", lineHeight: 1 }}>{icon}</span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#000", textAlign: "center", letterSpacing: "-0.02em" }}>{label}</span>
    </div>
  );
}

// ─── PROJECT CARD (B&W Flat) ──────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, link }) {
  return (
    <TiltCard maxRotation={4} scale={1.01} style={{ height: "100%" }}>
      <div className="project-card" style={{
        background: "#fff",
        border: "2px solid #000",
        padding: "32px",
        boxShadow: "8px 8px 0 #000",
        display: "flex", flexDirection: "column",
        borderRadius: "2px",
        height: "100%"
      }}>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 800, color: "#000", margin: "0 0 12px", letterSpacing: "-0.03em" }}>{title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.6, color: "#4b5563", margin: "0 0 24px", flexGrow: 1 }}>{desc}</p>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {tags.map(t => (
            <span key={t} style={{
              padding: "4px 10px", border: "1.5px solid #000",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600,
              background: "#f3f4f6", color: "#000", borderRadius: "2px"
            }}>
              {t}
            </span>
          ))}
        </div>
        
        {link && (
          <SharpBtn href={link} variant="outline" style={{ alignSelf: "flex-start", padding: "10px 20px" }}>
            View Project ↗
          </SharpBtn>
        )}
      </div>
    </TiltCard>
  );
}

// ─── INFO LIST CARD ──────────────────────────────────────────────────────────
function InfoCard({ title, subtitle, date, details }) {
  return (
    <div style={{
      border: "2px solid #000",
      padding: "24px",
      background: "#fff",
      boxShadow: "4px 4px 0 #000",
      position: "relative",
      marginBottom: "24px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 800, color: "#000", margin: "0 0 4px" }}>{title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#4b5563", margin: 0 }}>{subtitle}</p>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, padding: "4px 10px", border: "1.5px solid #000", background: "#f3f4f6" }}>
          {date}
        </span>
      </div>
      {details && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#4b5563", margin: "16px 0 0", lineHeight: 1.5 }}>
          {details}
        </p>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const projects = [
    { title: "Portfolio Website", desc: "A custom-built React SPA with strict black & white brutalist aesthetic, custom SVGs, interactive 3D elements, and full SEO optimization. Deployed on Vercel.", tags: ["React", "CSS3", "Vite", "SEO"], link: "https://github.com/Garvvv9887" },
    { title: "Web App — Full Stack", desc: "Full-stack application with Node.js/PostgreSQL backend, user authentication, RESTful APIs, and a clean responsive interface.", tags: ["Node.js", "PostgreSQL", "Express"], link: "https://github.com/Garvvv9887" },
    { title: "SQL Dashboard", desc: "Data analysis dashboard connecting to a relational DB with dynamic queries, structured reporting, and a lightweight frontend.", tags: ["SQL", "JavaScript", "PostgreSQL"], link: "https://github.com/Garvvv9887" },
    { title: "Responsive UI Kit", desc: "A collection of reusable, accessible UI components built in plain HTML, CSS, and JS — focused on brutalist design trends.", tags: ["HTML", "CSS", "JavaScript"], link: "https://github.com/Garvvv9887" },
  ];

  const skills = [
    { label: "HTML5", icon: "🌐" }, { label: "CSS3", icon: "🎨" }, 
    { label: "JavaScript", icon: "⚡" }, { label: "React", icon: "⚛️" },
    { label: "Node.js", icon: "🟢" }, { label: "PostgreSQL", icon: "🐘" },
    { label: "C / C++", icon: "⚙️" }, { label: "Git", icon: "📦" }
  ];

  const education = [
    { title: "B.Tech — Computer Science & Engineering", subtitle: "Parul University, Vadodara, Gujarat", date: "Batch: 2025 – 2029", details: "CGPA: 8.50" }
  ];

  const certifications = [
    { title: "JavaScript", subtitle: "Certification", date: "" },
    { title: "HTML & CSS", subtitle: "Certification", date: "" },
    { title: "Red Hat", subtitle: "Certification", date: "" },
    { title: "AWS", subtitle: "Certification", date: "" }
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet" />
      
      <CustomCursor />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #ffffff;
          color: #000000;
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::selection { background: #000; color: #fff; }
        
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 2px #000;
        }

        .skill-card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000 !important; }
        
        /* Removed .project-card:hover transform since TiltCard handles it now */

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-grid .buttons-row { justify-content: center; }
          .hero-illustration { max-width: 300px; margin: 0 auto; }
          .outline-text { -webkit-text-stroke: 1.5px #000; }
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO & ABOUT ── */}
      <section id="about" style={{ paddingTop: "140px", paddingBottom: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", marginBottom: "80px" }} className="hero-grid">
          
          {/* Left Text */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, padding: "8px 16px", border: "2px solid #000", boxShadow: "4px 4px 0 #000" }}>
                <div style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%" }} />
                Available · 2nd Year · CS Student
              </span>
            </div>

            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.04em", margin: "0 0 24px" }}>
              Hi, I'm Garv Tanwar.<br/>
              I build <span className="outline-text" style={{ fontWeight: 900, fontFamily: "'Inter', sans-serif" }}>things</span> for the web.
            </h1>
            
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6b7280", lineHeight: 1.6, maxWidth: "540px", margin: "0 0 40px", fontWeight: 500 }}>
              Software & Web Developer in my second year of B.Tech CS. I write clean code, build real projects, and care about getting the details right — from the first line of HTML to a working deployment.
            </p>

            <div className="buttons-row" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
              <SharpBtn variant="primary" href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}}>
                View My Work →
              </SharpBtn>
              <SharpBtn variant="outline" href="/resume.pdf" download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                Download Resume
              </SharpBtn>
            </div>

            <div className="buttons-row" style={{ display: "flex", gap: "16px" }}>
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>, link: "mailto:garvt957@gmail.com" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>, link: "https://www.linkedin.com/in/garv-tanwar-2013443aa/" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>, link: "https://github.com/Garvvv9887" }
              ].map((s, i) => (
                <SharpBtn key={i} variant="square" href={s.link}>
                  {s.icon}
                </SharpBtn>
              ))}
            </div>
          </div>

          {/* Right Illustration with 3D Tilt */}
          <div className="hero-illustration">
            <TiltCard maxRotation={8} scale={1.03}>
              <FlatIllustration />
            </TiltCard>
          </div>
        </div>

        {/* About Text Block */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 2rem", borderTop: "2px solid #000", width: "100%" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 900, marginBottom: "24px", textTransform: "uppercase" }}>About Me</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: 1.7, color: "#4b5563" }}>
            <p>I'm Garv Tanwar, a second-year B.Tech Computer Science student with a genuine interest in building software that works — not just demos that look good. I started with the fundamentals and kept going: picking up new tools, shipping real projects, and learning what it actually takes to go from an idea to something live on the internet.</p>
            <p>I like clean interfaces, well-structured code, and the process of breaking a problem into something solvable. When I'm not coding, I'm usually reading about how things are built or exploring the next thing I want to learn.</p>
            <p style={{ fontWeight: 600, color: "#000" }}>Currently looking for internships and collaborative projects where I can contribute, learn fast, and build something meaningful.</p>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 0", borderTop: "2px solid #000" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", alignItems: "start" }} className="edu-grid">
            {/* Stats Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ padding: "32px", border: "2px solid #000", boxShadow: "6px 6px 0 #000", background: "#fff" }}>
                <h3 style={{ fontSize: "3rem", fontWeight: 900, fontFamily: "'Inter', sans-serif", margin: "0 0 8px", lineHeight: 1 }}>5+</h3>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7280", margin: 0, textTransform: "uppercase" }}>Technologies</p>
              </div>
              <div style={{ padding: "32px", border: "2px solid #000", boxShadow: "6px 6px 0 #000", background: "#fff" }}>
                <h3 style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "'Inter', sans-serif", margin: "0 0 8px", lineHeight: 1 }}>2nd</h3>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7280", margin: 0, textTransform: "uppercase" }}>Year, B.Tech CS</p>
              </div>
            </div>

            {/* Categories Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { title: "Languages", items: "HTML, CSS, JavaScript, C, C++, SQL" },
                { title: "Frontend", items: "Responsive Design" },
                { title: "Backend & DB", items: "Node.js, SQL, PostgreSQL" },
                { title: "Tools & Infra", items: "Git, GitHub, VS Code, Vercel" }
              ].map(cat => (
                <div key={cat.title} style={{ padding: "24px", border: "2px solid #000", background: "#f9fafb" }}>
                  <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 800, margin: "0 0 12px", textTransform: "uppercase" }}>{cat.title}</h4>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", margin: 0, color: "#4b5563", lineHeight: 1.6 }}>{cat.items}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 0", borderTop: "2px solid #000", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 60px", textTransform: "uppercase" }}>
            Featured <span className="outline-text">Work</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
            {projects.map(p => <ProjectCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & CERTIFICATIONS ── */}
      <section id="education" style={{ padding: "100px 0", borderTop: "2px solid #000" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          
          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
            {/* Education Column */}
            <div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 40px", textTransform: "uppercase" }}>
                Edu<span className="outline-text">cation</span>
              </h2>
              <div>
                {education.map(e => <InfoCard key={e.title} {...e} />)}
              </div>
            </div>

            {/* Certifications Column */}
            <div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 40px", textTransform: "uppercase" }}>
                Certi<span className="outline-text">fications</span>
              </h2>
              <div>
                {certifications.map(c => <InfoCard key={c.title} {...c} />)}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "120px 0", borderTop: "2px solid #000", background: "#f9fafb" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 24px" }}>
              Let's <span className="outline-text">build</span> something together.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#4b5563", lineHeight: 1.6, fontWeight: 500, maxWidth: "600px", margin: "0 auto" }}>
              Open to internships, freelance work, and collaborative projects. If you have an idea or an opportunity, I'd love to hear about it.
            </p>
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: "20px", background: "#fff", padding: "40px", border: "2px solid #000", boxShadow: "8px 8px 0 #000" }} onSubmit={e => e.preventDefault()}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700 }}>Name</label>
              <input type="text" placeholder="Your Name" style={{ padding: "16px", border: "2px solid #000", fontFamily: "'Inter', sans-serif", fontSize: "16px", outline: "none", borderRadius: 0 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700 }}>Email</label>
              <input type="email" placeholder="your@email.com" style={{ padding: "16px", border: "2px solid #000", fontFamily: "'Inter', sans-serif", fontSize: "16px", outline: "none", borderRadius: 0 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700 }}>Details</label>
              <textarea placeholder="Tell me about your project..." rows={5} style={{ padding: "16px", border: "2px solid #000", fontFamily: "'Inter', sans-serif", fontSize: "16px", outline: "none", resize: "vertical", borderRadius: 0 }} />
            </div>
            <SharpBtn variant="primary" style={{ marginTop: "16px", fontSize: "16px", padding: "16px" }}>
              Send Message
            </SharpBtn>
          </form>

        </div>
      </section>

      <footer style={{ borderTop: "2px solid #000", padding: "32px 0", textAlign: "center", background: "#fff" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 600 }}>
          © {new Date().getFullYear()} Garv Tanwar. All rights reserved.
        </p>
      </footer>
    </>
  );
}
