/* ==========================================================
   PORTFOLIO WEBSITE - script.js
========================================================== */

/*=========================
MOBILE MENU TOGGLE
==========================*/
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = menuBtn.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    // Close menu when navigation links are clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = menuBtn.querySelector("i");
            if(icon) icon.classList.replace("fa-xmark", "fa-bars");
        });
    });
}

/*=========================
STICKY HEADER
==========================*/
const header = document.getElementById("header");
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
}

/*=========================
SMOOTH SCROLL ENGINE
==========================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if(targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 85,
            behavior: "smooth"
        });
    });
});

/*=========================
ACTIVE LINK ON SCROLL DETECTOR
==========================*/
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if(sections.length > 0 && navItems.length > 0) {
    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
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
}

/*=========================
SCROLL REVEAL (INTERSECTION OBSERVER)
==========================*/
const revealElements = document.querySelectorAll(
    ".hero-left, .hero-center, .mini-card, .tool-card, .project-card, .featured-project"
);

if (revealElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop tracking once animated
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.classList.add("fade-up");
        observer.observe(el);
    });
}

/*=========================
STATISTICS COUNTER TICKER 
==========================*/
const counters = document.querySelectorAll(".stats-card h2");

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const targetString = counter.innerText.replace('+', '').replace('%', '');
            const target = parseInt(targetString, 10);
            const suffix = counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : '');
            
            let current = 0;
            const duration = 1500; // Total length of animation in ms
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            const increment = target / totalFrames;
            let frame = 0;

            const update = () => {
                frame++;
                current += increment;
                if (frame < totalFrames) {
                    counter.innerText = Math.floor(current) + suffix;
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            update();
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/*=========================
PORTFOLIO ITEM INTERACTIVE FILTER
==========================*/
const filterButtons = document.querySelectorAll(".portfolio-filter button");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Simple programmatic indexing simulation for filters if text values match tags
            const filterValue = button.textContent.toLowerCase().trim();

            projectCards.forEach(project => {
                project.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                project.style.opacity = "0";
                project.style.transform = "scale(0.95)";

                setTimeout(() => {
                    const projectTag = project.querySelector(".project-content span").textContent.toLowerCase().trim();
                    
                    if (filterValue === "all" || projectTag.includes(filterValue) || (filterValue === "ux/ui" && projectTag.includes("dashboard"))) {
                        project.style.display = "block";
                        setTimeout(() => {
                            project.style.opacity = "1";
                            project.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        project.style.display = "none";
                    }
                }, 300);
            });
        });
    });
}

/*=========================
BACK TO TOP ACTION
==========================*/
const topButton = document.createElement("button");
topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
topButton.className = "back-to-top";
topButton.setAttribute("aria-label", "Scroll back to the top of the webpage");
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
    opacity: "0",
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: "999",
    background: "#ef5b2b",
    color: "#fff",
    fontSize: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
    transition: "opacity 0.3s ease, visibility 0.3s ease"
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topButton.style.opacity = "1";
        topButton.style.visibility = "visible";
        topButton.style.pointerEvents = "auto";
    } else {
        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";
        topButton.style.pointerEvents = "none";
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/*=========================
MOUSE PARALLAX HERO FX
==========================*/
const heroImage = document.querySelector(".hero-photo");
if (heroImage && window.innerWidth > 992) {
    window.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
}

console.log("Portfolio Production Framework Loaded Successfully");
