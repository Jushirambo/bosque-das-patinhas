# Bosque das Patinhas

[![testes](https://github.com/Jushirambo/bosque-das-patinhas/actions/workflows/test.yml/badge.svg)](https://github.com/Jushirambo/bosque-das-patinhas/actions/workflows/test.yml)

### ▶️ Jogue agora: **https://jushirambo.github.io/bosque-das-patinhas/**

Um jogo de lógica independente com bichinhos fofinhos, feito em HTML, CSS e JavaScript puros.

**Bosque das Patinhas** tem nome, identidade visual, textos, ilustrações vetoriais e código próprios. Sete espécies coloridas precisam encontrar seu cantinho no bosque sem repetir cor ou espécie na mesma linha ou coluna.

## Jogar

**Online:** https://jushirambo.github.io/bosque-das-patinhas/

**Local:** abra o `index.html` no navegador. Não precisa instalar nada.

Para gerar a versão em arquivo único:

```bash
node tools/build.mjs
```

O arquivo gerado é `bosque-das-patinhas.html`.

## O que está implementado

- Solo, 2 a 5 jogadores no mesmo aparelho ou contra a IA.
- Bosque compartilhado **7×7**, com 49 bichinhos: 7 espécies × 7 cores estampadas.
- Espécies originais: coelhinho, gatinho, ursinho, raposinha, pandinha, cachorrinho e hamster.
- Uma jogada não pode repetir **cor** nem **espécie** na mesma linha ou coluna.
- Cada novo bichinho deve ocupar uma clareira vizinha a outro bichinho.
- Depois de jogar, escolha pegar outro bichinho da cestinha ou reduzir permanentemente o limite da mão.
- Vence quem terminar com menos bichinhos na mão.
- Três níveis de IA, histórico, som, atalhos e layout responsivo.

## Como jogar rapidamente

1. Cada jogador começa com quatro bichinhos; um já ocupa a primeira clareira.
2. Clique em um bichinho da mão e depois em uma clareira destacada.
3. A prévia mostra onde ele pode entrar e destaca conflitos na linha ou coluna.
4. Depois de jogar, escolha **Pegar bichinho** ou **Não pegar**.
5. Quem não tiver jogadas sai; ao final, vence quem tiver menos bichinhos na mão.

Atalhos: `1`–`7` selecionam o bichinho correspondente, `Esc` desmarca e `Enter` confirma a compra.

## Estrutura

```
index.html                    interface e modais
css/style.css                 identidade visual responsiva
js/engine.js                  motor de regras
js/ai.js                      IA em três níveis
js/pieces.js                  ilustrações SVG originais dos bichinhos
js/game.js                    interface e eventos
tests/engine.test.js          testes e simulações
tools/build.mjs               gerador do arquivo único
```

## Testes

```bash
npm test
```

Os testes verificam as 49 combinações únicas, distribuição, restrições, vizinhança, compra, limite de mão, eliminações, desempate e partidas completas simuladas.

## Licença

Código, textos e ilustrações deste repositório: **MIT**. Veja `LICENSE`.
