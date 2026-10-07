/* ==========================================================================
   MOMIN PORTFOLIO - VANILLA JS APPLICATION (100% OFFLINE & BULLETPROOF)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DATA DEFINITIONS ---
  const SELECTED_PROJECTS = [
    {
      id: 'future',
      title: 'Future',
      subtitle: 'Autonomous Supercar Experience',
      category: '// 3D GRAPHICS / WEBGL',
      image: 'assets/images/project_car.jpg',
      tags: ['WebGL', 'Three.js', 'Motion', 'Automotive']
    },
    {
      id: 'seeson',
      title: 'Seeson',
      subtitle: 'High-Fashion E-Commerce Platform',
      category: '// BRANDING / UI/UX',
      image: 'assets/images/template_portz.jpg',
      tags: ['E-Commerce', 'Brand Strategy', 'React', 'Motion']
    },
    {
      id: 'nexopay',
      title: 'NexoPay',
      subtitle: 'Next-Gen Crypto & Web3 Dashboard',
      category: '// FINTECH / WEB3',
      image: 'assets/images/template_agency.jpg',
      tags: ['Web3', 'Crypto', 'Dashboard', 'Fintech']
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
      description: 'Immersive, responsive website experiences built with fluid animations, high frame rates, and accessible interactive interfaces.',
      checklist: [
        'Custom Motion Systems',
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

  // --- 2. CUSTOM GLOW CURSOR ---
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('customCursorFollower');

  if (cursor && follower) {
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    };
    requestAnimationFrame(animateFollower);
  }

  // --- 3. TOAST NOTIFICATIONS ---
  const toast = document.getElementById('toastNotification');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => { toast.style.display = 'none'; }, 300);
    }, 3000);
  };

  // --- 4. HEADER: STICKY, CLOCK, COPY EMAIL ---
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  const liveClock = document.getElementById('liveClock');
  const updateClock = () => {
    if (!liveClock) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    liveClock.textContent = `CUP ${hrs}:${mins}:${secs}`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  const emailBtn = document.getElementById('headerEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('MOMINMAJEED123@GMAIL.COM').then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('MOMINMAJEED123@GMAIL.COM');
      });
    });
  }

  // --- 5. FLOATING BUTTONS ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const gearBtn = document.getElementById('gearBtn');
  const themeDrawer = document.getElementById('themeDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  if (gearBtn && themeDrawer) {
    gearBtn.addEventListener('click', () => {
      themeDrawer.style.display = themeDrawer.style.display === 'none' ? 'flex' : 'none';
    });
  }
  if (closeDrawerBtn && themeDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      themeDrawer.style.display = 'none';
    });
  }

  // Color Swatch Selection
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  swatchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.getAttribute('data-color');
      const glow = btn.getAttribute('data-glow');

      document.documentElement.style.setProperty('--accent-color', color);
      document.documentElement.style.setProperty('--accent-glow', glow);
      document.documentElement.style.setProperty('--accent-dim', color + '22');
      showToast(`Theme updated to ${btn.title}!`);
    });
  });

  // --- 6. MOBILE OVERLAY MENU ---
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.style.display = 'flex';
    });
  }
  const closeMobile = () => {
    if (mobileMenu) mobileMenu.style.display = 'none';
  };
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobile);
  mobileNavLinks.forEach((link) => link.addEventListener('click', closeMobile));

  // --- 7. START PROJECT MODAL ---
  const projectModal = document.getElementById('projectModal');
  const openModalTriggers = document.querySelectorAll('.open-modal-trigger');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const projectForm = document.getElementById('projectForm');

  openModalTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (projectModal) projectModal.style.display = 'flex';
    });
  });

  if (closeModalBtn && projectModal) {
    closeModalBtn.addEventListener('click', () => {
      projectModal.style.display = 'none';
    });
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.style.display = 'none';
      }
    });
  }

  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submitInquiryBtn');
      const origText = submitBtn ? submitBtn.textContent : 'SEND INQUIRY TO CLOUD →';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving to Google Cloud... ⏳';
      }

      const formObj = new FormData(projectForm);
      const nameVal = (formObj.get('name') || document.getElementById('inquiryName')?.value || '').trim();
      const emailVal = (formObj.get('email') || document.getElementById('inquiryEmail')?.value || '').trim();
      const categoryVal = formObj.get('category') || document.getElementById('inquiryCategory')?.value || 'Web Design & Motion';
      const messageVal = (formObj.get('message') || document.getElementById('inquiryMessage')?.value || '').trim();

      if (!nameVal || !emailVal || !messageVal) {
        alert('⚠️ Please enter Name, Email, and Message before submitting!');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
        }
        return;
      }

      console.log('Sending data to Firebase:', { name: nameVal, email: emailVal, category: categoryVal, message: messageVal });

      try {
        if (window.cloudDb) {
          await window.cloudDb.collection('inquiries').add({
            name: nameVal,
            email: emailVal,
            category: categoryVal,
            message: messageVal,
            createdAt: typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
          });
          showToast('Success! Saved to Google Cloud Database.');
          alert(`✅ SUCCESS! Saved to Google Cloud:\nName: ${nameVal}\nEmail: ${emailVal}\nService: ${categoryVal}`);
        } else if (window.firebaseDb && window.firebaseAddDoc && window.firebaseCollection) {
          await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDb, 'inquiries'), {
            name: nameVal,
            email: emailVal,
            category: categoryVal,
            message: messageVal,
            createdAt: window.firebaseServerTimestamp ? window.firebaseServerTimestamp() : new Date().toISOString()
          });
          showToast('Success! Saved to Google Cloud Database.');
          alert('✅ SUCCESS! Your project inquiry has been saved to Google Cloud Database.');
        } else {
          alert('⚠️ Firebase is still loading or offline. Please refresh the page and try again!');
          showToast('Connecting to Cloud... Please refresh & try again.');
        }
      } catch (err) {
        console.error('Cloud Firestore Error:', err);
        alert('❌ Firebase Error: ' + (err.message || 'Check network / rules'));
        if (err && (err.code === 'permission-denied' || (err.message && err.message.includes('permission')))) {
          showToast('Error: Permission Denied! Check Firebase Rules.');
        } else {
          showToast('Error saving: ' + (err.message || 'Check connection'));
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
        }
        if (projectModal) projectModal.style.display = 'none';
        projectForm.reset();
      }
    });
  }

  // --- 8. SELECTED WORKS INTERACTION ---
  const projectButtons = document.querySelectorAll('.project-item-btn');
  const billboardImg = document.getElementById('billboardImg');
  const billboardTitle = document.getElementById('billboardTitle');
  const billboardTags = document.getElementById('billboardTags');

  projectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const index = parseInt(btn.getAttribute('data-index'), 10);
      const proj = SELECTED_PROJECTS[index];
      if (proj && billboardImg && billboardTitle && billboardTags) {
        billboardImg.style.opacity = '0';
        billboardImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
          billboardImg.src = proj.image;
          billboardImg.alt = proj.title;
          billboardTitle.textContent = proj.subtitle;
          billboardTags.innerHTML = proj.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('');
          billboardImg.style.opacity = '1';
          billboardImg.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // --- 9. FEATURED TEMPLATES FILTER ---
  const filterChips = document.querySelectorAll('#templatesFilterBar .filter-chip');
  const templateCards = document.querySelectorAll('#templatesGrid .template-card');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      templateCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'ALL' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 10. SERVICES TAB SWITCHER ---
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const servicePreviewImg = document.getElementById('servicePreviewImg');
  const serviceTitle = document.getElementById('serviceTitle');
  const serviceDesc = document.getElementById('serviceDesc');
  const serviceChecklist = document.getElementById('serviceChecklist');

  serviceTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      serviceTabBtns.forEach((b) => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-secondary)';
      });
      tabBtn.style.background = 'var(--accent-color)';
      tabBtn.style.color = '#000';

      const idx = parseInt(tabBtn.getAttribute('data-index'), 10);
      const srv = SERVICES_DATA[idx];
      if (srv && servicePreviewImg && serviceTitle && serviceDesc && serviceChecklist) {
        servicePreviewImg.style.opacity = '0';
        setTimeout(() => {
          servicePreviewImg.src = srv.image;
          servicePreviewImg.alt = srv.title;
          serviceTitle.textContent = srv.title;
          serviceDesc.textContent = srv.description;
          serviceChecklist.innerHTML = srv.checklist
            .map((item) => `<li><span class="slash">//</span> ${item}</li>`)
            .join('');
          servicePreviewImg.style.opacity = '1';
        }, 150);
      }
    });
  });
});
