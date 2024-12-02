'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

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
const ShadowStyle = vue.defineComponent({
    props: {
        media: String,
        nonce: String,
    },
    setup(props, { slots }) {
        return () => vue.h('style', { media: props.media, nonce: props.nonce }, slots.default?.());
    },
});
const ShadowRoot = withType()(vue.defineComponent({
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
        const abstract = vue.ref(false);
        const el = vue.ref();
        const teleport_el = vue.ref();
        const shadow_root = vue.ref();
        const teleportTarget = vue.computed(() => shadow_root.value ?? VIRTUAL_ROOT);
        const ex = vue.reactive({
            shadow_root,
        });
        expose(ex);
        vue.onBeforeMount(() => {
            abstract.value = props.abstract;
        });
        vue.onMounted(() => {
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
        vue.watch([shadow_root, () => props.adoptedStyleSheets], ([shadowRoot, adoptedStyleSheets]) => {
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
            const childPart = (vue.h(vue.Teleport, { ref: teleport_el, to: teleportTarget.value }, slots.default?.()));
            return props.abstract ? childPart : vue.h(props.tag, { ref: el }, childPart);
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

exports.ShadowRoot = ShadowRoot;
exports.ShadowStyle = ShadowStyle;
exports["default"] = shadow;
exports.install = install;
exports.makeShadow = makeShadow;
exports.makeShadowRaw = makeShadowRaw;
exports.shadow_root = ShadowRoot;
exports.shadow_style = ShadowStyle;
//# sourceMappingURL=shadow.cjs.cjs.map
