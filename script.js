 const track = document.getElementById('track');
  const viewport = document.querySelector('.carousel__viewport');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const originalSlides = Array.from(track.children);
  const slideCount = originalSlides.length;

  originalSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('carousel__item--clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  for (let i = originalSlides.length - 1; i >= 0; i--) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add('carousel__item--clone');
    clone.setAttribute('aria-hidden', 'true');
    track.insertBefore(clone, track.firstChild);
  }

  let currentIndex = slideCount;
  let slideWidth = 0;
  let gap = 0;
  let isTransitioning = false;

  const gapFromCss = 24;
  const durationFromCss = '0.4s';
  const easingFromCss = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  const autoplayInterval = 5000;
  const pauseOnHover = true;

  function calculateDimensions() {
    if (track.children.length === 0) return;
    slideWidth = track.children[0].getBoundingClientRect().width;
    gap = gapFromCss || 0;
    updatePosition(false);
  }

  function updatePosition(animate = true) {
    if (animate) {
      track.style.transition = `transform ${durationFromCss} ${easingFromCss}`;
    } else {
      track.style.transition = 'none';
    }
    const offset = -currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(${offset}px)`;
  }

  function handleTransitionEnd() {
    isTransitioning = false;
    if (currentIndex >= slideCount * 2) {
      currentIndex = slideCount;
      updatePosition(false);
    } else if (currentIndex < slideCount) {
      currentIndex = slideCount * 2 - 1;
      updatePosition(false);
    }
  }

  track.addEventListener('transitionend', handleTransitionEnd);

  function goNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  }
  function goPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  }

  let autoplayTimer = null;
  let isPaused = false;

  function startAutoplay() {
    stopAutoplay();
    if (autoplayInterval <= 0) return;
    autoplayTimer = setInterval(() => {
      if (!isPaused && !isTransitioning) goNext();
    }, autoplayInterval);
  }
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  function restartAutoplay() {
    if (autoplayTimer) startAutoplay();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    startAutoplay();

    if (pauseOnHover) {
      viewport.addEventListener('mouseenter', () => { isPaused = true; });
      viewport.addEventListener('mouseleave', () => { isPaused = false; });
    }

    document.addEventListener('visibilitychange', () => {
      isPaused = document.hidden;
    });
  }

  nextBtn.addEventListener('click', () => { goNext(); restartAutoplay(); });
  prevBtn.addEventListener('click', () => { goPrev(); restartAutoplay(); });

  window.addEventListener('load', () => {
    calculateDimensions();
    setTimeout(() => {
      calculateDimensions();
      updatePosition(false);
    }, 50);
  });
  window.addEventListener('resize', () => {
    calculateDimensions();
    updatePosition(false);
  });

  const formFields = document.querySelectorAll('.contact__input, .contact__textarea');

  formFields.forEach(field => {
    const group = field.closest('.contact__form-group');
    if (!group) return;

    const updateState = () => {
      if (field.value.trim() !== '') {
        group.classList.add('contact__form-group--filled');
      } else {
        group.classList.remove('contact__form-group--filled');
      }
    };

    field.addEventListener('input', updateState);
    field.addEventListener('change', updateState);
    field.addEventListener('blur', updateState);
    updateState();
  });

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'ОТПРАВКА...';
    formStatus.className = 'contact__status';
    formStatus.textContent = '';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '✓ Сообщение отправлено! Я свяжусь с вами скоро.';
        formStatus.classList.add('contact__status--success');
        form.reset();
        document.querySelectorAll('.contact__form-group--filled')
          .forEach(g => g.classList.remove('contact__form-group--filled'));

        setTimeout(() => {
          formStatus.className = 'contact__status';
          formStatus.textContent = '';
        }, 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          formStatus.textContent = 'Ошибка: ' + data.errors.map(err => err.message).join(', ');
        } else {
          formStatus.textContent = 'Ошибка отправки. Попробуйте позже.';
        }
        formStatus.classList.add('contact__status--error');
      }
    } catch (error) {
      formStatus.textContent = 'Ошибка сети. Проверьте подключение и попробуйте снова.';
      formStatus.classList.add('contact__status--error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'ОТПРАВИТЬ →';
    }
  });