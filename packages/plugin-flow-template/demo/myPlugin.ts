// this is demo plugin
import { BasePlugin } from '../lib/interface'
class MyPlugin implements BasePlugin {
  injectMethod = ({ type, props }: { type: string, props: any }) => {
    return {
      ...props,
      injectedMethod: this.pluginMethod(type)
    }
  }
  pluginMethod(name: string) {
    return (data: any) => {
      console.log('pluginMethod called')
    }
  }
  lifeCircleMethod = async () => {
    console.log('myplugin: lifeCircleMethod is called')
  }
}

export default MyPlugin


// or
// export default {
//   lifeCircleMethod: async () => {

//   }
// }
