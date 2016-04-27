import Base from './../base'
import {Data} from './../constants'
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
  getTemplate() {
    return `<div class="${ClassName.NAME}">
      ${this.generateView(ClassName.DAYS)}
      ${this.generateView(ClassName.MONTHS)}
      ${this.generateView(ClassName.YEARS)}
      ${this.generateView(ClassName.DECADES)}
      ${this.generateView(ClassName.CENTURIES)}
    </div>`
  }

  generateView(className) { // eslint-disable-line no-unused-vars
    throw new Error('subclass must implement or override #getTemplate so this is not called.')
  }

  interpolate() {
    return this.getTemplate()
      // .replace(/%header%/g, this.config.header)
      // .replace(/%body%/g, this.config.body)
      // .replace(/%footer%/g, this.config.footer)
      .replace(/%arrow\.left%/g, this.config.arrow.left || '')
      .replace(/%arrow\.right%/g, this.config.arrow.right || '')
  }

  /**
   *
   * @param date
   * @param classNames
   * @param tooltip
   * @returns {string}
   */
  renderDay(date, classNames, tooltip = '') {
    return `<td class="${classNames.join(' ')}" ${tooltip} data-${Data.MOMENT}="${date}">${this.renderDayContent(date, classNames)}</td>`
  }

  /**
   *
   * @param date
   * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
   * @returns {string}
   */
  renderDayContent(date, classNames) { // eslint-disable-line no-unused-vars
    return date.date()
  }

  /**
   *
   * @param date
   * @param classNames
   * @param tooltip
   * @returns {string}
   */
  renderMonth(date, classNames, tooltip = '') {
    return `<span class="${classNames.join(' ')}" ${tooltip} data-${Data.MOMENT}="${date}">${this.renderMonthContent(date, classNames)}</span>`
  }

  /**
   *
   * @param date
   * @param classNames
   * @returns {*}
   */
  renderMonthContent(date, classNames) {  // eslint-disable-line no-unused-vars
    return date.format(`MMM`) // Jan
  }
}

export default BaseTemplate
