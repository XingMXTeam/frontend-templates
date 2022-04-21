import Plugin from '../lib'
import MyPlugin from '../lib/myPlugin'
import Flow from '../lib/flow'

// this is TargetApp which use plugins

class TargetAppDemo {
  private plugin
  private context
  constructor() {
    this.context = {
      flow: new Flow(),
      plugins: []
    }

    // context used in plugins
    this.plugin = new Plugin({
      context: this.context
    })
    this.plugin.use(MyPlugin)
  }

  testCb() {
    // when run test, you will run all `lifeCircleMethod` methods in plugins
    this.context.flow.runCallBacks('lifeCircleMethod', {})
  }

  testInjectedMethod() {
    let newProps = {} as any
    for(const cb of this.context.flow.iterateCallbacks('injectMethod')) {
      newProps = cb({ type: 'x', props: newProps})
    }
    newProps.injectedMethod()
  }

}


const demo = new TargetAppDemo()
demo.testCb()
demo.testInjectedMethod()

