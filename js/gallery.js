/**
 * JAZ HAIR STUDIO — GALLERY FILTER & FULLSCREEN LIGHTBOX
 */
document.addEventListener('DOMContentLoaded', () => {
  // Gallery Filter Tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // Lightbox Modal
  const lightbox = document.querySelector('.lightbox-modal');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentGalleryList = [];
  let currentIndex = 0;

  function updateLightboxList() {
    currentGalleryList = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    updateLightboxList();
    if (!currentGalleryList[index]) return;

    currentIndex = index;
    const targetItem = currentGalleryList[currentIndex];
    const img = targetItem.querySelector('img');
    const title = targetItem.querySelector('.gallery-title') ? targetItem.querySelector('.gallery-title').innerText : '';
    const tag = targetItem.querySelector('.gallery-tag') ? targetItem.querySelector('.gallery-tag').innerText : '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'JAZ Hair Studio Gallery';
    lightboxCaption.innerHTML = `<strong>${title}</strong> ${tag ? '— ' + tag : ''}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    updateLightboxList();
    if (!currentGalleryList.length) return;
    currentIndex = (currentIndex + 1) % currentGalleryList.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    updateLightboxList();
    if (!currentGalleryList.length) return;
    currentIndex = (currentIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      updateLightboxList();
      const idx = currentGalleryList.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});
