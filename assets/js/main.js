 // Header Scroll JS Start
 $(document).ready(function () {
    $(window).scroll(function () {
      var header = $("header");
      header.toggleClass("fixed_header", $(window).scrollTop() > 0);
    });
  });
  // Header Scroll JS End

  // Toggle Menu Functionaliy Start
$(document).ready(function () {
  $(".menu-toggle-btn").click(function () {
    $("body").addClass("menuToggle");
  });
  $(".menu-close-btn").click(function () {
    $("body").removeClass("menuToggle");
  });
});
// Toggle Menu Functionaliy End

// carousel slider start
(function() {
  const slider = document.getElementById('customSlider');
  const track = slider.querySelector('.custom-slider-track');
  let slides = Array.from(track.children);
  const prevBtn = slider.querySelector('.custom-slider-arrow.left');
  const nextBtn = slider.querySelector('.custom-slider-arrow.right');
  let slideCount = slides.length;
  let slidesToShow = 4;
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth;
  let autoPlayInterval;
  let isTransitioning = false;

  // Clone slides for infinite loop
  function cloneSlides() {
    // Remove previous clones if any
    Array.from(track.querySelectorAll('.clone')).forEach(el => el.remove());

    slides = Array.from(track.children).filter(slide => !slide.classList.contains('clone'));
    slideCount = slides.length;

    // Clone last N slides to the front
    for(let i = slideCount - slidesToShow; i < slideCount; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      track.insertBefore(clone, track.firstChild);
    }
    // Clone first N slides to the end
    for(let i = 0; i < slidesToShow; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    }
  }

  function updateSlidesToShow() {
    if(window.innerWidth <= 600) slidesToShow = 1;
    else if(window.innerWidth <= 991) slidesToShow = 2;
    else slidesToShow = 4;
    slideWidth = slides[0].offsetWidth;
  }

  function setTrackTransition(enable) {
    track.style.transition = enable ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none';
  }

  function goTo(index, withTransition = true) {
    setTrackTransition(withTransition);
    currentIndex = index;
    track.style.transform = `translateX(-${(currentIndex + slidesToShow) * slideWidth}px)`;
  }

  function next() {
    if(isTransitioning) return;
    isTransitioning = true;
    goTo(currentIndex + 1, true);
  }
  function prev() {
    if(isTransitioning) return;
    isTransitioning = true;
    goTo(currentIndex - 1, true);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(function() {
      next();
    }, 2500);
  }
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Handle transition end for infinite loop
  track.addEventListener('transitionend', function() {
    // If we've moved past the last real slide, jump back to the real first slide
    if(currentIndex >= slideCount) {
      setTrackTransition(false);
      currentIndex = 0;
      track.style.transform = `translateX(-${(currentIndex + slidesToShow) * slideWidth}px)`;
    }
    // If we've moved before the first real slide, jump to the real last slide
    if(currentIndex < 0) {
      setTrackTransition(false);
      currentIndex = slideCount - 1;
      track.style.transform = `translateX(-${(currentIndex + slidesToShow) * slideWidth}px)`;
    }
    // Allow next transition
    setTimeout(() => { isTransitioning = false; }, 20);
  });

  prevBtn.addEventListener('click', function() {
    prev();
    stopAutoPlay();
    startAutoPlay();
  });
  nextBtn.addEventListener('click', function() {
    next();
    stopAutoPlay();
    startAutoPlay();
  });

  window.addEventListener('resize', function() {
    updateSlidesToShow();
    cloneSlides();
    setTimeout(() => {
      slideWidth = slides[0].offsetWidth;
      goTo(currentIndex, false);
    }, 100);
  });

  // Touch/drag support
  let startX = 0, isDragging = false;
  track.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });
  track.addEventListener('touchmove', function(e) {
    if(!isDragging) return;
    let diff = e.touches[0].clientX - startX;
    if(Math.abs(diff) > 50) {
      if(diff > 0) prev();
      else next();
      isDragging = false;
    }
  });
  track.addEventListener('touchend', function() {
    isDragging = false;
    startAutoPlay();
  });

  // Init
  function initSlider() {
    updateSlidesToShow();
    cloneSlides();
    slideWidth = slides[0].offsetWidth;
    setTrackTransition(false);
    goTo(0, false);
  }

  // Wait for images to load for correct width
  window.addEventListener('load', function() {
    initSlider();
    startAutoPlay();
  });
})();
// carousel slider end