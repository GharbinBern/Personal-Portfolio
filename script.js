

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

// Enhanced Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add a subtle loading state
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Reset link state after scroll
            setTimeout(() => {
                this.style.opacity = '1';
            }, 800);
        }
    });
});

// Enhanced scroll-based navigation highlighting
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

// Enhanced Scroll Animations
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

// Enhanced work item animations
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

// Hero section animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
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

// Dynamic Data Points Animation
function createDataPoint() {
    const dataContainer = document.querySelector('.floating-data');
    if (!dataContainer) return;
    
    const dataTexts = [
        'SELECT * FROM skills;',
        'Python → 95% proficiency',
        'df.groupby("category").mean()',
        'Django.models.create()',
        'INNER JOIN projects ON...',
        'import pandas as pd',
        'Machine Learning Pipeline',
        'Statistical Significance: p < 0.05',
        'Correlation Coefficient: 0.89',
        'Model Accuracy: 94.7%'
    ];
    
    const point = document.createElement('span');
    point.classList.add('data-point');
    point.textContent = dataTexts[Math.floor(Math.random() * dataTexts.length)];
    
    // Random position
    point.style.left = Math.random() * 100 + '%';
    point.style.top = Math.random() * 100 + '%';
    point.style.animationDelay = Math.random() * 5 + 's';
    
    dataContainer.appendChild(point);
    
    // Remove after animation
    setTimeout(() => {
        if (point.parentNode) {
            point.parentNode.removeChild(point);
        }
    }, 15000);
}

// Create new data points periodically
setInterval(createDataPoint, 8000);

// Enhanced Project Section Scrolling
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

// Enhanced Work Item Interactions
document.querySelectorAll('.work-item').forEach(item => {
    const workImage = item.querySelector('.work-image');
    const workContent = item.querySelector('.work-content');
    const chartBars = item.querySelectorAll('.chart-bar');
    const codeLines = item.querySelectorAll('.code-line');
    
    item.addEventListener('mouseenter', () => {
        // Animate chart bars
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(1.1)';
                bar.style.filter = 'brightness(1.1)';
            }, index * 50);
        });
        
        // Animate code lines
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transform = 'translateX(5px)';
                line.style.color = 'var(--accent-color)';
            }, index * 100);
        });
        
        // Content animation
        workContent.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        chartBars.forEach(bar => {
            bar.style.transform = 'scaleY(1)';
            bar.style.filter = 'brightness(1)';
        });
        
        codeLines.forEach(line => {
            line.style.transform = 'translateX(0)';
            line.style.color = '';
        });
        
        workContent.style.transform = 'translateX(0)';
    });
});

// Parallax effect for data background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const dataGrid = document.querySelector('.data-grid');
    const floatingData = document.querySelector('.floating-data');
    
    if (dataGrid) {
        dataGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (floatingData) {
        floatingData.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

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

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance monitoring (mock implementation)
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Portfolio loaded in ${loadTime}ms`);
    
    // Store performance data
    const perfData = JSON.parse(localStorage.getItem('portfolioPerf') || '[]');
    perfData.push({
        timestamp: new Date().toISOString(),
        loadTime: loadTime,
        userAgent: navigator.userAgent.substring(0, 50),
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // Keep only last 5 entries
    if (perfData.length > 5) perfData.shift();
    localStorage.setItem('portfolioPerf', JSON.stringify(perfData));
});

//  Konami code for fun stats
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Show fun developer stats
        const stats = {
            'Coffee consumed': Math.floor(Math.random() * 500) + 200 + ' cups',
            'Lines of code': Math.floor(Math.random() * 10000) + 5000,
            'Bugs fixed': Math.floor(Math.random() * 100) + 50,
            'Commits this year': Math.floor(Math.random() * 300) + 150
        };
        
        let message = 'Developer Stats Unlocked! 🚀\n\n';
        Object.entries(stats).forEach(([key, value]) => {
            message += `${key}: ${value}\n`;
        });
        
        alert(message);
        konamiCode = [];
    }
});



// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add loading complete class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize enhanced project scrolling
    enhanceProjectScrolling();
    
    // Add stagger animation to skill categories
    document.querySelectorAll('.skills-grid').forEach(grid => {
        grid.classList.add('stagger-animation');
    });
});