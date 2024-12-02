import { defineComponent, h, ref, Teleport, onBeforeMount, onMounted, computed, reactive, PropType, watch } from 'vue'
import type { App, VNode } from 'vue'

import { withType } from './utils'

const VIRTUAL_ROOT = document.createDocumentFragment()

type GShadowRoot = typeof global.ShadowRoot.prototype
type ShadowMode = 'open' | 'closed'
export interface ShadowOption {
    mode?: ShadowMode
    delegatesFocus?: boolean
}
export interface ShadowRootExpose {
    shadow_root: GShadowRoot | undefined
}
export function makeShadow(el: Element, option?: ShadowOption) {
    return makeShadowRaw(el, el.childNodes, option)
}

export function makeShadowRaw(
    rootEl: Element,
    childNodes: Iterable<Node> = [],
    { mode = 'open', delegatesFocus = false }: ShadowOption = {}
): ShadowRoot | undefined {
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

function putDomIntoShadow(shadowRoot: GShadowRoot, childNodes: Iterable<Node>) {
    if (childNodes) {
        shadowRoot.append(...Array.from(childNodes))
    }
}

export const ShadowStyle = defineComponent({
    props: {
        media: String,
        nonce: String,
    },
    setup(props, { slots }) {
        return () => h('style', { media: props.media, nonce: props.nonce }, slots.default?.())
    },
})

export const ShadowRoot = withType<{
    install: typeof install
    Style: typeof ShadowStyle
}>()(
    defineComponent({
        props: {
            mode: {
                type: String as PropType<ShadowMode>,
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
                type: Array as PropType<CSSStyleSheet[]>,
            },
        },
        emits: ['error'],
        setup(props, { slots, expose, emit }) {
            const abstract = ref(false)

            const el = ref<HTMLElement>()
            const teleport_el = ref<HTMLElement>()
            const shadow_root = ref<GShadowRoot>()

            const teleportTarget = computed(() => shadow_root.value ?? VIRTUAL_ROOT)
            const ex: ShadowRootExpose = reactive({
                shadow_root,
            })
            expose(ex)

            onBeforeMount(() => {
                abstract.value = props.abstract
            })

            onMounted(() => {
                const parent = teleport_el.value?.parentElement

                try {
                    shadow_root.value = abstract.value
                        ? parent?.shadowRoot || makeShadowRaw(parent!, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                        : makeShadowRaw(el.value!, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                } catch (e) {
                    emit('error', e)
                }
            })

            watch([shadow_root, () => props.adoptedStyleSheets], ([shadowRoot, adoptedStyleSheets]) => {
                if (!shadowRoot || !adoptedStyleSheets) return
                try {
                    if ('adoptedStyleSheets' in shadowRoot) {
                        ;(shadowRoot as any).adoptedStyleSheets = adoptedStyleSheets
                    }
                } catch (e) {
                    console.error(e)
                    emit('error', e)
                }
            })

            return (): VNode => {
                const childPart = (
                    <Teleport ref={teleport_el} to={teleportTarget.value}>
                        {slots.default?.()}
                    </Teleport>
                )

                return props.abstract ? childPart : <props.tag ref={el}>{childPart}</props.tag>
            }
        },
        install,
        Style: ShadowStyle,
    })
)

export function install(app: App) {
    app.component('shadow-root', ShadowRoot)

    app.directive('shadow', {
        beforeMount(el: HTMLElement) {
            console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component')
            makeShadow(el)
        },
    })
}

export { ShadowRoot as shadow_root, ShadowStyle as shadow_style }
export default { ShadowRoot, ShadowStyle, shadow_root: ShadowRoot, shadow_style: ShadowStyle, install }
