

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rightClick/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.554bd916.js","_app/immutable/chunks/index.966d6474.js"];
export const stylesheets = ["_app/immutable/assets/5.dbe7e293.css"];
export const fonts = [];
