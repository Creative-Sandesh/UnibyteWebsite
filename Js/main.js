// ===================== Theme Management =====================
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
        document.documentElement.classList.toggle('dark', this.theme === 'dark');
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

// ===================== Mobile Navigation =====================
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
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        document.getElementById('mobileMenuBtn').classList.toggle('active', this.isOpen);
        document.getElementById('mobileNav').classList.toggle('active', this.isOpen);
    }

    close() {
        this.isOpen = false;
        document.getElementById('mobileMenuBtn').classList.remove('active');
        document.getElementById('mobileNav').classList.remove('active');
    }
}

// ===================== Smooth Scrolling =====================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
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

// ===================== Contact Form =====================
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
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            font-weight: 500;
            text-align: right;
            ${type === 'success'
                ? 'background-color: hsl(120, 50%, 90%); color: hsl(120, 40%, 20%); border: 1px solid hsl(120, 50%, 70%);'
                : 'background-color: hsl(0, 50%, 90%); color: hsl(0, 40%, 20%); border: 1px solid hsl(0, 50%, 70%);'}
        `;

        document.getElementById('contactForm').insertAdjacentElement('afterend', messageEl);
        setTimeout(() => messageEl.remove(), 5000);
    }
}

// ===================== Navbar Scroll Effect =====================
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (!this.navbar) return;
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.backgroundColor = 'hsl(var(--background) / 0.98)';
            this.navbar.style.boxShadow = '0 4px 20px hsl(var(--primary) / 0.1)';
        } else {
            this.navbar.style.backgroundColor = 'hsl(var(--background) / 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// ===================== Scroll Animations =====================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fade-in 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.activity-card, .team-card, .stat-card, .about-text, .contact-info, .contact-form')
            .forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
    }
}

// ===================== Particle System =====================
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        if (this.canvas) {
            this.createParticles();
            this.animate();
        }
    }

    createCanvas() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        this.canvas = document.createElement('canvas');
        Object.assign(this.canvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '1',
            opacity: '0.3',
            color: 'rgba(255, 255, 255, 0.3)'

            
        });
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
        const count = window.innerWidth < 768 ? 20 : 40;
        this.particles = Array.from({ length: count }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? '255, 255, 255' : '220, 38, 127';
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ===================== Initialize All =====================
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new ContactForm();
    new NavbarScroll();
    new ScrollAnimations();
    new ParticleSystem();

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================== Window Resize Handler =====================
window.addEventListener('resize', () => {
    const mobileNav = document.getElementById('mobileNav');
    const toggleBtn = document.getElementById('mobileMenuBtn');
    if (mobileNav && toggleBtn) {
        mobileNav.classList.remove('active');
        toggleBtn.classList.remove('active');
    }
});
