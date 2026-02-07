// ==========================================
// KAMPANYE LINGKUNGAN - INTERACTIVE SCRIPTS
// Langkah Kecil Generasi Muda
// ==========================================

console.log('🌱 Website Kampanye Lingkungan - Loaded');

// Register Service Worker if available
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // UNREGISTER SERVICE WORKER FOR DEVELOPMENT
        // This clears the cache issues
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
                console.log('🧹 Service Worker Unregistered to clear cache');
            }
        });
    });
}

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
    initSliders();
    initScrollEffects();
    initSliders();
    initScrollEffects();
    initFloatingBg();
    initVideoControls(); // Initialize video controls

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

    // Weekly usage in grams per category for Chart
    const weeklyData = {
        bottles: bottles * bottleWeight,
        bags: bags * bagWeight,
        packaging: packaging * packagingWeight,
        straws: straws * strawWeight
    };

    // Weekly usage in grams
    const weeklyPlastic = weeklyData.bottles + weeklyData.bags + weeklyData.packaging + weeklyData.straws;

    // Annual calculation
    const yearlyPlastic = weeklyPlastic * 52;
    const totalKg = (yearlyPlastic / 1000).toFixed(1);

    // Calculate equivalents
    const totalBottles = Math.round(bottles * 52);
    const treesNeeded = Math.ceil(totalKg / 6); // Approx 6kg CO2 per tree/year

    // Global average is about 84kg per person per year
    const globalAverage = 84;
    const percentage = Math.min(100, (totalKg / globalAverage) * 100);

    // Display results with Chart Data
    displayResults(totalKg, totalBottles, treesNeeded, percentage, weeklyData);
}

let plasticChart = null; // Store chart instance

function displayResults(totalKg, totalBottles, treesNeeded, percentage, weeklyData) {
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

    // RENDER CHART
    const ctx = document.getElementById('plasticChart').getContext('2d');

    // Destroy existing chart if any
    if (plasticChart) {
        plasticChart.destroy();
    }

    plasticChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Botol', 'Kantong', 'Kemasan', 'Sedotan'],
            datasets: [{
                data: [weeklyData.bottles, weeklyData.bags, weeklyData.packaging, weeklyData.straws],
                backgroundColor: ['#3b82f6', '#10b981', '#fbbf24', '#ef4444'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 14
                        },
                        usePointStyle: true
                    }
                },
                title: {
                    display: true,
                    text: 'Komposisi Sampah Plastik Mingguan',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            }
        }
    });

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

    // Parallax effect for hero video - DISABLED for static video
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.scrollY;
    //     const heroVideoContainer = document.querySelector('.video-container');

    //     if (heroVideoContainer && scrolled < 800) {
    //         heroVideoContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
    //     }
    // });
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

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== JOIN FORM HANDLING ==========
const joinForm = document.getElementById('joinForm');

if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            kota: document.getElementById('kota').value,
            motivasi: document.getElementById('motivasi').value,
            agree: document.getElementById('agree').checked
        };

        // Simulate form submission with animation
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Success!
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Berhasil Terdaftar!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)';

            // Show success message
            alert(`🎉 Selamat ${formData.nama}!\n\nKamu berhasil terdaftar untuk challenge 30 hari!\n\nCek email kamu untuk informasi selanjutnya.\n\n#LangkahKecilBumiSehat 💚`);

            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);

            // Log for demo
            console.log('📝 Form submitted:', formData);
        }, 2000);
    });
}

// ========== GALLERY LIGHTBOX EFFECT ==========
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');
        const imgSrc = img.src;

        // Create lightbox (simple version)
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.4s ease;
        `;

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        // Close on click
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
    });
});

// ========== DYNAMIC NUMBER COUNTER FOR CHALLENGE STATS ==========
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isDecimal = target.toString().includes('.');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : target;
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
    }, 16);
}

// Animate challenge stats when scrolled into view
const challengeSection = document.querySelector('.challenge');
if (challengeSection) {
    let challengeAnimated = false;

    const observerChallenge = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !challengeAnimated) {
                challengeAnimated = true;

                // Animate numbers
                const participantsEl = document.getElementById('participantsCount');
                if (participantsEl) {
                    let count = 0;
                    const target = 12847;
                    const timer = setInterval(() => {
                        count += 200;
                        if (count >= target) {
                            participantsEl.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            participantsEl.textContent = count.toLocaleString();
                        }
                    }, 20);
                }

                const plasticEl = document.getElementById('plasticSaved');
                if (plasticEl) {
                    let count = 0;
                    const timer = setInterval(() => {
                        count += 0.1;
                        if (count >= 3.2) {
                            plasticEl.textContent = '3.2 TON';
                            clearInterval(timer);
                        } else {
                            plasticEl.textContent = count.toFixed(1) + ' TON';
                        }
                    }, 30);
                }
            }
        });
    }, { threshold: 0.3 });

    observerChallenge.observe(challengeSection);
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        const btn = this.querySelector('button');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            alert(`✅ Terima kasih! Email ${email} sudah terdaftar untuk newsletter.\n\nCek inbox kamu untuk konfirmasi.`);

            setTimeout(() => {
                this.reset();
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ========== ENHANCED SCROLL REVEAL FOR CHALLENGE WEEKS ==========
const challengeWeeks = document.querySelectorAll('.challenge-week');

challengeWeeks.forEach((week, index) => {
    week.style.setProperty('--delay', `${index * 100}ms`);
});

// ========== TOUCH FEEDBACK FOR MOBILE ==========
document.querySelectorAll('.btn, .social-link, .gallery-item').forEach(element => {
    element.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.95)';
    });

    element.addEventListener('touchend', function () {
        this.style.transform = '';
    });
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== FORM VALIDATION ENHANCEMENT ==========
const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() && this.checkValidity()) {
            this.style.borderColor = '#22c55e';
        } else if (!this.checkValidity() && this.value.trim()) {
            this.style.borderColor = '#ef4444';
        }
    });

    input.addEventListener('input', function () {
        if (this.style.borderColor === '#ef4444' || this.style.borderColor === '#22c55e') {
            this.style.borderColor = '';
        }
    });
});

// ========== ACCESSIBILITY KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // ESC key closes lightbox
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('[style*="z-index: 10000"]');
        if (lightbox) {
            lightbox.click();
        }

        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            document.getElementById('navToggle').click();
        }
    }

    // Ctrl/Cmd + K to focus search (if you add search later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus first form input
        const firstInput = document.querySelector('input[type="email"]');
        if (firstInput) firstInput.focus();
    }
});

// ========== SMOOTH PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;

        if (loadTime > 0) {
            console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)} seconds`);

            // Log performance metrics
            console.log('%cPerformance Metrics:', 'color: #3b82f6; font-weight: bold;');
            console.log(`DNS Lookup: ${(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`);
            console.log(`Server Response: ${(perfData.responseEnd - perfData.requestStart)}ms`);
            console.log(`DOM Processing: ${(perfData.domComplete - perfData.domLoading)}ms`);
        }
    }
});

// ========== ENGAGEMENT TRACKING (FOR ANALYTICS) ==========
let engagementMetrics = {
    scrollDepth: 0,
    timeOnPage: 0,
    interactionsCount: 0
};

// Track scroll depth
window.addEventListener('scroll', throttle(() => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    engagementMetrics.scrollDepth = Math.max(engagementMetrics.scrollDepth, scrollPercent);
}, 1000));

// Track time on page
setInterval(() => {
    engagementMetrics.timeOnPage += 1;
}, 1000);

// Track interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('button, a, .card, .gallery-item')) {
        engagementMetrics.interactionsCount++;
    }
});

// Log engagement when leaving (for demo purposes)
window.addEventListener('beforeunload', () => {
    console.log('%cUser Engagement Metrics:', 'color: #fbbf24; font-weight: bold;');
    console.log(engagementMetrics);
});

console.log('✅ All enhanced features initialized successfully!');

// ========== UPLOAD PHOTO FUNCTIONALITY ==========
const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');
const galleryGrid = document.querySelector('.photo-gallery-grid');

if (uploadBtn && uploadInput && galleryGrid) {
    uploadBtn.addEventListener('click', () => {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgSrc = e.target.result;

                // Create new gallery item
                const newItem = document.createElement('div');
                newItem.className = 'gallery-item';
                newItem.innerHTML = `
                    <img src="${imgSrc}" alt="User Uploaded Photo">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                `;

                // Add animation class
                newItem.style.animation = 'fadeInUp 0.5s ease';

                // Add to grid
                galleryGrid.appendChild(newItem);

                // Add lightbox functionality to new item
                newItem.addEventListener('click', function () {
                    const lightbox = document.createElement('div');
                    lightbox.style.cssText = `
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0, 0, 0, 0.95); display: flex;
                        align-items: center; justify-content: center; z-index: 10000;
                        cursor: pointer; animation: fadeIn 0.3s ease;
                    `;

                    const lightboxImg = document.createElement('img');
                    lightboxImg.src = imgSrc;
                    lightboxImg.style.cssText = `
                        max-width: 90%; max-height: 90%; border-radius: 12px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); animation: zoomIn 0.4s ease;
                    `;

                    lightbox.appendChild(lightboxImg);
                    document.body.appendChild(lightbox);

                    lightbox.addEventListener('click', () => {
                        lightbox.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => document.body.removeChild(lightbox), 300);
                    });
                });

                // Scroll to new item
                newItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Show success feedback
                const originalText = uploadBtn.innerHTML;
                uploadBtn.innerHTML = '<i class="fas fa-check"></i> Terupload!';
                setTimeout(() => {
                    uploadBtn.innerHTML = originalText;
                }, 2000);
            }

            reader.readAsDataURL(file);
        }
    });
}

// ========== GUIDE MODAL FUNCTIONALITY ==========
const downloadGuideBtn = document.getElementById('downloadGuideBtn');
const guideModal = document.getElementById('guideModal');
const closeModal = document.querySelector('.close-modal');

if (downloadGuideBtn && guideModal) {
    downloadGuideBtn.addEventListener('click', () => {
        guideModal.style.display = 'flex';
        setTimeout(() => {
            guideModal.classList.add('show');
        }, 10);
    });

    const hideModal = () => {
        guideModal.classList.remove('show');
        setTimeout(() => {
            guideModal.style.display = 'none';
        }, 300);
    };

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
            hideModal();
        }
    });
}
// ========== FLOATING BACKGROUND CONTROL ==========
// ========== FLOATING BACKGROUND CONTROL ==========
function initFloatingBg() {
    const floatingBg = document.getElementById('floatingBg');
    const footer = document.querySelector('footer');
    const joinSection = document.getElementById('bergabung');
    const homeSection = document.getElementById('home'); // First section

    if (!floatingBg) return;

    // Use Intersection Observer to hide bg when specific sections are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If any prohibited section enters the viewport, hide BG
                floatingBg.classList.add('hidden');
            } else {
                // If a prohibited section leaves, we only show BG if NO OTHER prohibited section is visible.
                // However, the 'entries' array only lists changes. We can't check the state of other observed elements easily here without tracking state.
                // A simpler, robust heuristic for this specific site structure (Home -> Content -> Join/Footer):
                // If we leave Home (going down), show. 
                // If we leave Join/Footer (going up), show.
                // We will simply remove 'hidden' here. The 'add hidden' from another intersection event will cleanly override this if overlapping occurs slightly.
                floatingBg.classList.remove('hidden');
            }
        });
    }, {
        root: null,
        threshold: 0.1 // Trigger when 10% of the target is visible
    });

    if (homeSection) observer.observe(homeSection);
    if (joinSection) observer.observe(joinSection);
    if (footer) observer.observe(footer);
}

// ========== VIDEO CONTROLS ==========
function initVideoControls() {
    const heroVideo = document.getElementById('heroVideo');
    const muteToggle = document.getElementById('muteToggle');
    const resetVideo = document.getElementById('resetVideo');

    if (!heroVideo || !muteToggle || !resetVideo) return;

    // Mute/Unmute Toggle
    muteToggle.addEventListener('click', function () {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            this.querySelector('i').classList.remove('fa-volume-mute');
            this.querySelector('i').classList.add('fa-volume-up');
            this.setAttribute('aria-label', 'Mute');
        } else {
            heroVideo.muted = true;
            this.querySelector('i').classList.remove('fa-volume-up');
            this.querySelector('i').classList.add('fa-volume-mute');
            this.setAttribute('aria-label', 'Unmute');
        }
    });

    // Reset Video
    resetVideo.addEventListener('click', function () {
        heroVideo.currentTime = 0;
        heroVideo.play();

        // Add visual feedback
        this.style.transform = 'rotate(360deg) scale(1.15)';
        setTimeout(() => {
            this.style.transform = '';
        }, 400);
    });

    console.log('✅ Video controls initialized');
}