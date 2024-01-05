import { c as create_ssr_component, a as subscribe, e as escape, i as each, h as add_attribute, v as validate_component, m as missing_component } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
const arrayTest = writable([]);
arrayTest.update = (value) => console.log("test ", value);
const Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_arrayTest;
  $$unsubscribe_arrayTest = subscribe(arrayTest, (value) => value);
  let { number = 1 } = $$props;
  if ($$props.number === void 0 && $$bindings.number && number !== void 0)
    $$bindings.number(number);
  $$unsubscribe_arrayTest();
  return `<a href="/">HOME</a>
<h2>tap test ${escape(number)}</h2>
${``}

`;
});
const Taps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { activeTabValue = 1 } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.activeTabValue === void 0 && $$bindings.activeTabValue && activeTabValue !== void 0)
    $$bindings.activeTabValue(activeTabValue);
  return `<ul>${each(items, (item) => {
    return `<li${add_attribute("class", activeTabValue === item.value ? "active" : "", 0)}><span>${escape(item.label)}</span>
    </li>`;
  })}</ul>

${each(items, (item) => {
    return `${activeTabValue == item.value ? `<div class="box">${validate_component(item.component || missing_component, "svelte:component").$$render($$result, { number: item.value }, {}, {})}
      
    </div>` : ``}`;
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items = [
    { label: "tab1", value: 1, component: Test },
    { label: "tab2", value: 2, component: Test }
  ];
  return `



${validate_component(Taps, "Taps").$$render($$result, { items }, {}, {})}`;
});
export {
  Page as default
};
