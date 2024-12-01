<script setup lang="ts">
import { ref } from 'vue'
import { ShadowRoot } from '../src/shadow'

const showSelf = ref(true)
const showChild = ref(true)
</script>
<template>
    <div>abstract</div>
    <button @click="showSelf = !showSelf">Toggle self</button>
    <button @click="showChild = !showChild">Toggle child</button>
    <section>
        <shadow-root v-if="showSelf" abstract>
            <p>self exist</p>
            <p v-if="showChild">child exist</p>
        </shadow-root>
    </section>
</template>
