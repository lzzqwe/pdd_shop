import Vue from 'vue'

import App from './App'

import store from './store'

import VConsole from 'vconsole'
import loading from './common/images/logo.png'
import 'amfe-flexible'
import '@/common/css/reset.css'
import '@/common/css/style.css'
import {
    Button,
    Popup,
    DatetimePicker,
    ActionSheet,
    Area,
    Dialog,
    Lazyload,
    Toast
} from 'vant';
import router from './router/index'
import LyTab from 'ly-tab'

Vue.use(LyTab)
Vue.use(Button).use(Popup).use(DatetimePicker).use(ActionSheet).use(Area).use(Dialog).use(Toast);
// 图片懒加载

Vue.use(Lazyload, {
    preLoad: 1,
    loading: loading,
    attempt: 1
});
Vue.prototype.$vconsole = new VConsole();
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})