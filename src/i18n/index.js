import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {LOCALE_ZH} from '../commons/constant.js' // 国际化配置项
import zh from './messages/zh' // 配置项

Vue.use(VueI18n)

// 创建实例
const i18n = new VueI18n({
  locale: LOCALE_ZH, // 语言标识(中文)
  messages: {
    [LOCALE_ZH]: zh // []字符串转化
  }
})

export default i18n