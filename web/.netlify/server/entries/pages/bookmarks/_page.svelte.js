import { O as copy_payload, P as assign_payload, B as pop, z as push, T as head, Q as ensure_array_like } from "../../../chunks/index2.js";
import { H as Hadith } from "../../../chunks/Hadith.js";
function _page($$payload, $$props) {
  push();
  let bookmarkedHadiths = [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Ask Hadith: Bookmarks</title>`;
      $$payload3.out.push(`<meta name="description" content="Bookmarked Hadiths"/>`);
    });
    $$payload2.out.push(`<div class="mx-auto max-w-4xl"><p class="flex items-center justify-center px-4 text-xs text-gray-500">*Please note that these bookmarks are saved in local cache, so if you clear data/cache, it will
		be gone!</p> `);
    if (bookmarkedHadiths?.length == 0) {
      $$payload2.out.push("<!--[-->");
      $$payload2.out.push(`<p class="flex items-center justify-center py-20">No bookmarks found!</p>`);
    } else {
      $$payload2.out.push("<!--[!-->");
      const each_array = ensure_array_like(bookmarkedHadiths);
      $$payload2.out.push(`<div class="flex flex-col"><div class="mx-auto"><!--[-->`);
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
      $$payload2.out.push(`<!--]--></div></div>`);
    }
    $$payload2.out.push(`<!--]--></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
