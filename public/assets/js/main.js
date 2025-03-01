(function ($) {
  "use strict";

  ///////////////////////////////////////////////////////

  // Preloader
  
  document.querySelector("html").classList.add("scroll-hide");

  function updateProgressBar(progress) {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%";
  }
  
  function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      updateProgressBar(progress);
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          const loader_text = document.querySelectorAll('.loader-text h3');
          loader_text.forEach((text, index) => {
            // Ensure SplitType is available
            const loader_single_text = new SplitType(text, {
              types: 'chars'
            });
  
            gsap.from(loader_single_text.chars, {
              opacity: 0,
              x: 50,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.8
            });
          });
  
          gsap.to(".progress-wrapper", 1.2, {
            scale: 1.5,
            opacity: 0,
            display: "none",
            ease: "power3.inOut",
            delay: 0.2
          });
  
          gsap.to(".revealer", 2.2, {
            top: "0%",
            ease: "power3.inOut",
            delay: 1
          });
  
          gsap.to(".loader", 1, {
            yPercent: -100,
            ease: "power3.inOut",
            delay: 1.9
          });
  
          setTimeout(() => {
            document.querySelector("html").classList.remove("scroll-hide");
          }, 2600);
  
        }, 500);
      }
    }, 10); // Adjust the interval time as needed
  }
  
  window.addEventListener('load', function () {
    simulateProgress();
  });

  // Preloader End


  // Menu

  jQuery(document).ready(function () {
    jQuery('header .mainmenu').meanmenu({
      meanScreenWidth: "992",
    });
  });


  document.querySelectorAll('.menu-anim > li > a').forEach(button => button.innerHTML = '<div class="menu-text"><span>' + button.textContent.split('').join('</span><span>') + '</span></div>');

  setTimeout(() => {
    var menu_text = document.querySelectorAll(".menu-text span");
    menu_text.forEach((item) => {
      var font_sizes = window.getComputedStyle(item, null);
      let font_size = font_sizes.getPropertyValue("font-size");
      let size_in_number = parseInt(font_size.replace("px", ""), 10);
      let new_size = parseInt(size_in_number / 3, 10);
      new_size = new_size + "px";
      if (item.innerHTML === " ") {
        item.style.width = new_size;
      }
    });
  }, 1000);

  // Menu End


  // Search Start
  document.addEventListener("click", (event) => {
    const searchToggle = event.target.closest(".search-icon");
    if (searchToggle) {
      searchToggle.classList.toggle("active");
    }
  });
  // Search End


  ///////////////////////////////////////////////////////
  // Sticky Menu
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $(".menu-area").addClass("sticky");
    } else {
      $(".menu-area").removeClass("sticky");
    }
  });
  // Sticky Menu End


  ///////////////////////////////////////////////////////
  // Magnific Popup gallery
  $('.popup-gallery').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    gallery: {
      enabled: true
    },
    type: 'image'
    // other options
  });

  $('.popup-youtube').magnificPopup({
    type: 'iframe'
  });


  // Magnific Popup gallery End

/////////////////////////////////////
  // join hero Slider

// Collect image URLs from elements
var imageElements = document.querySelectorAll('.hero-images span');
var images = [];

imageElements.forEach(function(element) {
  images.push(element.getAttribute('data-image-url'));
});

// Initialize the hero image swiper
var heroImg = new Swiper('.hero-img-slide', {
  fadeEffect: { crossFade: true },
  effect: 'fade',
  loop: true,
  allowTouchMove: false,
});

// Initialize the hero info swiper
var heroInfo = new Swiper('.hero-info-slide', {
  spaceBetween: 24,
  slidesPerView: 1,
  loop: true,
  fadeEffect: { crossFade: true },
  effect: 'fade',
  allowTouchMove: false,
  navigation: {
    nextEl: ".hero-img-button-next",
    prevEl: ".hero-img-button-prev",
  },
  pagination: {
    el: ".hero-img-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" style="background-image: url(\'' + images[index] + '\');"></span>';
    },
  },
  thumbs: {
    swiper: heroImg
  }
});

// Custom Fraction Pagination
var fractionPagination = document.querySelector('.hero-img-fraction-pagination');

if (fractionPagination) { // Only run this block if the element exists
  heroInfo.on('slideChange', function () {
    var realSlideIndex = heroInfo.realIndex + 1; // The real index of the current slide
    var totalSlides = heroInfo.slides.length - heroInfo.loopedSlides * 2; // Adjust total slides

    fractionPagination.innerHTML =
      ('0' + realSlideIndex).slice(-2) + ' / ' +
      ('0' + totalSlides).slice(-2);
  });

  // Trigger the fraction update initially
  heroInfo.emit('slideChange');
}


  // join hero Slider End
/////////////////////////////////

  // Team

  var teamSlider = new Swiper('.team-slide-wrap', {
    spaceBetween: 24,
    loop: true,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      },
      1400: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: ".team-button-next",
      prevEl: ".team-button-prev",
    },
    pagination: {
      el: ".team-dot-pagination",
      clickable: false,
    },
  });

  /* Team End */


  // Gallery Slide

  var gallerySlider = new Swiper('.gallery-slide', {
    spaceBetween: 15,
    // roundLengths: true,
    loop: true,
    // effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2.3
      },
      1400: {
        slidesPerView: 2.3
      }
    },
  });

  /* Gallery Slide End */

  // Blog

  var blogSlider = new Swiper('.blog-two-slide', {
    spaceBetween: 24,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2.7
      },
      1400: {
        slidesPerView: 2
      }
    },
  });

  /* Blog End */


  // testimonial 

  var testimonialImg = new Swiper('.testimonial-img-slide', {
    fadeEffect: { crossFade: true },
    effect: 'fade',
    loop: true,
    allowTouchMove: false,
  });

  var testimonialInfo = new Swiper('.testimonial-info-slide', {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false,
    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },
    thumbs: {
      swiper: testimonialImg
    }
  });

  // two

  var testimonialTwoInfo = new Swiper('.testimonial-two-slide', {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false,
    navigation: {
      nextEl: ".testimonial-two-button-next",
      prevEl: ".testimonial-two-button-prev",
    },
  });

  // Three

  var collaborateSlider = new Swiper('.collaborators-slide', {
    spaceBetween: 24,
    loop: true,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2.5
      },
      1200: {
        slidesPerView: 3.4
      },
      1400: {
        slidesPerView: 3.6
      }
    },
  });


  // Corporate Slide

  // Initialize the hero info swiper
  var testimonialCorporate = new Swiper('.testimonial-corporate-slide', {
    spaceBetween: 24,
    slidesPerView: 2,
    direction: "vertical",
    speed: 1000,
    loop:true,
    // mousewheel: true,
    pagination: {
      el: ".testimonial-corporate-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".testimonial-corporate-two-button-next",
      prevEl: ".testimonial-corporate-two-button-prev",
    },
    breakpoints: {
      20: {
        slidesPerView: 1
      },
      1199: {
        slidesPerView: 2,
      },
    },
  });

  function setSwiperHeight() {
    const header = document.querySelector('header');
    const swiperContainer = document.querySelector('.testimonial-corporate-slide');
  
    // Check if the elements exist
    if (header && swiperContainer) {
      const headerHeight = header.offsetHeight; // Get header height
      swiperContainer.style.height = `calc(100vh - ${headerHeight}px)`; // Adjust the height dynamically
    }
  }
  
  // Call the function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', setSwiperHeight);
  window.addEventListener('resize', setSwiperHeight);

  // Corporate Slide End


  // Four

  var imageElementsTestimonial = document.querySelectorAll('.testimonial-images span');
  var imagesTestimonial = [];

  imageElementsTestimonial.forEach(function(element) {
    imagesTestimonial.push(element.getAttribute('data-image-url'));
  });

  var infoTestimonialFour = new Swiper('.testimonial-four-slide', {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    fadeEffect: { crossFade: true },
    effect: 'fade',
    allowTouchMove: false,
    pagination: {
      el: ".testimonial-four-img-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '" style="background-image: url(\'' + imagesTestimonial[index] + '\');"></span>';
      },
    },
    navigation: {
      nextEl: ".testimonial-four-button-next",
      prevEl: ".testimonial-four-button-prev",
    },
  });

  // Four End


  // testimonial End

  // Footer Touch 

  var footertouchSlider = new Swiper('.footer-two-touch', {
    spaceBetween: 100,
    centeredSlides: true,
    speed: 9000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
      320: {
        spaceBetween: 30,
      },
      992: {
        spaceBetween: 70,
      }
    },
  });

  // Footer Touch End


  // Partners Slide

  var partnersSlider = new Swiper('.partners-slide-wrap', {
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
      320: {
        spaceBetween: 50,
      },
      992: {
        spaceBetween: 70,
      }
    },
  });

  // Partners Slide End



  // Corporate Service Slide

  // Initialize the hero image swiper
  var joinService = new Swiper('.join-service-corporate-slide', {
    fadeEffect: { crossFade: true },
    effect: 'fade',
    loop: true,
    allowTouchMove: false,
  });

  // Initialize the hero info swiper
  var joinserviceInfo = new Swiper('.join-service-info-slide', {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    autoHeight: true,
    allowTouchMove: false,
    navigation: {
      nextEl: ".service-button-next",
      prevEl: ".service-button-prev",
    },
    pagination: {
      el: ".service-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: joinService
    }
  });

  // Corporate Service Slide End





  ///////////////////////////////////////////////////////
  //Mixitup
  $('.work-mixi').mixItUp();



  ///////////////////////////////////////////////////////
  // Bottom to top start
  $(document).ready(function () {
    $(window).on('scroll', (function () {
      if ($(this).scrollTop() > 100) {
        $('#scroll-top').fadeIn();
      } else {
        $('#scroll-top').fadeOut();
      }
    }));
    $('#scroll-top').on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });
  // Bottom to top End



  ///////////////////////////////////////////////////////
  // Odometer Counter
  $(".counter-item").each(function () {
    $(this).isInViewport(function (status) {
      if (status === "entered") {
        for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
          var el = document.querySelectorAll('.odometer')[i];
          el.innerHTML = el.getAttribute("data-odometer-final");
        }
      }
    });
  });
  // Odometer Counter End


  // Custom Cursor
  const cursor = document.querySelector('.cursor');

  if (cursor) {
    const editCursor = e => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    };
    window.addEventListener('mousemove', editCursor);

    document.querySelectorAll("a, .cursor-pointer").forEach(item => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('cursor-active');
      });

      item.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor-active');
      });
    });
  };

  // Custom Cursor End

  ////////////////////////////////////
  $(window).on('scroll', function () {

    // Progress Bar
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal
        });
      }
    });

    // Progress Bar End

  });


  // Pricing Toggle

  const tableWrapper = document.querySelector(".price_wrapper");
  const switchInputs = document.querySelectorAll(".switch-wrapper input");
  const prices = tableWrapper?.querySelectorAll(".price");
  const toggleClass = "hide";

  for (const switchInput of switchInputs) {
    switchInput.addEventListener("input", function () {
      for (const price of prices) {
        price.classList.add(toggleClass);
      }
      const activePrices = tableWrapper.querySelectorAll(
        `.price.${switchInput.id}`
      );
      for (const activePrice of activePrices) {
        activePrice.classList.remove(toggleClass);
      }
    });
  }

  // Pricing Toggle End


  //Text Animation
  let splitTextLines = gsap.utils.toArray(".text-anim");

  splitTextLines.forEach(splitTextLine => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: 'top 90%',
        duration: 2,
        end: 'bottom 60%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none none'
      }
    });

    const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
    gsap.set(splitTextLine, { perspective: 400 });
    itemSplitted.split({ type: "lines" })
    tl.from(itemSplitted.lines, { duration: .9, delay: 0.2, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
  });


  /* Project */

  $('.cluom').on('mouseenter', function () {
    var tab_id = $(this).attr('data-tab');
    $('.cluom').removeClass('current');
    $(this).addClass('current');

    $('.tab-img ').removeClass('current');
    $("#" + tab_id).addClass('current');

    if ($(this).hasClass('current')) {
      return false;
    }
  });

  var pageSection = $(".bg-img");
  pageSection.each(function (indx) {

    if ($(this).attr("data-background")) {
      $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
  });

  /* Project End */


  /* About Video Player */

  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Create a global YouTube player variable.
  window.player = null;

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  window.onYouTubeIframeAPIReady = function () {
    window.player = new YT.Player('player', {
      videoId: 'VCPGMjCW0is',
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': window.onPlayerReady,
        'onStateChange': window.onPlayerStateChange
      }
    });
  };

  // The API will call this function when the video player is ready.
  window.onPlayerReady = function (event) {
    document.getElementById("play").addEventListener("click", function () {
      event.target.playVideo();
    });
  };

  // The API calls this function when the player's state changes.
  window.onPlayerStateChange = function (event) {
    if (event.data == YT.PlayerState.PLAYING && !window.done) {
      window.done = true;
    }
  };

  window.stopVideo = function () {
    if (window.player) {
      window.player.stopVideo();
    }
  };

  // Initialize the done variable
  window.done = false;



  // Player Button
  var toggleIcon = document.querySelectorAll('.cover')

  toggleIcon.forEach((element) => {
    element.addEventListener('click', () => {
      document.querySelectorAll('.play-btn-wrap').forEach((el) => {
        el.classList.add('hide')
      })
    })
  })

  /* About Video Player End */

  // Marquee

  var elements = $('.initial-child-container .child').length;
  for (var i = 0; i < elements; i++) {
    $(".initial-child-container").clone().prependTo(".marquee");
  };

  var liEle = [];
  var liEle = $(".initial-child-container .child");

  // Marquee End



  /* GSAP Start */

  // Gsap Smooth Scroll

  if($('#smooth-wrapper').length && $('#smooth-content').length){
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);
	
		gsap.config({
			nullTargetWarn: false,
		});
	
		let smoother = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			smoothTouch: 0.1,
			normalizeScroll: false,
			ignoreMobileResize: true,
		});

	}// Gsap Smooth Scroll End


  /////////////////////////////////

  // Pin Section Service

  let pr = gsap.matchMedia();
	 pr.add("(min-width: 768px)", () => {

		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.service-two-box')
		projectpanels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'top 10%',
					end: "bottom 100%",
					endTrigger: '.service-two-wrapper',
					pinSpacing: false,
					markers: false,
				},
			})
		})

	});// Pin Section end



  // Pin Section Portfolio

  let ptr = gsap.matchMedia();
	 ptr.add("(min-width: 992px)", () => {

		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.portfolio-pin-box')
		projectpanels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'top',
					end: "bottom 100%",
					endTrigger: '.portfolio-pin-wrapper',
					pinSpacing: false,
					markers: false,
				},
			});
		});

	});// Pin Section end

  const device_width = window.innerWidth;
  if (device_width > 922) {
    let portfolioline = gsap.timeline({
      scrollTrigger: {
        trigger: ".portfolio-text-wrap",
        pin: ".portfolio__text",
        start: "top 5%",
        end: "bottom 10%",
        markers: false,
        pinSpacing: false,
        scrub: 1,
      }
    })

    portfolioline.to(".portfolio__text", {
      scale: 2,
      duration: 1
    })
    portfolioline.to(".portfolio__text", {
      scale: 2,
      duration: 1
    })
    portfolioline.to(".portfolio__text", {
      scale: 1.5,
      duration: 2,
      opacity: 0
    }, "+=2")
  }


  /////////////////////////////////


  //Reveal Animation 

  const anim_reveal = document.querySelectorAll(".reveal_anim_after_loader");
	anim_reveal.forEach(areveal => {

		var duration_value = 2
		var onscroll_value = 1
		var stagger_value = 0.05
		var data_delay = 4.1

		if (areveal.getAttribute("data-duration")) {
			duration_value = areveal.getAttribute("data-duration");
		}
		if (areveal.getAttribute("data-on-scroll")) {
			onscroll_value = areveal.getAttribute("data-on-scroll");
		}
		if (areveal.getAttribute("data-stagger")) {
			stagger_value = areveal.getAttribute("data-stagger");
		}
		if (areveal.getAttribute("data-delay")) {
			data_delay = areveal.getAttribute("data-delay");
		}

		areveal.split = new SplitText(areveal, {
			type: "lines,words,chars",
			linesClass: "reveal-line-2"
		});

		if (onscroll_value == 1) {
			areveal.anim = gsap.from(areveal.split.chars, {
				scrollTrigger: {
					trigger: areveal,
					start: 'top 85%',
				},
				duration: duration_value,
				delay: data_delay,
				ease: "circ.out",
				y: 200,
				stagger: stagger_value,
				opacity: 0,
			});
		} else {
			areveal.anim = gsap.from(areveal.split.chars, {
				duration: duration_value,
				delay: data_delay,
				ease: "circ.out",
				y: 200,
				stagger: stagger_value,
				opacity: 0,
			});
		}

	});


  // Two reveal

	const anim_reveal2 = document.querySelectorAll(".reveal_anim-2");
	anim_reveal2.forEach(areveal => {

		var duration_value = 2
		var onscroll_value = 1
		var stagger_value = 0.05
		var data_delay = 0.1

		if (areveal.getAttribute("data-duration")) {
			duration_value = areveal.getAttribute("data-duration");
		}
		if (areveal.getAttribute("data-on-scroll")) {
			onscroll_value = areveal.getAttribute("data-on-scroll");
		}
		if (areveal.getAttribute("data-stagger")) {
			stagger_value = areveal.getAttribute("data-stagger");
		}
		if (areveal.getAttribute("data-delay")) {
			data_delay = areveal.getAttribute("data-delay");
		}

		areveal.split = new SplitText(areveal, {
			type: "lines,words,chars",
			linesClass: "reveal-line-2"
		});

		if (onscroll_value == 1) {
			areveal.anim = gsap.from(areveal.split.chars, {
				scrollTrigger: {
					trigger: areveal,
					start: 'top 85%',
				},
				duration: duration_value,
				delay: data_delay,
				ease: "circ.out",
				y: 200,
				stagger: stagger_value,
				opacity: 0,
			});
		} else {
			areveal.anim = gsap.from(areveal.split.chars, {
				duration: duration_value,
				delay: data_delay,
				ease: "circ.out",
				y: 200,
				stagger: stagger_value,
				opacity: 0,
			});
		}

	});//Reveal Animation End
  

  // Reveal Box Image
  let box_img_reveal = document.querySelectorAll(".img-box-reveal");

	box_img_reveal.forEach((img_reveal) => {
		let image = img_reveal.querySelector(".img");
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: img_reveal,
				start: "top 70%",
			}
		});

		tl.set(img_reveal, { autoAlpha: 1 });
		tl.from(img_reveal, 1.5, {
			xPercent: -100,
			ease: Power2.out
		});
		tl.from(image, 1.5, {
			xPercent: 100,
			scale: 1.5,
			delay: -1.5,
			ease: Power2.out
		});
	});// Reveal Box Image End


  // Height
  let mm = gsap.matchMedia();
  mm.add("(min-width: 992px)", () => {
  let ht = gsap.timeline();
    ht.from(".about-two-fun-fact-wrap .about-two-fun-fact .counter-item", {
      height: "60px",
      scrollTrigger: {
        trigger: ".about-two-fun-fact-wrap .about-two-fun-fact .counter-item",
        start: "top 95%",
        end: "top 100px",
        markers: false,
        scrub: true,
      }
    });
  });// Height End


  // Bounce 

  if ($('.bounce-text').length > 0) {

		let cta = gsap.timeline({
			repeat: -1,
			delay: 0.5,
			scrollTrigger: {
				trigger: '.bounce-text',
				start: 'bottom 100%-=50px'
			}
		});
		gsap.set('.bounce-text', {
			opacity: 0
		});
		gsap.to('.bounce-text', {
			opacity: 1,
			duration: 1,
			ease: 'power1.out',
			scrollTrigger: {
				trigger: '.bounce-text',
				start: 'bottom 100%-=50px',
				once: true
			}
		});
	
		let mySplitText = new SplitText(".bounce-text", { type: "words,chars" });
		let chars = mySplitText.chars;
		let endGradient = chroma.scale(['#F0EFE7', '#F0EFE7', '#F0EFE7', '#F0EFE7', '#F0EFE7']);
		cta.to(chars, {
			duration: 0.5,
			scaleY: 0.6,
			ease: "power1.out",
			stagger: 0.04,
			transformOrigin: 'center bottom'
		});
		cta.to(chars, {
			yPercent: -20,
			ease: "elastic",
			stagger: 0.03,
			duration: 0.8
		}, 0.5);
		cta.to(chars, {
			scaleY: 1,
			ease: "elastic.out",
			stagger: 0.03,
			duration: 1.5
		}, 0.5);
		cta.to(chars, {
			color: (i, el, arr) => {
				return endGradient(i / arr.length).hex();
			},
			ease: "power1.out",
			stagger: 0.03,
			duration: 0.3
		}, 0.5);
		cta.to(chars, {
			yPercent: 0,
			ease: "back",
			stagger: 0.03,
			duration: 0.8
		}, 0.7);
		cta.to(chars, {
			color: '#F0EFE7',
			duration: 1.4,
			stagger: 0.05
		});
	}// Bounce End

  // Left to right
  gsap.fromTo(".h-box", 
    { 
      x: 0 , // Start from 50% of the viewport width (middle)
      rotation: 50, 
      opacity: 1 
    }, 
    { 
      duration: 1, 
      x: 0, // Animate to 0% (left edge)
      rotation: 68, // Keep the rotation as is
      opacity: 1, 
      ease: "linear",
      scrollTrigger: {
        trigger: ".h-box",
        markers: false,
        start: "top center",
        end: "top 200px",
        scrub: 1 // Smooth scrolling effect
      }
    }
  );// Left to right End


  if ($('.scroll-left-area').length > 0) {
		gsap.timeline({
			scrollTrigger: {
				trigger: '.scroll-left-area',
				start: 'top 100%',
				end: 'bottom 20%',
				scrub: true,
				invalidateOnRefresh: true
			}
		})
			.to('.scroll-left-title ', {
				x: '0'
			});
		gsap.set('.scroll-left-title', {
			x: '-30%'
		});
	}


  // Title Animation

  if ($('.char-animation').length > 0) {
		let char_come = gsap.utils.toArray(".char-animation");
		char_come.forEach(splitTextLine => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					markers: false,
					toggleActions: 'play none none none'
				}
			});

			const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
			gsap.set(splitTextLine, { perspective: 300 });
			itemSplitted.split({ type: "chars, words" })
			tl.from(itemSplitted.chars,
				{
					duration: 1,
					delay: 0.5,
					x: 100,
					autoAlpha: 0,
					stagger: 0.05
				});
		});
	}

  // Title Anim

  let splitTitleLines = gsap.utils.toArray(".title-anim");

  splitTitleLines.forEach(splitTextLine => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none none'
      }
    });

    const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
    gsap.set(splitTextLine, { perspective: 400 });
    itemSplitted.split({ type: "lines" })
    tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
  });

  // Title Animation End

  // Fade Animation

  if ($('.fade_bottom').length > 0) {
		gsap.set(".fade_bottom", { y: 100, opacity: 0 });
		const fadeArray = gsap.utils.toArray(".fade_bottom")
		fadeArray.forEach((item, i) => {
			let fadeTl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top center+=400",
				}
			})
			fadeTl.to(item, {
				y: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 1.5,
        stagger: {
          each: 0.2
        }
			})
		})
	}

  if ($('.fade_left').length > 0) {
		gsap.set(".fade_left", { x: -100, opacity: 0 });
		const fadeleftArray = gsap.utils.toArray(".fade_left")
		fadeleftArray.forEach((item, i) => {
			let fadeTl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top center+=100",
				}
			})
			fadeTl.to(item, {
				x: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 2.5,
			})
		})
	}

  if ($('.fade_right').length > 0) {
		gsap.set(".fade_right", { x: 100, opacity: 0 });
		const faderightArray = gsap.utils.toArray(".fade_right")
		faderightArray.forEach((item, i) => {
			let fadeTl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top center+=100",
				}
			})
			fadeTl.to(item, {
				x: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 2.5,
			})
		})
	}
  
  // Fade Animation End

  // Button bounce

  if ($('.btn-trigger').length > 0) {

		gsap.set(".btn-bounce", { y: -100, opacity: 0 });
		var mybtn = gsap.utils.toArray(".btn-bounce");
		mybtn.forEach((btn) => {
			var $this = $(btn);
			gsap.to(btn, {
				scrollTrigger: {
					trigger: $this.closest('.btn-trigger'),
					start: "top center",
					markers: false
				},
				duration: 1,
				ease: "bounce.out",
				y: 0,
				opacity: 1,
			})
		});

	} // Button bounce End

  // Service Three Pin
  let sp = gsap.matchMedia();
	sp.add("(min-width: 992px)", () => {
		if ($('.pin-section-area').length > 0) {
			ScrollTrigger.create({
				trigger: ".pin-section-area",
				start: "top ",
				end: "bottom 50%",
				pin: ".service-three-title-wrap",
				pinSpacing: true,
			});
		}
	});// Service Three Pin End


/////////////////////////////////////////////////

  // Portfolio Corporate Pin

  let spd = gsap.matchMedia();

  spd.add("(min-width: 992px)", () => {
    // Check if the elements are present before proceeding
    if ($('.pin-section-area').length > 0 && document.querySelector('.item-number') && document.querySelector('.total-count')) {
      
      // Pin the item number section
      ScrollTrigger.create({
        trigger: ".pin-section-area",
        start: "top 60%",
        end: "bottom 120%",
        pin: ".portfolio-corporate-pin",
        pinSpacing: true,
      });
  
      // Select all portfolio items
      const portfolioItems = document.querySelectorAll('.single-portfolio-corporate');
      const itemNumber = document.querySelector('.item-number');
      const totalCountElement = document.querySelector('.total-count');
  
      // Display the total count
      const totalCount = portfolioItems.length;
      totalCountElement.textContent = ` / ${formatNumber(totalCount)}`; // Display total count as " / totalCount"
  
      // Loop through each portfolio item
      portfolioItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top bottom", // Trigger as soon as the top of the item hits the bottom of the viewport
          onEnter: () => {
            itemNumber.textContent = formatNumber(index + 1); // Update the item number in two-digit format
          },
          onLeaveBack: () => {
            itemNumber.textContent = formatNumber(index); // Reset to the previous item number in two-digit format
          }
        });
      });
    } else {
      console.warn("Required elements are missing on this page.");
    }
  });
  
  // Function to format numbers as two digits
  function formatNumber(number) {
    return number.toString().padStart(2, '0'); // Add leading zero if needed
  }////// Portfolio Corporate Pin End /////////


  // Color change two

  document.addEventListener("DOMContentLoaded", function() {
    // Create the SplitText instance
    const splitt = new SplitText(".text_invert", { type: "lines" });
  
    // Set initial styles for the lines
    gsap.set(splitt.lines, {
      color: "#ddd", // Initial text color
      overflow: "hidden"
    });
  
    // Animate each line
    splitt.lines.forEach((target) => {
      gsap.to(target, {
        color: "#1A1A1A", // Final text color (red)
        duration: 1,
        ease: "power2.out",
        backgroundPositionX: 0,
        scrollTrigger: {
          trigger: target,
          scrub: true,
          start: 'top 55%',
          end: "bottom center",
        }
      });
    });
  });// Color change two end



  // About Three

  if ($('.about-three-video-wrap').length > 0) {
    let ms = gsap.matchMedia();
    ms.add("(min-width: 768px)", () => {
        // Home 8
        let tp_hero = gsap.timeline({
            scrollTrigger: {
            trigger: ".about-three-video-wrap",
            start: "top 70",
            pin: true,
            markers: false,
            scrub: 1,
            pinSpacing: true, // This ensures space is maintained after pinning
            end: "bottom top", // This ends pinning before the next section
            }
        });
        tp_hero.to(".about-three-video-box", {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut"
        });
    });
  };// About Three End



  // Mouse Move 


// Make sure to include the GSAP library
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

// (function() {
//   function setupMouseMoveAnimation() {
//     const moveItems = document.querySelectorAll('.move-item');
//     const container = document.querySelector('.move-box-wrap');
    
//     // If elements don't exist on this page, quietly exit
//     if (moveItems.length === 0 || !container) {
//       return;
//     }

//     // Set initial position for all move-items
//     gsap.set(moveItems, { x: 0, y: 0 });

//     // Maximum movement in pixels
//     const maxMovement = 20;

//     container.addEventListener('mousemove', (e) => {
//       // Get mouse position relative to the container
//       const rect = container.getBoundingClientRect();
//       const mouseX = e.clientX - rect.left;
//       const mouseY = e.clientY - rect.top;

//       // Calculate movement as a percentage of container size
//       const moveX = (mouseX / rect.width - 0.5) * 2 * maxMovement;
//       const moveY = (mouseY / rect.height - 0.5) * 2 * maxMovement;

//       // Animate all move-items
//       moveItems.forEach(item => {
//         gsap.to(item, {
//           x: moveX,
//           y: moveY,
//           duration: 0.3,
//           ease: "power2.out"
//         });
//       });
//     });

//     // Reset position when mouse leaves the container
//     container.addEventListener('mouseleave', () => {
//       gsap.to(moveItems, {
//         x: 0,
//         y: 0,
//         duration: 0.5,
//         ease: "power2.out"
//       });
//     });

//     console.log('Mouse movement animation setup complete for', moveItems.length, 'items.');
//   }

//   // Run setup on DOMContentLoaded
//   document.addEventListener("DOMContentLoaded", setupMouseMoveAnimation);

//   // Also run setup now in case the DOM is already loaded
//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     setupMouseMoveAnimation();
//   }
// })();// Mouse Move End


(function() {
  function setupMouseMoveAnimation() {
    const containers = document.querySelectorAll('.move-box-wrap');
    
    // If no containers exist on this page, quietly exit
    if (containers.length === 0) {
      return;
    }

    // Setup each container
    containers.forEach(container => {
      const moveItems = container.querySelectorAll('.move-item');
      
      if (moveItems.length === 0) {
        return;
      }

      // Set initial position for move-items in this container
      gsap.set(moveItems, { x: 0, y: 0 });

      // Maximum movement in pixels
      const maxMovement = 20;

      container.addEventListener('mousemove', (e) => {
        // Get mouse position relative to the container
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate movement as a percentage of container size
        const moveX = (mouseX / rect.width - 0.5) * 2 * maxMovement;
        const moveY = (mouseY / rect.height - 0.5) * 2 * maxMovement;

        // Animate move-items in this container
        moveItems.forEach(item => {
          gsap.to(item, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Reset position when mouse leaves the container
      container.addEventListener('mouseleave', () => {
        gsap.to(moveItems, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }

  // Run setup on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", setupMouseMoveAnimation);

  // Also run setup now in case the DOM is already loaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setupMouseMoveAnimation();
  }
})();

  

  /* Gsap End */
  


}(jQuery));

