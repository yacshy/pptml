(function(e){function t(t){for(var r,a,c=t[0],s=t[1],i=t[2],f=0,l=[];f<c.length;f++)a=c[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(l.length)l.shift()();return u.push.apply(u,i||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-46428692":"4bec8c17","chunk-1fcf06f6":"32aa7599","chunk-419c40f1":"458c2982"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-1fcf06f6":1,"chunk-419c40f1":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-46428692":"31d6cfe0","chunk-1fcf06f6":"24f38427","chunk-419c40f1":"84ef4178"}[e]+".css",o=s.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var i=u[c],f=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(f===r||f===o))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){i=l[c],f=i.getAttribute("data-href");if(f===r||f===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],p.parentNode.removeChild(p),n(u)},p.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var i,f=document.createElement("script");f.charset="utf-8",f.timeout=120,s.nc&&f.setAttribute("nonce",s.nc),f.src=c(e);var l=new Error;i=function(t){f.onerror=f.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var p=setTimeout((function(){i({type:"timeout",target:f})}),12e4);f.onerror=f.onload=i,document.head.appendChild(f)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="pptml/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],f=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var p=f;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0613":function(e,t,n){"use strict";var r=n("2b0e"),a=n("2f62");r["a"].use(a["a"]),t["a"]=new a["a"].Store({})},"3ce9":function(e,t,n){"use strict";n("5713")},5713:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),a=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"fill",attrs:{id:"app"}},[t("router-view")],1)},o=[],u=n("9ab4"),c=(n("77ed"),n("1b40"));let s=class extends c["e"]{};s=Object(u["a"])([c["a"]],s);var i=s,f=i,l=(n("3ce9"),n("2877")),p=Object(l["a"])(f,a,o,!1,null,null,null),d=p.exports,h=n("8c4f");r["a"].use(h["a"]);const m=[{path:"/",name:"Home",component:()=>Promise.all([n.e("chunk-46428692"),n.e("chunk-419c40f1")]).then(n.bind(null,"e53f"))},{path:"/display",name:"Display",component:()=>Promise.all([n.e("chunk-46428692"),n.e("chunk-1fcf06f6")]).then(n.bind(null,"7251"))}],b=new h["a"]({routes:m});var v=b,g=n("0613"),y=n("0c63"),k=n("ccb9"),w=n("55f1"),O=n("b558"),j=n("5efb"),P=n("681b"),_=n("a600"),x=n("09d9"),S=n("59a5"),E=n("a79d"),C=n("9839"),T=n("39ab"),A=n("cdeb"),L=n("160c"),N=n("fbdf");n("202f");r["a"].use(y["a"]),r["a"].use(k["a"]),r["a"].use(w["a"]),r["a"].use(O["a"]),r["a"].use(j["a"]),r["a"].use(P["a"]),r["a"].use(_["a"]),r["a"].use(x["a"]),r["a"].use(S["a"]),r["a"].use(E["a"]),r["a"].use(C["a"]),r["a"].use(T["a"]),r["a"].use(A["a"]),r["a"].use(L["a"]),r["a"].use(N["a"]),r["a"].prototype.$bus=new r["a"],r["a"].config.productionTip=!1,new r["a"]({router:v,store:g["a"],render:e=>e(d)}).$mount("#app")}});
//# sourceMappingURL=app.3bc8edbd.js.map