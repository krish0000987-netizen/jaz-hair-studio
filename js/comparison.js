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
      beforeImage.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
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
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      if (clientX === null) return;
      const rect = container.getBoundingClientRect();
      const xPos = clientX - rect.left;
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
