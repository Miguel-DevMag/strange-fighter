
document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica do cursor HUD tático
    const cursor = document.querySelector('.cursor-tatico');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('clique'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clique'));

    // 2. Parallax dinâmico no Frame de Mira (Hero)
    const frameMira = document.querySelector('.frame-mira');
    document.addEventListener('mousemove', (e) => {
        if (frameMira) {
            const x = (window.innerWidth / 2 - e.clientX) / 25;
            const y = (window.innerHeight / 2 - e.clientY) / 25;
            frameMira.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
    });

    // 3. Lógica do cabeçalho (Scroll Tracking & ScrollSpy)
    const cabecalho = document.querySelector('.cabecalho-principal');
    const linksNav = document.querySelectorAll('.links-navegacao li a');
    const secoes = document.querySelectorAll('section, header.sessao-principal');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalho.classList.add('rolado');
        } else {
            cabecalho.classList.remove('rolado');
        }

        let atual = "";
        secoes.forEach(secao => {
            const secaoTopo = secao.offsetTop;
            if (window.scrollY >= (secaoTopo - 150)) {
                atual = secao.getAttribute('id');
            }
        });

        linksNav.forEach(a => {
            a.classList.remove('ativa');
            if (a.getAttribute('href').includes(atual)) {
                a.classList.add('ativa');
            }
        });
    });

    // 4. Animação de Revelação por Scroll (Intersection Observer)
    const secoesParaRevelar = document.querySelectorAll('.secao-revelar');
    const observadorRevelacao = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('revelada');
            }
        });
    }, { threshold: 0.15 });

    secoesParaRevelar.forEach(secao => observadorRevelacao.observe(secao));

    // 5. Lógica de cartões expansíveis e reset de status
    const cartoes = document.querySelectorAll('.cartao');

    const animarBarras = (container) => {
        const preenchimentos = container.querySelectorAll('.preenchimento');
        preenchimentos.forEach(preenchimento => {
            const largura = preenchimento.style.width;
            preenchimento.style.width = '0';
            setTimeout(() => preenchimento.style.width = largura, 100);
        });
    };

    cartoes.forEach(cartao => {
        cartao.addEventListener('click', () => {
            if (!cartao.classList.contains('ativa')) {
                cartoes.forEach(c => c.classList.remove('ativa'));
                cartao.classList.add('ativa');
                animarBarras(cartao);
            }
        });
    });

    // 6. Contagem Regressiva (Contador Arcade) 
    const dataAlvo = new Date("Jan 1, 2026 00:00:00").getTime();

    const atualizarContagem = () => {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diferenca % (1000 * 60)) / 1000);

        if (document.getElementById('dias')) {
            document.getElementById('dias').innerText = d.toString().padStart(2, '0');
            document.getElementById('horas').innerText = h.toString().padStart(2, '0');
            document.getElementById('minutos').innerText = m.toString().padStart(2, '0');
            document.getElementById('segundos').innerText = s.toString().padStart(2, '0');
        }

        if (diferenca < 0) {
            clearInterval(temporizador);
            const elementoContagem = document.getElementById('contagem');
            if (elementoContagem) elementoContagem.innerHTML = "BATALHA INICIADA!";
        }
    };

    const temporizador = setInterval(atualizarContagem, 1000);
    atualizarContagem();

    // 7. Efeito Typewriter para Sinopse
    const elementoTypewriter = document.querySelector('.texto-maquina-escrever');
    if (elementoTypewriter) {
        const texto = elementoTypewriter.getAttribute('data-text');
        let index = 0;
        let jaIniciado = false;
        elementoTypewriter.innerHTML = "";

        const digitar = () => {
            if (index < texto.length) {
                elementoTypewriter.innerHTML += texto.charAt(index);
                index++;
                setTimeout(digitar, 30);
            } else {
                elementoTypewriter.style.borderRight = "none";
            }
        };

        const observadorTexto = new IntersectionObserver((entradas) => {
            if (entradas[0].isIntersecting && !jaIniciado) {
                jaIniciado = true;
                digitar();
            }
        }, { threshold: 0.5 });

        observadorTexto.observe(elementoTypewriter);
    }

    // 8. Lógica de simulação de envio de comentário
    const botaoEnviar = document.querySelector('.botao-enviar');
    const campoComentario = document.querySelector('.campo-comentario');
    const listaComentarios = document.querySelector('.lista-comentarios');

    if (botaoEnviar) {
        botaoEnviar.addEventListener('click', () => {
            if (campoComentario.value.trim() !== "") {
                const novoComentario = document.createElement('div');
                novoComentario.classList.add('comentario');
                novoComentario.innerHTML = `
                    <div class="cabecalho-comentario">
                        <span class="usuario">RECRUTA_SF</span>
                        <span class="tempo">AGORA MESMO</span>
                    </div>
                    <p class="texto-comentario">${campoComentario.value}</p>
                `;
                listaComentarios.insertBefore(novoComentario, document.querySelector('.comentario-input'));
                campoComentario.value = "";
                // Feedback visual tático ao invés de alert
                botaoEnviar.innerText = "ENVIADO!";
                setTimeout(() => botaoEnviar.innerText = "ENVIAR", 2000);
            }
        });
    }

    console.log("SISTEMA: Interface SF2026 Otimizada e Operacional.");
});