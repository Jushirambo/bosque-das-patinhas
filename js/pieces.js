/*
 * Bosque das Patinhas — bichinhos vetoriais gerados em tempo de execução.
 * Sete espécies x sete cores/estampas, com arte original deste projeto.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PatinhasPieces = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var COLORS = [
    { id: 'morango', name: 'Morango', hex: '#ef6b78', pattern: 'hearts' },
    { id: 'tangerina', name: 'Tangerina', hex: '#f59a4a', pattern: 'dots' },
    { id: 'mel', name: 'Mel', hex: '#e9bd45', pattern: 'stars' },
    { id: 'menta', name: 'Menta', hex: '#67b985', pattern: 'leaves' },
    { id: 'ceu', name: 'Céu', hex: '#64a9d9', pattern: 'clouds' },
    { id: 'lavanda', name: 'Lavanda', hex: '#9b82d1', pattern: 'flowers' },
    { id: 'pitaya', name: 'Pitaya', hex: '#df79ad', pattern: 'waves' }
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

  function patternBody(kind) {
    switch (kind) {
      case 'hearts': return '<path d="M6 10 C2 7 1 4 3 3 C4.5 2 6 3.5 6 4.5 C6 3.5 7.5 2 9 3 C11 4 10 7 6 10Z"/>';
      case 'dots': return '<circle cx="3" cy="3" r="1.4"/><circle cx="9" cy="9" r="1.4"/>';
      case 'stars': return '<path d="M6 1.5 L7.3 4.4 L10.5 4.7 L8 6.8 L8.8 10 L6 8.3 L3.2 10 L4 6.8 L1.5 4.7 L4.7 4.4Z"/>';
      case 'leaves': return '<path d="M2 8 Q2 3 7 3 Q7 8 2 8 M7 10 Q7 6 11 6 Q11 10 7 10"/>';
      case 'clouds': return '<path d="M1 8 Q1 5 4 5 Q5 2 8 4 Q11 4 11 8Z"/>';
      case 'flowers': return '<circle cx="6" cy="3.5" r="2"/><circle cx="8.5" cy="6" r="2"/><circle cx="6" cy="8.5" r="2"/><circle cx="3.5" cy="6" r="2"/>';
      case 'waves': return '<path d="M0 6 Q3 2 6 6 T12 6"/>';
      default: return '';
    }
  }

  function defs() {
    return '<defs>' + COLORS.map(function (c) {
      return '<pattern id="patinhas-pat-' + c.id + '" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="scale(1.25)">' +
        '<g fill="none" stroke="#fff" stroke-opacity=".44" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">' +
        patternBody(c.pattern) + '</g></pattern>';
    }).join('') + '</defs>';
  }

  var COMMON_FACE =
    '<circle cx="39" cy="51" r="3.2" fill="#3e3541"/><circle cx="61" cy="51" r="3.2" fill="#3e3541"/>' +
    '<path d="M47 61 Q50 64 53 61" fill="none" stroke="#3e3541" stroke-width="2.4" stroke-linecap="round"/>' +
    '<ellipse cx="50" cy="58" rx="3.2" ry="2.4" fill="#59434a"/>' +
    '<ellipse cx="33" cy="60" rx="6" ry="3" fill="#f6a0a7" opacity=".6"/><ellipse cx="67" cy="60" rx="6" ry="3" fill="#f6a0a7" opacity=".6"/>';

  var ANIMALS = [
    // Coelho
    '<ellipse cx="35" cy="22" rx="10" ry="24" fill="__LIGHT__" stroke="__OUT__" stroke-width="3"/><ellipse cx="65" cy="22" rx="10" ry="24" fill="__LIGHT__" stroke="__OUT__" stroke-width="3"/>' +
    '<ellipse cx="35" cy="21" rx="4" ry="16" fill="#f5abb7"/><ellipse cx="65" cy="21" rx="4" ry="16" fill="#f5abb7"/>' +
    '<circle cx="50" cy="56" r="32" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT____FACE__' +
    '<path d="M31 84 Q50 73 69 84" fill="__LIGHT__"/>',
    // Gatinho
    '<path d="M20 36 L25 7 L44 28 M80 36 L75 7 L56 28" fill="__LIGHT__" stroke="__OUT__" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M26 25 L28 14 L38 28 M74 25 L72 14 L62 28" fill="#f5abb7"/>' +
    '<circle cx="50" cy="56" r="32" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT____FACE__' +
    '<path d="M25 57 H9 M26 64 L11 69 M75 57 H91 M74 64 L89 69" stroke="__OUT__" stroke-width="2" stroke-linecap="round"/>',
    // Ursinho
    '<circle cx="24" cy="25" r="14" fill="__BODY__" stroke="__OUT__" stroke-width="3"/><circle cx="76" cy="25" r="14" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>' +
    '<circle cx="24" cy="25" r="6" fill="__LIGHT__"/><circle cx="76" cy="25" r="6" fill="__LIGHT__"/>' +
    '<circle cx="50" cy="56" r="32" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT____FACE__' +
    '<ellipse cx="50" cy="62" rx="13" ry="10" fill="__LIGHT__" opacity=".8"/>',
    // Raposinha
    '<path d="M16 38 L24 5 L45 30 M84 38 L76 5 L55 30" fill="__BODY__" stroke="__OUT__" stroke-width="3" stroke-linejoin="round"/>' +
    '<circle cx="50" cy="56" r="32" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT__' +
    '<path d="M26 50 Q50 89 74 50 Q65 78 50 82 Q35 78 26 50" fill="__LIGHT__" opacity=".95"/>__FACE__',
    // Pandinha
    '<circle cx="24" cy="25" r="14" fill="#49404a"/><circle cx="76" cy="25" r="14" fill="#49404a"/>' +
    '<circle cx="50" cy="56" r="32" fill="__LIGHT__" stroke="__OUT__" stroke-width="3"/>__PAT__' +
    '<ellipse cx="38" cy="51" rx="8" ry="11" fill="#49404a" transform="rotate(18 38 51)"/><ellipse cx="62" cy="51" rx="8" ry="11" fill="#49404a" transform="rotate(-18 62 51)"/>__FACE__',
    // Cachorrinho
    '<ellipse cx="22" cy="38" rx="13" ry="25" fill="__OUT__" transform="rotate(23 22 38)"/><ellipse cx="78" cy="38" rx="13" ry="25" fill="__OUT__" transform="rotate(-23 78 38)"/>' +
    '<circle cx="50" cy="56" r="32" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT____FACE__' +
    '<path d="M45 66 Q50 74 55 66 Q56 80 50 82 Q44 80 45 66" fill="#f18e9a"/>',
    // Hamster
    '<circle cx="24" cy="29" r="12" fill="__LIGHT__" stroke="__OUT__" stroke-width="3"/><circle cx="76" cy="29" r="12" fill="__LIGHT__" stroke="__OUT__" stroke-width="3"/>' +
    '<ellipse cx="50" cy="57" rx="34" ry="31" fill="__BODY__" stroke="__OUT__" stroke-width="3"/>__PAT____FACE__' +
    '<circle cx="27" cy="65" r="11" fill="__LIGHT__" opacity=".8"/><circle cx="73" cy="65" r="11" fill="__LIGHT__" opacity=".8"/>'
  ];

  var SHAPE_NAMES = ['Coelhinho', 'Gatinho', 'Ursinho', 'Raposinha', 'Pandinha', 'Cachorrinho', 'Hamster'];

  function svgFor(shape, color) {
    var c = COLORS[color % COLORS.length];
    var body = c.hex;
    var out = darken(body, .3);
    var light = lighten(body, .72);
    var pattern = '<circle cx="50" cy="56" r="29" fill="url(#patinhas-pat-' + c.id + ')"/>';
    var markup = ANIMALS[shape % ANIMALS.length]
      .replace(/__BODY__/g, body).replace(/__OUT__/g, out).replace(/__LIGHT__/g, light)
      .replace(/__PAT__/g, pattern).replace(/__FACE__/g, COMMON_FACE);
    return '<svg class="animal-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">' + markup + '</svg>';
  }

  function cardBg(color) { return mix(COLORS[color % COLORS.length].hex, '#ffffff', .9); }

  return { COLORS: COLORS, SHAPE_NAMES: SHAPE_NAMES, defs: defs, svgFor: svgFor, cardBg: cardBg,
    darken: darken, lighten: lighten, mix: mix };
});
