import {
    defineComponent as e,
    h as o,
    ref as t,
    computed as a,
    reactive as s,
    onBeforeMount as d,
    onMounted as r,
    watch as l,
    Teleport as n,
} from 'globalThis.Vue'
const c = document.createDocumentFragment()
function u(e, o) {
    return i(e, e.childNodes, o)
}
function i(e, o = [], { mode: t = 'open', delegatesFocus: a = !1 } = {}) {
    if (e.shadowRoot) console.error('[shadow] Attach shadow multiple times', e, o)
    else if ('open' === t || 'closed' === t)
        try {
            const s = e.attachShadow({ mode: t, delegatesFocus: a })
            return (
                (function (e, o) {
                    o && e.append(...Array.from(o))
                })(s, o),
                s
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
                y = t(),
                S = a(() => y.value ?? c)
            return (
                h(s({ shadow_root: y })),
                d(() => {
                    m.value = e.abstract
                }),
                r(() => {
                    const o = f.value?.parentElement
                    try {
                        y.value = m.value
                            ? o?.shadowRoot || i(o, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                            : i(w.value, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                    } catch (e) {
                        p('error', e)
                    }
                }),
                l([y, () => e.adoptedStyleSheets], ([e, o]) => {
                    if (e && o)
                        try {
                            'adoptedStyleSheets' in e && (e.adoptedStyleSheets = o)
                        } catch (e) {
                            console.error(e), p('error', e)
                        }
                }),
                () => {
                    const t = o(n, { ref: f, to: S.value }, [u.default?.()])
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
//# sourceMappingURL=shadow.esm-browser.prod.mjs.map
