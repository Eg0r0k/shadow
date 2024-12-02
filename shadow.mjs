import { defineComponent, h, ref, computed, reactive, onBeforeMount, onMounted, watch, Teleport } from 'vue';

function withType() {
    return obj => obj;
}

const VIRTUAL_ROOT = document.createDocumentFragment();
function makeShadow(el, option) {
    return makeShadowRaw(el, el.childNodes, option);
}
function makeShadowRaw(rootEl, childNodes = [], { mode = 'open', delegatesFocus = false } = {}) {
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
    }
    catch (error) {
        console.error('[shadow] make shadow-root failed', rootEl, childNodes, error);
        return undefined;
    }
}
function putDomIntoShadow(shadowRoot, childNodes) {
    if (childNodes) {
        shadowRoot.append(...Array.from(childNodes));
    }
}
const ShadowStyle = defineComponent({
    props: {
        media: String,
        nonce: String,
    },
    setup(props, { slots }) {
        return () => h('style', { media: props.media, nonce: props.nonce }, slots.default?.());
    },
});
const ShadowRoot = withType()(defineComponent({
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
        const abstract = ref(false);
        const el = ref();
        const teleport_el = ref();
        const shadow_root = ref();
        const teleportTarget = computed(() => shadow_root.value ?? VIRTUAL_ROOT);
        const ex = reactive({
            shadow_root,
        });
        expose(ex);
        onBeforeMount(() => {
            abstract.value = props.abstract;
        });
        onMounted(() => {
            const parent = teleport_el.value?.parentElement;
            try {
                shadow_root.value = abstract.value
                    ? parent?.shadowRoot || makeShadowRaw(parent, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus })
                    : makeShadowRaw(el.value, undefined, { mode: props.mode, delegatesFocus: props.delegatesFocus });
            }
            catch (e) {
                emit('error', e);
            }
        });
        watch([shadow_root, () => props.adoptedStyleSheets], ([shadowRoot, adoptedStyleSheets]) => {
            if (!shadowRoot || !adoptedStyleSheets)
                return;
            try {
                if ('adoptedStyleSheets' in shadowRoot) {
                    ;
                    shadowRoot.adoptedStyleSheets = adoptedStyleSheets;
                }
            }
            catch (e) {
                console.error(e);
                emit('error', e);
            }
        });
        return () => {
            const childPart = (h(Teleport, { ref: teleport_el, to: teleportTarget.value }, slots.default?.()));
            return props.abstract ? childPart : h(props.tag, { ref: el }, childPart);
        };
    },
    install,
    Style: ShadowStyle,
}));
function install(app) {
    app.component('shadow-root', ShadowRoot);
    app.directive('shadow', {
        beforeMount(el) {
            console.warn('[VueShadowDom] Deprecated v-shadow directive, use <shadow-root> component');
            makeShadow(el);
        },
    });
}
var shadow = { ShadowRoot, ShadowStyle, shadow_root: ShadowRoot, shadow_style: ShadowStyle, install };

export { ShadowRoot, ShadowStyle, shadow as default, install, makeShadow, makeShadowRaw, ShadowRoot as shadow_root, ShadowStyle as shadow_style };
//# sourceMappingURL=shadow.mjs.map
