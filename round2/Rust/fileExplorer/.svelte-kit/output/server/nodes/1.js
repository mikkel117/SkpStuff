

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a6585b49.js","_app/immutable/chunks/index.966d6474.js","_app/immutable/chunks/singletons.3e5020e2.js","_app/immutable/chunks/index.629248fb.js"];
export const stylesheets = [];
export const fonts = [];
