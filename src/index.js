import Vue from 'vue'
import App from './app.vue'

import './assets/style/base.css'
import './assets/style/test.styl'
import './assets/img/hh.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h) => h(App)
}).$mount(root)