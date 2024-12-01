export function withType<W>(): <T>(obj: T) => T & W {
    return obj => obj as any
}
