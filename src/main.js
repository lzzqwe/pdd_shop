import Vue from 'vue'
import App from './App'
import store from './store'
import '@/common/js/vconsole.min.js'

import VConsole from 'vconsole';


// minu-UI
import 'mint-ui/lib/style.css'
import 'amfe-flexible'
import '@/common/css/reset.css'
import '@/common/css/style.css'
import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import router from './router/index'
import LyTab from 'ly-tab'

Vue.use(LyTab)

import VueTouch from 'vue-touch'

Vue.use(VueTouch, { name: 'v-touch' })

VueTouch.config.swipe = {

    threshold: 100 //手指左右滑动距离

}

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
import loading from './common/images/logo.png'
Vue.use(VueLazyLoad, {
    preLoad: 1,
    loading: loading,
    attempt: 1
})
Vue.prototype.$vconsole = new VConsole();
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})