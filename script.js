$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
            $('#logo-img').attr('src', 'images/logo_black.png');  // change to black logo on scroll
        }else{
            $('.navbar').removeClass("sticky");
            $('#logo-img').attr('src', 'images/logo.png');        // revert to original logo when at top
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    var typed = new Typed(".typing-2", {
        strings: ["Data Analyst", "Mathematician", "Problem-Solver",'Visual Storyteller'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,  // fixed typo here (capital T)
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    // Tab buttons script inside document ready
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and related content
            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
        });
    });

});

particlesJS("particles-about", {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: "#1b73ad" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3 },
    line_linked: { enable: true, color: "#1b73ad" },
    move: { enable: true, speed: 0.5 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } }
  },
  retina_detect: true
});

particlesJS("particles-skills", {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: "#1b73ad" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: { enable: true, color: "#1b73ad" },
    move: { enable: true, speed: 0.5 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "grab" } }
  },
  retina_detect: true
});

// Force canvas resize after load to fix initial stretch
window.addEventListener('load', function () {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

particlesJS("particles-projects", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 2 },
    line_linked: { enable: false }, // no lines
    move: { enable: true, speed: 0.5 }
  },
  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});

particlesJS("particles-contact", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 2 },
    line_linked: { enable: false }, // no lines
    move: { enable: true, speed: 0.5 }
  },
  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});

