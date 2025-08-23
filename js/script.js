// Menyimpan elemen DOM ke dalam variabel
const dom = {
    cart: document.querySelector('.shopping-cart-container'),
    loginForm: document.querySelector('.login-form-container'),
    navbar: document.querySelector('.header .navbar'),
    searchForm: document.querySelector('.search-form'),
    homeSection: document.querySelector('.home'),
    parallaxImg: document.querySelector('.home .home-parallax-img')
};

// Konfigurasi menu toggle
const toggleMenus = {
    '#cart-btn': dom.cart,
    '#login-btn': dom.loginForm,
    '#menu-btn': dom.navbar
};

// Event handler untuk toggle menu
const handleMenuToggle = (selector, element) => {
    document.querySelector(selector).addEventListener('click', () => {
        Object.values(toggleMenus).forEach(menu => {
            if (menu !== element) menu.classList.remove('active');
        });
        element.classList.toggle('active');
    });
};

// Menambahkan event listener untuk setiap menu
Object.entries(toggleMenus).forEach(([selector, element]) => {
    handleMenuToggle(selector, element);
});

// Menutup navbar saat scroll
window.addEventListener('scroll', () => {
    dom.navbar.classList.remove('active');
});

// Efek parallax dengan throttling
const handleParallax = (() => {
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps

    return (e) => {
        const now = Date.now();
        if (now - lastTime >= throttleDelay) {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            dom.parallaxImg.style.transform = `translateX(${y}px) translateY(${x}px)`;
            lastTime = now;
        }
    };
})();

// Event listener untuk efek parallax
if (dom.homeSection) {
    dom.homeSection.addEventListener('mousemove', handleParallax);
    dom.homeSection.addEventListener('mouseleave', () => {
        dom.parallaxImg.style.transform = 'translateX(0px) translateY(0px)';
    });
}

fetch("http://localhost:5000/api/menu")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
