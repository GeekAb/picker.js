import Base from './base'
import {ClassName} from './constants'

/**
 * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
 * {Default} config by passing in any keys as overrides.
 *
 * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
 * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
 *
 */
const Default = {
  arrow: {
    left: `&laquo;`,
    right: `&raquo;`
  },
  header: `<thead>
      <tr>
          <th colspan="7" class="${ClassName.TITLE}"></th>
      </tr>
      <tr>
          <th class="${ClassName.PREV}">%arrow.left%</th>
          <th colspan="5" class="${ClassName.SWITCH}"></th>
          <th class="${ClassName.NEXT}">%arrow.right%</th>
      </tr>
  </thead>`,

  body: `<tbody>
      <tr>
          <td colspan="7"></td>
      </tr>
  </tbody>`,

  footer: `<tfoot>
      <tr>
          <th colspan="7" class="${ClassName.TODAY}"></th>
      </tr>
      <tr>
          <th colspan="7" class="${ClassName.CLEAR}"></th>
      </tr>
  </tfoot>`,

  main: `<div class="${ClassName.NAME}">
      <div class="${ClassName.DAYS}">
          <table>
              %header%
              <tbody></tbody>
              %footer%
          </table>
      </div>
      <div class="${ClassName.MONTHS}">
          <table>
              %header%
              %body%
              %footer%
          </table>
      </div>
      <div class="${ClassName.YEARS}">
          <table>
              %header%
              %body%
              %footer%
          </table>
      </div>
      <div class="${ClassName.DECADES}">
          <table>
              %header%
              %body%
              %footer%
          </table>
      </div>
      <div class="${ClassName.CENTURIES}">
          <table>
              %header%
              %body%
              %footer%
          </table>
      </div>
  </div>`
}

const Template = class extends Base {

  constructor(...configs) {
    super(Default, ...configs)
  }

  createTemplate() {
      return this.config.main
        .replace(/%header%/g, this.config.header)
        .replace(/%body%/g, this.config.body)
        .replace(/%footer%/g, this.config.footer)
        .replace(/%arrow\.left%/g, this.config.arrow.left)
        .replace(/%arrow\.right%/g, this.config.arrow.right)
  }
}

export default Template
