import { useEffect, useRef } from 'react';

const projects = [
  {
    href: 'https://gazonclub.ru/',
    image: '/img/gazonclub_preview.png',
    alt: 'Рулонные газоны',
    title: 'gazonclub',
  },
  {
    href: 'https://mos.gallery/',
    image: '/img/gallery_preview.png',
    alt: 'Первая Московская Галерея Восточной Живописи',
    title: 'Первая Московская Галерея Восточной Живописи',
  },
  {
    href: 'https://medstyle.ru/',
    image: '/img/med_preview.png',
    alt: 'MedStyle',
    title: 'medstyle',
  },
  {
    href: 'https://misterprof.ru/',
    image: '/img/mrproff.webp',
    alt: 'MisterProf',
    title: 'misterprof',
  },
  {
    href: 'https://waveanapa.ru/',
    image: '/img/waveanapa.png',
    alt: 'waveanapa',
    title: 'waveanapa',
  },
  {
    href: 'https://www.chilloutplanet.ru/',
    image: '/img/genesis_preview.png',
    alt: 'Chillout Planet',
    title: 'chilloutplanet',
  },
  {
    href: 'https://metokrep.ru/',
    image: '/img/metokrep_preview.png',
    alt: 'Метокреп — металлокрепёж',
    title: 'metokrep',
  },
  {
    href: 'https://mosyachtflot.ru/',
    image: '/img/yacht_preview.png',
    alt: 'Московская Яхтенная Флотилия',
    title: 'Московская Яхтенная Флотилия',
  },
   {
    href: 'https://fantom4ik55.github.io/House-Staff/',
    image: '/img/housestaff.png',
    alt: 'housestaff',
    title: 'housestaff',
  },
];

function Carousel() {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!track || !viewport || !prevBtn || !nextBtn) return;

    const originalSlides = Array.from(track.children);
    const slideCount = originalSlides.length;

    if (slideCount < 2) return;

    // Копии для бесконечной прокрутки
    originalSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
      track.appendChild(clone);
    });

    for (let i = originalSlides.length - 1; i >= 0; i--) {
      const clone = originalSlides[i].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
      track.insertBefore(clone, track.firstChild);
    }

    let currentIndex = slideCount;
    let isTransitioning = false;
    let autoplayTimer = null;
    let isPaused = false;

    const duration = '0.2s';
    const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const autoplayInterval = 5000;
    const pauseOnHover = true;

    function getGap() {
      const styles = window.getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap) || 0;
    }

    function updatePosition(animate = true) {
      const firstSlide = track.children[0];
      if (!firstSlide) return;

      const slideWidth = firstSlide.getBoundingClientRect().width;
      const gap = getGap();

      track.style.transition = animate
        ? `transform ${duration} ${easing}`
        : 'none';

      track.style.transform =
        `translateX(${-currentIndex * (slideWidth + gap)}px)`;
    }

    function goNext() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex += 1;
      updatePosition(true);
    }

    function goPrev() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex -= 1;
      updatePosition(true);
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

    function startAutoplay() {
      stopAutoplay();

      if (autoplayInterval <= 0) return;

      autoplayTimer = window.setInterval(() => {
        if (!isPaused && !isTransitioning) goNext();
      }, autoplayInterval);
    }

    function stopAutoplay() {
      if (autoplayTimer !== null) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function handleNextClick() {
      goNext();
      startAutoplay();
    }

    function handlePrevClick() {
      goPrev();
      startAutoplay();
    }

    function handleMouseEnter() {
      isPaused = true;
    }

    function handleMouseLeave() {
      isPaused = false;
    }

    function handleVisibilityChange() {
      isPaused = document.hidden;
    }

    track.addEventListener('transitionend', handleTransitionEnd);
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);

    if (pauseOnHover) {
      viewport.addEventListener('mouseenter', handleMouseEnter);
      viewport.addEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', updatePosition);

    updatePosition(false);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!reducedMotion) startAutoplay();

    // Убираем обработчики и таймер при размонтировании компонента
    return () => {
      stopAutoplay();

      track.removeEventListener('transitionend', handleTransitionEnd);
      nextBtn.removeEventListener('click', handleNextClick);
      prevBtn.removeEventListener('click', handlePrevClick);
      viewport.removeEventListener('mouseenter', handleMouseEnter);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );
      window.removeEventListener('resize', updatePosition);

      track.style.transition = '';
      track.style.transform = '';

      // Удаляем созданные клоны, чтобы корректно работал React StrictMode
      track.querySelectorAll('[aria-hidden="true"]').forEach((clone) => {
        clone.remove();
      });
    };
  }, []);

  return (
    <section className="carousel" id="projects">
      <h2 className="carousel__title">
        Избранные <em className="carousel__title-accent">проекты</em>
      </h2>

      <div className="carousel__viewport" ref={viewportRef}>
        <div className="carousel__track" ref={trackRef}>
          {projects.map((project) => (
            <div className="carousel__item" key={project.href}>
              <div className="carousel__item-bg" />
              <div className="carousel__item-content">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    title={project.title}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          ref={prevBtnRef}
          className="carousel__button carousel__button--prev"
          type="button"
          aria-label="Предыдущий проект"
        >
          <svg
            className="carousel__button-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          ref={nextBtnRef}
          className="carousel__button carousel__button--next"
          type="button"
          aria-label="Следующий проект"
        >
          <svg
            className="carousel__button-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Carousel;