if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>s(e,o),c={module:{uri:o},exports:t,require:d};i[o]=Promise.all(n.map((e=>c[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-84da2334.js",revision:null},{url:"assets/index-9301fc26.css",revision:null},{url:"index.html",revision:"c16715c5fe2cd9360b76a7630fab3995"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.svg",revision:"7b80da8b1640462d9e12df7f94e9acdf"},{url:"logo192x192.png",revision:"b481a1e24d393adbee4b62a346a73f8a"},{url:"logo512x512.png",revision:"09955f6acef6f521ce6536b99a4eecda"},{url:"manifest.webmanifest",revision:"2c09c38576d517854796c2fd269e084d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
