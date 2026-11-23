const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const btnCerrar = document.getElementById('lightbox-cerrar');
const elementos = document.querySelectorAll('.imagen-ampliable');

if (lightbox && btnCerrar) {
    elementos.forEach(el => {
        el.addEventListener('click', () => {
            if (el.tagName === 'VIDEO' && lightboxVideo) {
                if (lightboxImg) lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = el.currentSrc || el.src;
                lightboxVideo.play();
            } else if (lightboxImg) {
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                }
                lightboxImg.style.display = 'block';
                lightboxImg.src = el.src;
                lightboxImg.alt = el.alt;
            }
            lightbox.classList.add('activo');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    function cerrarLightbox() {
        lightbox.classList.remove('activo');
        lightbox.setAttribute('aria-hidden', 'true');
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
        }
    }

    btnCerrar.addEventListener('click', cerrarLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
            cerrarLightbox();
        }
    });
}