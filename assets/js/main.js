/**
 * RAYFIT - 2026 EXPERIMENTAL CIRCULAR 3D CAROUSEL & CINEMATIC INTRO
 * Universal Responsive Touch Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. DATA SOURCE: 5 PREMIUM MARMITAS
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
            image: "assets/images/marmitas/marmita-1.webp",
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
            image: "assets/images/marmitas/marmita-2.webp",
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
            image: "assets/images/marmitas/marmita-3.webp",
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
            image: "assets/images/marmitas/marmita-4.webp",
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
            image: "assets/images/marmitas/marmita-5.webp",
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
    const carouselStage = document.getElementById('carouselStage');
    const carouselSection = document.getElementById('carouselSection');

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

    // Splash Intro Elements
    const introSplashScreen = document.getElementById('introSplashScreen');
    const splashAssemblyStage = document.getElementById('splashAssemblyStage');
    const assemblyProgress = document.getElementById('assemblyProgress');
    const assemblyStatusText = document.getElementById('assemblyStatusText');
    const btnReplayIntro = document.getElementById('btnReplayIntro');

    // =========================================================================
    // 2. SPLASH INTRO CINEMATOGRÁFICA (RODA DIRETO DE PRIMEIRA AO ENTRAR)
    // =========================================================================
    let introInterval = null;

    function runAssemblyAnimation() {
        if (!introSplashScreen || !splashAssemblyStage) return;

        if (introInterval) clearInterval(introInterval);

        // Prepara o palco de animação imediato
        introSplashScreen.classList.remove('revealed');
        splashAssemblyStage.classList.remove('logo-shown', 'animating');
        
        // Força reflow para reiniciar keyframes CSS perfeitamente
        void splashAssemblyStage.offsetWidth;
        splashAssemblyStage.classList.add('active-step', 'animating');

        let progress = 0;
        if (assemblyProgress) assemblyProgress.style.width = '0%';
        if (assemblyStatusText) assemblyStatusText.textContent = 'Preparando a sua marmita...';

        introInterval = setInterval(() => {
            progress += 4;
            if (progress > 100) progress = 100;
            if (assemblyProgress) assemblyProgress.style.width = `${progress}%`;

            if (progress === 24 && assemblyStatusText) {
                assemblyStatusText.textContent = 'Ingredientes frescos...';
            } else if (progress === 52 && assemblyStatusText) {
                assemblyStatusText.textContent = 'Grelhado com ervas nobres...';
            } else if (progress >= 68 && !splashAssemblyStage.classList.contains('logo-shown')) {
                if (assemblyStatusText) assemblyStatusText.textContent = 'Nutrição & alta performance...';
                splashAssemblyStage.classList.add('logo-shown');
            } else if (progress >= 100) {
                clearInterval(introInterval);
                if (assemblyStatusText) assemblyStatusText.textContent = 'Pronto! Bem-vindo.';

                setTimeout(() => {
                    introSplashScreen.classList.add('revealed');
                }, 280);
            }
        }, 28);
    }

    // Inicia a animação da marmita e da logo automaticamente de primeira ao acessar o site
    setTimeout(() => {
        runAssemblyAnimation();
    }, 120);

    // Botão flutuante para rever a intro a qualquer momento
    if (btnReplayIntro) {
        btnReplayIntro.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            runAssemblyAnimation();
        });
    }

    // =========================================================================
    // 3. RENDER MARMITAS INTO ORBIT TRACK
    // =========================================================================
    orbitTrack.innerHTML = '';
    marmitasData.forEach((item, index) => {
        const marmitaEl = document.createElement('div');
        marmitaEl.className = 'marmita-item';
        marmitaEl.dataset.index = index;

        marmitaEl.innerHTML = `
            <div class="marmita-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="marmita-product-img" draggable="false">
                <div class="discover-badge" title="Toque para ver a tabela nutricional">
                    <span class="pulse-point"></span>
                    <span>Descobrir o Produto</span>
                </div>
            </div>
        `;

        // ONCLICK / TOUCH ON MARMITA ITSELF
        marmitaEl.addEventListener('click', (e) => {
            const clickedIndex = parseInt(marmitaEl.dataset.index);
            if (clickedIndex === currentIndex) {
                openProductModal(marmitasData[currentIndex]);
            } else {
                goToIndex(clickedIndex);
            }
        });

        orbitTrack.appendChild(marmitaEl);
    });

    const marmitaElements = document.querySelectorAll('.marmita-item');

    // =========================================================================
    // 4. RENDER PAGINATION DOTS
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
    // 5. CIRCULAR 3D ORBIT CALCULATION (RESPONSIVO PARA PC, TABLET E CELULAR)
    // =========================================================================
    function updateCarousel(instant = false) {
        const windowWidth = window.innerWidth;
        const isMobile = windowWidth <= 768;
        const isCompact = windowWidth <= 420;

        marmitaElements.forEach((el, index) => {
            let diff = index - currentIndex;

            // Normalize circular diff (-2, -1, 0, 1, 2)
            if (diff > totalItems / 2) diff -= totalItems;
            if (diff < -totalItems / 2) diff += totalItems;

            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;
            let filter = 'none';

            // Spacings adaptáveis por dispositivo
            const baseSpacing = isCompact ? 160 : (isMobile ? 210 : 340);
            const farSpacing = isCompact ? 250 : (isMobile ? 320 : 540);

            if (diff === 0) {
                // ACTIVE IN FRONT CENTER
                translateX = 0;
                translateZ = isMobile ? 35 : 80;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 10;
                el.classList.add('active');
            } else if (diff === 1) {
                // RIGHT (ANGLED INWARD)
                translateX = baseSpacing;
                translateZ = isMobile ? -110 : -140;
                rotateY = isMobile ? -22 : -28;
                scale = isCompact ? 0.72 : (isMobile ? 0.76 : 0.82);
                opacity = isMobile ? 0.65 : 0.72;
                zIndex = 6;
                filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))';
                el.classList.remove('active');
            } else if (diff === -1) {
                // LEFT (ANGLED INWARD)
                translateX = -baseSpacing;
                translateZ = isMobile ? -110 : -140;
                rotateY = isMobile ? 22 : 28;
                scale = isCompact ? 0.72 : (isMobile ? 0.76 : 0.82);
                opacity = isMobile ? 0.65 : 0.72;
                zIndex = 6;
                filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.18))';
                el.classList.remove('active');
            } else if (diff === 2) {
                // FAR RIGHT
                translateX = farSpacing;
                translateZ = -340;
                rotateY = -45;
                scale = 0.55;
                opacity = isMobile ? 0.15 : 0.22;
                zIndex = 2;
                el.classList.remove('active');
            } else if (diff === -2) {
                // FAR LEFT
                translateX = -farSpacing;
                translateZ = -340;
                rotateY = 45;
                scale = 0.55;
                opacity = isMobile ? 0.15 : 0.22;
                zIndex = 2;
                el.classList.remove('active');
            } else {
                // REAR
                translateX = 0;
                translateZ = -480;
                rotateY = 0;
                scale = 0.35;
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

        // UPDATE INFO PANEL WITH SMOOTH TEXT
        const currentData = marmitasData[currentIndex];
        infoTag.textContent = currentData.tag;
        infoTitle.textContent = currentData.title;
        infoDesc.textContent = currentData.subtitle;
        infoPrice.textContent = currentData.price;
        infoCal.textContent = currentData.cal;

        // UPDATE BACKGROUND SHAPE COLOR & ROTATION
        bgCurvedCanvas.style.background = currentData.circleBg;
        bgCurvedCanvas.style.boxShadow = currentData.circleShadow;
        
        const circleRot = -12 + (currentIndex * 15);
        bgCurvedCanvas.style.transform = isMobile 
            ? `translate(-50%, -10%) rotate(${circleRot}deg)`
            : `translate(-50%, -18%) rotate(${circleRot}deg)`;

        // UPDATE PAGINATION DOTS
        paginationDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    // =========================================================================
    // 6. ONCLICK NAVIGATION CONTROLS (CIRCULAR)
    // =========================================================================
    function nextMarmita() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 380);
    }

    function prevMarmita() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 380);
    }

    function goToIndex(targetIndex) {
        if (targetIndex === currentIndex || isAnimating) return;
        isAnimating = true;
        currentIndex = targetIndex;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 380);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextMarmita();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevMarmita();
        });
    }

    // KEYBOARD NAVIGATION
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextMarmita();
        if (e.key === 'ArrowLeft') prevMarmita();
        if (e.key === 'Escape') closeProductModal();
    });

    // =========================================================================
    // 7. TOUCH FLUIDO EM TEMPO REAL & GESTOS DE SWIPE (CELULARES E TABLETS)
    // =========================================================================
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCurrentX = 0;
    let touchCurrentY = 0;
    let isTouching = false;
    let isHorizontalSwipe = false;

    carouselStage.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchCurrentX = touchStartX;
        touchCurrentY = touchStartY;
        isTouching = true;
        isHorizontalSwipe = false;
    }, { passive: true });

    carouselStage.addEventListener('touchmove', (e) => {
        if (!isTouching || isAnimating) return;
        touchCurrentX = e.touches[0].clientX;
        touchCurrentY = e.touches[0].clientY;

        const diffX = touchCurrentX - touchStartX;
        const diffY = touchCurrentY - touchStartY;

        // Detect horizontal gesture intent
        if (!isHorizontalSwipe && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
            isHorizontalSwipe = true;
        }

        // Apply physical live rotation offset while finger moves
        if (isHorizontalSwipe) {
            const rotOffset = Math.max(-18, Math.min(18, diffX * 0.08));
            orbitTrack.style.transform = `rotateY(${rotOffset}deg)`;
        }
    }, { passive: true });

    carouselStage.addEventListener('touchend', () => {
        if (!isTouching) return;
        isTouching = false;
        orbitTrack.style.transform = '';

        if (isHorizontalSwipe) {
            const diffX = touchCurrentX - touchStartX;
            if (diffX < -35) {
                nextMarmita();
            } else if (diffX > 35) {
                prevMarmita();
            } else {
                updateCarousel(); // Reset to current
            }
        }
    }, { passive: true });

    // =========================================================================
    // 8. SCROLL (WHEEL) INTERACTION TO ROTATE CAROUSEL
    // =========================================================================
    let wheelCooldown = false;
    carouselSection.addEventListener('wheel', (e) => {
        if (wheelCooldown) return;
        if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
            wheelCooldown = true;
            if (e.deltaY > 0 || e.deltaX > 0) {
                nextMarmita();
            } else {
                prevMarmita();
            }
            setTimeout(() => { wheelCooldown = false; }, 550);
        }
    }, { passive: true });

    // =========================================================================
    // 9. ORGANIC LOGO PARALLAX INTERACTION (INTRO SECTION)
    // =========================================================================
    const logoContainer = document.getElementById('logoOrganicContainer');
    const logoImg = document.getElementById('logoOrganicImg');
    const introSection = document.getElementById('introSection');

    if (introSection && logoImg) {
        introSection.addEventListener('mousemove', (e) => {
            const rect = introSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            logoImg.style.transform = `translateY(-6px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`;
        });

        introSection.addEventListener('mouseleave', () => {
            logoImg.style.transform = '';
        });
    }

    // Click logo to scroll smoothly to carousel
    if (logoContainer) {
        logoContainer.addEventListener('click', () => {
            carouselSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // =========================================================================
    // 10. PRODUCT DETAIL MODAL "DISCOVER THE PRODUCT"
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

    // INITIAL SETUP
    updateCarousel(true);

    // Responsive resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel(false);
        }, 120);
    });
});
