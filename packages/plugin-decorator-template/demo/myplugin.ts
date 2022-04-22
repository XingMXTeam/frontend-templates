
import { Inject } from '../lib/decorator'
import BasePlugin  from '../lib/basePlugin'

class MyPlugin extends BasePlugin {
  constructor(options: any) {
    super(options)
  }
  @Inject
  test() {
    console.log('inject test method is called')
  }
  @Inject
  testNext(next: Function) {
    console.log('testNext is called')
    next()
  }
}

export default MyPlugin
