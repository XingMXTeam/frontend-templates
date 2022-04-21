import { BasePlugin } from "./interface";
export interface PluginConstructor {
  new(): BasePlugin
}

class Plugin {
  public context: any
  constructor(options: Pick<Plugin, "context">) {
    Object.assign(this, options)
    this.context.plugins.map(this.initPlugin.bind(this))
  }
  private initPlugin(Plugin: PluginConstructor) {
    let plugin;
    if(typeof Plugin == 'function') {
      plugin = new Plugin()
    }
    else {
      plugin = Plugin
    }
    // register plugin in flow
    this.context.flow.register(plugin)
    return plugin
  }
  // 外部使用
  use(Plugin: PluginConstructor) {
    return this.initPlugin(Plugin)
  }
}

export default Plugin
