# RayFit Web — Experiência Digital Imersiva 2026

<div align="center">
  <img src="assets/images/logo-rayfit.png" alt="RayFit Logo" width="220" />
  
  <p align="center">
    <strong>Alimentação Saudável & Alta Performance com Apresentação Visual Futurista</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Design_Trend-2026_Spatial-green?style=for-the-badge" alt="Trend 2026" />
  </p>
</div>

---

## 📌 Visão Geral do Projeto

Esta aplicação web foi meticulosamente projetada e desenvolvida para um cliente corporativo do segmento de alimentação saudável e fitness, tendo como propósito central **apresentar o catálogo de produtos da RayFit de maneira extremamente elegante, limpa e tecnológica**.

Inspirada nas mais modernas tendências de web design de 2026 (design espacial, profundidade 3D em perspectiva e microinterações táteis), a página abandona layouts tradicionais com sobrecarga de informações e foca em uma experiência fluida de apenas **duas seções principais**: uma introdução visualmente memorável e uma vitrine circular tridimensional interativa.

---

## ✨ Principais Funcionalidades

- **Vitrine em Órbita 3D Circular (Agrumea Concept)**:
  - Carrossel cilíndrico tridimensional com cálculo trigonométrico em tempo real.
  - Cada marmita orbita em perspectiva `preserve-3d`, simulando profundidade e reflexo realistas.
  - O disco curvo ao fundo e o anel tipográfico rotativo adaptam suas cores dinamicamente conforme o produto ativo.

- **Navegação Multicanal Fluida**:
  - **Clique Direto (`onclick`)**: clique nas marmitas laterais para girar o carrossel na direção desejada.
  - **Scroll do Mouse (`wheel`)**: navegação contínua através do scroll do mouse com controle de inércia.
  - **Controles de Seta e Paginação**: botões circulares em vidro fosco (*glassmorphism*) e teclado (setas esquerda/direita).
  - **Gestos Touch / Swipe**: suporte nativo a dispositivos móveis e tablets.

- **Logo Orgânica & Reativa**:
  - Imagem transparente recortada com precisão anti-aliased.
  - Aura luminosa pulsante e flutuação contínua (`organicFloat`).
  - Efeito Parallax / Tilt 3D baseado na posição do cursor do mouse.

- **Microinterações & Conversão Direta**:
  - Botão interativo *"Descobrir o Produto"* na marmita ativa com ponto luminoso pulsante.
  - Modal dinâmico exibindo tabela nutricional completa (Kcal, Proteínas, Carboidratos) e botão de pedido direto via **WhatsApp** com mensagem pré-formatada.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estrutura focada em acessibilidade, semântica limpa e alta performance.
- **CSS3 Moderno**: 
  - CSS Custom Properties (Variáveis temáticas).
  - Espaço tridimensional com `perspective`, `transform-style: preserve-3d` e aceleração por GPU.
  - Efeitos de *glassmorphism* com `backdrop-filter`.
  - Design totalmente responsivo para mobile, tablet e desktop.
- **JavaScript Vanilla (ES6+)**:
  - Zero dependências ou frameworks pesados.
  - Rotação cilíndrica com wrapping circular contínuo.
  - Interação com eventos de Mouse, Wheel, Touch e Teclado.

---

## 📂 Estrutura de Arquivos

```bash
RayFit/
├── assets/
│   ├── css/
│   │   └── style.css              # Folha de estilos externa e modular
│   ├── images/
│   │   ├── logo-rayfit.png        # Logo transparente recortada e otimizada
│   │   ├── logo-rayfit.jpg        # Imagem original de referência
│   │   └── marmitas/              # Renders em alta definição dos produtos
│   │       ├── marmita-1.png
│   │       ├── marmita-2.png
│   │       ├── marmita-3.png
│   │       ├── marmita-4.png
│   │       └── marmita-5.png
│   └── js/
│       └── main.js                # Lógica do carrossel 3D e interações
├── index.html                     # Estrutura principal da página
├── generate_assets.py             # Script de processamento gráfico de assets
└── README.md                      # Documentação oficial do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto é construído em JavaScript e CSS puros, nenhuma instalação ou build complexo é necessário:

1. Clone o repositório:
   ```bash
   git clone git@github.com:RonaldoDevBackEnd/RayFit-Web.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd RayFit-Web
   ```

3. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari):
   ```bash
   # Exemplo no Windows (PowerShell):
   Start-Process index.html
   ```

---

## 👨‍💻 Desenvolvedor

Projeto concebido e desenvolvido por:

**Ronaldo Adriano**  
- **GitHub**: [@RonaldoDevBackEnd](https://github.com/RonaldoDevBackEnd)  
- **Email**: [ronaldo.adrianof.dev@gmail.com](mailto:ronaldo.adrianof.dev@gmail.com)

---

<div align="center">
  <sub>Desenvolvido com excelência visual, foco em alta conversão e inovação. © 2026 RayFit.</sub>
</div>

