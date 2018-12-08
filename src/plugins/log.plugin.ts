import * as good from 'good'

import tags from '../tags'
import { IPluginCreator } from '../utils'

const plugin: IPluginCreator<good> = () => ({
  once: true,
  name: 'my logger',
  version: '0.1',

  register: server =>
    server.register({
      plugin: good,
      options: {
        ops: {
          interval: 1800000
        },
        reporters: {
          fileReporter: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [
                {
                  ops: '*',
                  error: '*',
                  log: '*',
                  response: { exclude: [tags.swagger] },
                  request: '*',
                  info: '*'
                }
              ]
            },
            {
              module: 'good-console'
            },
            {
              module: 'good-squeeze',
              name: 'SafeJson',
              args: [null, { separator: ',\n' }]
            },
            {
              module: 'rotating-file-stream',
              args: [
                'runtime.log',
                {
                  size: '10M', // rotate every 10 MegaBytes written
                  interval: '1d', // rotate daily
                  compress: 'gzip', // compress rotated files
                  path: './logs'
                }
              ]
            }
          ]
          // myHTTPReporter: [{
          //     module: 'good-squeeze',
          //     name: 'Squeeze',
          //     args: [{ error: '*' }]
          // }, {
          //     module: 'good-http',
          //     args: ['http://prod.logs:3000', {
          //         wreck: {
          //             headers: { 'x-api-key': 12345 }
          //         }
          //     }]
          // }]
        }
      }
    })
})

export default plugin
