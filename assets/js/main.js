/**
 * RAYFIT - 2026 EXPERIMENTAL CIRCULAR 3D CAROUSEL
 * Inspired by Agrumea Farm & Modern Spatial Web Design
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // DATA SOURCE: 5 PREMIUM MARMITAS
    // =========================================================================
    const marmitasData = [
        {
            id: 1,
            title: "Frango Fit Gourmet",
            subtitle: "Ervas Finas & Batata Doce Rústica",
            tag: "BEST SELLER #1",
            desc: "Peito de frango selecionado grelhado lentamente com mix de ervas provençais, acompanhado de cubos de batata doce glaceada e buquês de brócolis frescos.",
            price: "R$ 24,90",
            cal: "380 kcal",
            protein: "42g",
            carb: "35g",
            fat: "6g",
            image: "assets/images/marmitas/marmita-1.png",
            circleBg: "radial-gradient(circle at 40% 40%, #9e3625 0%, #7d2417 60%, #5a190f 100%)",
            circleShadow: "0 40px 90px rgba(125, 36, 23, 0.35)",
            accentColor: "#f57c00"
        },
        {
            id: 2,
            title: "Salmão Real Norueguês",
            subtitle: "Quinoa Real & Aspargos Grelhados",
            tag: "PREMIUM SELECTION",
            desc: "Lombo nobre de salmão fresco selado ao molho cítrico de limão siciliano, acompanhado de quinoa andina multigrãos e aspargos tenros no azeite extravirgem.",
            price: "R$ 34,90",
            cal: "420 kcal",
            protein: "38g",
            carb: "28g",
            fat: "14g",
            image: "assets/images/marmitas/marmita-2.png",
            circleBg: "radial-gradient(circle at 40% 40%, #a4482c 0%, #822f18 60%, #5c1b09 100%)",
            circleShadow: "0 40px 90px rgba(164, 72, 44, 0.35)",
            accentColor: "#eb5a41"
        },
        {
            id: 3,
            title: "Patinho Nobre em Cubos",
            subtitle: "Arroz Negro & Cenoura Glaceada",
            tag: "HIGH PROTEIN",
            desc: "Cortes macios de patinho bovino magro salteados em redução artesanal, servidos com arroz negro antioxidante e cenouras jovens caramelizadas na perfeição.",
            price: "R$ 28,90",
            cal: "450 kcal",
            protein: "48g",
            carb: "38g",
            fat: "8g",
            image: "assets/images/marmitas/marmita-3.png",
            circleBg: "radial-gradient(circle at 40% 40%, #5a2c20 0%, #401d15 60%, #290f09 100%)",
            circleShadow: "0 40px 90px rgba(90, 44, 32, 0.35)",
            accentColor: "#b43c2d"
        },
        {
            id: 4,
            title: "Bowl Vegano Power",
            subtitle: "Grão de Bico, Tahine & Avocado",
            tag: "100% PLANT BASED",
            desc: "Grão de bico crocante assado com páprica defumada, fatias frescas de avocado Hass, beterraba assada, mix de folhas orgânicas e molho cremoso de tahine com gergelim.",
            price: "R$ 23,90",
            cal: "340 kcal",
            protein: "19g",
            carb: "42g",
            fat: "11g",
            image: "assets/images/marmitas/marmita-4.png",
            circleBg: "radial-gradient(circle at 40% 40%, #20542c 0%, #163d1f 60%, #0d2613 100%)",
            circleShadow: "0 40px 90px rgba(32, 84, 44, 0.35)",
            accentColor: "#2d8a3e"
        },
        {
            id: 5,
            title: "Frango ao Curry Dourado",
            subtitle: "Arroz Jasmim, Coco & Amêndoas",
            tag: "CHEF SPECIAL",
            desc: "Tiras macias de frango imersas em aveludado curry indiano com infusão de leite de coco leve, finalizado com lâminas de amêndoas tostadas e arroz jasmim aromático.",
            price: "R$ 27,90",
            cal: "410 kcal",
            protein: "36g",
            carb: "40g",
            fat: "9g",
            image: "assets/images/marmitas/marmita-5.png",
            circleBg: "radial-gradient(circle at 40% 40%, #9e6f1a 0%, #7d5410 60%, #543708 100%)",
            circleShadow: "0 40px 90px rgba(158, 111, 26, 0.35)",
            accentColor: "#e19b14"
        }
    ];

    const totalItems = marmitasData.length;
    let currentIndex = 0;
    let isAnimating = false;

    // DOM ELEMENTS
    const orbitTrack = document.getElementById('orbitTrack');
    const bgCurvedCanvas = document.getElementById('bgCurvedCanvas');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationContainer = document.getElementById('paginationDots');

    // Info panel elements
    const infoTag = document.getElementById('infoTag');
    const infoTitle = document.getElementById('infoTitle');
    const infoDesc = document.getElementById('infoDesc');
    const infoPrice = document.getElementById('infoPrice');
    const infoCal = document.getElementById('infoCal');

    // Modal elements
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalKcal = document.getElementById('modalKcal');
    const modalProt = document.getElementById('modalProt');
    const modalCarb = document.getElementById('modalCarb');
    const modalBuyBtn = document.getElementById('modalBuyBtn');

    // =========================================================================
    // 1. RENDER MARMITAS INTO ORBIT TRACK
    // =========================================================================
    orbitTrack.innerHTML = '';
    marmitasData.forEach((item, index) => {
        const marmitaEl = document.createElement('div');
        marmitaEl.className = 'marmita-item';
        marmitaEl.dataset.index = index;

        marmitaEl.innerHTML = `
            <div class="marmita-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="marmita-product-img" draggable="false">
                <div class="discover-badge" title="Clique para ver detalhes">
                    <span class="pulse-point"></span>
                    <span>Descobrir o Produto</span>
                </div>
            </div>
        `;

        // ONCLICK EVENT ON THE MARMITA ITSELF
        marmitaEl.addEventListener('click', (e) => {
            const clickedIndex = parseInt(marmitaEl.dataset.index);
            if (clickedIndex === currentIndex) {
                // If clicking active marmita or its discover button -> open modal
                openProductModal(marmitasData[currentIndex]);
            } else {
                // Circular transition to the clicked marmita
                goToIndex(clickedIndex);
            }
        });

        orbitTrack.appendChild(marmitaEl);
    });

    const marmitaElements = document.querySelectorAll('.marmita-item');

    // =========================================================================
    // 2. RENDER PAGINATION DOTS
    // =========================================================================
    paginationContainer.innerHTML = '';
    marmitasData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `pagination-dot ${idx === 0 ? 'active' : ''}`;
        dot.dataset.index = idx;
        dot.addEventListener('click', () => goToIndex(idx));
        paginationContainer.appendChild(dot);
    });

    const paginationDots = document.querySelectorAll('.pagination-dot');

    // =========================================================================
    // 3. CIRCULAR 3D ORBIT CALCULATION FUNCTION
    // =========================================================================
    function updateCarousel(instant = false) {
        const isMobile = window.innerWidth <= 768;
        
        marmitaElements.forEach((el, index) => {
            // Circular offset logic (-2, -1, 0, 1, 2)
            let diff = index - currentIndex;

            // Normalize diff to wrap around circle:
            // e.g. for total 5: from index 4 to 0 is +1, not -4
            if (diff > totalItems / 2) diff -= totalItems;
            if (diff < -totalItems / 2) diff += totalItems;

            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;
            let filter = 'none';

            const baseSpacing = isMobile ? 180 : 330;
            const farSpacing = isMobile ? 280 : 540;

            if (diff === 0) {
                // ACTIVE IN FRONT CENTER
                translateX = 0;
                translateZ = isMobile ? 40 : 80;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 10;
                el.classList.add('active');
            } else if (diff === 1) {
                // IMMEDIATELY TO THE RIGHT (ANGLED INWARD)
                translateX = baseSpacing;
                translateZ = -140;
                rotateY = -28;
                scale = isMobile ? 0.75 : 0.82;
                opacity = 0.72;
                zIndex = 6;
                filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))';
                el.classList.remove('active');
            } else if (diff === -1) {
                // IMMEDIATELY TO THE LEFT (ANGLED INWARD)
                translateX = -baseSpacing;
                translateZ = -140;
                rotateY = 28;
                scale = isMobile ? 0.75 : 0.82;
                opacity = 0.72;
                zIndex = 6;
                filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))';
                el.classList.remove('active');
            } else if (diff === 2) {
                // FAR RIGHT IN CIRCLE
                translateX = farSpacing;
                translateZ = -360;
                rotateY = -48;
                scale = 0.6;
                opacity = 0.22;
                zIndex = 2;
                el.classList.remove('active');
            } else if (diff === -2) {
                // FAR LEFT IN CIRCLE
                translateX = -farSpacing;
                translateZ = -360;
                rotateY = 48;
                scale = 0.6;
                opacity = 0.22;
                zIndex = 2;
                el.classList.remove('active');
            } else {
                // BEHIND / HIDDEN IN REAR
                translateX = 0;
                translateZ = -500;
                rotateY = 0;
                scale = 0.4;
                opacity = 0;
                zIndex = 0;
                el.classList.remove('active');
            }

            el.style.transition = instant ? 'none' : 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.75s ease, filter 0.75s ease';
            el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            el.style.opacity = opacity;
            el.style.zIndex = zIndex;
            el.style.filter = filter;
        });

        // UPDATE INFO PANEL WITH SMOOTH TEXT SWAP
        const currentData = marmitasData[currentIndex];
        
        infoTag.textContent = currentData.tag;
        infoTitle.textContent = currentData.title;
        infoDesc.textContent = currentData.subtitle;
        infoPrice.textContent = currentData.price;
        infoCal.textContent = currentData.cal;

        // UPDATE BACKGROUND SHAPE COLOR & ROTATION TO MATCH PRODUCT
        bgCurvedCanvas.style.background = currentData.circleBg;
        bgCurvedCanvas.style.boxShadow = currentData.circleShadow;
        
        // Add dynamic rotation to the background circle per index
        const circleRot = -12 + (currentIndex * 15);
        bgCurvedCanvas.style.transform = `translate(-50%, -18%) rotate(${circleRot}deg)`;

        // UPDATE PAGINATION DOTS
        paginationDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    // =========================================================================
    // 4. ONCLICK NAVIGATION CONTROLS (CIRCULAR)
    // =========================================================================
    function nextMarmita() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 400);
    }

    function prevMarmita() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 400);
    }

    function goToIndex(targetIndex) {
        if (targetIndex === currentIndex || isAnimating) return;
        isAnimating = true;
        currentIndex = targetIndex;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 400);
    }

    // CLICK ON ARROW BUTTONS
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextMarmita();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevMarmita();
    });

    // KEYBOARD NAVIGATION
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextMarmita();
        if (e.key === 'ArrowLeft') prevMarmita();
        if (e.key === 'Escape') closeProductModal();
    });

    // =========================================================================
    // 5. SCROLL (WHEEL) INTERACTION TO ROTATE CAROUSEL
    // =========================================================================
    let wheelCooldown = false;
    const carouselSection = document.getElementById('carouselSection');

    carouselSection.addEventListener('wheel', (e) => {
        // Detect intent to cycle carousel
        if (wheelCooldown) return;
        
        if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
            wheelCooldown = true;
            if (e.deltaY > 0 || e.deltaX > 0) {
                nextMarmita();
            } else {
                prevMarmita();
            }
            setTimeout(() => {
                wheelCooldown = false;
            }, 600);
        }
    }, { passive: true });

    // TOUCH SWIPE NAVIGATION FOR MOBILE/TABLET
    let touchStartX = 0;
    let touchEndX = 0;

    carouselSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        if (Math.abs(diffX) > 40) {
            if (diffX < 0) {
                nextMarmita();
            } else {
                prevMarmita();
            }
        }
    }, { passive: true });

    // =========================================================================
    // 6. ORGANIC LOGO INTERACTION IN INTRO SECTION
    // =========================================================================
    const logoContainer = document.getElementById('logoOrganicContainer');
    const logoImg = document.getElementById('logoOrganicImg');
    const introSection = document.getElementById('introSection');

    if (introSection && logoImg) {
        introSection.addEventListener('mousemove', (e) => {
            const rect = introSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            logoImg.style.transform = `translateY(-4px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`;
        });

        introSection.addEventListener('mouseleave', () => {
            logoImg.style.transform = '';
        });
    }

    // =========================================================================
    // 7. PRODUCT DETAIL MODAL "DISCOVER THE PRODUCT"
    // =========================================================================
    function openProductModal(item) {
        modalTag.textContent = item.tag;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;
        modalKcal.textContent = item.cal;
        modalProt.textContent = item.protein;
        modalCarb.textContent = item.carb;

        const whatsappMessage = encodeURIComponent(`Olá RayFit! Gostaria de pedir a marmita *${item.title}* (${item.price}).`);
        modalBuyBtn.href = `https://wa.me/?text=${whatsappMessage}`;

        productModal.classList.add('open');
    }

    function closeProductModal() {
        productModal.classList.remove('open');
    }

    modalClose.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });

    // =========================================================================
    // 8. INTRO ACTION BUTTON SMOOTH SCROLL
    // =========================================================================
    const scrollToCarouselBtn = document.getElementById('scrollToCarouselBtn');
    const scrollHint = document.getElementById('scrollHint');

    function scrollToCarousel() {
        carouselSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (scrollToCarouselBtn) scrollToCarouselBtn.addEventListener('click', scrollToCarousel);
    if (scrollHint) scrollHint.addEventListener('click', scrollToCarousel);

    // INITIAL RENDER
    updateCarousel(true);
    window.addEventListener('resize', () => updateCarousel(false));
});

