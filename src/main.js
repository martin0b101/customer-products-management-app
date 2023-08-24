import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';


const app = createApp(App)

app.use(PrimeVue);
app.use(router);
// components
app.component('AutoComplete', AutoComplete);

app.mount('#app')
