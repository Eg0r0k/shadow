import {
    defineComponent as e,
    h as o,
    ref as t,
    computed as s,
    reactive as a,
    onBeforeMount as d,
    onMounted as r,
    watch as n,
    Teleport as l,
} from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.runtime.esm-browser.prod.js'
const c = document.createDocumentFragment()
function u(e, o) {
    return i(e, e.childNodes, o)
}
function i(e, o = [], { mode: t = 'open', delegatesFocus: s = !1 } = {}) {
    if (e.shadowRoot) console.error('[shadow] Attach shadow multiple times', e, o)
    else if ('open' === t || 'closed' === t)
        try {
            const a = e.attachShadow({ mode: t, delegatesFocus: s })
            return (
                (function (e, o) {
                    o && e.append(...Array.from(o))
                })(a, o),
                a
            )
        } catch (t) {
            return void console.error('[shadow] make shadow-root failed', e, o, t)
        }
    else console.error(`[shadow] Invalid mode: ${t}. It should be 'open' or 'closed'.`)
}
const h = e({
        props: { media: String, nonce: String },
        setup:
            (e, { slots: t }) =>
            () =>
                o('style', { media: e.media, nonce: e.nonce }, t.default?.()),
    }),
    p = e({
        props: {
            mode: { type: String, default: 'open' },
            delegatesFocus: { type: Boolean, default: !1 },
            abstract: { type: Boolean, default: !1 },
            tag: { type: String, default: 'div' },
            adoptedStyleSheets: { type: Array },
        },
        emits: ['error'],
        setup(e, { slots: u, expose: h, emit: p }) {
            const m = t(!1),
                w = t(),
                f = t(),
                v = t(),
                y = s(() => v.value ?? c)
            return (
                h(a({ shadow_root: v })),
                d(() => {
                    m.value = e.abstract
                }),
                r(() => {
                    const o = f.value?.parentElement
                    try {
                        v.value = m.value
                            ? o?.shadowRoot || i(o, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                            : i(w.value, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                    } catch (e) {
                        p('error', e)
                    }
                }),
                n([v, () => e.adoptedStyleSheets], ([e, o]) => {
                    if (e && o)
                        try {
                            'adoptedStyleSheets' in e && (e.adoptedStyleSheets = o)
                        } catch (e) {
                            console.error(e), p('error', e)
                        }
                }),
                () => {
                    const t = o(l, { ref: f, to: y.value }, [u.default?.()])
                    return m.value ? t : o(e.tag, { ref: w }, t)
                }
            )
        },
        install: w,
        Style: h,
    }),
    m = {
        beforeMount(e) {
            console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component'), u(e, { mode: 'closed', delegatesFocus: !0 })
        },
    }
function w(e) {
    e.component('shadow-root', p), e.directive('shadow', m)
}
var f = { ShadowRoot: p, ShadowStyle: h, shadow_root: p, shadow_style: h, install: w }
export { p as ShadowRoot, h as ShadowStyle, f as default, w as install, u as makeShadow, i as makeShadowRaw, p as shadow_root, h as shadow_style }
//# sourceMappingURL=shadow.cdn-jsdelivr.prod.mjs.map
