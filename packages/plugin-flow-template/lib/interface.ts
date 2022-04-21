export interface BasePlugin {
  lifeCircleMethod?: (options: any) => Promise<void>
}
