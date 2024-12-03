import { PropType } from 'vue'
import type { App, VNode } from 'vue'
type ShadowRootComponent = {
    install: typeof install
    Style: typeof ShadowStyle
}
type GShadowRoot = typeof global.ShadowRoot.prototype
type ShadowMode = 'open' | 'closed'
export interface ShadowOption {
    mode?: ShadowMode
    delegatesFocus?: boolean
}
export interface ShadowRootExpose {
    shadow_root: GShadowRoot | undefined
}
export declare function makeShadow(el: Element, option?: ShadowOption): ShadowRoot | undefined
export declare function makeShadowRaw(rootEl: Element, childNodes?: Iterable<Node>, { mode, delegatesFocus }?: ShadowOption): ShadowRoot | undefined
export declare const ShadowStyle: import('vue').DefineComponent<
    import('vue').ExtractPropTypes<{
        media: StringConstructor
        nonce: StringConstructor
    }>,
    () => VNode<
        import('vue').RendererNode,
        import('vue').RendererElement,
        {
            [key: string]: any
        }
    >,
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    import('vue').PublicProps,
    Readonly<
        import('vue').ExtractPropTypes<{
            media: StringConstructor
            nonce: StringConstructor
        }>
    > &
        Readonly<{}>,
    {},
    {},
    {},
    {},
    string,
    import('vue').ComponentProvideOptions,
    true,
    {},
    any
>
export declare const ShadowRoot: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
        Readonly<
            import('vue').ExtractPropTypes<{
                mode: {
                    type: PropType<ShadowMode>
                    default: string
                }
                delegatesFocus: {
                    type: BooleanConstructor
                    default: boolean
                }
                abstract: {
                    type: BooleanConstructor
                    default: boolean
                }
                tag: {
                    type: StringConstructor
                    default: string
                }
                adoptedStyleSheets: {
                    type: PropType<CSSStyleSheet[]>
                }
            }>
        > &
            Readonly<{
                onError?: ((...args: any[]) => any) | undefined
            }>,
        () => VNode,
        {},
        {},
        {},
        import('vue').ComponentOptionsMixin,
        import('vue').ComponentOptionsMixin,
        'error'[],
        import('vue').PublicProps,
        {
            mode: ShadowMode
            delegatesFocus: boolean
            abstract: boolean
            tag: string
        },
        true,
        {},
        {},
        import('vue').GlobalComponents,
        import('vue').GlobalDirectives,
        string,
        {},
        any,
        import('vue').ComponentProvideOptions,
        {
            P: {}
            B: {}
            D: {}
            C: {}
            M: {}
            Defaults: {}
        },
        Readonly<
            import('vue').ExtractPropTypes<{
                mode: {
                    type: PropType<ShadowMode>
                    default: string
                }
                delegatesFocus: {
                    type: BooleanConstructor
                    default: boolean
                }
                abstract: {
                    type: BooleanConstructor
                    default: boolean
                }
                tag: {
                    type: StringConstructor
                    default: string
                }
                adoptedStyleSheets: {
                    type: PropType<CSSStyleSheet[]>
                }
            }>
        > &
            Readonly<{
                onError?: ((...args: any[]) => any) | undefined
            }>,
        () => VNode,
        {},
        {},
        {},
        {
            mode: ShadowMode
            delegatesFocus: boolean
            abstract: boolean
            tag: string
        }
    >
    __isFragment?: undefined
    __isTeleport?: undefined
    __isSuspense?: undefined
} & import('vue').ComponentOptionsBase<
    Readonly<
        import('vue').ExtractPropTypes<{
            mode: {
                type: PropType<ShadowMode>
                default: string
            }
            delegatesFocus: {
                type: BooleanConstructor
                default: boolean
            }
            abstract: {
                type: BooleanConstructor
                default: boolean
            }
            tag: {
                type: StringConstructor
                default: string
            }
            adoptedStyleSheets: {
                type: PropType<CSSStyleSheet[]>
            }
        }>
    > &
        Readonly<{
            onError?: ((...args: any[]) => any) | undefined
        }>,
    () => VNode,
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    'error'[],
    'error',
    {
        mode: ShadowMode
        delegatesFocus: boolean
        abstract: boolean
        tag: string
    },
    {},
    string,
    {},
    import('vue').GlobalComponents,
    import('vue').GlobalDirectives,
    string,
    import('vue').ComponentProvideOptions
> &
    import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps &
    ShadowRootComponent
export declare function install(app: App): void
export { ShadowRoot as shadow_root, ShadowStyle as shadow_style }
declare const _default: {
    ShadowRoot: {
        new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
            Readonly<
                import('vue').ExtractPropTypes<{
                    mode: {
                        type: PropType<ShadowMode>
                        default: string
                    }
                    delegatesFocus: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    abstract: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    tag: {
                        type: StringConstructor
                        default: string
                    }
                    adoptedStyleSheets: {
                        type: PropType<CSSStyleSheet[]>
                    }
                }>
            > &
                Readonly<{
                    onError?: ((...args: any[]) => any) | undefined
                }>,
            () => VNode<
                import('vue').RendererNode,
                import('vue').RendererElement,
                {
                    [key: string]: any
                }
            >,
            {},
            {},
            {},
            import('vue').ComponentOptionsMixin,
            import('vue').ComponentOptionsMixin,
            'error'[],
            import('vue').PublicProps,
            {
                mode: ShadowMode
                delegatesFocus: boolean
                abstract: boolean
                tag: string
            },
            true,
            {},
            {},
            import('vue').GlobalComponents,
            import('vue').GlobalDirectives,
            string,
            {},
            any,
            import('vue').ComponentProvideOptions,
            {
                P: {}
                B: {}
                D: {}
                C: {}
                M: {}
                Defaults: {}
            },
            Readonly<
                import('vue').ExtractPropTypes<{
                    mode: {
                        type: PropType<ShadowMode>
                        default: string
                    }
                    delegatesFocus: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    abstract: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    tag: {
                        type: StringConstructor
                        default: string
                    }
                    adoptedStyleSheets: {
                        type: PropType<CSSStyleSheet[]>
                    }
                }>
            > &
                Readonly<{
                    onError?: ((...args: any[]) => any) | undefined
                }>,
            () => VNode<
                import('vue').RendererNode,
                import('vue').RendererElement,
                {
                    [key: string]: any
                }
            >,
            {},
            {},
            {},
            {
                mode: ShadowMode
                delegatesFocus: boolean
                abstract: boolean
                tag: string
            }
        >
        __isFragment?: undefined
        __isTeleport?: undefined
        __isSuspense?: undefined
    } & import('vue').ComponentOptionsBase<
        Readonly<
            import('vue').ExtractPropTypes<{
                mode: {
                    type: PropType<ShadowMode>
                    default: string
                }
                delegatesFocus: {
                    type: BooleanConstructor
                    default: boolean
                }
                abstract: {
                    type: BooleanConstructor
                    default: boolean
                }
                tag: {
                    type: StringConstructor
                    default: string
                }
                adoptedStyleSheets: {
                    type: PropType<CSSStyleSheet[]>
                }
            }>
        > &
            Readonly<{
                onError?: ((...args: any[]) => any) | undefined
            }>,
        () => VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
                [key: string]: any
            }
        >,
        {},
        {},
        {},
        import('vue').ComponentOptionsMixin,
        import('vue').ComponentOptionsMixin,
        'error'[],
        'error',
        {
            mode: ShadowMode
            delegatesFocus: boolean
            abstract: boolean
            tag: string
        },
        {},
        string,
        {},
        import('vue').GlobalComponents,
        import('vue').GlobalDirectives,
        string,
        import('vue').ComponentProvideOptions
    > &
        import('vue').VNodeProps &
        import('vue').AllowedComponentProps &
        import('vue').ComponentCustomProps &
        ShadowRootComponent
    ShadowStyle: import('vue').DefineComponent<
        import('vue').ExtractPropTypes<{
            media: StringConstructor
            nonce: StringConstructor
        }>,
        () => VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
                [key: string]: any
            }
        >,
        {},
        {},
        {},
        import('vue').ComponentOptionsMixin,
        import('vue').ComponentOptionsMixin,
        {},
        string,
        import('vue').PublicProps,
        Readonly<
            import('vue').ExtractPropTypes<{
                media: StringConstructor
                nonce: StringConstructor
            }>
        > &
            Readonly<{}>,
        {},
        {},
        {},
        {},
        string,
        import('vue').ComponentProvideOptions,
        true,
        {},
        any
    >
    shadow_root: {
        new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
            Readonly<
                import('vue').ExtractPropTypes<{
                    mode: {
                        type: PropType<ShadowMode>
                        default: string
                    }
                    delegatesFocus: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    abstract: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    tag: {
                        type: StringConstructor
                        default: string
                    }
                    adoptedStyleSheets: {
                        type: PropType<CSSStyleSheet[]>
                    }
                }>
            > &
                Readonly<{
                    onError?: ((...args: any[]) => any) | undefined
                }>,
            () => VNode<
                import('vue').RendererNode,
                import('vue').RendererElement,
                {
                    [key: string]: any
                }
            >,
            {},
            {},
            {},
            import('vue').ComponentOptionsMixin,
            import('vue').ComponentOptionsMixin,
            'error'[],
            import('vue').PublicProps,
            {
                mode: ShadowMode
                delegatesFocus: boolean
                abstract: boolean
                tag: string
            },
            true,
            {},
            {},
            import('vue').GlobalComponents,
            import('vue').GlobalDirectives,
            string,
            {},
            any,
            import('vue').ComponentProvideOptions,
            {
                P: {}
                B: {}
                D: {}
                C: {}
                M: {}
                Defaults: {}
            },
            Readonly<
                import('vue').ExtractPropTypes<{
                    mode: {
                        type: PropType<ShadowMode>
                        default: string
                    }
                    delegatesFocus: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    abstract: {
                        type: BooleanConstructor
                        default: boolean
                    }
                    tag: {
                        type: StringConstructor
                        default: string
                    }
                    adoptedStyleSheets: {
                        type: PropType<CSSStyleSheet[]>
                    }
                }>
            > &
                Readonly<{
                    onError?: ((...args: any[]) => any) | undefined
                }>,
            () => VNode<
                import('vue').RendererNode,
                import('vue').RendererElement,
                {
                    [key: string]: any
                }
            >,
            {},
            {},
            {},
            {
                mode: ShadowMode
                delegatesFocus: boolean
                abstract: boolean
                tag: string
            }
        >
        __isFragment?: undefined
        __isTeleport?: undefined
        __isSuspense?: undefined
    } & import('vue').ComponentOptionsBase<
        Readonly<
            import('vue').ExtractPropTypes<{
                mode: {
                    type: PropType<ShadowMode>
                    default: string
                }
                delegatesFocus: {
                    type: BooleanConstructor
                    default: boolean
                }
                abstract: {
                    type: BooleanConstructor
                    default: boolean
                }
                tag: {
                    type: StringConstructor
                    default: string
                }
                adoptedStyleSheets: {
                    type: PropType<CSSStyleSheet[]>
                }
            }>
        > &
            Readonly<{
                onError?: ((...args: any[]) => any) | undefined
            }>,
        () => VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
                [key: string]: any
            }
        >,
        {},
        {},
        {},
        import('vue').ComponentOptionsMixin,
        import('vue').ComponentOptionsMixin,
        'error'[],
        'error',
        {
            mode: ShadowMode
            delegatesFocus: boolean
            abstract: boolean
            tag: string
        },
        {},
        string,
        {},
        import('vue').GlobalComponents,
        import('vue').GlobalDirectives,
        string,
        import('vue').ComponentProvideOptions
    > &
        import('vue').VNodeProps &
        import('vue').AllowedComponentProps &
        import('vue').ComponentCustomProps &
        ShadowRootComponent
    shadow_style: import('vue').DefineComponent<
        import('vue').ExtractPropTypes<{
            media: StringConstructor
            nonce: StringConstructor
        }>,
        () => VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
                [key: string]: any
            }
        >,
        {},
        {},
        {},
        import('vue').ComponentOptionsMixin,
        import('vue').ComponentOptionsMixin,
        {},
        string,
        import('vue').PublicProps,
        Readonly<
            import('vue').ExtractPropTypes<{
                media: StringConstructor
                nonce: StringConstructor
            }>
        > &
            Readonly<{}>,
        {},
        {},
        {},
        {},
        string,
        import('vue').ComponentProvideOptions,
        true,
        {},
        any
    >
    install: typeof install
}
export default _default
