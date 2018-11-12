import Vue from 'vue'
import App from './app.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store'
// import './assets/style/base.css'
// import './assets/style/test.styl'
// import './assets/img/hh.jpg'

Vue.use(iView)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    store,
    render:(h) => h(App)
}).$mount(root)