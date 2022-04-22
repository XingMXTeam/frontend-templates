

export interface PluginConstructor {
  pluginHooks?: string[]
  // 插件构造类型定义：构造函数不带参数
  new(context: any): BasePlugin
  mainInstance?: PluginInstance
}

export type PluginInstance = InstanceType<PluginConstructor>
export type PluginMethod = keyof BasePlugin

class BasePlugin {

  public mainInstance!: PluginInstance

  public readonly pluginHooks!: PluginMethod[]

  constructor(options = {}) {
    // this.options = Object.assign({}, options)
  }
}

export default BasePlugin
