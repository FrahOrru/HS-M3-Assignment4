import { createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
// @ts-ignore
import App from './App.vue'

const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
