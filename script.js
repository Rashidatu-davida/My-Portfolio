/* ==========================================================
   PORTFOLIO WEBSITE
   script.js
========================================================== */

/*=========================
MOBILE MENU
==========================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

/*=========================
CLOSE MENU AFTER CLICK
==========================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

/*=========================
STICKY HEADER
==========================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 70) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

/*=========================
SMOOTH SCROLL
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 80,

            behavior: "smooth"

        });

    });

});

/*=========================
ACTIVE NAVIGATION
==========================*/

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================
SCROLL REVEAL
==========================*/

const revealElements = document.querySelectorAll(

".hero-left,.hero-center,.mini-card,.tool-card,.project-card,.process-card,.testimonial-card,.info-card,.featured-project"

);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .2

});

revealElements.forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});

/*=========================
COUNTER ANIMATION
==========================*/

const counters = document.querySelectorAll(".stats-card h2");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const text = counter.innerText;

        const target = parseInt(text);

        let current = 0;

        const speed = target / 60;

        const update = () => {

            current += speed;

            if (current < target) {

                counter.innerText = Math.floor(current) + "+";

                requestAnimationFrame(update);

            } else {

                counter.innerText = text;

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => counterObserver.observe(counter));

/*=========================
PORTFOLIO FILTER
==========================*/

const filterButtons = document.querySelectorAll(".portfolio-filter button");

const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        projects.forEach(project => {

            project.style.opacity = 0;

            setTimeout(() => {

                project.style.opacity = 1;

            }, 200);

        });

    });

});

/*=========================
CONTACT FORM
==========================*/

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = this.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                valid = false;

                input.style.borderColor = "red";

            } else {

                input.style.borderColor = "#ececec";

            }

        });

        if (valid) {

            alert("Message sent successfully!");

            form.reset();

        } else {

            alert("Please fill in all fields.");

        }

    });

}

/*=========================
BACK TO TOP BUTTON
==========================*/

const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topButton.className = "back-to-top";

document.body.appendChild(topButton);

Object.assign(topButton.style, {

    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "none",
    zIndex: "999",
    background: "#ef5b2b",
    color: "#fff",
    fontSize: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*=========================
PARALLAX HERO
==========================*/

const heroImage = document.querySelector(".hero-photo");

window.addEventListener("mousemove", e => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.pageX) / 45;

    const y = (window.innerHeight / 2 - e.pageY) / 45;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;

});

/*=========================
PRELOADER
==========================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*=========================
CURRENT YEAR
==========================*/

const yearElement = document.querySelector(".current-year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

console.log("Portfolio Loaded Successfully");
