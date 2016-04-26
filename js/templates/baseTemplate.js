import Base from './../base'
import {ClassName} from './../constants'

/**
 * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
 * {Default} config by passing in any keys as overrides.
 *
 * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
 * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
 *
 */
const Default = {}

const BaseTemplate = class extends Base {

  constructor(...configs) {
    super(Default, ...configs)
  }

  /**
   * Primarily here for override purposes
   * @returns non-interpolated template
   */
  getTemplate(){
    return this.config.main    
  }
  
  interpolate() {
      return this.getTemplate()
        .replace(/%header%/g, this.config.header)
        .replace(/%body%/g, this.config.body)
        .replace(/%footer%/g, this.config.footer)
        .replace(/%arrow\.left%/g, this.config.arrow.left)
        .replace(/%arrow\.right%/g, this.config.arrow.right)
  }
  
  addDayClasses(date, classes){
    // noop
  }
}

export default BaseTemplate
