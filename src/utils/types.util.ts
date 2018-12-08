import { Plugin, ServerRoute } from 'hapi'

type ComponentCreator<TComponent, TOptions> = (options?: TOptions) => TComponent
interface IRouteCreator<TOptions = {}>
  extends ComponentCreator<ServerRoute[], TOptions> {}
interface IPluginCreator<T, TOptions = {}>
  extends ComponentCreator<Plugin<T>, TOptions> {}

export { ComponentCreator, IRouteCreator, IPluginCreator }
