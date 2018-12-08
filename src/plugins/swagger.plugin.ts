import { PluginSpecificConfiguration } from 'hapi'
import * as hapiSwagger from 'hapi-swagger'
import * as inert from 'inert'
import * as vision from 'vision'

import tags from '../tags'
import { IPluginCreator } from '../utils'

const plugin: IPluginCreator<hapiSwagger> = () => ({
  once: true,
  name: 'my swagger',
  version: '0.1',
  register: server =>
    server.register([
      inert,
      vision,
      {
        plugin: hapiSwagger,
        options: {
          info: {
            title: 'WMS Api',
            description: 'WMS Api Documentation',
            version: '0.1'
          },
          documentationPath: '/docs',
          grouping: 'tags',
          securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
          },
          documentationRouteTags: [tags.swagger]
        }
      }
    ])
})

interface IResponseConfig {
  description: string
}

interface ISwaggerConfiguration extends PluginSpecificConfiguration {
  'hapi-swagger': {
    responses: {
      [T: number]: IResponseConfig
    }
  }
}

export { ISwaggerConfiguration }

export default plugin
