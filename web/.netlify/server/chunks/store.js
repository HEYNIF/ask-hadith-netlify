import { w as writable } from "./index.js";
const searchKey = writable("");
const selectedCollection = writable("");
const firstHadithBase64 = writable("");
const collectionsSorted = writable([]);
const hadithsByCollection = writable(/* @__PURE__ */ new Map());
export {
  selectedCollection as a,
  collectionsSorted as c,
  firstHadithBase64 as f,
  hadithsByCollection as h,
  searchKey as s
};
