/*
 * Town 77 (versão web) — arte das peças (SVG gerado em tempo de execução).
 * Sete estilos de casa x sete cores/estampas, desenhados do zero.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.TownPieces = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var COLORS = [
    { id: 'vermelho', hex: '#e0524b', pattern: 'dots' },
    { id: 'laranja', hex: '#ea8433', pattern: 'diagonals' },
    { id: 'amarelo', hex: '#e2b52c', pattern: 'stripes' },
    { id: 'verde', hex: '#3f9a5c', pattern: 'grid' },
    { id: 'azul', hex: '#3572bd', pattern: 'rings' },
    { id: 'roxo', hex: '#8360c0', pattern: 'cross' },
    { id: 'rosa', hex: '#d15a90', pattern: 'waves' }
  ];

  function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }

  function mix(hex, target, amount) {
    var a = hexToRgb(hex), b = hexToRgb(target);
    return 'rgb(' + clamp(a[0] + (b[0] - a[0]) * amount) + ',' +
      clamp(a[1] + (b[1] - a[1]) * amount) + ',' +
      clamp(a[2] + (b[2] - a[2]) * amount) + ')';
  }

  function darken(hex, amount) { return mix(hex, '#000000', amount); }
  function lighten(hex, amount) { return mix(hex, '#ffffff', amount); }

  /* ------------------------------------------------------- padrões de cor */

  function patternBody(kind) {
    switch (kind) {
      case 'dots':
        return '<circle cx="3" cy="3" r="1.5"/><circle cx="9" cy="9" r="1.5"/>';
      case 'diagonals':
        return '<path d="M-2,14 L14,-2 M-2,2 L2,-2 M10,14 L14,10"/>';
      case 'stripes':
        return '<path d="M0,3 H12 M0,9 H12"/>';
      case 'grid':
        return '<path d="M0,6 H12 M6,0 V12"/>';
      case 'rings':
        return '<circle cx="6" cy="6" r="3.2"/>';
      case 'cross':
        return '<path d="M1,1 L11,11 M11,1 L1,11"/>';
      case 'waves':
        return '<path d="M0,6 Q3,2 6,6 T12,6"/>';
      default:
        return '';
    }
  }

  /** <defs> com as sete estampas — incluir uma vez na página. */
  function defs() {
    return '<defs>' + COLORS.map(function (c, i) {
      return '<pattern id="t77-pat-' + c.id + '" patternUnits="userSpaceOnUse" width="12" height="12" ' +
        'patternTransform="scale(1.35)">' +
        '<g fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.6" ' +
        'stroke-linecap="round" fill="rgba(255,255,255,0.5)">' + patternBody(c.pattern) + '</g>' +
        '</pattern>';
    }).join('') + '</defs>';
  }

  /* --------------------------------------------------------------- casas */

  var SHAPE_PATHS = [
    // 0 — Chalé (telhado de duas águas)
    '<path d="M50 6 L94 48 L6 48 Z" fill="__ROOF__"/>' +
    '<rect x="16" y="48" width="68" height="44" fill="__BODY__"/>' +
    '<rect x="16" y="48" width="68" height="44" fill="url(#t77-pat-__CID__)"/>' +
    '<rect x="42" y="66" width="16" height="26" rx="7" fill="__DOOR__"/>' +
    '<rect x="56" y="22" width="9" height="16" fill="__ROOF__"/>',

    // 1 — Cúpula
    '<path d="M14 52 A36 30 0 0 1 86 52 Z" fill="__ROOF__"/>' +
    '<rect x="14" y="52" width="72" height="40" fill="__BODY__"/>' +
    '<rect x="14" y="52" width="72" height="40" fill="url(#t77-pat-__CID__)"/>' +
    '<path d="M50 20 L50 8" stroke="__ROOF__" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="50" cy="7" r="4.5" fill="__ROOF__"/>' +
    '<path d="M38 92 v-18 a12 12 0 0 1 24 0 v18 z" fill="__DOOR__"/>',

    // 2 — Pirâmide
    '<path d="M50 4 L96 54 L4 54 Z" fill="__ROOF__"/>' +
    '<rect x="18" y="54" width="64" height="38" fill="__BODY__"/>' +
    '<rect x="18" y="54" width="64" height="38" fill="url(#t77-pat-__CID__)"/>' +
    '<rect x="44" y="66" width="12" height="26" fill="__DOOR__"/>' +
    '<rect x="24" y="62" width="12" height="10" rx="2" fill="__WINDOW__"/>' +
    '<rect x="64" y="62" width="12" height="10" rx="2" fill="__WINDOW__"/>',

    // 3 — Prédio (laje reta)
    '<rect x="10" y="8" width="80" height="84" rx="4" fill="__BODY__"/>' +
    '<rect x="10" y="8" width="80" height="84" rx="4" fill="url(#t77-pat-__CID__)"/>' +
    '<rect x="6" y="4" width="88" height="11" rx="3" fill="__ROOF__"/>' +
    '<g fill="__WINDOW__">' +
    '<rect x="20" y="24" width="16" height="14" rx="2"/><rect x="42" y="24" width="16" height="14" rx="2"/>' +
    '<rect x="64" y="24" width="16" height="14" rx="2"/><rect x="20" y="46" width="16" height="14" rx="2"/>' +
    '<rect x="42" y="46" width="16" height="14" rx="2"/><rect x="64" y="46" width="16" height="14" rx="2"/>' +
    '</g>' +
    '<rect x="42" y="70" width="16" height="22" rx="3" fill="__DOOR__"/>',

    // 4 — Castelo
    '<rect x="6" y="26" width="20" height="66" fill="__ROOF__"/>' +
    '<rect x="74" y="26" width="20" height="66" fill="__ROOF__"/>' +
    '<rect x="24" y="44" width="52" height="48" fill="__BODY__"/>' +
    '<rect x="24" y="44" width="52" height="48" fill="url(#t77-pat-__CID__)"/>' +
    '<g fill="__ROOF__">' +
    '<rect x="4" y="18" width="9" height="10"/><rect x="19" y="18" width="9" height="10"/>' +
    '<rect x="72" y="18" width="9" height="10"/><rect x="87" y="18" width="9" height="10"/>' +
    '<rect x="22" y="36" width="10" height="10"/><rect x="45" y="36" width="10" height="10"/>' +
    '<rect x="68" y="36" width="10" height="10"/>' +
    '</g>' +
    '<path d="M38 92 v-16 a12 12 0 0 1 24 0 v16 z" fill="__DOOR__"/>',

    // 5 — Torre
    '<path d="M50 2 L88 30 L12 30 Z" fill="__ROOF__"/>' +
    '<rect x="26" y="30" width="48" height="62" fill="__BODY__"/>' +
    '<rect x="26" y="30" width="48" height="62" fill="url(#t77-pat-__CID__)"/>' +
    '<circle cx="50" cy="50" r="8" fill="__WINDOW__"/>' +
    '<rect x="43" y="68" width="14" height="24" rx="6" fill="__DOOR__"/>',

    // 6 — Tambor (cilindro)
    '<rect x="18" y="30" width="64" height="62" rx="10" fill="__BODY__"/>' +
    '<rect x="18" y="30" width="64" height="62" rx="10" fill="url(#t77-pat-__CID__)"/>' +
    '<ellipse cx="50" cy="30" rx="32" ry="13" fill="__ROOF__"/>' +
    '<rect x="30" y="58" width="40" height="6" rx="3" fill="__WINDOW__" opacity="0.8"/>' +
    '<path d="M40 92 v-14 a10 10 0 0 1 20 0 v14 z" fill="__DOOR__"/>'
  ];

  var SHAPE_NAMES = ['Chalé', 'Cúpula', 'Pirâmide', 'Prédio', 'Castelo', 'Torre', 'Tambor'];

  function svgFor(shape, color) {
    var c = COLORS[color % COLORS.length];
    var base = c.hex;
    var body = base;
    var roof = darken(base, 0.34);
    var door = lighten(base, 0.72);
    var windowCol = lighten(base, 0.62);

    var markup = SHAPE_PATHS[shape % SHAPE_PATHS.length]
      .replace(/__ROOF__/g, roof)
      .replace(/__BODY__/g, body)
      .replace(/__DOOR__/g, door)
      .replace(/__WINDOW__/g, windowCol)
      .replace(/__CID__/g, c.id);

    return '<svg class="house-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ' +
      'role="img" aria-hidden="true" focusable="false">' + markup + '</svg>';
  }

  function cardBg(color) {
    return mix(COLORS[color % COLORS.length].hex, '#ffffff', 0.9);
  }

  return {
    COLORS: COLORS,
    SHAPE_NAMES: SHAPE_NAMES,
    defs: defs,
    svgFor: svgFor,
    cardBg: cardBg,
    darken: darken,
    lighten: lighten,
    mix: mix
  };
});
