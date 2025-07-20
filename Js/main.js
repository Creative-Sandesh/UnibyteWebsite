// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupToggle();
        this.setupLinks();
    }

    setupToggle() {
        const toggleBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        
        if (toggleBtn && mobileNav) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    setupLinks() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            const links = mobileNav.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const toggleBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        
        if (toggleBtn && mobileNav) {
            toggleBtn.classList.toggle('active', this.isOpen);
            mobileNav.classList.toggle('active', this.isOpen);
        }
    }

    close() {
        this.isOpen = false;
        const toggleBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        
        if (toggleBtn && mobileNav) {
            toggleBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: hsl(120, 50%, 90%); color: hsl(120, 50%, 20%); border: 1px solid hsl(120, 50%, 70%);'
                : 'background-color: hsl(0, 50%, 90%); color: hsl(0, 50%, 20%); border: 1px solid hsl(0, 50%, 70%);'
            }
        `;
        
        // Insert message after form
        const form = document.getElementById('contactForm');
        form.insertAdjacentElement('afterend', messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'hsl(var(--background) / 0.98)';
                navbar.style.boxShadow = '0 4px 20px hsl(var(--primary) / 0.1)';
            } else {
                navbar.style.backgroundColor = 'hsl(var(--background) / 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fade-in 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.activity-card, .team-card, .stat-card, .about-text, .contact-info, .contact-form');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
}

// Particle System for Hero Background
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.3';
        
        this.ctx = this.canvas.getContext('2d');
        hero.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        
        const hero = document.querySelector('.hero');
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? '255, 255, 255' : '220, 38, 127'; // white for dark theme, red for light theme
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new ContactForm();
    new NavbarScroll();
    new ScrollAnimations();
    new ParticleSystem();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const mobileNav = document.getElementById('mobileNav');
    const toggleBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileNav && toggleBtn) {
        mobileNav.classList.remove('active');
        toggleBtn.classList.remove('active');
    }
});