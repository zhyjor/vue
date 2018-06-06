// src/core/index.js
// vue的核心方法
import Vue from './instance/index'
// 初始化全局api
import {initGlobalAPI} from './global-api/index'
// 判断是不是服务器渲染，这里应该是一个Boolean变量
import {isServerRendering} from 'core/util/env'
// 全局初始化执行
initGlobalAPI(Vue)
// 为vue的原型定义属性$isServer
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
// 为vue原型定义$ssrContext属性
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

Vue.version = '__VERSION__'

export default Vue
