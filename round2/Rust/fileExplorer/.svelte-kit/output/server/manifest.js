export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.22fb0446.js","app":"_app/immutable/entry/app.d9296d40.js","imports":["_app/immutable/entry/start.22fb0446.js","_app/immutable/chunks/index.966d6474.js","_app/immutable/chunks/singletons.3e5020e2.js","_app/immutable/chunks/index.629248fb.js","_app/immutable/entry/app.d9296d40.js","_app/immutable/chunks/index.966d6474.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
