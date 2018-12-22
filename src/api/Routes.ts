import * as keyMirror from 'key-mirror-nested'
import { dropLast } from 'rambda'

const constants = {
  users: {
    info: '',
    login: '',
    _: '_'
  },
  tasks: {
    '{id}': '',
    _: '_'
  }
}

const drop2 = dropLast(2) // drop /_

const routes = keyMirror(constants, {
  connChar: '/',
  custFunc: (oldVal: string, newVal: string) => {
    const next = newVal[0] !== '/' ? `/${newVal}` : newVal

    return oldVal !== '_' ? next : drop2(next)
  }
})

export default routes as typeof constants // set the shape
