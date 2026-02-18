/* ===================================================================
 * Rahul 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


   /* Theme Toggle
    * -------------------------------------------------- */
    const ssThemeToggle = function() {
        const THEME_KEY = 'rahul-portfolio-theme';
        const COMIC_THEME = 'neo-brutalist-comic';
        const desktopToggle = document.getElementById('theme-toggle-desktop');
        const mobileToggle = document.getElementById('theme-toggle-mobile');
        const toggles = [desktopToggle, mobileToggle].filter(Boolean);
        
        if (toggles.length === 0) return;
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Get saved theme from localStorage or check system preference
        function getSavedTheme() {
            const saved = localStorage.getItem(THEME_KEY);
            if (saved) return saved;
            
            // Optional: Check system preference for dark mode
            // If user prefers dark mode, we could default to the original dark theme
            // For now, we default to no theme (original dark theme)
            return null;
        }
        
        // Apply theme to document
        function applyTheme(theme) {
            if (theme === COMIC_THEME) {
                html.setAttribute('data-theme', COMIC_THEME);
                updateToggleState(true);
                switchProfileImage(true); // Use neo image
            } else {
                html.removeAttribute('data-theme');
                updateToggleState(false);
                switchProfileImage(false); // Use original image
            }
        }
        
        // Switch profile image based on theme
        function switchProfileImage(isComicTheme) {
            const profileImg = document.querySelector('.about-info__pic');
            if (profileImg) {
                if (isComicTheme) {
                    profileImg.src = 'images/rahul-photo-neo.jpg';
                } else {
                    profileImg.src = 'images/rahul-photo.jpg';
                }
            }
        }
        
        // Update all toggle button states
        function updateToggleState(isComic) {
            toggles.forEach(toggle => {
                toggle.setAttribute('aria-checked', isComic ? 'true' : 'false');
            });
        }
        
        // Toggle theme with optional animation
        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const isCurrentlyComic = currentTheme === COMIC_THEME;
            const newTheme = isCurrentlyComic ? null : COMIC_THEME;
            
            // Add page wipe animation (respects reduced motion)
            if (!prefersReducedMotion) {
                html.classList.add('theme-transitioning');
                
                // Apply theme in the middle of the animation
                setTimeout(() => {
                    applyTheme(newTheme);
                    
                    // Save preference
                    if (newTheme) {
                        localStorage.setItem(THEME_KEY, newTheme);
                    } else {
                        localStorage.removeItem(THEME_KEY);
                    }
                }, 225); // Middle of 500ms animation
                
                // Remove transitioning class after animation completes
                setTimeout(() => {
                    html.classList.remove('theme-transitioning');
                }, 500);
            } else {
                // Instant switch for reduced motion
                applyTheme(newTheme);
                
                // Save preference
                if (newTheme) {
                    localStorage.setItem(THEME_KEY, newTheme);
                } else {
                    localStorage.removeItem(THEME_KEY);
                }
            }
        }
        
        // Handle keyboard events
        function handleKeydown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleTheme();
            }
        }
        
        // Initialize
        function init() {
            // Apply saved theme on load
            const savedTheme = getSavedTheme();
            applyTheme(savedTheme);
            
            // Add event listeners to all toggles
            toggles.forEach(toggle => {
                toggle.addEventListener('click', toggleTheme);
                toggle.addEventListener('keydown', handleKeydown);
            });
        }
        
        init();
    }; // end ssThemeToggle


   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
            let activeSectionId = null;
        
            // Loop through sections to find the currently active one
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
                // Check if current scroll position is within this section
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeSectionId = sectionId;
                }
            });
            
            // Remove 'current' class from all nav items and add it only to the active one
            document.querySelectorAll(".main-nav li").forEach(function(li) {
                li.classList.remove("current");
            });
            
            // Add 'current' class to the active section's nav link
            if (activeSectionId) {
                const activeLink = document.querySelector(".main-nav a[href*=" + activeSectionId + "]");
                if (activeLink) {
                    activeLink.parentNode.classList.add("current");
                }
            }
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssThemeToggle();
        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);