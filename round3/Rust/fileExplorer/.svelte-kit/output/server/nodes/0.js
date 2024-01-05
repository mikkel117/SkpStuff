import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.22f826ac.js","_app/immutable/chunks/index.d3575d4a.js"];
export const stylesheets = ["_app/immutable/assets/0.412a6c24.css"];
export const fonts = [];
