/*
 * tools/tune.mjs — calibração da IA por simulação.
 *
 * Roda milhares de partidas automáticas entre variantes de política e mostra
 * quantas vitórias cada variante conquista. Foi assim que os pesos de
 * js/ai.js foram escolhidos (bloqueio alto + parar de comprar perto da metade
 * do tabuleiro).
 *
 * Uso:  node tools/tune.mjs [partidas]
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const E = require(path.join(here, '..', 'js', 'engine.js'));

const GAMES = Number(process.argv[2] || 600);

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function flexOf(state, player) {
  let total = 0;
  for (const tile of player.hand) total += E.legalCells(state, tile).length;
  return total;
}

function weakestOf(state, player) {
  let min = Infinity;
  for (const tile of player.hand) min = Math.min(min, E.legalCells(state, tile).length);
  return min === Infinity ? 0 : min;
}

/** Política de escolha de jogada parametrizada. */
function policy(wBlock, wFlex, wWeak, wFew) {
  return (state, player) => {
    const moves = E.legalMoves(state, player);
    let best = null, bestScore = -Infinity;
    for (const move of moves) {
      const sim = E.cloneState(state);
      const me = sim.players[player.seat];
      me.hand.splice(me.hand.indexOf(move.tile), 1);
      sim.grid[move.cell] = move.tile;
      let opp = 0;
      for (const other of sim.players) {
        if (other.seat !== player.seat && !other.out) opp += flexOf(sim, other);
      }
      const score = wFlex * flexOf(sim, me) + wWeak * weakestOf(sim, me)
        - wBlock * opp + wFew * Math.max(0, 8 - E.legalCells(state, move.tile).length);
      if (score > bestScore) { bestScore = score; best = move; }
    }
    return best;
  };
}

const VARIANTS = {
  'bloqueio 0.0': { move: policy(0, 1, 2, 1), drawUntil: 24 },
  'bloqueio 0.9': { move: policy(0.9, 1, 2, 1), drawUntil: 21 },
  'bloqueio 2.0': { move: policy(2.0, 0.6, 1, 1), drawUntil: 24 },
  'compra tardia': { move: policy(2.0, 0.6, 1, 1), drawUntil: 36 },
  'compra adiantada': { move: policy(2.0, 0.6, 1, 1), drawUntil: 14 }
};

const names = Object.keys(VARIANTS);
const wins = Object.fromEntries(names.map((n) => [n, 0]));

for (let g = 0; g < GAMES; g++) {
  const rng = seeded(90_000 + g);
  const lineup = [0, 1, 2].map(() => names[Math.floor(rng() * names.length)]);
  const state = E.createGame({ players: lineup.map((name, i) => ({ name: name + ' ' + i })), rng });

  let steps = 0;
  while (!state.over && steps++ < 500) {
    const player = E.activePlayer(state);
    if (state.phase === 'place') {
      const move = VARIANTS[lineup[player.seat]].move(state, player);
      if (!move) { E.beginTurn(state); continue; }
      E.place(state, move.tile, E.rowOf(move.cell), E.colOf(move.cell));
    } else if (state.phase === 'draw') {
      const limit = VARIANTS[lineup[player.seat]].drawUntil;
      const wantDraw = E.occupiedCount(state) < limit && state.bag.length > 0 && player.hand.length < player.limit;
      E.drawOrSkip(state, wantDraw);
    } else {
      break;
    }
  }
  wins[lineup[state.ranking[0].seat]]++;
}

console.log(`\n${GAMES} partidas de 3 jogadores\n`);
console.log('variante'.padEnd(20), 'vitórias', '  taxa');
Object.entries(wins)
  .sort((a, b) => b[1] - a[1])
  .forEach(([name, count]) => {
    console.log(name.padEnd(20), String(count).padStart(7), ' ', (100 * count / GAMES).toFixed(1) + '%');
  });
console.log('');
