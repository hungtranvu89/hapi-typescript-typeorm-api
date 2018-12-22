import { ServerRoute, Util } from 'hapi'

interface IRoutesSchema {
  [path: string]: {
    [method in Util.HTTP_METHODS_PARTIAL]?: ServerRoute['options'] // only support single HTTP_METHODS_PARTIAL[] and options
  }
}

export const buildRoutes = (schema: IRoutesSchema) => {
  const routes: ServerRoute[] = []
  Object.keys(schema).forEach(path => {
    if (typeof path !== 'string') throw new Error('invalid path')
    Object.keys(schema[path]).forEach(method => {
      routes.push({
        path,
        method,
        options: schema[path][method]
      })
    })
  })

  return routes
}
