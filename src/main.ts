import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Icon,
  Menu,
  Popover,
  Dropdown,
  Button,
  InputNumber,
  Input,
  Tabs,
  Radio,
  Divider,
  Select,
  Upload,
  Card,
  Switch,
  Slider
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'animate.css'

Vue.use(Icon)
Vue.use(Tabs)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Button)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Divider)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Switch)
Vue.use(Slider)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
