

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.a577dc2f.js","_app/immutable/chunks/index.966d6474.js"];
export const stylesheets = [];
export const fonts = [];
