'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var e = require('vue')
const o = document.createDocumentFragment()
function t(e, o) {
    return a(e, e.childNodes, o)
}
function a(e, o = [], { mode: t = 'open', delegatesFocus: a = !1 } = {}) {
    if (e.shadowRoot) console.error('[shadow] Attach shadow multiple times', e, o)
    else if ('open' === t || 'closed' === t)
        try {
            const r = e.attachShadow({ mode: t, delegatesFocus: a })
            return (
                (function (e, o) {
                    o && e.append(...Array.from(o))
                })(r, o),
                r
            )
        } catch (t) {
            return void console.error('[shadow] make shadow-root failed', e, o, t)
        }
    else console.error(`[shadow] Invalid mode: ${t}. It should be 'open' or 'closed'.`)
}
const r = e.defineComponent({
        props: { media: String, nonce: String },
        setup:
            (o, { slots: t }) =>
            () =>
                e.h('style', { media: o.media, nonce: o.nonce }, t.default?.()),
    }),
    s = e.defineComponent({
        props: {
            mode: { type: String, default: 'open' },
            delegatesFocus: { type: Boolean, default: !1 },
            abstract: { type: Boolean, default: !1 },
            tag: { type: String, default: 'div' },
            adoptedStyleSheets: { type: Array },
        },
        emits: ['error'],
        setup(t, { slots: r, expose: s, emit: d }) {
            const n = e.ref(!1),
                l = e.ref(),
                c = e.ref(),
                u = e.ref(),
                p = e.computed(() => u.value ?? o)
            return (
                s(e.reactive({ shadow_root: u })),
                e.onBeforeMount(() => {
                    n.value = t.abstract
                }),
                e.onMounted(() => {
                    const e = c.value?.parentElement
                    try {
                        u.value = n.value
                            ? e?.shadowRoot || a(e, void 0, { mode: t.mode, delegatesFocus: t.delegatesFocus })
                            : a(l.value, void 0, { mode: t.mode, delegatesFocus: t.delegatesFocus })
                    } catch (e) {
                        d('error', e)
                    }
                }),
                e.watch([u, () => t.adoptedStyleSheets], ([e, o]) => {
                    if (e && o)
                        try {
                            'adoptedStyleSheets' in e && (e.adoptedStyleSheets = o)
                        } catch (e) {
                            console.error(e), d('error', e)
                        }
                }),
                () => {
                    const o = e.h(e.Teleport, { ref: c, to: p.value }, [r.default?.()])
                    return n.value ? o : e.h(t.tag, { ref: l }, o)
                }
            )
        },
        install: n,
        Style: r,
    }),
    d = {
        beforeMount(e) {
            console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component'), t(e, { mode: 'closed', delegatesFocus: !0 })
        },
    }
function n(e) {
    e.component('shadow-root', s), e.directive('shadow', d)
}
var l = { ShadowRoot: s, ShadowStyle: r, shadow_root: s, shadow_style: r, install: n }
;(exports.ShadowRoot = s),
    (exports.ShadowStyle = r),
    (exports.default = l),
    (exports.install = n),
    (exports.makeShadow = t),
    (exports.makeShadowRaw = a),
    (exports.shadow_root = s),
    (exports.shadow_style = r)
//# sourceMappingURL=shadow.cjs.prod.cjs.map
