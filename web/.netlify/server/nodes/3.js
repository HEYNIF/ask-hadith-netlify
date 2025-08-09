import * as universal from '../entries/pages/book/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/book/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/book/+page.ts";
export const imports = ["_app/immutable/nodes/3._r3RKlQT.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/AikxpZYV.js","_app/immutable/chunks/BJXe3z3K.js","_app/immutable/chunks/C0x1ZTOJ.js","_app/immutable/chunks/Du5gyERF.js","_app/immutable/chunks/YqXhB7Vj.js","_app/immutable/chunks/Box4JSDV.js"];
export const stylesheets = [];
export const fonts = [];
