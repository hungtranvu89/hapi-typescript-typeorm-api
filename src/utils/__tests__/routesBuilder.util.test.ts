import { buildRoutes } from '../routesBuilder.util'

describe('routesBuilder utils', () => {
  test('buildRoutes should return routes array', () => {
    const res = buildRoutes({
      path: {
        get: {
          handler: {}
        }
      }
    })

    expect(res).toEqual([
      {
        path: 'path',
        method: 'get',
        options: {
          handler: {}
        }
      }
    ])
  })
})
