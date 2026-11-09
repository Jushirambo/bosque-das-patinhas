# Town 77 — versão jogável no navegador

Adaptação **não oficial**, feita do zero em HTML, CSS e JavaScript puros (sem build, sem dependências),
do jogo de tabuleiro **Town 77** da Oink Games.

> **Jogo original:** *Town 77* (2023), design de Christoph Cantzler & Anja Wrede, arte de Jun Sasaki,
> publicado pela Oink Games. Este projeto é um exercício de programação, sem fins comerciais e sem
> qualquer vínculo com os autores ou com a editora. Todas as regras foram reimplementadas de forma
> independente e toda a arte (as 7 casas e as 7 estampas de cor) é vetorial e original.

## Jogar

Abra o `index.html` no navegador — é só isso. Não precisa instalar nada.

Se quiser um único arquivo (para abrir direto do disco, mandar por e-mail ou publicar como página
única), abra **`town77-standalone.html`**: ele traz CSS e JS embutidos. Para regerar depois de
qualquer alteração:

```bash
node tools/build.mjs
```

Se preferir servir por HTTP (recomendado no celular ou para publicar):

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## O que está implementado

- **Solo (1 jogador)**, 2 a 5 jogadores, tudo no mesmo aparelho, contra a IA ou misturando humanos e máquinas.
- Tabuleiro **7×7 compartilhado** com as **49 peças** (7 estilos de casa × 7 cores/estampas), uma de cada combinação.
- Regra central: uma peça não pode repetir **cor** nem **casa** na mesma **linha** ou **coluna**.
- Só é possível construir em casa **vazia vizinha** de uma peça já colocada.
- Depois de construir, **comprar ou não** do saco: ao não comprar, o limite de mão cai e nunca mais sobe.
- Eliminação por falta de jogada (leva as peças na mão) ou por zerar a mão.
- Vitória de quem terminar com **menos peças na mão**; empate vai para quem jogou por último.
- Três níveis de IA, histórico da partida, som discreto, atalhos de teclado e layout responsivo.

## Como jogar em 30 segundos

1. Cada um começa com **4 peças**; uma peça inicial já está na cidade.
2. Clique numa peça da mão (fica elevada) e depois numa casa **destacada em verde**.
3. Passe o mouse numa casa para ver a peça “fantasma” e os conflitos em vermelho na linha/coluna.
4. Depois de construir, escolha **Comprar peça** ou **Não comprar** (travando o limite de mão).
5. Quem ficar sem jogada está fora; quem tiver menos peças na mão no fim ganha.

Atalhos: `1`–`7` selecionam a peça correspondente, `Esc` desmarca, `Enter` confirma a compra.

## Estrutura

```
index.html            tela do jogo (modais de regras, configuração e resultado)
css/style.css         estilos, layout responsivo, sem fontes ou recursos externos
js/engine.js          motor de regras puro (sem DOM) — estado, validação, turnos, ranking
js/ai.js              IA com três níveis, calibrada por simulação
js/pieces.js          arte vetorial das 49 peças (SVG gerado em tempo de execução)
js/game.js            interface: renderização, eventos, animação de turnos
tests/engine.test.js  testes do motor + simulações completas (~160 partidas)
tools/ci-workflow.yml.example  workflow de CI pronto, com instruções para ativar
tools/tune.mjs        script de calibração da IA por torneio de variantes
```

O `engine.js` não toca no DOM e funciona tanto no navegador (`window.TownEngine`) quanto no
Node (`require`), o que permite testar as regras sem navegador.

## Testes

```bash
npm test          # ou: node tests/engine.test.js
```

Os testes cobrem: unicidade das 49 peças, distribuição inicial, restrições de linha/coluna,
vizinhança, compra/limite de mão, eliminações, desempate e — o mais importante — **simulações de
partidas completas** verificando que nenhuma peça some ou aparece e que só ocorrem jogadas legais.

## Calibração da IA

```bash
node tools/tune.mjs 600
```

A IA foi ajustada rodando milhares de partidas entre variantes de política. Duas conclusões
guiaram os pesos finais:

1. **Bloquear compensa.** Como o tabuleiro é comum, construir de modo a reduzir as opções dos
   adversários vale mais do que apenas preservar a própria flexibilidade.
2. **Parar de comprar cedo.** Quem continua comprando até o tabuleiro encher termina com a mão
   cheia quando já não há espaços; o ponto ideal ficou perto de **metade do tabuleiro (~24 casas)**.

Resultado típico em 400 partidas de 3 jogadores: bloqueio forte ≈ 29% de vitórias, bloqueio médio
≈ 26%, sem bloqueio ≈ 16%, compra tardia ≈ 5%.

## Licença

Código e arte deste repositório: **MIT** (veja `LICENSE`). As regras do jogo original e a marca
*Town 77* pertencem aos seus autores e à Oink Games; este projeto não redistribui nenhum material
da edição original (nenhuma imagem, carta ou manual foi copiado).
