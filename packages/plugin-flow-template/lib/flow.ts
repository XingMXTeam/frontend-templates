import { BasePlugin } from "./interface"
/**
 * Flow is tasks manager
 */
class Flow {
  private plugins: BasePlugin[] = []
  register(plugin: BasePlugin) {
    this.plugins.push(plugin)
  }
  runSyncCallBacks<C extends keyof BasePlugin>(name: C, options: any) {
    for(const callback of this.iterateCallbacks(name)) {
      callback(options)
    }
  }
  async runCallBacks<C extends keyof BasePlugin>(name: C, options: any) {
    for(const callback of this.iterateCallbacks(name)) {
      await callback(options)
    }
  }
  *iterateCallbacks<C extends keyof BasePlugin>(name: C): Generator<NonNullable<BasePlugin[C]>> {
    for(const plugin of this.plugins) {
      const callback = plugin[name]
      if(typeof callback === 'function') {
        yield callback as NonNullable<BasePlugin[C]>
      }
    }
  }
}
export default Flow
