import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CLFIAw7K.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/AikxpZYV.js","_app/immutable/chunks/BJXe3z3K.js","_app/immutable/chunks/C0x1ZTOJ.js","_app/immutable/chunks/Du5gyERF.js","_app/immutable/chunks/YqXhB7Vj.js","_app/immutable/chunks/Box4JSDV.js","_app/immutable/chunks/k5phQ5Qd.js","_app/immutable/chunks/CU6_cCBI.js"];
export const stylesheets = [];
export const fonts = [];
