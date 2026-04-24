# 📜 Documentação do Projeto: Street Fighter 2026

Olá! Este documento explica as decisões tomadas no desenvolvimento da sua landing page e como cada parte do site foi pensada para o seu público.

## 1. Conceito Visual (Design System)
O site utiliza um estilo chamado **Dark Tactical**. Usamos o preto puro (#000000) para dar profundidade e cores vibrantes (azul e vermelho) para criar contraste, remetendo ao conflito clássico entre Ryu e Ken.
- **HUD (Head-Up Display)**: As molduras nos cantos da tela dão a sensação de estar dentro de um centro de comando da Shadaloo ou em uma tela de seleção de jogo.

## 2. Decisões de Performance (Por que o site é rápido?)
Fizemos uma análise técnica e removemos elementos que poderiam deixar o carregamento "pesado" para os usuários, como listas de áudio automático e vídeos excessivos. 
- O site agora foca na **Galeria Visual** e no **Trailer**, que são os elementos que mais chamam a atenção sem comprometer a velocidade no celular.

## 3. Funcionalidades Principais
- **Seleção de Lutadores**: Ao clicar nas miniaturas, o painel central se atualiza com as informações do personagem. Isso imita o menu de seleção dos jogos de luta.
- **Arena da Comunidade (Marquee)**: Em vez de um chat estático, usamos um carrossel que se move sozinho. Isso dá vida ao site e mostra que há movimento constante de fãs, sem exigir que o usuário faça nada.
- **Lightbox**: Quando o usuário clica em uma imagem da galeria, ela expande para tela cheia com alta qualidade.

## 4. Navegação e Responsividade
O site foi testado para funcionar perfeitamente em:
- **Desktops**: Experiência completa com o cursor tático.
- **Celulares**: O menu se adapta e o cursor tático é desativado para permitir a navegação por toque padrão do smartphone.

## 5. Manutenção
O código foi escrito de forma **limpa e comentada**. Se no futuro você quiser adicionar novos lutadores ou mudar o trailer, as seções estão bem identificadas nos arquivos `index.html` e `script.js`.

---
*Documento preparado para a entrega final do projeto.*
