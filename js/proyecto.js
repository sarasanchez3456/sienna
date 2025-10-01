document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('menu');
  const closeButton = document.getElementById('rayas-menu');
  const menuBackground = document.getElementById('menu-background');

  if (menuToggle && sideMenu && closeButton && menuBackground) {

    menuToggle.addEventListener('click', () => {
      sideMenu.classList.add('open');
      menuBackground.classList.add('show');
    });

    const closeSideMenu = () => {
      sideMenu.classList.remove('open');
      menuBackground.classList.remove('show');
    };

    closeButton.addEventListener('click', closeSideMenu);
    menuBackground.addEventListener('click', closeSideMenu);
  }

  const videoElement = document.querySelector('.hero video');
  const volumeWrapper = document.getElementById('volumen');

  if (videoElement && volumeWrapper) {
    const volumeIcon = volumeWrapper.querySelector('ion-icon');

    const updateVolumeIcon = () => {
      if (videoElement.muted) {
        volumeIcon.setAttribute('name', 'volume-mute-outline');
      } else {
        volumeIcon.setAttribute('name', 'volume-medium-outline');
      }
    };

    volumeWrapper.addEventListener('click', () => {
      videoElement.muted = !videoElement.muted;
      updateVolumeIcon();
    });

    updateVolumeIcon();
  }


  const passwordInput = document.getElementById('password');
  const togglePasswordWrapper = document.getElementById('togglePassword');

  if (passwordInput && togglePasswordWrapper) {
    const toggleIcon = togglePasswordWrapper.querySelector('ion-icon');

    const setPasswordVisibility = (visible) => {
      if (visible) {
        passwordInput.type = 'text';
        toggleIcon.setAttribute('name', 'eye-off-outline');
        togglePasswordWrapper.setAttribute('aria-pressed', 'true');
      } else {
        passwordInput.type = 'password';
        toggleIcon.setAttribute('name', 'eye-outline');
        togglePasswordWrapper.setAttribute('aria-pressed', 'false');
      }
    };

    togglePasswordWrapper.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      setPasswordVisibility(isPassword);
    });

    togglePasswordWrapper.setAttribute('role', 'button');
    togglePasswordWrapper.setAttribute('tabindex', '0');
    togglePasswordWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePasswordWrapper.click();
      }
    });
  }

  (function initCarousel() {
    const slider = document.getElementById('miSlider');
    if (!slider) return;

    const slidesContainer = slider.querySelector('.slides');
    const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('[data-action="prev"]');
    const nextBtn = slider.querySelector('[data-action="next"]');
    const dots = Array.from(slider.querySelectorAll('.nav-btn'));
    const viewport = slider.querySelector('.viewport');

    let index = 0;
    const total = slides.length;
    const intervalTime = 3500;
    let timer = null;
    let isPaused = false;

    function goTo(n) {
      index = (n + total) % total;
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    nextBtn && nextBtn.addEventListener('click', () => { next(); resetTimer(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goTo(i);
          resetTimer();
        }
      });
    });

    function startTimer() {
      timer = setInterval(() => {
        if (!isPaused) next();
      }, intervalTime);
    }
    function stopTimer() { clearInterval(timer); timer = null; }
    function resetTimer() { stopTimer(); startTimer(); }
    if (viewport) {
      viewport.addEventListener('mouseenter', () => isPaused = true);
      viewport.addEventListener('mouseleave', () => isPaused = false);
      viewport.addEventListener('focusin', () => isPaused = true);
      viewport.addEventListener('focusout', () => isPaused = false);
    }

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
      if (e.key === 'ArrowRight') { next(); resetTimer(); }
    });

    goTo(0);
    startTimer();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer(); else startTimer();
    });

  })();

});