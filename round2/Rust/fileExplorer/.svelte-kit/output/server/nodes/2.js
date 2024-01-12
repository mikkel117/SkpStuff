

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f6d13205.js","_app/immutable/chunks/index.966d6474.js","_app/immutable/chunks/chunk-5UWJICAP.382e657b.js","_app/immutable/chunks/index.629248fb.js"];
export const stylesheets = ["_app/immutable/assets/2.770b6516.css"];
export const fonts = [];
