# Zacc Portifolio Site

Este é o repositório do site de portfólio pessoal de Isaac Marcolino, desenvolvido para apresentar suas habilidades, projetos, artigos e experiência profissional de forma moderna e responsiva.

# Assistente de IA com RAG para Portfólio Pessoal - Isaac Marcolino

Este repositório contém o código e a documentação para um assistente de IA avançado, integrado a um site de portfólio pessoal. A aplicação utiliza uma arquitetura de Geração Aumentada por Recuperação (RAG) em um ambiente totalmente *serverless*, projetada para fornecer respostas precisas e baseadas em fatos sobre meu perfil profissional para potenciais recrutadores.

O objetivo principal deste projeto é demonstrar competência técnica na construção de soluções de IA modernas, robustas, escaláveis e de baixo custo, indo além de um portfólio estático para criar uma experiência interativa e inteligente.

## Visão Geral da Arquitetura

A solução abandona a abordagem inviável de usar modelos de IA locais para um site público, que apresenta falhas críticas de disponibilidade e segurança. Em seu lugar, foi implementada uma arquitetura

*serverless* profissional, um padrão de design robusto e amplamente adotado na indústria.

O fluxo de dados segue o padrão RAG:

1. Um recrutador faz uma pergunta no chat do portfólio.
2. O sistema converte a pergunta em uma representação numérica (um vetor de embedding).
3. Esse vetor é usado para pesquisar em um banco de dados vetorial, que contém os vetores de todos os pedaços de informação da minha base de conhecimento.
4. O banco de dados retorna os trechos de texto mais semanticamente relevantes para a pergunta.
5. Esses trechos de texto são combinados com a pergunta original em um prompt "aumentado".
6. Este prompt é enviado para a API de um LLM, que gera uma resposta fundamentada estritamente no contexto fornecido.

Esta abordagem transforma a IA em um "motor de compreensão de leitura" altamente articulado e confiável.

---

### Backend: Construção e Tecnologias

O "cérebro" da aplicação foi construído como uma API robusta e escalável, utilizando uma pilha de tecnologias *serverless* para garantir alta disponibilidade e custo zero.

- **Tecnologias Utilizadas:**
    - **Cloudflare Workers:** Plataforma de computação *serverless* que executa a lógica da API na borda da rede da Cloudflare, garantindo baixa latência global. O plano gratuito oferece 100.000 requisições/dia, o que torna a solução extremamente resiliente.
    - 
        
        **Hono:** Framework de API ultraleve e rápido, otimizado para ambientes de borda como o Cloudflare Workers.
        
    - 
        
        **Cloudflare Vectorize:** Banco de dados vetorial nativo da Cloudflare, usado para armazenar e pesquisar as informações do meu perfil com base na similaridade semântica.
        
    - 
        
        **Cloudflare AI:** Serviço utilizado para gerar os *embeddings* (vetores numéricos) das perguntas dos usuários em tempo real.
        
    - 
        
        **Google Gemini API:** Modelo de linguagem grande (LLM) usado para gerar as respostas finais em linguagem natural, com base no contexto recuperado.
        
    - 
        
        **Cloudflare Secrets Store:** Serviço para armazenar de forma segura a chave da API do Google Gemini, evitando sua exposição no código.
        
- **Como foi Construído:**A API foi desenvolvida com o Hono, definindo um único endpoint
    
    `POST /api/chat`. Ao receber uma requisição, o Worker executa a lógica RAG: ele utiliza um "binding" nativo (
    
    `c.env.AI`) para gerar o embedding da pergunta, outro "binding" (`c.env.VECTORIZE_INDEX`) para consultar os dados relevantes no Vectorize e, por fim, chama a API do Gemini com a chave armazenada de forma segura para gerar a resposta final. Um middleware de CORS foi configurado para permitir a comunicação segura exclusivamente com o domínio do portfólio.
    

---

### Processo de Ingestão de Dados

A base de conhecimento da IA é populada através de um processo de ingestão executado localmente, garantindo que a API principal permaneça leve e rápida.

- **Como foi Construído:**
    1. 
        
        **Criação da Base de Conhecimento:** Todas as minhas informações profissionais foram consolidadas em um arquivo de texto simples, `about_me.txt`, estruturado com títulos e parágrafos focados para otimizar a recuperação de informações.
        
    2. **Preparação dos Dados:** Um script local em **Node.js** foi criado para ler o `about_me.txt`. Este script utiliza uma estratégia de "chunking" baseada em parágrafos para dividir o texto em pedaços semanticamente coesos.
    3. 
        
        **Geração de Embeddings:** O script faz uma chamada à API REST da **Cloudflare AI** para converter cada chunk de texto em um vetor numérico (embedding).
        
    4. **Inserção de Dados:** Os vetores gerados são salvos em um arquivo `.jsonl` local. Em seguida, a interface de linha de comando **Wrangler** é usada para fazer o upload em massa desses vetores para o **Cloudflare Vectorize** de forma robusta e oficial.

Este processo de duas etapas (preparar localmente, depois fazer o upload) é executado apenas quando preciso atualizar meu perfil, garantindo que a IA tenha sempre as informações mais recentes.

---

### Frontend: Comunicação e Tecnologias

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
