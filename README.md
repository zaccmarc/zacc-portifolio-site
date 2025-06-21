# Zacc Portifolio Site

Este é o repositório do site de portfólio pessoal de Isaac Marcolino, desenvolvido para apresentar suas habilidades, projetos, artigos e experiência profissional de forma moderna e responsiva.

## Visão Geral

O site é uma página única (SPA - Single Page Application) estática, projetada com foco em performance e na experiência do usuário. Ele é totalmente responsivo, adaptando-se a desktops, tablets e dispositivos móveis.

## Tecnologias Utilizadas

A implementação do site foi baseada em tecnologias front-end modernas, sem a necessidade de um back-end complexo.

- **HTML5**: Utilizado para a estruturação semântica de todo o conteúdo do site.
- **Tailwind CSS**: Um framework CSS "utility-first" que permitiu a criação de um design customizado de forma rápida e eficiente. O Tailwind foi integrado através da sua CDN oficial.
- **JavaScript (ES6+)**: Usado para adicionar interatividade e dinamismo ao site. O código principal está no arquivo `js/scripts.js`.
- **Alpine.js**: Um microframework JavaScript minimalista para compor comportamentos reativos diretamente no HTML. Foi a principal ferramenta para gerenciar o estado da gaveta de navegação mobile (aberto/fechado).
- **Splide.js**: Uma biblioteca de carrossel leve, flexível e acessível, utilizada para criar os sliders das seções "Articles" e "Certificates".

## Funcionalidades Implementadas

O site conta com diversas funcionalidades para melhorar a navegação e a experiência do usuário.

- **Design Responsivo**: Todos os componentes foram construídos com uma abordagem "mobile-first", garantindo uma visualização perfeita em qualquer tamanho de tela.
- **Navegação Fixa e Gaveta Mobile**:
    - Em telas maiores (desktop), a barra de navegação permanece fixa no topo da página.
    - Em dispositivos móveis, o menu se transforma em um ícone de "hambúrguer" que, ao ser clicado, aciona uma gaveta lateral (drawer) com transições suaves. Esta funcionalidade foi implementada com Alpine.js.
- **Carrosséis Interativos**:
    - As seções "Articles" e "Certificates" utilizam a biblioteca Splide.js para exibir os cards em um formato de carrossel.
    - Os carrosséis são navegáveis por toque (swipe) em dispositivos móveis e por setas em desktops.
    - Indicadores de paginação (pontos) foram habilitados para facilitar a navegação.
- **Animações de Scroll**:
    - Elementos como cards de artigos e certificados aparecem com animações de "slide-up" e "fade-in" à medida que o usuário rola a página.
    - Esta funcionalidade foi implementada de forma performática utilizando a **Intersection Observer API** do JavaScript, que detecta quando um elemento entra na área visível da tela.
- **Botão "Voltar ao Topo"**: Um botão fixo aparece no canto inferior direito após o usuário rolar uma certa altura da página, permitindo um retorno rápido ao topo com um clique.

## Estrutura do Projeto

O projeto é organizado de forma simples e intuitiva:

```bash
/
|-- index.html            # Arquivo principal com toda a estrutura e conteúdo.
|-- css/
|   |-- style.css         # Folha de estilos customizada para elementos específicos.
|-- js/
|   |-- scripts.js        # Script principal com a lógica dos carrosséis e animações.
|-- images/               # Pasta para armazenar as imagens utilizadas no site.
|-- README.md             # Este arquivo.
```

- **`index.html`**: Contém todo o markup HTML do site, dividido em seções (`<section>`) como "About", "Articles", "Experience", etc. As diretivas do Alpine.js (`x-data`, `x-show`, `@click`) estão presentes neste arquivo.
- **`css/style.css`**: Inclui estilos personalizados que complementam as classes do Tailwind CSS, como animações de keyframes (`fadeIn`, `slideUp`), estilos para os botões e para as setas do carrossel Splide.js.
- **`js/scripts.js`**: Responsável pela inicialização dos carrosséis Splide.js com suas respectivas configurações (responsividade, paginação, etc.) e pela configuração do Intersection Observer para as animações de scroll.
