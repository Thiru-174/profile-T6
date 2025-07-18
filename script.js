(function () {
  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1000);
  });

  // Hamburger Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // IST Date and Time Display
  const dateElement = document.getElementById('current-date');
  const timeElement = document.getElementById('current-time');
  const yearElement = document.getElementById('current-year');
  const secondHand = document.getElementById('second-hand');

  if (dateElement && timeElement && yearElement && secondHand) {
    function updateDateTime() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 3600000 * 5.5);

      const day = ist.toLocaleString('en-IN', { day: 'numeric' });
      const month = ist.toLocaleString('en-IN', { month: 'short' });
      const year = ist.toLocaleString('en-IN', { year: 'numeric' });

      dateElement.textContent = `${day} ${month}`;
      yearElement.textContent = year;

      const formattedTime = ist.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      timeElement.textContent = formattedTime;

      const seconds = ist.getSeconds();
      const angle = seconds * 6;
      secondHand.style.transform = `rotate(${angle}deg)`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
  }

  // Infinite Scroll Carousel with Auto-scroll and Center Highlight
  const carousel = document.getElementById('carousel');
  if (carousel) {
    function cloneCarouselItems() {
      const items = Array.from(carousel.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
      });
    }

    cloneCarouselItems();
    setInterval(cloneCarouselItems, 10000);

    let scrollPos = 0;
    const scrollSpeed = 1;

    function autoScroll() {
      scrollPos += scrollSpeed;
      carousel.scrollLeft = scrollPos;

      if (scrollPos >= carousel.scrollWidth - carousel.clientWidth) {
        scrollPos = 0;
      }

      highlightCenterCard();
      requestAnimationFrame(autoScroll);
    }

    function highlightCenterCard() {
      const cards = carousel.querySelectorAll('div');
      const center = carousel.scrollLeft + carousel.clientWidth / 2;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        card.classList.toggle('active', Math.abs(center - cardCenter) < card.offsetWidth / 2);
      });
    }

    requestAnimationFrame(autoScroll);

    // Initialize Vanilla Tilt
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 10,
      speed: 400,
      perspective: 1000,
      scale: 1.05
    });
  }

  // Random Grid Image Assignment
  const grid = document.getElementById('bg-grid');
  if (grid) {
    const imageList = [
      'bg1.jpg', 'bg2.jpg', 'bg3.png', 'bg4.png', 'bg5.webp', 'bg6.jpg',
      'bg7.avif', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg', 'bg11.jpg', 'bg12.jpg',
      'bg13.jpg', 'bg14.jpg'
    ];
    const rows = 5;
    const cols = 7;
    const rowClasses = ['row-1', 'row-2', 'row-3', 'row-4', 'row-5'];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const div = document.createElement('div');
        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
        div.className = `grid-item ${rowClasses[row]} visible`;
        div.style.backgroundImage = `url('assets/${randomImage}')`;
        grid.appendChild(div);
      }
    }
  }

  // Section Animation
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
})();