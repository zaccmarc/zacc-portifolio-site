/**
 * Portfolio Website JavaScript
 * 
 * This file contains all custom JavaScript functionality for the portfolio site,
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    const articlesCarousel = document.querySelector('.articles-carousel'); // Usando a classe que adicionamos
    if (articlesCarousel) {
        new Splide(articlesCarousel, {
            type: 'slide',       // 'slide' (normal), 'loop' (infinito), 'fade'
            perPage: 3,          // Número de slides visíveis por vez em telas maiores
            perMove: 1,          // Quantos slides mover ao navegar
            gap: '1.5rem',       // Espaço entre os slides (ex: '24px' ou '1.5rem')
            pagination: false,   // Esconde os pontinhos de navegação (defina como true se quiser)
            arrows: true,        // Mostra as setas de navegação (true por padrão)
            drag: 'free',        // Permite arrastar livremente, bom para sensação Netflix
            snap: true,          // Faz o slide "encaixar" na posição correta após arrastar
            breakpoints: {       // Configurações responsivas
                1024: {          // Em telas com <= 1024px de largura
                    perPage: 2,
                    gap: '1rem',
                },
                768: {           // Em telas com <= 768px de largura
                    perPage: 1,
                    gap: '0.75rem',
                    arrows: false, // Pode-se esconder as setas em mobile se preferir só o swipe
                },
            },
            // Você pode adicionar mais opções aqui conforme a documentação do Splide.js
            // Por exemplo, para ter até 10 cards, basta garantir que você tenha os <li> no HTML.
            // O Splide irá gerenciá-los. Se quiser mostrar apenas X por vez, use 'perPage'.
        }).mount();
    }

    console.log("Tentando inicializar o carrossel de Certificados...");
    const certificatesCarouselElement = document.querySelector('.certificates-carousel'); // Usando a nova classe

    if (certificatesCarouselElement) {
        console.log("Elemento .certificates-carousel encontrado:", certificatesCarouselElement);
        try {
            new Splide(certificatesCarouselElement, {
                type: 'slide',      // 'slide' (normal), 'loop' (infinito), 'fade'
                perPage: 3,         // Número de slides visíveis por vez em telas maiores
                perMove: 1,         // Quantos slides mover ao navegar
                gap: '1.5rem',      // Espaço entre os slides
                pagination: true,   // Mudei para true para mostrar os pontinhos (opcional)
                arrows: true,       // Mostra as setas de navegação
                drag: 'free',
                snap: true,
                breakpoints: {      // Configurações responsivas
                    1024: {         // Em telas com <= 1024px de largura
                        perPage: 2,
                        gap: '1rem',
                    },
                    768: {          // Em telas com <= 768px de largura
                        perPage: 1,
                        gap: '0.75rem',
                        arrows: false, // Pode-se esconder as setas em mobile
                    },
                },
                // Outras opções podem ser adicionadas ou ajustadas conforme necessário
            }).mount();
            console.log("Splide para Certificados montado com sucesso!");
        } catch (error) {
            console.error("Erro ao montar o Splide para Certificados:", error);
        }
    } else {
        console.warn("Elemento .certificates-carousel NÃO encontrado!");
    }

    // Animate elements when they enter the viewport
    const animatedElements = document.querySelectorAll('.article-card, .experience-item, .education-item, .certificate-card');

    // Initialize Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Negative bottom margin to trigger earlier
    });

    // Observe all animated elements
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

    // Form validation and submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            // Simple validation
            let isValid = true;

            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeHighlight(nameInput);
            }

            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeHighlight(emailInput);
            }

            if (!subjectInput.value.trim()) {
                highlightError(subjectInput);
                isValid = false;
            } else {
                removeHighlight(subjectInput);
            }

            if (!messageInput.value.trim()) {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeHighlight(messageInput);
            }

            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For demo purposes, we'll just show a success message
                alert('Your message has been sent successfully!');
                contactForm.reset();
            }
        });
    }

    // Helper functions for form validation
    function highlightError(input) {
        input.classList.add('border-red-500');
        input.classList.remove('border-gray-200');
    }

    function removeHighlight(input) {
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-200');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Alpine.js helper function for scrolling to sections
    window.scrollToSection = function (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
});