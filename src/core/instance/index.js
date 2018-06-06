// core/instance/index
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  // 判断是否是new调用。
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 开始初始化
  this._init(options)
}
// 添加Vue._init(options)内部方法，./init.js
initMixin(Vue)
/**
 * ./state.js
 * 添加属性和方法
 * Vue.prototype.$data
 * Vue.prototype.$props
 * Vue.prototype.$watch
 * Vue.prototype.$set
 * Vue.prototype.$delete
 */
stateMixin(Vue)
/**
 * ./event.js
 * 添加实例事件
 * Vue.prototype.$on
 * Vue.prototype.$once
 * Vue.prototype.$off
 * Vue.prototype.$emit
 */
eventsMixin(Vue)
/**
 * ./lifecycle.js
 * 添加实例生命周期方法
 * Vue.prototype._update
 * Vue.prototype.$forceUpdate
 * Vue.prototype.$destroy
 */
lifecycleMixin(Vue)
/**
 * ./render.js
 * 添加实例渲染方法
 * 通过执行installRenderHelpers(Vue.prototype);为实例添加很多helper
 * Vue.prototype.$nextTick
 * Vue.prototype._render
 */
renderMixin(Vue)

export default Vue
