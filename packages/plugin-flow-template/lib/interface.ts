interface PluginCallBackParams {
  injectMethod: {
    type: string;
    props: any
  }
}
export interface BasePlugin {
  lifeCircleMethod?: (options: any) => Promise<void>
  injectMethod?: {
    (param: PluginCallBackParams['injectMethod']): PluginCallBackParams['injectMethod']['props']
  }
}
