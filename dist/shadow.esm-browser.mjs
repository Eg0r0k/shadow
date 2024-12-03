import { defineComponent, h, ref, computed, reactive, onBeforeMount, onMounted, watch, Teleport } from 'globalThis.Vue'

function withType() {
    return function (obj) {
        return obj
    }
}

const VIRTUAL_ROOT = document.createDocumentFragment()
function makeShadow(el, option) {
    return makeShadowRaw(el, el.childNodes, option)
}
function makeShadowRaw(rootEl, childNodes = [], { mode = 'open', delegatesFocus = false } = {}) {
    if (rootEl.shadowRoot) {
        console.error('[shadow] Attach shadow multiple times', rootEl, childNodes)
        return undefined
    }
    if (mode !== 'open' && mode !== 'closed') {
        console.error(`[shadow] Invalid mode: ${mode}. It should be 'open' or 'closed'.`)
        return undefined
    }
    try {
        const shadowRoot = rootEl.attachShadow({ mode, delegatesFocus })
        putDomIntoShadow(shadowRoot, childNodes)
        return shadowRoot
    } catch (error) {
        console.error('[shadow] make shadow-root failed', rootEl, childNodes, error)
        return undefined
    }
}
function putDomIntoShadow(shadowRoot, childNodes) {
    if (childNodes) {
        shadowRoot.append(...Array.from(childNodes))
    }
}
const ShadowStyle = defineComponent({
    props: {
        media: String,
        nonce: String,
    },
    setup(props, { slots }) {
        return () => h('style', { media: props.media, nonce: props.nonce }, slots.default?.())
    },
})
const ShadowRoot = withType()(
    defineComponent({
        props: {
            mode: {
                type: String,
                default: 'open',
            },
            delegatesFocus: {
                type: Boolean,
                default: false,
            },
            abstract: {
                type: Boolean,
                default: false,
            },
            tag: {
                type: String,
                default: 'div',
            },
            adoptedStyleSheets: {
                type: Array,
            },
        },
        emits: ['error'],
        setup(props, { slots, expose, emit }) {
            const abstract = ref(false)
            const el = ref()
            const teleport_el = ref()
            const shadow_root = ref()
            const teleport_target = computed(() => shadow_root.value ?? VIRTUAL_ROOT)
            const expose_data = reactive({
                shadow_root,
            })
            expose(expose_data)
            onBeforeMount(() => {
                abstract.value = props.abstract
            })
            onMounted(() => {
                const parent = teleport_el.value?.parentElement
                try {
                    shadow_root.value = abstract.value
                        ? parent?.shadowRoot || makeShadowRaw(parent, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                        : makeShadowRaw(el.value, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                } catch (e) {
                    emit('error', e)
                }
            })
            watch([shadow_root, () => props.adoptedStyleSheets], ([shadowRoot, adoptedStyleSheets]) => {
                if (!shadowRoot || !adoptedStyleSheets) return
                try {
                    if ('adoptedStyleSheets' in shadowRoot) {
                        shadowRoot.adoptedStyleSheets = adoptedStyleSheets
                    }
                } catch (e) {
                    console.error(e)
                    emit('error', e)
                }
            })
            return () => {
                const child_part = h(Teleport, { ref: teleport_el, to: teleport_target.value }, [slots.default?.()])
                if (abstract.value) return child_part
                return h(props.tag, { ref: el }, child_part)
            }
        },
        install,
        Style: ShadowStyle,
    })
)
const shadowDirective = {
    beforeMount(el) {
        console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component')
        makeShadow(el, { mode: 'closed', delegatesFocus: true })
    },
}
function install(app) {
    app.component('shadow-root', ShadowRoot)
    app.directive('shadow', shadowDirective)
}
var shadow = { ShadowRoot, ShadowStyle, shadow_root: ShadowRoot, shadow_style: ShadowStyle, install }

export { ShadowRoot, ShadowStyle, shadow as default, install, makeShadow, makeShadowRaw, ShadowRoot as shadow_root, ShadowStyle as shadow_style }
//# sourceMappingURL=shadow.esm-browser.mjs.map
