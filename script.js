// ==========================================
// KAMPANYE LINGKUNGAN - INTERACTIVE SCRIPTS
// Langkah Kecil Generasi Muda
// ==========================================

console.log('🌱 Website Kampanye Lingkungan - Loaded');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all features
    initNavigation();
    initDarkMode();
    initStatCounter();
    initCalculator();
    initSliders();
    initScrollEffects();

    console.log('✅ All features initialized');
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active navigation based on scroll position
        updateActiveNav();
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== DARK MODE ==========
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isNowDark = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isNowDark);
            updateDarkModeIcon(isNowDark);

            // Add fun animation
            darkModeToggle.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                darkModeToggle.style.transform = '';
            }, 300);
        });
    }
}

function updateDarkModeIcon(isDark) {
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
}

// ========== STATISTICS COUNTER ==========
function initStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.statistics');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            hasAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

// ========== CALCULATOR ==========
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePlasticFootprint);
    }
}

function initSliders() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(slider.id + 'Value');

        // Initial value
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }

        // Update on input
        slider.addEventListener('input', function () {
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });
    });
}

function calculatePlasticFootprint() {
    // Get input values
    const bottles = parseInt(document.getElementById('bottles').value);
    const bags = parseInt(document.getElementById('bags').value);
    const packaging = parseInt(document.getElementById('packaging').value);
    const straws = parseInt(document.getElementById('straws').value);

    // Calculation logic (approximate weights in grams)
    const bottleWeight = 15; // grams per bottle
    const bagWeight = 7; // grams per bag
    const packagingWeight = 10; // grams per packaging
    const strawWeight = 1; // grams per straw

    // Weekly usage in grams
    const weeklyPlastic = (bottles * bottleWeight) +
        (bags * bagWeight) +
        (packaging * packagingWeight) +
        (straws * strawWeight);

    // Annual calculation
    const yearlyPlastic = weeklyPlastic * 52;
    const totalKg = (yearlyPlastic / 1000).toFixed(1);

    // Calculate equivalents
    const totalBottles = Math.round(bottles * 52);
    const treesNeeded = Math.ceil(totalKg / 6); // Approx 6kg CO2 per tree/year

    // Global average is about 84kg per person per year
    const globalAverage = 84;
    const percentage = Math.min(100, (totalKg / globalAverage) * 100);

    // Display results
    displayResults(totalKg, totalBottles, treesNeeded, percentage);
}

function displayResults(totalKg, totalBottles, treesNeeded, percentage) {
    const resultDiv = document.getElementById('calculatorResult');
    const formDiv = document.querySelector('.calculator-form');

    // Update values
    document.getElementById('totalKg').textContent = totalKg;
    document.getElementById('totalBottles').textContent = totalBottles.toLocaleString();
    document.getElementById('treesNeeded').textContent = treesNeeded;

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    setTimeout(() => {
        progressFill.style.width = percentage + '%';
    }, 100);

    // Determine message based on score
    const messageDiv = document.getElementById('resultMessage');
    let messageClass = '';
    let messageText = '';
    let emoji = '';

    if (totalKg >= 84) {
        messageClass = 'high';
        emoji = '😱';
        messageText = `${emoji} <strong>Jejak plastikmu cukup tinggi!</strong><br>
                      Kamu menggunakan ${totalKg}kg plastik per tahun, lebih dari rata-rata global (84kg).
                      Yuk mulai challenge 30 hari untuk mengurangi penggunaan plastik!`;
    } else if (totalKg >= 42) {
        messageClass = 'medium';
        emoji = '👍';
        messageText = `${emoji} <strong>Lumayan bagus!</strong><br>
                      Kamu menggunakan ${totalKg}kg plastik per tahun, di bawah rata-rata global.
                      Tapi kamu masih bisa lebih baik lagi! Mari bergabung dalam challenge kami.`;
    } else {
        messageClass = 'low';
        emoji = '🌟';
        messageText = `${emoji} <strong>Hebat sekali!</strong><br>
                      Kamu hanya menggunakan ${totalKg}kg plastik per tahun!
                      Kamu sudah menjadi eco-warrior sejati. Bantu sebarkan gerakan ini!`;
    }

    messageDiv.className = `result-message ${messageClass}`;
    messageDiv.innerHTML = messageText;

    // Show results with animation
    formDiv.style.display = 'none';
    resultDiv.style.display = 'block';

    // Add confetti effect for low score
    if (messageClass === 'low') {
        createConfetti();
    }

    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function createConfetti() {
    // Simple confetti effect
    const confettiCount = 50;
    const colors = ['#10b981', '#3b82f6', '#fbbf24', '#ef4444', '#8b5cf6'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
        }, 100);

        setTimeout(() => {
            confetti.remove();
        }, 3100);
    }
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.statistics');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Hide on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImage = document.querySelector('.hero-image img');

        if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ========== SOLUTION CARDS TOUCH SUPPORT ==========
// For mobile devices, tap to flip cards
const solutionCards = document.querySelectorAll('.solution-card');
solutionCards.forEach(card => {
    let isFlipped = false;

    card.addEventListener('click', function () {
        // For touch devices
        if ('ontouchstart' in window) {
            isFlipped = !isFlipped;
            const inner = this.querySelector('.card-inner');
            if (isFlipped) {
                inner.style.transform = 'rotateY(180deg)';
            } else {
                inner.style.transform = 'rotateY(0deg)';
            }
        }
    });
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent animations
}, 100));

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)} seconds`);
    }
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('❌ An error occurred:', e.message);
});

// ========== CONSOLE EASTER EGG ==========
console.log('%c🌍 Terima kasih telah peduli dengan Bumi!',
    'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%c💚 Setiap langkah kecil membuat perbedaan besar.',
    'color: #3b82f6; font-size: 16px;');
console.log('%cBergabunglah dengan gerakan kami: #LangkahKecilBumiSehat',
    'color: #fbbf24; font-size: 14px; font-style: italic;');
