/* @flow */
// flow.js吗
// core/global-api/index
import config from '../config'
import {initUse} from './use'
import {initMixin} from './mixin'
import {initExtend} from './extend'
import {initAssetRegisters} from './assets'
import {set, del} from '../observer/index'
import {ASSET_TYPES} from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  // 重写config,创建了一个configDef对象，最终目的是为了Object.defineProperty(Vue, 'config', configDef)
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)
  // 具体Vue.congfig的具体内容就要看../config文件了

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  //  这些工具方法不视作全局API的一部分，除非你已经意识到某些风险，否则不要去依赖他们
  // 添加一些方法，但是该方法并不是公共API的一部分。源码中引入了flow.js

  Vue.util = {
    warn,// 查看'../util/debug'
    extend,//查看'../sharde/util'
    mergeOptions,//查看'../util/options'
    defineReactive//查看'../observe/index'，这个是定义响应式是的核心方法吧
  }

  Vue.set = set//查看'../observe/index'
  Vue.delete = del//查看'../observe/index'
  Vue.nextTick = nextTick//查看'../util/next-click'.在callbacks中注册回调函数

  // 创建一个纯净的options对象，添加components、directives、filters属性
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // ../components/keep-alive.js  拷贝组件对象。该部分最重要的一部分。
  extend(Vue.options.components, builtInComponents)
// Vue.options = {
  //   components : {
  //     KeepAlive : {
  //       name : 'keep-alive',
  //       abstract : true,
  //       created : function created(){},
  //       destoryed : function destoryed(){},
  //       props : {
  //         exclude : [String, RegExp, Array],
  //         includen : [String, RegExp, Array],
  //         max : [String, Number]
  //       },
  //       render : function render(){},
  //       watch : {
  //         exclude : function exclude(){},
  //         includen : function includen(){},
  //       }
  //     },
  //     directives : {},
  //     filters : {},
  //     _base : Vue
  //   }
  // }

  // 添加Vue.use方法，使用插件，内部维护一个插件列表_installedPlugins，如果插件有install方法就执行自己的install方法，否则如果plugin是一个function就执行这个方法，传参(this, args)
  initUse(Vue)
  // ./mixin.js 添加Vue.mixin方法，this.options = mergeOptions(this.options, mixin)，
  initMixin(Vue)
  // ./extend.js 添加Vue.cid（每一个够着函数实例都有一个cid，方便缓存），Vue.extend(options)方法
  initExtend(Vue)
  // ./assets.js 创建收集方法Vue[type] = function (id: string, definition: Function | Object)，其中type ： component / directive / filter
  initAssetRegisters(Vue)
}
