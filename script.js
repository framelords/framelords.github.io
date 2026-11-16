document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => observer.observe(el));

    // 2. Portfolio Tabs (Vertical / Horizontal)
    const tabs = document.querySelectorAll('.works__tab');
    const verticalGrid = document.getElementById('vertical-works');
    const horizontalGrid = document.getElementById('horizontal-works');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Pause all playing videos on tab switch
            document.querySelectorAll('.works__video-wrap video').forEach(v => {
                v.pause();
                v.closest('.works__video-wrap').classList.remove('playing');
            });

            if (tab.dataset.target === 'vertical') {
                verticalGrid.style.display = 'grid';
                horizontalGrid.style.display = 'none';
            } else {
                verticalGrid.style.display = 'none';
                horizontalGrid.style.display = 'grid';
            }
        });
    });

    // 3. Interactive Video Cards (Click to play with sound)
    const videoWraps = document.querySelectorAll('.works__video-wrap');
    videoWraps.forEach(wrap => {
        const video = wrap.querySelector('video');
        wrap.addEventListener('click', () => {
            if (video.paused) {
                // Pause other videos first
                videoWraps.forEach(otherWrap => {
                    if (otherWrap !== wrap) {
                        const otherVideo = otherWrap.querySelector('video');
                        otherVideo.pause();
                        otherWrap.classList.remove('playing');
                    }
                });
                video.muted = false;
                video.play();
                wrap.classList.add('playing');
            } else {
                video.pause();
                wrap.classList.remove('playing');
            }
        });
    });

    // 4. Mobile Menu Toggle
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }
});
