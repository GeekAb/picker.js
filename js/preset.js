import BaseTemplate from './templates/baseTemplate'
import BMD4Template from './templates/bmd4Template'
import BS4Template from './templates/bs4Template'
import extend from 'extend'

/**
 * A preset can override any {Default} from the {Datepicker}.  User configs are ultimately the winner if there
 * is any conflict in the deep merge.
 */
const Preset = class {
  static resolveByKey(config) {
    let p = config.preset.toLowerCase()
    let value
    switch (p) {
      case 'bs3':
      {
        value = {
          template: new BS4Template()
        }
        break
      }
      case 'bs4':
      {
        value = {
          template: new BS4Template()
        }
        break
      }
      case 'bmd4':
      {
        value = {
          template: new BMD4Template()
        }
        break
      }
      case 'custom':
      { // custom can pass a class or a string
        if (typeof config.template === 'string') {
          value = {
            template: new StringTemplate(config.template)
          }
        }
        else {
          value = {} // nothing, assume they passed a class (no change necessary) and know what they are doing
        }
        break
      }
      default:
        throw new Error(`Unknown 'preset' '${preset}'. Try one of: bs3 | bs4 | bmd4 | custom`)
    }
    return value
  }

  /**
   * Helper to quickly resolve the config from preset based on the presetType
   *
   * @param preset
   * @param configs - ordered set of overrides
   * @returns {source, watch, dest}
   */
  static resolve(...configs) {
    // default preset is bs4
    let config = extend(true, {preset: `bs4`}, ...configs)

    let presetConfig = this.resolveByKey(config)

    // presetConfig overrides user config because it converts a potential string template into a StringTemplate class
    let resolved = extend(true, {}, config, presetConfig)

    if (!resolved.template) {
      throw new Error(`'template' must be either a Template class or a String`)
    }

    //console.log(`resolved config with preset: \n${stringify(resolved)}`)
    return resolved
  }
}

export default Preset
