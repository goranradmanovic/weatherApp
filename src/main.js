import { createApp } from 'vue'
import './styles/main.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import initializeRouter from './router'
import VueSweetalert2 from 'vue-sweetalert2'

const app = createApp(App)

initializeRouter(app)

app.use(VueSweetalert2)

app.mount('#app')
