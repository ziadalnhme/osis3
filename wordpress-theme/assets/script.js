/**
 * سكريبت قالب أسس الأعمار للاستشارات الهندسية
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // تأثير الظهور التدريجي للعناصر
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // مراقبة العناصر
        const elementsToAnimate = document.querySelectorAll(
            '.stat-item, .service-card, .hero-text, .hero-image, .contact-item, .vision-card, .mission-card'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // تأثير الأرقام المتحركة في الإحصائيات
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + '+';
            }, 40);
        });
    }

    // مراقب خاص لقسم الإحصائيات
    function initStatsAnimation() {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateCounters, 500);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }
    }

    // التنقل السلس بين الأقسام
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // تأثير تمييز الرابط النشط في القائمة
    function initActiveNavigation() {
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveLink() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // تشغيل أولي
    }

    // تأثير تحريك الهيدر عند التمرير
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // التمرير لأسفل - إخفاء الهيدر
                header.style.transform = 'translateY(-100%)';
            } else {
                // التمرير لأعلى - إظهار الهيدر
                header.style.transform = 'translateY(0)';
            }
            
            // إضافة خلفية للهيدر عند التمرير
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // تأثير تحريك البطاقات عند التمرير فوقها
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.service-card, .stat-item, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // تأثير الكتابة التدريجية للعنوان الرئيسي
    function initTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid #fbbf24';
            
            let i = 0;
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }
    }

    // تأثير الجسيمات المتحركة في الخلفية
    function initParticleEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            // إنشاء جسيمات متحركة
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(251, 191, 36, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${5 + Math.random() * 10}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 5}s;
                `;
                heroSection.appendChild(particle);
            }
        }
    }

    // إضافة أنماط CSS للتأثيرات
    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .site-header {
                transition: transform 0.3s ease, background-color 0.3s ease;
            }
            
            .site-header.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
            
            .animate-fade-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .service-card, .stat-item, .contact-item {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hero-section {
                position: relative;
                overflow: hidden;
            }
            
            .main-nav a.active {
                background-color: #dbeafe;
                color: #1e40af;
            }
        `;
        document.head.appendChild(style);
    }

    // تشغيل جميع التأثيرات
    function init() {
        addCustomStyles();
        initScrollAnimations();
        initStatsAnimation();
        initSmoothScrolling();
        initActiveNavigation();
        initHeaderScroll();
        initCardHoverEffects();
        
        // تأثيرات إضافية (اختيارية)
        setTimeout(initTypewriterEffect, 1000);
        initParticleEffect();
    }

    // بدء التشغيل
    init();

    // إضافة مستمع لتغيير حجم النافذة
    window.addEventListener('resize', function() {
        // إعادة حساب المواضع عند تغيير حجم النافذة
        setTimeout(initActiveNavigation, 100);
    });

    // تأثير تحميل الصفحة
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // إضافة تأثير تدريجي لظهور المحتوى
        const mainContent = document.querySelector('#main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 200);
        }
    });

    // معالجة الأخطاء
    window.addEventListener('error', function(e) {
        console.log('خطأ في السكريبت:', e.message);
    });
});

// دوال مساعدة إضافية
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// إضافة زر العودة لأعلى
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1e40af;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// تشغيل زر العودة لأعلى
document.addEventListener('DOMContentLoaded', addBackToTopButton);