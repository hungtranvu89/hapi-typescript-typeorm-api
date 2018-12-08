import { assoc, keys, map, merge, pathOr, values, zipObj } from 'rambda'

import { ComponentCreator } from './types.util'

type ControllerCreator<TOptions, TController> = {
  [P in keyof TController]: (options: TOptions) => TController[P]
}

type OptionsWithController<TOptions, TController> = TOptions & {
  controller: TController
}

const getPrevController = pathOr({}, ['controller'])

type WithController = <TComponent, TOptions, TController>(
  controllerCreator: ControllerCreator<TOptions, TController>
) => (
  componentCreator: ComponentCreator<
    TComponent,
    OptionsWithController<TOptions, TController>
  >
) => ComponentCreator<TComponent, TOptions>

const withController: WithController = controllerCreator => componentCreator => options => {
  const mapCreator = creator => creator(options)
  const methodNames = keys(controllerCreator) as string[]
  const methodImplementations = map(mapCreator)(values(controllerCreator))

  const controller = zipObj(methodNames, methodImplementations)

  return componentCreator(
    assoc('controller', merge(controller, getPrevController(options)), options)
  )
}

export { ControllerCreator, withController }
