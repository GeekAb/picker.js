import extend from 'extend'
import stringify from 'stringify-object'

const Default = {
  debug: false
}

const Base = class {
  constructor(...configs) {
    this.config = extend(true, {}, Default, ...configs)
  }

  i18n(key){
    return this.config.i18n[this.config.lang][key] || ''
  }

  dispose(dataKey = null) {
    if(dataKey) {
      $.removeData(this.$element, dataKey)
    }
    this.$element = null
    this.config = null
  }

  required(object, name) {
    if (!object) {
      this.error(`this.${name} was not provided in ${this.constructor.name}`)
    }
  }

  /**
   *
    * @param eventKey
   * @param object/hash - properties will be set on event
   * @returns {boolean} - if false, code should get out because handler prevented
   */
  trigger(eventKey, object = {}){
    let event = $.Event(eventKey ,object)
    $(this.$element).trigger(event)
    if (event.isDefaultPrevented()) {
      this.debug(`default prevented on ${eventKey}`)
      return false
    }
    else{
      return true
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
