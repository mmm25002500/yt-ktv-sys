/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable camelcase */
/* eslint-disable new-cap */

/*
  TODO: 多國語系自動遍歷 @/i18n/*.js並載入
*/

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'

import VueProgressBar from '@aacassandra/vue3-progressbar'

import './firebase'
import { VueFire, VueFireDatabaseOptionsAPI } from 'vuefire'

// 引入 Vue I18n
import { createI18n } from 'vue-i18n'
import zh_TW from './i18n/zh_TW' // 存放正體語系檔
import zh_CN from './i18n/zh_CN' // 存放簡體中文語系檔
import en_US from './i18n/en_US' // 存放英文語系檔

// 匯入 font awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far)
// console.log(initializeApp, getFirestore)
// 建立多國語系
const i18n = new createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ?? '正體中文',
  fallbackLocale: '正體中文',
  messages: {
    '正體中文': zh_TW,
    '简体中文': zh_CN,
    'English': en_US
  }
})

const options = {
  color: 'cyan',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.9s',
    opacity: '0.9s',
    termination: 300
  },
  autoRevert: false,
  location: 'top',
  inverse: false
}

const app = createApp(App)
app.use(router)

// 載入 font awesome
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueProgressBar, options)
app.use(i18n)

app.use(VueFire, {
  modules: [
    VueFireDatabaseOptionsAPI()
  ]
})

app.mount('#app')
