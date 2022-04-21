// this is demo plugin
import { BasePlugin } from './interface'
class MyPlugin implements BasePlugin {
  lifeCircleMethod = async () => {

  }
}

export default MyPlugin


// or
// export default {
//   lifeCircleMethod: async () => {

//   }
// }
