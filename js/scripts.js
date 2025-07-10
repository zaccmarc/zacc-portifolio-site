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

    // IMPORTANTE: Cole aqui a URL da sua API do Cloudflare Worker
    const API_URL = 'https://portfolio-chatbot-api.marcworkspace.workers.dev/';

    // Seleção de Elementos do DOM
    const floatingChatInput = document.getElementById('floating-chat-input');
    const chatModal = document.getElementById('chat-modal');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const messageHistory = document.getElementById('message-history');
    const mainContent = document.getElementById('main-content'); // Adicione este ID ao seu <main> ou <div> principal no HTML

    // Guarda a primeira mensagem (boas-vindas) para poder restaurá-la
    const welcomeMessageHTML = messageHistory.innerHTML;

    // Função para adicionar uma mensagem na tela
    // SUBSTITUA A FUNÇÃO 'appendMessage' INTEIRA PELA VERSÃO ABAIXO

    function appendMessage(sender, text) {
        // Escapa caracteres HTML para segurança
        const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        let messageDiv;
        if (sender === 'user') {
            // NOVO ESTILO: Bolha do usuário cinza claro, alinhada à direita.
            messageDiv = `
                <div class="flex justify-end">
                    <div class="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-xs md:max-w-md">
                        <p class="text-sm">${sanitizedText}</p>
                    </div>
                </div>`;
        } else { // sender === 'ai'
            // NOVO ESTILO: Resposta da IA sem bolha e sem ícone, alinhada à esquerda.
            messageDiv = `
                <div class="flex justify-start">
                    <div class="py-2 px-4 max-w-xs md:max-w-md">
                        <p class="text-sm text-gray-800">${sanitizedText}</p>
                    </div>
                </div>`;
        }
        messageHistory.insertAdjacentHTML('beforeend', messageDiv);
        messageHistory.scrollTop = messageHistory.scrollHeight; // Auto-scroll
    }

    // Funções para o indicador de "digitando..."
    function showTypingIndicator() {
        const typingIndicatorHTML = `
            <div id="typing-indicator" class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">AI</div>
                <div class="bg-gray-700 rounded-lg py-2 px-4 max-w-xs">
                    <div class="flex items-center space-x-1">
                        <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>`;
        messageHistory.insertAdjacentHTML('beforeend', typingIndicatorHTML);
        messageHistory.scrollTop = messageHistory.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // Função principal que envia a mensagem
    window.handleSendMessage = async function (event, isFromFloatingBar = false) {
        event.preventDefault();

        // Decide qual input usar: o flutuante ou o do modal
        const inputElement = isFromFloatingBar ? floatingChatInput : chatInput;
        const userMessage = inputElement.value.trim();

        if (!userMessage) return;

        // Se a mensagem veio da barra flutuante, limpa o histórico antes de começar
        if (isFromFloatingBar) {
            clearChatHistory();
        }

        appendMessage('user', userMessage);
        inputElement.value = ''; // Limpa o input usado
        if (!isFromFloatingBar) chatInput.focus(); // Mantém o foco no input do modal

        showTypingIndicator();

        // Adiciona a classe de desfoque no corpo do site
        if (mainContent) mainContent.classList.add('chat-modal-open');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            removeTypingIndicator();
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            appendMessage('ai', data.reply || "Não recebi uma resposta válida.");

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            removeTypingIndicator();
            appendMessage('ai', 'Desculpe, ocorreu um erro. Por favor, tente novamente.');
        }

    }

    // Função para limpar o histórico do chat e remover o desfoque
    window.clearChatHistory = function () {
        messageHistory.innerHTML = welcomeMessageHTML; // Restaura a mensagem de boas-vindas
        if (mainContent) mainContent.classList.remove('chat-modal-open');
    }

    // Event Listeners
    // Adiciona o listener ao formulário dentro do modal
    chatForm.addEventListener('submit', (e) => handleSendMessage(e, false));

    // Cria um novo handler para o formulário flutuante
    const floatingForm = floatingChatInput.closest('form');
    if (floatingForm) {
        floatingForm.addEventListener('submit', (e) => {
            // Primeiro, abre o modal via AlpineJS (precisamos dar um "empurrãozinho" no Alpine)
            const rootEl = floatingChatInput.closest('[x-data]');
            if (rootEl && rootEl.__x) {
                rootEl.__x.setData('chatOpen', true);
            }
            // Depois, envia a mensagem
            handleSendMessage(e, true);
            // Copia a mensagem para o input do modal, caso o usuário queira editar
            chatInput.value = floatingChatInput.value;
            floatingChatInput.value = '';
        });
    }
});