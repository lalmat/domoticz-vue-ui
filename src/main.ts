import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { i18n } from "./locales/"
app.use(i18n)

import { Router } from "./routes/";
app.use(Router)

app.mount('#app')
