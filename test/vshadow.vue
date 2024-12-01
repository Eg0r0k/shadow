<script setup lang="ts">
import { ref } from 'vue'
import { ShadowRoot } from '../src/shadow'
const showSelf = ref(true)
const showChild = ref(true)
</script>
<template>
    <div>v-shadow</div>
    <button @click="showSelf = !showSelf">Toggle self</button>
    <button @click="showChild = !showChild">Toggle child</button>
    <shadow-root mode="closed" :delegatesFocus="true" v-if="showSelf">
        <article>
            <p>self exists</p>
            <p v-if="showChild">child exists</p>
        </article>
    </shadow-root>
</template>
