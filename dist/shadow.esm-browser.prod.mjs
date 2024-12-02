const { defineComponent: e, h: o, ref: t, Teleport: a, onBeforeMount: n, onMounted: s, computed: r, reactive: d } = globalThis.Vue
function l(e, o) {
    return u(e, e.childNodes, o)
}
function u(e, o, { mode: t = 'open', delegatesFocus: a = !1 } = { mode: 'open' }) {
    try {
        const n = e.shadowRoot
        if (null != n) return void console.error('[shadow] Attach shadow multiple times', e, o, n)
        {
            const n = e.attachShadow({ mode: t, delegatesFocus: a })
            return (
                o &&
                    (function (e, o) {
                        const t = document.createDocumentFragment()
                        for (const e of o) t.appendChild(e)
                        e.appendChild(t)
                    })(n, o),
                n
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
    h = e({
        props: {
            mode: { type: String, default: 'open' },
            delegatesFocus: { type: Boolean, default: !1 },
            abstract: { type: Boolean, default: !1 },
            tag: { type: String, default: 'div' },
        },
        emits: ['error'],
        setup(e, { slots: l, expose: i, emit: h }) {
            const m = t(!1),
                p = t(),
                v = t(),
                f = t(),
                w = r(() => f.value ?? c)
            return (
                i(d({ shadow_root: f })),
                n(() => {
                    m.value = e.abstract
                }),
                s(() => {
                    try {
                        m.value
                            ? v.value.parentElement.shadowRoot
                                ? (f.value = v.value.parentElement.shadowRoot)
                                : (f.value = u(v.value.parentElement, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus }))
                            : (f.value = u(p.value, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })),
                            f.value?.styleSheets
                    } catch (e) {
                        console.error(e), h('error', e)
                    }
                }),
                () => {
                    const t = o(a, { ref: v, to: w.value }, [l.default?.()])
                    return m.value ? t : o(e.tag, { ref: p }, t)
                }
            )
        },
        install: m,
        Style: i,
    })
function m(e) {
    e.component('shadow-root', h),
        e.directive('shadow', {
            beforeMount(e) {
                console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component'), l(e)
            },
        })
}
var p = { ShadowRoot: h, ShadowStyle: i, shadow_root: h, shadow_style: i, install: m }
export { h as ShadowRoot, i as ShadowStyle, p as default, m as install, l as makeShadow, u as makeShadowRaw, h as shadow_root, i as shadow_style }
//# sourceMappingURL=shadow.esm-browser.prod.mjs.map
