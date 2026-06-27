document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Menú Móvil
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Navbar Styling on Scroll (Sticky Effect)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('py-2');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('py-2');
            }
        });
    }

    // 3. Scroll Spy simple (resalta menú activo)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('nav-active');
            }
        });
    });

    // Inicializar calculadora
    calculateBrew();

    // 6. Lógica de Música de Fondo
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            } else {
                bgMusic.play().catch(error => console.log("Error al reproducir audio:", error));
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });

        // Intentar autoplay (volumen bajo)
        bgMusic.volume = 0.2;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }).catch(() => {
            console.log("Autoplay bloqueado por el navegador. El usuario debe darle click al botón.");
        });
    }
});

// 4. Lógica de Pedidos a WhatsApp
function orderViaWhatsApp(producto, precio) {
    const mensaje = `Hola, vengo de la página web. Deseo encargar el producto: ${producto} por $${precio}. ¿Cómo es el proceso de pago y envío?`;
    const url = `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// 5. Calculadora Educativa de Café
let currentRatio = 16;
let currentCups = 2;

function setMethod(methodId, ratio) {
    currentRatio = ratio;
    
    // Reset styles
    const btnFiltro = document.getElementById('btn-filtro');
    const btnPrensa = document.getElementById('btn-prensa');
    
    if (btnFiltro && btnPrensa) {
        btnFiltro.className = "py-3 px-4 rounded-xl border-2 border-brand-border text-gray-500 hover:border-gray-300 font-bold text-sm transition-all text-left flex items-center justify-between";
        btnPrensa.className = "py-3 px-4 rounded-xl border-2 border-brand-border text-gray-500 hover:border-gray-300 font-bold text-sm transition-all text-left flex items-center justify-between";

        // Set active
        const activeBtn = document.getElementById(`btn-${methodId}`);
        if (activeBtn) {
            activeBtn.className = "py-3 px-4 rounded-xl border-2 border-brand-green bg-brand-lightGreen text-brand-green font-bold text-sm transition-all text-left flex items-center justify-between";
        }
    }
    
    calculateBrew();
}

function updateCups(val) {
    currentCups = val;
    const ml = val * 150;
    const textTazas = val == 1 ? '1 Taza' : `${val} Tazas`;
    const display = document.getElementById('calc-cups-display');
    
    if (display) {
        display.innerText = `${textTazas} (${ml} ml)`;
    }
    
    calculateBrew();
}

function calculateBrew() {
    const water = currentCups * 150;
    const coffee = water / currentRatio;
    
    const resWater = document.getElementById('res-water');
    const resCoffee = document.getElementById('res-coffee');
    
    if (resWater) {
        resWater.innerHTML = `${water}<span class="text-sm">ml</span>`;
    }
    if (resCoffee) {
        resCoffee.innerHTML = `${coffee.toFixed(1)}<span class="text-sm">g</span>`;
    }
}
