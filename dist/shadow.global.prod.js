!(function (e, o) {
    'object' == typeof exports && 'undefined' != typeof module
        ? o(exports, require('vue'))
        : 'function' == typeof define && define.amd
          ? define(['exports', 'vue'], o)
          : o(((e = 'undefined' != typeof globalThis ? globalThis : e || self).shadow = {}), e.Vue)
})(this, function (e, o) {
    'use strict'
    const t = document.createDocumentFragment()
    function a(e, o) {
        return d(e, e.childNodes, o)
    }
    function d(e, o = [], { mode: t = 'open', delegatesFocus: a = !1 } = {}) {
        if (e.shadowRoot) console.error('[shadow] Attach shadow multiple times', e, o)
        else if ('open' === t || 'closed' === t)
            try {
                const d = e.attachShadow({ mode: t, delegatesFocus: a })
                return (
                    (function (e, o) {
                        o && e.append(...Array.from(o))
                    })(d, o),
                    d
                )
            } catch (t) {
                return void console.error('[shadow] make shadow-root failed', e, o, t)
            }
        else console.error(`[shadow] Invalid mode: ${t}. It should be 'open' or 'closed'.`)
    }
    const s = o.defineComponent({
            props: { media: String, nonce: String },
            setup:
                (e, { slots: t }) =>
                () =>
                    o.h('style', { media: e.media, nonce: e.nonce }, t.default?.()),
        }),
        n = o.defineComponent({
            props: {
                mode: { type: String, default: 'open' },
                delegatesFocus: { type: Boolean, default: !1 },
                abstract: { type: Boolean, default: !1 },
                tag: { type: String, default: 'div' },
                adoptedStyleSheets: { type: Array },
            },
            emits: ['error'],
            setup(e, { slots: a, expose: s, emit: n }) {
                const r = o.ref(!1),
                    l = o.ref(),
                    c = o.ref(),
                    u = o.ref(),
                    i = o.computed(() => u.value ?? t)
                return (
                    s(o.reactive({ shadow_root: u })),
                    o.onBeforeMount(() => {
                        r.value = e.abstract
                    }),
                    o.onMounted(() => {
                        const o = c.value?.parentElement
                        try {
                            u.value = r.value
                                ? o?.shadowRoot || d(o, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                                : d(l.value, void 0, { mode: e.mode, delegatesFocus: e.delegatesFocus })
                        } catch (e) {
                            n('error', e)
                        }
                    }),
                    o.watch([u, () => e.adoptedStyleSheets], ([e, o]) => {
                        if (e && o)
                            try {
                                'adoptedStyleSheets' in e && (e.adoptedStyleSheets = o)
                            } catch (e) {
                                console.error(e), n('error', e)
                            }
                    }),
                    () => {
                        const t = o.h(o.Teleport, { ref: c, to: i.value }, [a.default?.()])
                        return r.value ? t : o.h(e.tag, { ref: l }, t)
                    }
                )
            },
            install: l,
            Style: s,
        }),
        r = {
            beforeMount(e) {
                console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component'), a(e, { mode: 'closed', delegatesFocus: !0 })
            },
        }
    function l(e) {
        e.component('shadow-root', n), e.directive('shadow', r)
    }
    var c = { ShadowRoot: n, ShadowStyle: s, shadow_root: n, shadow_style: s, install: l }
    ;(e.ShadowRoot = n),
        (e.ShadowStyle = s),
        (e.default = c),
        (e.install = l),
        (e.makeShadow = a),
        (e.makeShadowRaw = d),
        (e.shadow_root = n),
        (e.shadow_style = s),
        Object.defineProperty(e, '__esModule', { value: !0 })
})
//# sourceMappingURL=shadow.global.prod.js.map
