<footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.svg" alt="<?php bloginfo('name'); ?>">
                        <div class="logo-text">
                            <h3><?php bloginfo('name'); ?></h3>
                            <p><?php bloginfo('description'); ?></p>
                        </div>
                    </div>
                    <p>نحن شركة رائدة في مجال الاستشارات الهندسية، نقدم حلولاً مبتكرة ومتكاملة في التصميم المعماري والإنشائي وأنظمة الكهروميكانيك.</p>
                    <div class="social-links">
                        <a href="#" title="فيسبوك">📘</a>
                        <a href="#" title="تويتر">🐦</a>
                        <a href="#" title="لينكد إن">💼</a>
                        <a href="#" title="إنستغرام">📷</a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>روابط سريعة</h3>
                    <ul>
                        <li><a href="#about">حول الشركة</a></li>
                        <li><a href="#services">خدماتنا</a></li>
                        <li><a href="#projects">مشاريعنا</a></li>
                        <li><a href="#contact">اتصل بنا</a></li>
                        <li><a href="#vision">الرؤية والأهداف</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>خدماتنا</h3>
                    <ul>
                        <li><a href="#services">التصميم المعماري</a></li>
                        <li><a href="#services">التصميم الإنشائي</a></li>
                        <li><a href="#services">أنظمة الكهروميكانيك</a></li>
                        <li><a href="#services">إدارة المشاريع</a></li>
                        <li><a href="#services">الاستشارات الفنية</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>معلومات الاتصال</h3>
                    <div class="contact-info">
                        <p>📞 +966 55 929 9897</p>
                        <p>✉️ info@osos-imar.com</p>
                        <p>📍 حي المنار، شارع الملك فهد طريق المطار<br>جوار مطعم البيك، الدمام 32273</p>
                        <p>🕒 السبت - الخميس: 8:00 ص - 12:00 م<br>و 4:00 م - 8:00 م</p>
                    </div>
                    <div class="whatsapp-link">
                        <a href="https://wa.me/966559299897" class="btn btn-success">💬 تواصل عبر الواتساب</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> شركة أسس الأعمار للاستشارات الهندسية. جميع الحقوق محفوظة.</p>
                <p>تصميم م/ زياد فؤاد | <a href="tel:+966547465459">📞 +966 54 746 5459</a> | <a href="https://wa.me/966547465459">💬 واتساب</a></p>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
    
    <script>
        // تأثيرات الأنيميشن
        document.addEventListener('DOMContentLoaded', function() {
            // تأثير الظهور التدريجي
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            }, observerOptions);

            // مراقبة العناصر
            document.querySelectorAll('.stat-item, .service-card, .hero-text, .hero-image').forEach(el => {
                observer.observe(el);
            });

            // تأثير الأرقام المتحركة
            function animateNumbers() {
                const numbers = document.querySelectorAll('.stat-number');
                numbers.forEach(number => {
                    const target = parseInt(number.textContent);
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        number.textContent = Math.floor(current) + '+';
                    }, 40);
                });
            }

            // تشغيل الأنيميشن عند الوصول للقسم
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                const statsObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateNumbers();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                statsObserver.observe(statsSection);
            }

            // التنقل السلس
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>