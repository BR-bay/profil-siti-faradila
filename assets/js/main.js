// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.getElementById('theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate theme toggle
    themeToggle.classList.add('rotate');
    setTimeout(() => {
        themeToggle.classList.remove('rotate');
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }, 300);
});

// Check for saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
const icon = themeToggle.querySelector('i');
icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== MOBILE MENU TOGGLE =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ===== CUSTOM CURSOR =====
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smoother follower movement
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor effects on hover
document.querySelectorAll('a, button, .btn').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-title', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.hero-subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.8
});

gsap.from('.hero-buttons', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 1.1
});

gsap.from('.profile-img', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: 'elastic.out(1, 0.3)',
    delay: 1.3
});

// Floating elements animation
gsap.to('.box-1', {
    duration: 8,
    y: -30,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.box-2', {
    duration: 7,
    y: -20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
});

gsap.to('.box-3', {
    duration: 9,
    y: -40,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
});

// About section animations
gsap.from('.section-title', {
    scrollTrigger: {
        trigger: '.section-title',
        start: 'top 80%'
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%'
    },
    duration: 1,
    x: -50,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.2
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-image',
        start: 'top 80%'
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.2
});

gsap.from('.stat-card', {
    scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 80%'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
});

// ===== AOS INITIALIZATION =====
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
});

// ===== PARTICLES.JS CONFIGURATION =====
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00f3ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00f3ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ===== TYPED TEXT EFFECT =====
// Typewriter effect is implemented in CSS for the hero title

// ===== 3D BRAIN CANVAS ANIMATION =====
function initBrainCanvas() {
    const canvas = document.getElementById('ai-brain-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Neural network visualization
    function drawNeuralNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
        ctx.lineWidth = 1;
        
        // Draw neurons
        const neurons = [];
        const neuronCount = 20;
        
        for (let i = 0; i < neuronCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            neurons.push({x, y});
            
            // Draw neuron
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 243, 255, ${0.3 + Math.random() * 0.7})`;
            ctx.fill();
            
            // Draw connections to nearby neurons
            for (let j = 0; j < i; j++) {
                const dist = Math.sqrt(Math.pow(neurons[j].x - x, 2) + Math.pow(neurons[j].y - y, 2));
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(neurons[j].x, neurons[j].y);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawNeuralNetwork);
    }
    
    drawNeuralNetwork();
    
    // Handle canvas resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Initialize brain canvas when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBrainCanvas();
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PROGRESS BAR ANIMATION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0';
        
        // Animate when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${progress}%`;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Trigger progress bar animation on load
window.addEventListener('load', animateProgressBars);

// ===== 3D CARD EFFECT =====
function init3DCards() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize 3D cards
document.addEventListener('DOMContentLoaded', init3DCards);

// ===== RIPPLE EFFECT FOR BUTTONS =====
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});