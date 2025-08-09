export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon.ico","manifest.json","offline.html","prayer-bg.jpeg","robots.txt"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".html":"text/html",".jpeg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.xDaswb8h.js",app:"_app/immutable/entry/app.XknwlX_z.js",imports:["_app/immutable/entry/start.xDaswb8h.js","_app/immutable/chunks/1hrh2Gaf.js","_app/immutable/chunks/BJXe3z3K.js","_app/immutable/chunks/Box4JSDV.js","_app/immutable/entry/app.XknwlX_z.js","_app/immutable/chunks/BJXe3z3K.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/C0x1ZTOJ.js","_app/immutable/chunks/YqXhB7Vj.js","_app/immutable/chunks/Box4JSDV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/og",
				pattern: /^\/api\/og\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/og/_server.js'))
			},
			{
				id: "/bookmarks",
				pattern: /^\/bookmarks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/book",
				pattern: /^\/book\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
