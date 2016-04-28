import extend from 'extend'
import stringify from 'stringify-object'

const Default = {
  debug: false
}

const Base = class {
  constructor(...configs) {
    this.config = extend(true, {}, Default, ...configs)
  }

  i18n(key) {
    return this.config.i18n[this.config.lang][key] || ''
  }

  dispose(dataKey = null) {
    if (dataKey) {
      this.$element.data(dataKey, null)
    }
    this.$element = null
    this.config = null
  }

  required(object, name) {
    if (!object) {
      this.error(`this.${name} was not provided in ${this.constructor.name}`)
    }
  }

  //---------------------
  // logger shortcuts

  /* eslint-disable no-console */
  debug(...args) {
    if (this.config.debug) {
      console.debug(...args)
    }
  }

  info(...args) {
    console.info(...args)
  }

  warn(...args) {
    console.warn(...args)
  }

  error(...args) {
    console.error(...args)
  }

  /* eslint-enable no-console */

  throwError(msg) {
    throw new Error(`[${this.constructor.name}] ${msg}`)
  }

  debugDump(msg, obj) {
    if (this.config.debug) {
      this.debug(`${msg}:\n${this.dump(obj)}`)
    }
  }

  dump(obj) {
    return stringify(obj)
  }
}

export default Base
