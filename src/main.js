import { createApp } from 'vue'
import './style.css'
import router from './router'
// @ts-ignore
import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')
