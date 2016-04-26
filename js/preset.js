import BaseTemplate from './templates/baseTemplate'
import BMD4Template from './templates/bmd4Template'
import extend from 'extend'

/**
 * A preset can override any {Default} from the {Datepicker}.  User configs are ultimately the winner if there
 * is any conflict in the deep merge.
 */
const Preset = class {
  static resolveByKey(preset){
    let p = preset.toLowerCase()
    let value
    switch (p) {
      case 'bs3':
      {
        value = {
          template: new BaseTemplate().createTemplate()
        }
        break
      }
      case 'bs4':
      {
        value = {
          template: new BaseTemplate().createTemplate()
        }
        break
      }
      case 'bmd4':
      {
        value = {
          template: new BMD4Template().createTemplate()
        }
        break
      }
      case 'custom':
      {
        value = {}
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

    let presetConfig = this.resolveByKey(config.preset)

    // now that we've determined the presetConfig, overlay the overrides
    let resolved = extend(true, {}, presetConfig, config)

    //console.log(`resolved config with preset: \n${stringify(resolved)}`)
    return resolved
  }
}

export default Preset
