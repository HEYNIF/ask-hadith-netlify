import { B as pop, z as push, F as slot } from "../../chunks/index2.js";
import "clsx";
import { S as Search } from "../../chunks/search.js";
function Bookmarks($$payload) {
  $$payload.out.push(`<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="none" viewBox="0 0 256 256"><path d="M168,224l-56.0074-40L56,224V72a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path><path d="M88,64V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8V192l-32-22.85412" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path></svg>`);
}
function Nav($$payload, $$props) {
  push();
  $$payload.out.push(`<nav class="top-0 z-10 p-4 dark:border-gray-700 dark:bg-gray-900"><div class="mx-auto max-w-7xl"><ul class="flex flex-row justify-end gap-4 text-sm text-gray-600 dark:text-gray-300"><li><a class="flex flex-row items-center gap-1 hover:underline" href="/">`);
  Search($$payload);
  $$payload.out.push(`<!----> Search</a></li> <li><a class="flex flex-row items-center gap-1 hover:underline" href="/bookmarks">`);
  Bookmarks($$payload);
  $$payload.out.push(`<!----> Bookmarks</a></li> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></ul></div></nav>`);
  pop();
}
function _layout($$payload, $$props) {
  $$payload.out.push(`<div class="min-h-screen bg-slate-50 dark:bg-gray-900">`);
  Nav($$payload);
  $$payload.out.push(`<!----> <!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></div>`);
}
export {
  _layout as default
};
