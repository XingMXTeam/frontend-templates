import Plugin from '../lib'
import MyPlugin from '../lib/myPlugin'
import Flow from '../lib/flow'

// this is TargetApp which use plugins

class TargetAppDemo {
  private plugin
  private context
  constructor() {
    this.context = {
      flow: new Flow()
    }

    // context used in plugins
    this.plugin = new Plugin({
      context: this.context
    })
    this.plugin.use(MyPlugin)
  }

  test() {
    // when run test, you will run all `lifeCircleMethod` methods in plugins
    this.context.flow.runCallBacks('lifeCircleMethod', {})
  }
}



