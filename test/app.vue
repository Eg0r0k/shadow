<script setup lang="ts">
import { ref, watch } from 'vue'
import { ShadowRoot, ShadowRootExpose, ShadowStyle } from '../src/shadow'

const showSelf = ref(true)
const showChild = ref(true)

const ex = ref<ShadowRootExpose>()
watch(ex, ex => console.log(ex?.shadow_root))

const adoptedStyleSheets = new CSSStyleSheet()
;(adoptedStyleSheets as any).replace('p { color: green }')
</script>
<template>
    <div>default</div>
    <button @click="showSelf = !showSelf">Toggle self</button>
    <button @click="showChild = !showChild">Toggle child</button>
    <shadow-root class="foo" v-if="showSelf" ref="ex">
        <shadow-style>p { color: red }</shadow-style>
        <p>self exist</p>
        <p v-if="showChild">child exist</p>
    </shadow-root>
    <shadow-root :adopted-style-sheets="[adoptedStyleSheets]">
        <p>test adoptedStyleSheets</p>
    </shadow-root>
</template>
