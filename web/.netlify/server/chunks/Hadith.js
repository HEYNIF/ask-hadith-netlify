import { J as attr, E as bind_props, z as push, D as escape_html, B as pop } from "./index2.js";
function Bookmark($$payload, $$props) {
  let bookmarked = $$props["bookmarked"];
  $$payload.out.push(`<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M192,224l-64.0074-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"${attr("fill", bookmarked ? "currentColor" : "none")} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path></svg>`);
  bind_props($$props, { bookmarked });
}
function Hadith($$payload, $$props) {
  push();
  let hadith = $$props["hadith"];
  let bookmarked = false;
  $$payload.out.push(`<div class="bg-surface rounded-2xl shadow-lg border border-text-100 p-6 md:p-8 mb-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">`);
  if (hadith.narrator_en) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="mb-4"><span class="text-sm font-bold text-primary-600 tracking-wide font-english">${escape_html(hadith.narrator_en)}</span></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="flex justify-end gap-2 mb-4"><button class="rounded-full bg-text-50 hover:bg-text-100 active:bg-text-200 text-text-600 p-3 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300" aria-label="Copy Hadith" title="Copy Hadith"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v13a2 2 0 002 2z"></path></svg> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></button> <button class="rounded-full bg-text-50 hover:bg-text-100 active:bg-text-200 text-text-600 p-3 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300"${attr("aria-label", "Bookmark Hadith")}${attr("title", "Bookmark Hadith")}>`);
  Bookmark($$payload, { class: "h-5 w-5", filled: bookmarked });
  $$payload.out.push(`<!----></button></div> <div class="text-lg md:text-xl font-english text-text-900 leading-relaxed mb-6">${escape_html(hadith.body_en)}</div> <div class="flex flex-wrap gap-2"><span class="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm font-medium">${escape_html(hadith.collection)} (Book: ${escape_html(hadith.book_no)}, Hadith: ${escape_html(hadith.book_ref_no)})</span> `);
  if (hadith.hadith_no) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<span class="bg-secondary-50 text-secondary-700 rounded-full px-3 py-1 text-sm font-medium">Hadith No: ${escape_html(hadith.hadith_no)}</span>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">Book: ${escape_html(hadith.book_en)}</span> `);
  if (hadith.chapter_en) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<span class="bg-text-50 text-text-700 rounded-full px-3 py-1 text-sm font-medium">Chapter: ${escape_html(hadith.chapter_en)}</span>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (hadith.hadith_grade) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<span class="bg-secondary-100 text-secondary-800 rounded-full px-3 py-1 text-sm font-semibold">Grade: ${escape_html(hadith.hadith_grade)}</span>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>`);
  bind_props($$props, { hadith });
  pop();
}
export {
  Hadith as H
};
