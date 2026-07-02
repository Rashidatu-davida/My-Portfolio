/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScroll();

    initNavbar();

    initRevealAnimation();

    initActiveNavigation();

    initProjectGallery();

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll(){

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link=>{

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            const target=document.querySelector(
                link.getAttribute("href")
            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}

/* ==========================================
   STICKY NAVBAR
========================================== */

function initNavbar(){

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }

    });

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initRevealAnimation(){

    const sections=document.querySelectorAll("section");

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.15

        }

    );

    sections.forEach(section=>{

        observer.observe(section);

    });

}

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

function initActiveNavigation(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-150;

            if(window.scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href")===`#${current}`

            ){

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================
   PROJECT GALLERY
========================================== */

function initProjectGallery(){

    const galleries=document.querySelectorAll(".project-gallery");

    galleries.forEach(gallery=>{

        const featured=

        gallery.querySelector(".featured-image img");

        const thumbs=

        gallery.querySelectorAll(".thumbnail-gallery img");

        thumbs.forEach(thumb=>{

            thumb.addEventListener("click",()=>{

                featured.style.opacity=0;

                setTimeout(()=>{

                    featured.src=thumb.dataset.large;

                    featured.style.opacity=1;

                },180);

            });

        });

    });

}

/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");
        menuToggle.classList.toggle("active");

    });

}


/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        const name = contactForm.querySelector("input[type='text']");
        const email = contactForm.querySelector("input[type='email']");
        const message = contactForm.querySelector("textarea");

        if (!name.value.trim()) {
            alert("Please enter your name.");
            e.preventDefault();
            return;
        }

        if (!email.value.trim()) {
            alert("Please enter your email.");
            e.preventDefault();
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        if (message.value.trim().length < 20) {
            alert("Please write a longer message.");
            e.preventDefault();
            return;
        }

    });

}


/* ==========================================
   HERO IMAGE PARALLAX
========================================== */

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const offset = window.scrollY * 0.08;

    heroImage.style.transform =
        `translateY(${offset}px)`;

});


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .resume-btn"
);

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
            `${e.clientX - rect.left}px`;

        ripple.style.top =
            `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* ==========================================
   IMAGE PRELOADER
========================================== */

const images = document.querySelectorAll("img");

images.forEach(img => {

    if (img.complete) {

        img.classList.add("loaded");

    } else {

        img.addEventListener("load", () => {

            img.classList.add("loaded");

        });

    }

});


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
`Portfolio built with ❤️
HTML • CSS • JavaScript`
);
