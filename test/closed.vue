<script setup lang="ts">
import { ref } from 'vue'
import { ShadowRoot } from '../src/shadow'
const show_self = ref(true)
const show_child = ref(true)
</script>
<template>
    <div>closed mod</div>
    <button @click="show_self = !show_self">Toggle self</button>
    <button @click="show_child = !show_child">Toggle child</button>
    <shadow-root mode="closed" :delegatesFocus="true" v-if="show_self">
        <article>
            <p>self exists</p>
            <p v-if="show_child">child exists</p>
        </article>
    </shadow-root>
</template>
