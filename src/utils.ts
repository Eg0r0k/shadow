export function withType<W>() {
    return function <T>(obj: T): T & W {
        return obj as T & W
    }
}
