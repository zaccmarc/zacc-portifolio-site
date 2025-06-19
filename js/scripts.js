/**
 * Portfolio Website JavaScript
 * * This file contains all custom JavaScript functionality for the portfolio site,
 * including scroll animations, intersection observers, and interactive elements.
 */

document.addEventListener('DOMContentLoaded', function () {

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'translate-y-16');
            backToTopButton.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopButton.classList.add('opacity-0', 'translate-y-16');
            backToTopButton.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    // Smooth scrolling for navigation links (fallback for browsers that don't support scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Account for fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const articlesCarousel = document.querySelector('.articles-carousel');
    if (articlesCarousel) {
        new Splide(articlesCarousel, {
            type: 'slide',
            perPage: 3,
            perMove: 1,
            gap: '1.5rem',
            pagination: true, // Habilitado para mostrar os pontos de navegação
            arrows: true,
            drag: 'free',
            snap: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                    gap: '1rem',
                },
                768: {
                    perPage: 1,
                    gap: '0.75rem',
                    arrows: false,
                },
            },
        }).mount();
    }

    const certificatesCarouselElement = document.querySelector('.certificates-carousel');

    if (certificatesCarouselElement) {
        try {
            new Splide(certificatesCarouselElement, {
                type: 'slide',
                perPage: 3,
                perMove: 1,
                gap: '1.5rem',
                pagination: true,
                arrows: true,
                drag: 'free',
                snap: true,
                breakpoints: {
                    1024: {
                        perPage: 2,
                        gap: '1rem',
                    },
                    768: {
                        perPage: 1,
                        gap: '0.75rem',
                        arrows: false,
                    },
                },
            }).mount();
        } catch (error) {
            console.error("Erro ao montar o Splide para Certificados:", error);
        }
    }

    // Animate elements when they enter the viewport
    const animatedElements = document.querySelectorAll('.article-card, .experience-item, .education-item, .certificate-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Stagger animation delay for grid items
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    });

    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    });
});