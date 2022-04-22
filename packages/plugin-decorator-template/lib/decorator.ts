import { DecoratorConfig, DecoratorFactory } from 'lodash-decorators/factory'
import { BindApplicator } from 'lodash-decorators/applicators'
import { FC } from 'react'

// 基于lodash-decorators扩展自己的hooks
export interface FnItem  {
  method: Function
  instance: FC
}

type ArrItem = [FnItem['instance'], FnItem['method']]

export const Hook = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig((targetFn: any, mainInstance: FnItem['instance']) => {
    const fnArr = [] as any

    // 给hook函数 收集插件的方法
    targetFn.addHook = (instance: FnItem['instance'], method:FnItem['method']) => {
      fnArr.push([ instance, method ])
    }

    targetFn.removeHook = (instance: FnItem['instance'], method:FnItem['method']) => {
      const fn = fnArr.find((item: ArrItem) => item[0] === instance && item[1] === method)
      if(fn) {
        fnArr.splice(fnArr.indexOf(fn), 1)
      }
    }

    // when a method is hooked, will return this new Method
    const runAction = function<T>(...args: [T]) {
      // 要执行的next函数队列
      const needToRunFn = [...fnArr]

      const next = function(...nextArgs: any[]) {
        const newArgs = [...args] as any
        // copy nextArgs to newArgs
        if(nextArgs.length) {
          Object.keys(nextArgs).forEach((key: any) => {
            newArgs[key] = nextArgs[key]
          })
        }

        // 找到下一个插件实例
        const nextFnInfo = needToRunFn.pop()
        let fn;
        // 如果没有插件方法可调用 则直接调用自身
        if(!nextFnInfo) {
          fn = targetFn
        }
        else {
          const [instance, method] = nextFnInfo
          // 绑定执行上下文
          fn = instance[method].bind(instance)
        }

        // 如果是插件的fn, 则参数插入next函数
        if(fn !== targetFn) { // fn是插件的方法 targetFn是app的hook方法
          //@ts-ignore
          const injectFunction = next.bind(this) as any // next的上下文是app
          //@ts-ignore
          injectFunction.instance = this // next能拿到当前实例
          // 往头部插入一个新元素 同newArgs.unshift(injectFunction)
          newArgs.splice(0, 0, injectFunction)
        }

        // 执行插件方法
        // @ts-ignore
        return fn.apply(this, newArgs)
      }
      // 执行next方法
      //@ts-ignore
      const result = next.apply(this || mainInstance)
      if(needToRunFn.length)  {

      }
      return result
    }
    return runAction.bind(mainInstance)
  },
  new BindApplicator(),
  {
    optionalParams: true,//  是否自定义参数
    method: true
  })
) as any

/**
 * 把插件的hooks方法缓存
 * @param target 当前插件对象
 * @param name 插件的方法名
 * @param descriptor
 * @returns
 */
export function Inject(target: any, name: string, descriptor: PropertyDescriptor) {
  if(!target.pluginHooks) {
    target.pluginHooks = []
  }

  target.pluginHooks.push(name)

  return descriptor
}
