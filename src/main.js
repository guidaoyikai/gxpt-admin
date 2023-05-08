import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './router/index'
import { createPinia } from 'pinia'
import {VueMasonryPlugin} from 'vue-masonry'

import piniaPluginPersist from 'pinia-plugin-persist'

import "./router/permission"

const pinia = createPinia()

createApp(App)
.use(Router)
.use(VueMasonryPlugin)
.use(pinia.use(piniaPluginPersist))
.mount('#app')
