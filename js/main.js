/**
 * JAZ HAIR STUDIO — CORE LOGIC
 * Sticky header, mobile navigation, FAQ accordion, booking form & WhatsApp bridge.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-drawer-overlay');

  function toggleMobileMenu(open) {
    if (!mobileToggle || !mobileDrawer) return;
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    mobileToggle.classList.toggle('open', shouldOpen);
    mobileDrawer.classList.toggle('open', shouldOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('open', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 3. Active Nav Link Detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items in same accordion
      const parentAccordion = item.closest('.faq-accordion');
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherTrigger = other.querySelector('.faq-trigger');
            const otherContent = other.querySelector('.faq-content');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 5. Booking & Home Service Forms WhatsApp Bridge
  const forms = document.querySelectorAll('form[data-whatsapp-form]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || 'Valued Client';
      const phone = form.querySelector('[name="phone"]')?.value || 'Not provided';
      const service = form.querySelector('[name="service"]')?.value || 'Hair Patch Consultation';
      const date = form.querySelector('[name="date"]')?.value || 'Flexible';
      const time = form.querySelector('[name="time"]')?.value || 'Flexible';
      const location = form.querySelector('[name="location"]')?.value || 'Studio (Cheeta Camp, Trombay)';
      const message = form.querySelector('[name="message"]')?.value || 'None';

      const isHomeService = form.getAttribute('data-whatsapp-form') === 'home-service';

      const waText = `*JAZ Hair Studio ${isHomeService ? 'Home Service' : 'Consultation'} Booking Request*
-----------------------------
*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Preferred Date:* ${date}
*Preferred Time:* ${time}
*Location/Area:* ${location}
*Notes/Message:* ${message}
-----------------------------
(Sent from JAZ Hair Studio Website)`;

      const encodedMsg = encodeURIComponent(waText);
      const waUrl = `https://wa.me/917019136131?text=${encodedMsg}`;

      // Show success toast
      let toast = form.querySelector('.form-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'form-toast active';
        form.prepend(toast);
      } else {
        toast.classList.add('active');
      }

      toast.innerHTML = `<strong>Thank you, ${name}!</strong> Your request has been prepared. Opening WhatsApp to connect with our master specialist immediately...`;

      // Redirect to WhatsApp in a new tab
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    });
  });
});
