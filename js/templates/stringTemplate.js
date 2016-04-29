import BaseTemplate from './baseTemplate'

/**
 * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
 * {Default} config by passing in any keys as overrides.
 *
 * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
 * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
 *
 */
const Default = {}

const BS4Template = class extends BaseTemplate {

  constructor(stringTemplate) {
    super(Default)
    this.stringTemplate = stringTemplate
  }

  getTemplate() {
    return this.stringTemplate
  }
}

export default BS4Template
