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
