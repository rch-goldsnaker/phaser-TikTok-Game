if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let r={};const o=e=>a(e,s),b={module:{uri:s},exports:r,require:o};i[s]=Promise.all(c.map((e=>b[e]||o(e)))).then((e=>(n(...e),r)))}}define(["./workbox-9603f429"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"components/restart-button.js",revision:"f3e817d2285e43469c93c50a2740f336"},{url:"gameObjects/balls.js",revision:"9ce4d81fb6c17c4f51b47ab86c9ddf7b"},{url:"images/background.png",revision:"74c2a6ee942c104cff5a9e1c41d6248a"},{url:"images/ball.png",revision:"05e907b037b5b81c1bfda4efee64e97c"},{url:"images/ball2.png",revision:"4ca07e59a773ad20a73ede19dce6e02d"},{url:"images/ball3.png",revision:"f0d5837f2be375eb26a503bff4524143"},{url:"images/ball4.png",revision:"bf83dfc32a3ce9aea97cff93b6e88f39"},{url:"images/ball5.png",revision:"3305d665949d3317c87a969ae7544864"},{url:"images/brickBlack.png",revision:"40ccdcbb44a3deb23500ae479417e325"},{url:"images/brickBlue.png",revision:"7c6d7456b8723d6f476ab66269e148ca"},{url:"images/brickGreen.png",revision:"36f56e8ad27cc9ede59a457eb0e59ea0"},{url:"images/brickOrange.png",revision:"32d1d2cc446f4dc5e36a0865cc79f349"},{url:"images/congratulations.png",revision:"bb0c5b5193ca0ff169298cf0c79a230e"},{url:"images/gameover.png",revision:"e321f21309bde775987afe33657bc01a"},{url:"images/icon-512.png",revision:"740b697e7068d6ee27bcee8fb1cc2899"},{url:"images/platform.png",revision:"4b454ab77ba9ff238fa482a974be6fec"},{url:"images/restart.png",revision:"ec8ed437224b653023de165e9c326f7d"},{url:"images/stop.png",revision:"3fba6a20216c2a2599496d67d4d3a49b"},{url:"images/stop2.png",revision:"d0d38cc6218bee27d1b17fe3a940d6b2"},{url:"index.html",revision:"1618a29693284bbf2e4362576a2f01cf"},{url:"index.js",revision:"74155d288b73a9dad31377948acf93a1"},{url:"index2.js",revision:"8211e52cab59b063e87ac473d0241729"},{url:"manifest.json",revision:"e8a3f088cb4d3a5d36d55cc09047e3f1"},{url:"scenes/congratulations.js",revision:"ab12b95d38c8c20b28490748e5d84b5b"},{url:"scenes/game.js",revision:"392cf26ef6aa1a9b999c990233b3219f"},{url:"scenes/gameover.js",revision:"3cd8cb7e56357147a44d915ca33c23a4"},{url:"scenes/index.js",revision:"74155d288b73a9dad31377948acf93a1"},{url:"tiktokConnection/app.js",revision:"832119c3ef1050101db8a4d60fc31329"},{url:"tiktokConnection/connection.js",revision:"6f1cf3c7a1fbc279350216e4b4d57815"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map