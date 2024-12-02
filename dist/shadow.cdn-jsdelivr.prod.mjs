import {
    defineComponent as e,
    h as o,
    ref as t,
    computed as a,
    reactive as s,
    onBeforeMount as r,
    onMounted as n,
    Teleport as d,
} from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.runtime.esm-browser.prod.js'
function l(e, o) {
    return u(e, e.childNodes, o)
}
function u(e, o, { mode: t = 'open', delegatesFocus: a = !1 } = { mode: 'open' }) {
    try {
        const s = e.shadowRoot
        if (null != s) return void console.error('[shadow] Attach shadow multiple times', e, o, s)
        {
            const s = e.attachShadow({ mode: t, delegatesFocus: a })
            return (
                o &&
                    (function (e, o) {
                        const t = document.createDocumentFragment()
                        for (const e of o) t.appendChild(e)
                        e.appendChild(t)
                    })(s, o),
                s
            )
        }
    } catch (t) {
        console.error('[shadow] make shadow-root failed', e, o), console.error(t)
    }
}
const c = document.createDocumentFragment(),
    i = e({
        props: { media: String, nonce: String },
        setup:
            (e, { slots: t }) =>
            () =>
                o('style', { media: e.media, nonce: e.nonce }, t.default?.()),
    }),
    m = e({
        props: {
            mode: { type: String, default: 'open' },
            delegatesFocus: { type: Boolean, default: !1 },
            abstract: { type: Boolean, default: !1 },
            tag: { type: String, default: 'div' },
        },
        emits: ['error'],
        setup(e, { slots: l, expose: i, emit: m }) {
            const p = t(!1),
                h = t(),
                v = t(),
                w = t(),
                f = a(() => w.value ?? c)
            return (
                i(s({ shadow_root: w })),
                r(() => {
                    p.value = e.abstract
                }),
                n(() => {
                    try {
                        p.value
                            ? v.value.parentElement.shadowRoot
                                ? (w.value = v.value.parentElement.shadowRoot)
                                : (w.value = u(v.value.parentElement, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus }))
                            : (w.value = u(h.value, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })),
                            w.value?.styleSheets
                    } catch (e) {
                        console.error(e), m('error', e)
                    }
                }),
                () => {
                    const t = o(d, { ref: v, to: f.value }, [l.default?.()])
                    return p.value ? t : o(e.tag, { ref: h }, t)
                }
            )
        },
        install: p,
        Style: i,
    })
function p(e) {
    e.component('shadow-root', m),
        e.directive('shadow', {
            beforeMount(e) {
                console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component'), l(e)
            },
        })
}
var h = { ShadowRoot: m, ShadowStyle: i, shadow_root: m, shadow_style: i, install: p }
export { m as ShadowRoot, i as ShadowStyle, h as default, p as install, l as makeShadow, u as makeShadowRaw, m as shadow_root, i as shadow_style }
//# sourceMappingURL=shadow.cdn-jsdelivr.prod.mjs.map
