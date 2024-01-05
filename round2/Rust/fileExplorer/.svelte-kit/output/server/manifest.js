export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.51066ef9.js","app":"_app/immutable/entry/app.148a1152.js","imports":["_app/immutable/entry/start.51066ef9.js","_app/immutable/chunks/index.d3575d4a.js","_app/immutable/chunks/singletons.8e599142.js","_app/immutable/chunks/index.1e19f5e2.js","_app/immutable/entry/app.148a1152.js","_app/immutable/chunks/index.d3575d4a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
