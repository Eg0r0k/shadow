import { createApp } from 'vue'
import shadow from '../src/shadow'
import VShadowVue from './vshadow.vue'
import AppVue from './app.vue'
import NestedVue from './nested.vue'
import AbstractVue from './abstract.vue'

const components = [
    { component: VShadowVue, mountPoint: '#vshadow' },
    { component: AppVue, mountPoint: '#app' },
    { component: NestedVue, mountPoint: '#nested' },
    { component: AbstractVue, mountPoint: '#abstract' },
]

const mountApp = ({ component, mountPoint }) => {
    try {
        createApp(component).use(shadow).mount(mountPoint)
        console.log(`App mounted at ${mountPoint}`)
    } catch (error) {
        console.error(`Failed to mount app at ${mountPoint}:`, error)
    }
}

components.forEach(mountApp)
