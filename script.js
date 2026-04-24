
document.addEventListener('DOMContentLoaded', () => {

    // cursor hud personalizado
    const cursor = document.querySelector('.cursor-tatico');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clique'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clique'));

    // efeito parallax no frame de mira do hero
    const frameMira = document.querySelector('.frame-mira');
    document.addEventListener('mousemove', (e) => {
        if (frameMira) {
            const x = (window.innerWidth / 2 - e.clientX) / 25;
            const y = (window.innerHeight / 2 - e.clientY) / 25;
            frameMira.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
    });

    // controle do cabecalho no scroll
    const cabecalho = document.querySelector('.cabecalho-principal');
    window.addEventListener('scroll', () => {
        cabecalho.classList.toggle('rolado', window.scrollY > 50);
    });

    // animação de revelação de seções
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revelada');
        });
    }, observerOptions);
    document.querySelectorAll('.secao-revelar').forEach(el => revealObserver.observe(el));

    // lógica dos cards expansíveis de lutadores
    const cartoes = document.querySelectorAll('.cartao');
    
    cartoes.forEach(cartao => {
        cartao.addEventListener('click', () => {
            if (!cartao.classList.contains('ativa')) {
                cartoes.forEach(c => c.classList.remove('ativa'));
                cartao.classList.add('ativa');
                
                // reinicia animação das barras de status
                const barras = cartao.querySelectorAll('.preenchimento');
                barras.forEach(b => {
                    const w = b.style.width;
                    b.style.width = '0';
                    setTimeout(() => b.style.width = w, 100);
                });
            }
        });
    });

    // gerador de depoimentos para o carrossel infinito
    const depoimentos = [
        { n: 'ryu_fan_99', b: 'mestre', t: 'hadouken no cinema finalmente! visual impecável.', c: '#00a2ff' },
        { n: 'ken_master', b: 'veterano', t: 'o shoryuken de fogo parece surreal. ansioso!', c: '#ff4500' },
        { n: 'chun_interpol', b: 'lenda', t: 'a melhor representação da chun-li que já vi.', c: '#ffd700' },
        { n: 'guile_sonic', b: 'elite', t: 'sonic boom em imax vai ser uma loucura total.', c: '#00ff88' },
        { n: 'cammy_delta', b: 'agente', t: 'as cenas de ação estão em outro nível de coreografia.', c: '#00e5ff' },
        { n: 'bison_lord', b: 'vilão', t: 'shadaloo vai dominar as bilheterias em 2026.', c: '#9b59b6' },
        { n: 'arcade_og', b: 'campeão', t: 'joguei muito o sf2 nos fliperamas, isso é um sonho.', c: '#ff0000' },
        { n: 'world_warrior', b: 'fã', t: 'finalmente uma adaptação que respeita o material original.', c: '#00a2ff' }
    ];

    function criarCard(dep) {
        return `
            <div class="card-depoimento">
                <div class="cabecalho-card">
                    <div class="avatar-letra" style="background:${dep.c}22; color:${dep.c}">${dep.n[0].toUpperCase()}</div>
                    <div class="info-user">
                        <span class="nome">${dep.n}</span>
                        <span class="badge">${dep.b}</span>
                    </div>
                </div>
                <p class="texto-card">"${dep.t}"</p>
            </div>
        `;
    }

    const m1 = document.getElementById('marquee-grupo-1');
    const m2 = document.getElementById('marquee-grupo-2');
    
    if (m1 && m2) {
        const htmlCards = depoimentos.map(d => criarCard(d)).join('');
        const htmlCardsDuplicados = htmlCards + htmlCards; // para loop seamless
        m1.innerHTML = htmlCardsDuplicados;
        m2.innerHTML = htmlCardsDuplicados;
    }

    // contagem regressiva arcade
    const dataAlvo = new Date('July 15, 2026 00:00:00').getTime();
    setInterval(() => {
        const agora = Date.now();
        const diff = dataAlvo - agora;
        if (diff < 0) return;
        
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        
        const ids = ['dias', 'horas', 'minutos', 'segundos'];
        const valores = [d, h, m, s];
        
        ids.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) el.innerText = String(valores[i]).padStart(2, '0');
        });
    }, 1000);

    // animação dos números das estatísticas
    const stats = document.querySelectorAll('.stat-numero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const alvo = +entry.target.dataset.alvo;
                let atual = 0;
                const timer = setInterval(() => {
                    atual += Math.ceil(alvo / 50);
                    if (atual >= alvo) {
                        entry.target.innerText = alvo;
                        clearInterval(timer);
                    } else {
                        entry.target.innerText = atual;
                    }
                }, 30);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => statsObserver.observe(s));

    // partículas de fundo
    const particulasCont = document.getElementById('particulas-container');
    if (particulasCont) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particula';
            const size = Math.random() * 3 + 1;
            p.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 ? 'var(--ryu)' : 'var(--ken)'};
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                opacity: ${Math.random() * 0.3};
                pointer-events: none;
                z-index: -1;
                animation: flutuar ${Math.random() * 10 + 5}s linear infinite;
            `;
            particulasCont.appendChild(p);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flutuar {
                0% { transform: translateY(0) translateX(0); }
                50% { transform: translateY(-20px) translateX(10px); }
                100% { transform: translateY(0) translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('sistema operacional: street fighter 2026 pronto.');
});