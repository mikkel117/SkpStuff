import { c as create_ssr_component, h as add_attribute, i as each, e as escape } from "../../../chunks/index2.js";
import { invoke } from "@tauri-apps/api/tauri";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-rn76sd{margin:0;padding:0;box-sizing:border-box}input.svelte-rn76sd{display:block;width:100%}li.svelte-rn76sd{border:1px solid black;padding:10px;overflow:hidden}",
  map: null
};
let path = "HomeDir";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let input = "C:/Users/rumbo";
  let files = [];
  let suggestions = [];
  let isInputFocused = false;
  async function callSearchSuggestion() {
    suggestions = await invoke("fuzzy_finder", {
      searchWord: input,
      arrayOfWords: files,
      path
    });
  }
  $$result.css.add(css);
  {
    {
      if (input != "") {
        callSearchSuggestion();
      }
      input = input;
    }
  }
  return `<form id="form" class="svelte-rn76sd"><input list="test" type="text" class="svelte-rn76sd"${add_attribute("value", input, 0)}>
  ${suggestions && isInputFocused ? `<ul class="svelte-rn76sd">${each(suggestions, (item) => {
    return `
        <li class="svelte-rn76sd">${escape(item.path)}</li>`;
  })}</ul>` : ``}
</form>`;
});
export {
  Page as default
};
