const carrusel = document.querySelector('[data-carrusel]');

if (carrusel) {
    const pista = carrusel.querySelector('.carrusel-pista');
    const diapositivas = [...carrusel.querySelectorAll('.diapositiva')];
    const anterior = carrusel.querySelector('.control-anterior');
    const siguiente = carrusel.querySelector('.control-siguiente');
    const indicadores = carrusel.parentElement.querySelector('.indicadores-carrusel');
    let indice = 0;
    let temporizador;

    const maximoIndice = () => diapositivas.length - 1;

    const actualizarIndicadores = () => {
        indicadores.innerHTML = '';
        const total = maximoIndice() + 1;

        for (let posicion = 0; posicion < total; posicion += 1) {
            const indicador = document.createElement('button');
            indicador.type = 'button';
            indicador.className = 'indicador-carrusel';
            indicador.setAttribute('aria-label', `Mostrar grupo ${posicion + 1} de proyectos`);
            indicador.addEventListener('click', () => {
                indice = posicion;
                actualizarCarrusel();
                reiniciarTemporizador();
            });
            indicadores.appendChild(indicador);
        }
    };

    const actualizarCarrusel = () => {
        indice = Math.min(indice, maximoIndice());
        pista.style.transform = `translateX(-${indice * 100}%)`;
        [...indicadores.children].forEach((indicador, posicion) => {
            indicador.classList.toggle('activo', posicion === indice);
            indicador.setAttribute('aria-current', posicion === indice ? 'true' : 'false');
        });
    };

    const reiniciarTemporizador = () => {
        window.clearInterval(temporizador);
        temporizador = window.setInterval(() => {
            indice = indice >= maximoIndice() ? 0 : indice + 1;
            actualizarCarrusel();
        }, 4500);
    };

    anterior.addEventListener('click', () => {
        indice = indice <= 0 ? maximoIndice() : indice - 1;
        actualizarCarrusel();
        reiniciarTemporizador();
    });

    siguiente.addEventListener('click', () => {
        indice = indice >= maximoIndice() ? 0 : indice + 1;
        actualizarCarrusel();
        reiniciarTemporizador();
    });

    carrusel.addEventListener('mouseenter', () => window.clearInterval(temporizador));
    carrusel.addEventListener('mouseleave', reiniciarTemporizador);
    actualizarIndicadores();
    actualizarCarrusel();
    reiniciarTemporizador();
}
