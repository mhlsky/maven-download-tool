import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './assets/css/tailwindcss.css'
import router from './router/route'

createApp(App).use(ViewUIPlus).use(router).mount('#app')
