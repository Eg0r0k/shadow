!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).shadow={},e.Vue)}(this,(function(e,o){"use strict";function t(e){return n(e,e.childNodes)}function n(e,o){try{const t=e.shadowRoot;if(null!=t)return void console.error("[shadow] Attach shadow multiple times",e,o,t);{const t=e.attachShadow({mode:"open"});return o&&function(e,o){const t=document.createDocumentFragment();for(const e of o)t.appendChild(e);e.appendChild(t)}(t,o),t}}catch(t){console.error("[shadow] make shadow-root failed",e,o),console.error(t)}}const a=document.createDocumentFragment(),r=o.defineComponent({props:{media:String,nonce:String},setup:(e,{slots:t})=>()=>o.h("style",{media:e.media,nonce:e.nonce},t.default?.())}),d=o.defineComponent({props:{abstract:{type:Boolean,default:!1},tag:{type:String,default:"div"}},setup(e,{slots:t,expose:r}){const d=o.ref(!1),l=o.ref(),s=o.ref(),u=o.ref(),i=o.computed((()=>u.value??a));return r(o.reactive({shadow_root:u})),o.onBeforeMount((()=>{d.value=e.abstract})),o.onMounted((()=>{d.value?s.value.parentElement.shadowRoot?u.value=s.value.parentElement.shadowRoot:u.value=n(s.value.parentElement):u.value=n(l.value)})),()=>{const n=o.h(o.Teleport,{ref:s,to:i.value},[t.default?.()]);return d.value?n:o.h(e.tag,{ref:l},n)}},install:l,Style:r});function l(e){e.component("shadow-root",d),e.directive("shadow",{beforeMount(e){t(e)}})}var s={ShadowRoot:d,ShadowStyle:r,shadow_root:d,shadow_style:r,install:l};e.ShadowRoot=d,e.ShadowStyle=r,e.default=s,e.install=l,e.makeShadow=t,e.makeShadowRaw=n,e.shadow_root=d,e.shadow_style=r,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=shadow.global.prod.js.map