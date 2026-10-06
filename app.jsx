/* ==========================================================================
   MOMIN PORTFOLIO - FRAMER MOTION REACT APPLICATION
   ========================================================================== */

const { useState, useEffect, useRef } = React;
const MotionLib = window.Motion || window.FramerMotion || {};
const { motion, AnimatePresence, useScroll, useTransform, useSpring } = MotionLib;

// --- ACCENT COLOR SYSTEM ---
const COLOR_PALETTES = [
  { name: 'Neon Green', hex: '#00ff66', glow: 'rgba(0, 255, 102, 0.4)' },
  { name: 'Electric Cyan', hex: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
  { name: 'Cyber Purple', hex: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Laser Amber', hex: '#ffb703', glow: 'rgba(255, 183, 3, 0.4)' }
];

// --- DATA DEFINITIONS ---
const SELECTED_PROJECTS = [
  {
    id: 'future',
    title: 'Future',
    subtitle: 'Autonomous Supercar Experience',
    category: '3D GRAPHICS / WEBGL',
    year: '2025',
    image: 'assets/images/project_car.jpg',
    tags: ['WebGL', 'Three.js', 'Framer Motion', 'Automotive']
  },
  {
    id: 'seeson',
    title: 'Seeson',
    subtitle: 'High-Fashion E-Commerce Platform',
    category: 'BRANDING / UI/UX',
    year: '2025',
    image: 'assets/images/template_portz.jpg',
    tags: ['E-Commerce', 'Brand Strategy', 'React', 'Motion']
  },
  {
    id: 'nexopay',
    title: 'NexoPay',
    subtitle: 'Next-Gen Crypto & Web3 Dashboard',
    category: 'FINTECH / WEB3',
    year: '2024',
    image: 'assets/images/template_agency.jpg',
    tags: ['Web3', 'Crypto', 'Dashboard', 'Fintech']
  }
];

const TEMPLATES = [
  {
    id: 'portz',
    title: 'Alexander Portz',
    category: 'BRANDING',
    year: '2025',
    image: 'assets/images/template_portz.jpg',
    description: 'Minimalist high-impact dark mode creative portfolio design system.'
  },
  {
    id: 'agency',
    title: 'Creative Digital Agency',
    category: 'VISUAL IDENTITY',
    year: '2025',
    image: 'assets/images/template_agency.jpg',
    description: 'Futuristic Web3 digital design agency website with neon 3D elements.'
  }
];

const SERVICES_DATA = [
  {
    id: 'branding',
    title: 'Branding',
    image: 'assets/images/service_branding.jpg',
    description: 'I create distinctive brand identities through strategy and visual design, helping businesses stand out, connect with audiences, and leave a lasting impression.',
    checklist: [
      'Brand Strategy',
      'Visual Identity Design',
      'Logo & Typography',
      'Color Palette Creation',
      'Brand Guidelines'
    ]
  },
  {
    id: 'web-design',
    title: 'Web Design & Motion',
    image: 'assets/images/template_agency.jpg',
    description: 'Immersive, responsive website experiences built with fluid Framer Motion animations, high frame rates, and accessible interactive interfaces.',
    checklist: [
      'Custom Framer Motion Systems',
      'Responsive Web Architecture',
      'UI/UX Prototyping',
      'Performance Optimization',
      'Design Systems'
    ]
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    image: 'assets/images/template_portz.jpg',
    description: 'Crafting cohesive visual eco-systems across digital, print, and interactive media that reflect modern luxury aesthetics and tech excellence.',
    checklist: [
      'Art Direction',
      '3D Visuals & Assets',
      'Motion Design',
      'Design Specs',
      'Interactive Guidelines'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: 'S1',
    icon: 'assets/images/sphere_1.jpg',
    title: 'Discover the Essence that drives your brand',
    description: 'I begin by clarifying your goals, audience, and market fit. The insights gathered set a clear direction and define what makes your vision unique.',
    highlighted: false
  },
  {
    step: 'S2',
    icon: 'assets/images/sphere_2.jpg',
    title: 'Design Bold Ideas with clear intention',
    description: 'I translate strategy into visual identity and page structure. Every visual element serves a purpose—clean, striking, and effective.',
    highlighted: false
  },
  {
    step: 'S3',
    icon: 'assets/images/sphere_3.jpg',
    title: 'Deliver with Speed and lasting impact',
    description: 'I build and launch your site in Framer, React, or Webflow, then hand over an easy editor. You stay in control with continuous support.',
    highlighted: true
  }
];

// --- MAIN APPLICATION ---
function App() {
  const [accentColor, setAccentColor] = useState('#00ff66');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // Update accent color CSS variable
  const changeThemeColor = (colorHex, glowHex) => {
    setAccentColor(colorHex);
    document.documentElement.style.setProperty('--accent-color', colorHex);
    document.documentElement.style.setProperty('--accent-glow', glowHex);
    document.documentElement.style.setProperty('--accent-dim', colorHex + '20');
  };

  // Cursor position listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast message handler
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Copy email handler
  const copyEmail = () => {
    navigator.clipboard.writeText('MOMINMAJEED123@GMAIL.COM');
    showToast('Email address copied to clipboard!');
  };

  return (
    <div className="portfolio-app">
      {/* Custom Glow Cursor */}
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />
      <div 
        className="custom-cursor-follower" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />

      {/* Ambient background glow */}
      <div className="ambient-aurora" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              background: 'var(--accent-color)',
              color: '#000',
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 20px var(--accent-glow)'
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Settings Gear Button */}
      <button 
        className="floating-gear-btn"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        title="Customize Theme & Animations"
      >
        ⚙
      </button>

      {/* Fixed Back to Top Button */}
      <button 
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to Top"
      >
        ▲
      </button>

      {/* HEADER NAVBAR */}
      <Header 
        isScrolled={isScrolled}
        onCopyEmail={copyEmail}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* MOBILE / OVERLAY NAVIGATION MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#070908',
              zIndex: 9999,
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justify-content: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="logo-brand">
                <div className="logo-icon">M</div>
                <span>MOMIN</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {['HOME', 'WORKS', 'SERVICES', 'ABOUT', 'BLOG', 'CONTACT'].map((item, idx) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '3rem',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: '700'
                    }}
                  >
                    <span style={{ color: 'var(--accent-color)', fontSize: '1.5rem', marginRight: '1rem' }}>0{idx + 1}</span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              MOMINMAJEED123@GMAIL.COM — AVAILABLE FOR 2025
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THEME CUSTOMIZATION DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="theme-drawer"
          >
            <div className="drawer-header">
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>Theme Settings</h3>
              <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)}>✕</button>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Accent Palette</p>
              <div className="color-swatch-grid">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.name}
                    className={`swatch-btn ${accentColor === pal.hex ? 'active' : ''}`}
                    style={{ background: pal.hex }}
                    onClick={() => changeThemeColor(pal.hex, pal.glow)}
                    title={pal.name}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT INQUIRY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Start A Project</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                showToast('Thank you! Your project inquiry has been received.');
              }}>
                <div className="form-group">
                  <label className="form-label">YOUR NAME</label>
                  <input type="text" className="form-input" placeholder="Momin" required />
                </div>
                <div className="form-group">
                  <label className="form-label">YOUR EMAIL</label>
                  <input type="email" className="form-input" placeholder="mominmajeed123@gmail.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">PROJECT DETAILS</label>
                  <textarea className="form-textarea" rows="4" placeholder="Tell me about your goals, timeline, and scope..." required></textarea>
                </div>
                <button type="submit" className="cta-btn-pill" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                  SEND INQUIRY →
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <Hero onStartProject={() => setIsModalOpen(true)} />

      {/* SELECTED WORKS SECTION */}
      <SelectedWorks 
        projects={SELECTED_PROJECTS}
        activeIndex={activeProjectIndex}
        onSelectProject={(idx) => setActiveProjectIndex(idx)}
      />

      {/* FEATURED TEMPLATES SECTION */}
      <FeaturedTemplates 
        templates={TEMPLATES}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* SERVICES SECTION */}
      <Services 
        services={SERVICES_DATA}
        activeTab={activeServiceTab}
        onSelectTab={(idx) => setActiveServiceTab(idx)}
      />

      {/* THE PROCESS SECTION */}
      <Process steps={PROCESS_STEPS} />

      {/* FOOTER & CONTACT */}
      <Footer onStartProject={() => setIsModalOpen(true)} />
    </div>
  );
}

// --- HEADER COMPONENT ---
function Header({ isScrolled, onCopyEmail, onOpenMenu }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`CUP ${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#" className="logo-brand">
        <div className="logo-icon">M</div>
      </a>

      <ul className="nav-links">
        <li className="nav-item"><a href="#home" className="active"><span className="num">01/</span> HOME</a></li>
        <li className="nav-item"><a href="#works"><span className="num">02/</span> WORKS</a></li>
        <li className="nav-item"><a href="#services"><span className="num">03/</span> SERVICES</a></li>
        <li className="nav-item"><a href="#about"><span className="num">04/</span> ABOUT</a></li>
        <li className="nav-item"><a href="#blog"><span className="num">05/</span> BLOG</a></li>
        <li className="nav-item"><a href="#contact"><span className="num">06/</span> CONTACT</a></li>
      </ul>

      <div className="header-right">
        <div className="meta-info">
          <a href="#copy" onClick={(e) => { e.preventDefault(); onCopyEmail(); }} className="meta-email">
            MOMINMAJEED123@GMAIL.COM
          </a>
          <div className="meta-clock">{timeStr || 'CUP 10:48:23'}</div>
        </div>

        <button className="menu-toggle-btn" onClick={onOpenMenu}>
          <span>≡</span> MENU
        </button>
      </div>
    </header>
  );
}

// --- HERO COMPONENT ---
function Hero({ onStartProject }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-container">
        <img src="assets/images/hero_bg.jpg" alt="Cyber Aurora Background" className="hero-bg-image" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-left-roles"
        >
          <div>WEB-DESIGNER</div>
          <div>BLOGGER</div>
          <div>TREND ANALYST</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-right-box"
        >
          <div className="availability-badge">
            <span className="status-dot" />
            AVAILABLE FOR WORK
            <span style={{ opacity: 0.5, marginLeft: '1rem' }}>© 2025</span>
          </div>

          <div className="hero-subtext-block">
            <p className="hero-description">
              I craft bold brands and modern websites with purpose. Each detail balances design and usability for impact. My work adapts as your vision grows.
            </p>
            <button className="cta-btn-pill" onClick={onStartProject}>
              START A PROJECT
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="hero-title-container"
      >
        <h1 className="hero-heading">
          MOMIN<span className="hero-cursor-block" />
        </h1>
      </motion.div>
    </section>
  );
}

// --- SELECTED WORKS COMPONENT ---
function SelectedWorks({ projects, activeIndex, onSelectProject }) {
  const currentProject = projects[activeIndex];

  return (
    <section id="works" className="section-padding">
      <div className="section-label">SELECTED WORKS</div>

      <div className="selected-works-container">
        {/* Left List */}
        <div className="project-list-left">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              className={`project-item-btn ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => onSelectProject(idx)}
            >
              <div className="project-item-title">{proj.title}</div>
              <div className="project-item-category">// {proj.category}</div>
            </button>
          ))}
        </div>

        {/* Right Billboard Display */}
        <div className="billboard-display-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%' }}
            >
              <img src={currentProject.image} alt={currentProject.title} className="billboard-image" />
              
              <div className="billboard-overlay-info">
                <div className="billboard-tags">
                  {currentProject.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>
                  {currentProject.subtitle}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- FEATURED TEMPLATES COMPONENT ---
function FeaturedTemplates({ templates, activeFilter, onFilterChange }) {
  return (
    <section className="section-padding" style={{ background: '#050706' }}>
      <div className="featured-header-row">
        <div>
          <div className="section-label">PORTFOLIO showcase</div>
          <h2 className="section-title-large" style={{ marginBottom: 0 }}>Featured Templates</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="filters-bar">
            {['ALL', 'BRANDING', 'VISUAL IDENTITY'].map((filter) => (
              <button
                key={filter}
                className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => onFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: '800', color: 'rgba(255,255,255,0.15)' }}>
            20<span style={{ color: 'var(--accent-color)' }}>25</span>
          </div>
        </div>
      </div>

      <div className="templates-grid">
        {templates.map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ y: -6 }}
            className="template-card"
          >
            <div className="template-img-wrapper">
              <img src={tpl.image} alt={tpl.title} className="template-img" />
              <div className="template-hover-badge">→</div>
            </div>
            <div className="template-meta">
              <div>
                <h3 className="template-title">{tpl.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{tpl.description}</p>
              </div>
              <span className="tag-pill" style={{ height: 'fit-content' }}>{tpl.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- SERVICES COMPONENT ---
function Services({ services, activeTab, onSelectTab }) {
  const currentService = services[activeTab];

  return (
    <section id="services" className="section-padding">
      <h2 className="section-title-large">Services</h2>

      <div className="services-layout">
        {/* Left Interactive Image Preview */}
        <div className="service-preview-card">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentService.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={currentService.image}
              alt={currentService.title}
              className="service-preview-img"
            />
          </AnimatePresence>
        </div>

        {/* Middle Details & Checklist */}
        <div className="service-list-details">
          {/* Tab Selector */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {services.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => onSelectTab(idx)}
                style={{
                  background: idx === activeTab ? 'var(--accent-color)' : 'transparent',
                  color: idx === activeTab ? '#000' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                0{idx + 1}. {srv.title}
              </button>
            ))}
          </div>

          <h3 className="service-title-text">{currentService.title}</h3>
          <p className="service-desc-text">{currentService.description}</p>

          <ul className="service-checklist">
            {currentService.checklist.map((item) => (
              <li key={item}>
                <span className="slash">//</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// --- PROCESS COMPONENT ---
function Process({ steps }) {
  return (
    <section className="section-padding" style={{ background: '#050706' }}>
      <h2 className="section-title-large">The Process</h2>

      <div className="process-grid">
        {steps.map((st, idx) => (
          <motion.div
            key={st.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -8 }}
            className={`process-card ${st.highlighted ? 'highlighted' : ''}`}
          >
            <div>
              <div className="process-card-icon">
                <img src={st.icon} alt={st.step} />
              </div>
              <h3 className="process-card-title">{st.title}</h3>
              <p className="process-card-desc">{st.description}</p>
            </div>

            <div className="process-card-watermark">{st.step}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- FOOTER COMPONENT ---
function Footer({ onStartProject }) {
  return (
    <footer id="contact" className="section-padding" style={{ borderTop: '1px solid var(--border-color)', paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem auto' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>LET'S WORK TOGETHER</div>
        <h2 className="section-title-large" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          Let's Create Something Extraordinary<span style={{ color: 'var(--accent-color)' }}>_</span>
        </h2>
        <button 
          className="cta-btn-pill" 
          onClick={onStartProject}
          style={{ fontSize: '1rem', padding: '1rem 2.5rem', marginTop: '2rem' }}
        >
          START A PROJECT →
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        justify-content: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="logo-brand">
          <div className="logo-icon" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>M</div>
          <span>MOMIN</span>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="https://github.com/Mominmajeed" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GITHUB</a>
          <a href="https://x.com/MominMajee301" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>TWITTER/X</a>
          <a href="https://www.linkedin.com/in/momin-majeed-58288539a/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
          <a href="https://dribbble.com/majeedmomin0" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>DRIBBBLE</a>
        </div>

        <div>© 2025 MOMIN PORTFOLIO. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}

// --- RENDER REACT APP ---
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
