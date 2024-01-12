import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.c0f51445.js","_app/immutable/chunks/index.966d6474.js"];
export const stylesheets = ["_app/immutable/assets/0.1a089d1f.css"];
export const fonts = [];
