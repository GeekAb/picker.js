import BS3Template from './templates/bs4Template'
import BS4Template from './templates/bs4Template'
import BMD4Template from './templates/bmd4Template'
import StringTemplate from './templates/stringTemplate'
import extend from 'extend'

/**
 * A preset can override any {Default} from the {Datepicker}.  User configs are ultimately the winner if there
 * is any conflict in the deep merge.
 */
const Preset = class {
  static resolveTemplateConfig(config) {
    let p = config.preset.toLowerCase()
    let value
    switch (p) {
      case 'bs3':
      {
        value = {
          template: new BS3Template()
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
        throw new Error(`Unknown 'preset' '${config.preset}'. Try one of: bs3 | bs4 | bmd4 | custom`)
    }
    return value
  }

  /**
   * Helper to quickly resolve the config from preset based on the presetType
   *
   * @param preset
   * @param userConfigs - ordered set of overrides
   * @returns {source, watch, dest}
   */
  static resolve(...userConfigs) {
    // default preset is bs4
    let userConfig = extend(true, {preset: `bs4`}, ...userConfigs)

    let templateConfig = this.resolveTemplateConfig(userConfig)
    let template = templateConfig.template

    // get a copy of the template config
    let templateOverrides = extend(true, {}, template.config)
    // whack the markup key so that we don't include giant templates in our config
    templateOverrides.markup = undefined

    // Template (object) config overrides userConfig - it converts config to a Template class.
    // We also gather any Template config and add it, but any userConfig can override it.
    let resolved = extend(true, {}, templateOverrides, userConfig, templateConfig)

    if (!resolved.template) {
      throw new Error(`'template' must be either a Template class or a String`)
    }

    //console.log(`resolved config with preset: \n${stringify(resolved)}`)
    return resolved
  }
}

export default Preset
