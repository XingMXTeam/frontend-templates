import PluginTarget from '../lib/index'
import { Hook } from '../lib/decorator'
import MyPlugin from './myplugin'

class TargetAppDemo extends PluginTarget {
  constructor(options: any) {
    super(options)
  }
  @Hook
  test() {
    console.log('TargetAppDemo test is called')
  }
}

export default TargetAppDemo

TargetAppDemo.install(MyPlugin)

const demo = new TargetAppDemo({})
demo.test()

