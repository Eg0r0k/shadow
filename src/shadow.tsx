import { defineComponent, h, ref, Teleport, onBeforeMount, onMounted, computed, reactive, PropType, watch } from 'vue'
import type { App, VNode } from 'vue'
import { withType } from './utils';


const VIRTUAL_ROOT = document.createDocumentFragment()

type GShadowRoot = typeof global.ShadowRoot.prototype
type ShadowMode = 'open' | 'closed';
export interface ShadowOption {
    mode?: ShadowMode;
    delegatesFocus?: boolean
}
export interface ShadowRootExpose {
    shadowRoot: GShadowRoot | undefined;
}
export function makeShadow(el: Element, option?: ShadowOption) {
    return makeShadowRaw(el, el.childNodes, option);
}

export function makeShadowRaw(
    rootEl: Element,
    childNodes: Iterable<Node> = [],
    { mode = 'open', delegatesFocus = false }: ShadowOption = {}
): ShadowRoot | undefined {
    if (rootEl.shadowRoot) {
        console.error('[shadow] Attach shadow multiple times', rootEl, childNodes);
        return undefined;
    }
    if (mode !== 'open' && mode !== 'closed') {
        console.error(`[shadow] Invalid mode: ${mode}. It should be 'open' or 'closed'.`);
        return undefined;
    }
    try {
        const shadowRoot = rootEl.attachShadow({ mode, delegatesFocus });
        putDomIntoShadow(shadowRoot, childNodes);
        return shadowRoot;
    } catch (error) {
        console.error('[shadow] make shadow-root failed', rootEl, childNodes, error);
        return undefined; 
    }
}
//? What should this be used for?
// function removeShadow(rootEl: Element): Element {
//     const newroot = rootEl.cloneNode() as Element
//     while (rootEl.hasChildNodes()) {
//         newroot.appendChild(rootEl.firstChild!)
//     }
//     rootEl.parentElement!.replaceChild(newroot, rootEl)
//     console.log('removeShadow', newroot)
//     return newroot
// }

function putDomIntoShadow(shadowRoot: GShadowRoot, childNodes: Iterable<Node>) {
    if (childNodes) {
        shadowRoot.append(...Array.from(childNodes));
    }
}

export const ShadowStyle = defineComponent({
    props: {
        media: String,
        nonce: String,
    },
    setup(props, { slots }) {
        return () => h('style', { media: props.media, nonce: props.nonce }, slots.default?.());
    },
});

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
            const teleportEl = ref<HTMLElement>()
            const shadowRoot = ref<GShadowRoot>()

            const teleportTarget = computed(() => shadowRoot.value ?? VIRTUAL_ROOT)

            const exposeData: ShadowRootExpose = reactive({
                shadowRoot,
            });
            expose(exposeData)

            onBeforeMount(() => {
                abstract.value = props.abstract
            })

            onMounted(() => {
                const parent = teleportEl.value?.parentElement;

                try {
                    shadowRoot.value = abstract.value
                        ? parent?.shadowRoot || makeShadowRaw(parent!, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                        : makeShadowRaw(el.value!, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus });
                } catch (e) {
                    emit('error', e);
                }
            })

            watch([shadowRoot, () => props.adoptedStyleSheets], ([shadowRoot, adoptedStyleSheets]) => {
                if (!shadowRoot || !adoptedStyleSheets) return
                try {
                    if ('adoptedStyleSheets' in shadowRoot) {
                        (shadowRoot as any).adoptedStyleSheets = adoptedStyleSheets; 
                    }
                } catch (e) {
                    console.error(e)
                    emit('error', e)
                }
            })

          
            return (): VNode => {
                const childPart = (
                    <Teleport ref={teleportEl} to={teleportTarget.value}>
                        {slots.default?.()}
                    </Teleport>
                );

                return props.abstract ? childPart : <props.tag ref={el}>{childPart}</props.tag>;
            };
        },
        install,
        Style: ShadowStyle,
    })
)

export function install(app: App) {
    app.component('shadow-root', ShadowRoot);

    app.directive('shadow', {
        beforeMount(el: HTMLElement) {
            console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component');
            makeShadow(el);
        },
    });
}

export { ShadowRoot as shadowRoot, ShadowStyle as shadowStyle };
export default { ShadowRoot, ShadowStyle, shadowRoot: ShadowRoot, shadowStyle: ShadowStyle, install };
