/**
 * JAZ HAIR STUDIO — BEFORE/AFTER COMPARISON SLIDER
 * Supports mouse drag, range slider input, touch swipe, and accessibility.
 */
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.before-after-container');

  containers.forEach(container => {
    const beforeImage = container.querySelector('.ba-image-before');
    const handle = container.querySelector('.ba-handle');
    const rangeSlider = container.querySelector('.ba-range-slider');

    if (!beforeImage || !handle) return;

    function setPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      beforeImage.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      if (rangeSlider) rangeSlider.value = clamped;
    }

    if (rangeSlider) {
      rangeSlider.addEventListener('input', (e) => {
        setPosition(e.target.value);
      });
    }

    // Direct click/drag on container
    let isDragging = false;

    function handleMove(e) {
      if (!isDragging && e.type !== 'click') return;
      const rect = container.getBoundingClientRect();
      const pageX = e.pageX || (e.touches && e.touches[0].pageX);
      if (!pageX) return;
      const xPos = pageX - rect.left - window.scrollX;
      const percent = (xPos / rect.width) * 100;
      setPosition(percent);
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) handleMove(e);
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      handleMove(e);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging) handleMove(e);
    }, { passive: true });

    // Initial position
    setPosition(50);
  });
});
