import { S as store_set, O as copy_payload, P as assign_payload, E as bind_props, B as pop, z as push, T as head, K as store_get, J as attr, D as escape_html, R as stringify, N as unsubscribe_stores } from "../../../chunks/index2.js";
import { s as searchKey } from "../../../chunks/store.js";
import { H as Hadith } from "../../../chunks/Hadith.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let hadith = data.hadith;
  store_set(searchKey, data.searchKey || "");
  const ogTitle = () => {
    let text = hadith.collection + " (Book: " + hadith.book_no + ", Hadith: " + hadith.book_ref_no + ") ";
    if (hadith.hadith_no) {
      text += "Hadith No: " + hadith.hadith_no;
    }
    return text;
  };
  const ogDescription = () => {
    let text = "";
    if (hadith.hadith_no) {
      text += hadith.narrator_en;
    }
    text += " " + hadith.body_en.substring(0, 100) + "...";
    return text;
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(ogTitle())}</title>`;
      $$payload3.out.push(`<meta name="description"${attr("content", ogDescription())}/> <meta property="og:type" content="website"/> <meta property="og:title"${attr("content", ogTitle())}/> <meta property="og:description"${attr("content", ogDescription())}/> <meta property="og:image"${attr("content", `https://www.askhadith.com/api/og?hadith=${stringify(hadith.base64)}`)}/> <meta name="twitter:card" content="summary_large_image"/> <meta property="twitter:domain" content="askhadith.com"/> <meta name="twitter:title"${attr("content", ogTitle())}/> <meta name="twitter:description"${attr("content", ogDescription())}/> <meta name="twitter:image"${attr("content", `https://www.askhadith.com/api/og?hadith=${stringify(hadith.base64)}`)}/>`);
    });
    $$payload2.out.push(`<div class="mx-auto max-w-4xl">`);
    if (!hadith) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<p class="flex items-center justify-center py-20 dark:text-white">Nothing found!</p>`);
    } else {
      $$payload2.out.push("<!--[!-->");
      $$payload2.out.push(`<div class="flex flex-col"><div class="mx-auto">`);
      Hadith($$payload2, {
        get hadith() {
          return hadith;
        },
        set hadith($$value) {
          hadith = $$value;
          $$settled = false;
        }
      });
      $$payload2.out.push(`<!----></div></div>`);
    }
    $$payload2.out.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$searchKey", searchKey)) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<div class="mb-20 mt-10 flex items-center justify-center underline"><a${attr("href", `/?search=${stringify(store_get($$store_subs ??= {}, "$searchKey", searchKey))}`)} class="text-sm text-blue-700 hover:text-blue-500 hover:underline dark:text-blue-300 dark:hover:text-blue-200">See more hadiths about "${escape_html(store_get($$store_subs ??= {}, "$searchKey", searchKey))}"</a></div>`);
    } else {
      $$payload2.out.push("<!--[!-->");
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
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
