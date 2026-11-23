const cortina = document.getElementById('cortina-transicion');

if (cortina) {
    // 1. Baja la opacidad al terminar de cargar toda la página (imágenes y fuentes incluidas)
    if (document.readyState === 'complete') {
        cortina.classList.remove('activa');
    } else {
        window.addEventListener('load', () => {
            cortina.classList.remove('activa');
        });
    }

    // Evita que la pantalla quede azul si se vuelve con el botón "Atrás" del navegador
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            cortina.classList.remove('activa');
        }
    });

    // 2. Vuelve la pantalla azul suavemente al salir hacia otro HTML
    document.querySelectorAll('a[href]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const href = enlace.getAttribute('href');

            // Ignora anclas internas (#), correos, pestañas nuevas o clics con teclas modificadoras
            if (
                !href ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                enlace.target === '_blank' ||
                e.ctrlKey || e.metaKey || e.shiftKey
            ) {
                return;
            }

            const destino = new URL(enlace.href);

            // Si apunta a una sección (#) dentro de la misma página actual, deja actuar al scroll suave
            if (destino.pathname === window.location.pathname && destino.hash) {
                return;
            }

            // Si es un enlace externo (ej. Instagram), abre normalmente sin cortina
            if (destino.protocol.startsWith('http') && destino.host !== window.location.host) {
                return;
            }

            e.preventDefault();
            cortina.classList.add('activa');

            setTimeout(() => {
                window.location.href = enlace.href;
            }, 400); // Mismo tiempo que transition: opacity 0.4s en CSS
        });
    });
}