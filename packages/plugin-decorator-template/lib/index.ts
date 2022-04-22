import { PluginInstance, PluginConstructor } from './basePlugin'

abstract class PluginTarget {
  protected static plugins: PluginConstructor[] = []

  constructor(public context: any) {
    this.init()
  }
  // static methods
  public static install(plugin:PluginConstructor) {
    this.plugins.push(plugin)
  }
  public static uninstall() {}


  protected install(plugin: PluginInstance) {
    // plugin.mainInstance = this
    // 收集hooks函数
    plugin.pluginHooks && plugin.pluginHooks.forEach((methodName) => {
      //@ts-ignore
      const hookFunction = this[methodName] // 这里会直接调用到装饰器的Hook方法
      if(hookFunction && hookFunction.addHook) {
        hookFunction.addHook.call(this, plugin, methodName)
      }
    })
  }

  protected uninstall(plugin: PluginInstance) {

  }
  /**
   * 初始化插件
   * @param options
   */
  protected init(options?: any) {
    PluginTarget.plugins.forEach((plugin: PluginConstructor) => {
      this.install(new plugin(this.context))
    })
  }
}

export default  PluginTarget


