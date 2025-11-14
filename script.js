
// Typewriter Effect for Hero Section
class TypeWriter {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentText === currentWord) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = typewriterElement.getAttribute('data-words').split(',');
        new TypeWriter(typewriterElement, words, 80, 40, 1500);
    }
});

// scroll-based navigation highlighting
let ticking = false;

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 200 && sectionTop + sectionHeight > 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateActiveNav);
        ticking = true;
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Enhanced animation for work items with optimized timing
            if (entry.target.classList.contains('work-item')) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// work item animations
document.querySelectorAll('.work-item').forEach((el, index) => {
    observer.observe(el);
});

document.querySelectorAll('.experience-item').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

document.querySelectorAll('.skill-category').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});


// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(30, 41, 59, 0.95)';
    } else {
        nav.style.background = 'rgba(30, 41, 59, 0.9)';
    }
});

// Project Section Scrolling
function enhanceProjectScrolling() {
    const workSection = document.querySelector('#work');
    const workItems = document.querySelectorAll('.work-item');
    
    // Add scroll-based parallax effect to project images
    window.addEventListener('scroll', () => {
        const sectionTop = workSection.offsetTop;
        const sectionHeight = workSection.offsetHeight;
        const scrolled = window.pageYOffset;
        const rate = scrolled - sectionTop;
        
        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            workItems.forEach((item, index) => {
                const image = item.querySelector('.project-screenshot');
                if (image) {
                    const speed = 0.5 + (index * 0.1);
                    image.style.transform = `translateY(${rate * speed * 0.1}px)`;
                }
            });
        }
    });
}

// Skill Tag Hover Effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Contact Link Interactions
document.querySelectorAll('.contact-link').forEach(link => {
    // Magnetic effect
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0px, 0px) scale(1)';
    });
    
    link.addEventListener('click', (e) => {
        const linkType = link.href.includes('mailto') ? 'email' : 
                        link.href.includes('linkedin') ? 'linkedin' : 'github';
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Mock analytics tracking
        console.log(`Contact interaction: ${linkType}`);
    });
});
