document.addEventListener('DOMContentLoaded', () => {
    // Desplazamiento suave para enlaces internos.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Cerrar el menú móvil de Bootstrap después de navegar.
            const menu = document.getElementById('navbarNav');
            if (menu?.classList.contains('show') && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Marcar la sección activa mientras se desplaza la página.
    const sections = [...document.querySelectorAll('header[id], section[id], footer[id]')];
    const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
});









document.addEventListener('DOMContentLoaded', () => {
    // Desplazamiento suave para enlaces internos.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Cerrar el menú móvil de Bootstrap después de navegar.
            const menu = document.getElementById('navbarNav');
            if (menu?.classList.contains('show') && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Marcar la sección activa mientras se desplaza la página.
    const sections = [...document.querySelectorAll('header[id], section[id], footer[id]')];
    const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
});


document.addEventListener('DOMContentLoaded', function () {
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    // Obtiene o crea la instancia oficial de Bootstrap Collapse
    function getBsCollapse() {
        return bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
    }

    // 1. Cierra el menú al hacer clic en cualquier enlace interno
    navbarCollapse.addEventListener('click', function (event) {
        const targetLink = event.target.closest('.nav-link, .btn');
        if (targetLink && !targetLink.classList.contains('dropdown-toggle')) {
            const bsCollapse = getBsCollapse();
            bsCollapse.hide();
        }
    });

    // 2. Cierra el menú al tocar/hacer clic fuera del menú desplegable o de la hamburguesa
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = navbarCollapse.contains(event.target);
        const isClickOnToggler = event.target.closest('.navbar-toggler');

        if (!isClickInsideMenu && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
            const bsCollapse = getBsCollapse();
            bsCollapse.hide();
        }
    });

    // 3. Cierra el menú automáticamente al hacer scroll (móvil)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function () {
        if (navbarCollapse.classList.contains('show') && Math.abs(window.scrollY - lastScrollY) > 5) {
            const bsCollapse = getBsCollapse();
            bsCollapse.hide();
        }
        lastScrollY = window.scrollY;
    }, { passive: true });
});