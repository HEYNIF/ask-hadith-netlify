import { z as push, J as attr, K as store_get, D as escape_html, M as attr_class, N as unsubscribe_stores, E as bind_props, B as pop, O as copy_payload, P as assign_payload, Q as ensure_array_like, R as stringify, S as store_set, T as head } from "../../chunks/index2.js";
import { s as searchKey, h as hadithsByCollection, a as selectedCollection, c as collectionsSorted, f as firstHadithBase64 } from "../../chunks/store.js";
import { S as Search } from "../../chunks/search.js";
import { H as Hadith } from "../../chunks/Hadith.js";
function SearchBox($$payload, $$props) {
  push();
  var $$store_subs;
  let searching = $$props["searching"];
  let notFound = $$props["notFound"];
  let showInstructions = false;
  $$payload.out.push(`<div class="mx-auto flex-col items-center justify-center w-full"><div class="relative w-full max-w-2xl mx-auto"><div class="relative"><input type="text" class="w-full rounded-2xl border-0 bg-surface shadow-lg p-4 md:p-5 text-base md:text-lg font-english text-text-900 placeholder-text-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:shadow-xl transition-all duration-300 pr-12" placeholder="Search for a Hadith, topic, or reference..."${attr("value", store_get($$store_subs ??= {}, "$searchKey", searchKey))} aria-label="Search Hadiths"/> <button class="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white p-2 md:p-3 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50" aria-label="Search Hadiths"${attr("disabled", searching, true)}>`);
  Search($$payload);
  $$payload.out.push(`<!----></button></div></div> <div class="mx-auto mt-6 flex max-w-sm flex-col items-center justify-center text-sm text-text-600"><button class="mb-3 flex items-center rounded-lg font-medium hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors duration-200">${escape_html("Show Instructions")} <svg${attr_class("ml-2 h-4 w-4 transition-transform duration-200", void 0, { "rotate-180": showInstructions })} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { searching, notFound });
  pop();
}
function HadithList($$payload, $$props) {
  push();
  var $$store_subs;
  let hadiths = [];
  if (store_get($$store_subs ??= {}, "$hadithsByCollection", hadithsByCollection).has(store_get($$store_subs ??= {}, "$selectedCollection", selectedCollection))) {
    hadiths = store_get($$store_subs ??= {}, "$hadithsByCollection", hadithsByCollection).get(store_get($$store_subs ??= {}, "$selectedCollection", selectedCollection)) || [];
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(hadiths);
    $$payload2.out.push(`<div class="flex flex-col gap-4 pb-20 md:gap-8"><!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let hadith = each_array[$$index];
      Hadith($$payload2, {
        get hadith() {
          return hadith;
        },
        set hadith($$value) {
          hadith = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out.push(`<!--]--></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function HadithFilters($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out.push(`<div class="py-4 md:mb-4"><div class="mx-auto flex flex-wrap items-center justify-center gap-2 px-2 dark:hover:text-gray-200">`);
  if (store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted).length > 0) {
    $$payload.out.push("<!--[-->");
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted));
    $$payload.out.push(`<!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let col = each_array[$$index];
      $$payload.out.push(`<button aria-label="Select Collection"${attr_class(`${stringify(store_get($$store_subs ??= {}, "$selectedCollection", selectedCollection) === col.collection ? "bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200" : "bg-white dark:bg-gray-800 dark:text-gray-400")} my-auto h-7 rounded-lg px-2 py-1 text-xs font-medium shadow transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white dark:border-gray-700 dark:hover:bg-gray-700`)}>${escape_html(col.collection)} <span>(${escape_html(col.count)})</span></button>`);
    }
    $$payload.out.push(`<!--]-->`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let notFound = false;
  let searching = false;
  const ogDescription = () => {
    if (store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted)?.length > 0) return "Read " + store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted).reduce((acc, curr) => acc + curr.count, 0) + " hadiths about '" + store_get($$store_subs ??= {}, "$searchKey", searchKey) + "' from " + store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted).map((col) => col.collection).join(", ");
    return "Search anything from Hadiths (includes: Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah)";
  };
  const ogTitle = () => {
    if (store_get($$store_subs ??= {}, "$searchKey", searchKey)) return "Hadiths about '" + store_get($$store_subs ??= {}, "$searchKey", searchKey) + "'";
    return "AskHadith.com - Search Hadiths from Sahih Bukhari, Sahih Muslim and more";
  };
  const ogImage = () => {
    if (store_get($$store_subs ??= {}, "$firstHadithBase64", firstHadithBase64)) return "https://www.askhadith.com/api/og?hadith=" + store_get($$store_subs ??= {}, "$firstHadithBase64", firstHadithBase64);
    return "https://www.askhadith.com/favicon.ico";
  };
  if (data?.resp?.data?.length > 0 && store_get($$store_subs ??= {}, "$selectedCollection", selectedCollection) == "") {
    store_get($$store_subs ??= {}, "$hadithsByCollection", hadithsByCollection).clear();
    store_set(collectionsSorted, []);
    store_set(selectedCollection, "");
    store_set(searchKey, "");
    store_set(firstHadithBase64, "");
    data.resp.data.forEach((col) => {
      store_get($$store_subs ??= {}, "$hadithsByCollection", hadithsByCollection).set(col.collection, col.hadiths);
      store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted).push({ collection: col.collection, count: col.count });
    });
    store_set(selectedCollection, data.resp.data[0].collection);
    store_set(searchKey, data.searchKey || "");
    store_set(firstHadithBase64, data.resp.first_hadith_base64);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(ogTitle())}</title>`;
      $$payload3.out.push(`<meta name="description"${attr("content", ogDescription())}/> <meta property="og:url"${attr("content", `https://www.askhadith.com/?search=${stringify(store_get($$store_subs ??= {}, "$searchKey", searchKey))}`)}/> <meta property="og:type" content="website"/> <meta property="og:title"${attr("content", ogTitle())}/> <meta property="og:description"${attr("content", ogDescription())}/> <meta property="og:image"${attr("content", ogImage())}/> <meta name="twitter:card" content="summary_large_image"/> <meta property="twitter:domain" content="askhadith.com"/> <meta property="twitter:url"${attr("content", `https://www.askhadith.com/?search=${stringify(store_get($$store_subs ??= {}, "$searchKey", searchKey))}`)}/> <meta name="twitter:title"${attr("content", ogTitle())}/> <meta name="twitter:description"${attr("content", ogDescription())}/> <meta name="twitter:image"${attr("content", ogImage())}/>`);
    });
    $$payload2.out.push(`<div class="relative min-h-screen bg-background overflow-hidden"><img src="/prayer-bg.jpeg" alt="Praying silhouette" class="hidden sm:block pointer-events-none select-none absolute left-1/2 bottom-0 transform -translate-x-1/2 md:w-3/4 w-full opacity-10" style="z-index:0;"/> <div class="absolute inset-0 bg-white opacity-30 pointer-events-none" style="z-index:1;"></div> <div class="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl"><div class="text-center mb-8 md:mb-12"><h1 class="text-3xl md:text-4xl font-bold text-text-900 mb-4 font-english">Ask Hadith</h1> <p class="text-lg text-text-600 font-english">Search through authentic Hadith collections</p></div> <div class="mb-8">`);
    SearchBox($$payload2, {
      get searching() {
        return searching;
      },
      set searching($$value) {
        searching = $$value;
        $$settled = false;
      },
      get notFound() {
        return notFound;
      },
      set notFound($$value) {
        notFound = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----></div> `);
    if (searching) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<div class="flex justify-center items-center py-12"><div class="flex items-center space-x-2 text-primary-600"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div> <span class="text-lg font-medium">Searching...</span></div></div>`);
    } else {
      $$payload2.out.push("<!--[!-->");
      if (notFound) {
        $$payload2.out.push("<!--[-->");
        $$payload2.out.push(`<div class="text-center py-12"><p class="text-lg text-text-600 mb-2">Nothing found! ☹️</p> <p class="text-sm text-text-500">Try different keywords or check your spelling.</p></div>`);
      } else {
        $$payload2.out.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$collectionsSorted", collectionsSorted).length > 0) {
          $$payload2.out.push("<!--[-->");
          $$payload2.out.push(`<div class="space-y-6">`);
          HadithFilters($$payload2);
          $$payload2.out.push(`<!----> `);
          HadithList($$payload2);
          $$payload2.out.push(`<!----></div>`);
        } else {
          $$payload2.out.push("<!--[!-->");
          $$payload2.out.push(`<div class="text-center py-12"><div class="max-w-md mx-auto"><div class="text-6xl mb-4">📖</div> <h2 class="text-xl font-semibold text-text-900 mb-2 font-english">Welcome to Ask Hadith</h2> <p class="text-text-600 font-english">Search for authentic Hadiths from Sahih al-Bukhari, Sahih Muslim, and other major collections.</p></div></div>`);
        }
        $$payload2.out.push(`<!--]-->`);
      }
      $$payload2.out.push(`<!--]-->`);
    }
    $$payload2.out.push(`<!--]--></div></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
