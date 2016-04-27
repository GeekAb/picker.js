import BaseTemplate from './baseTemplate'
import {ClassName} from './../constants'

/**
 * This class registers overridable partials in the {Default} hash constant.  Subclasses can override this
 * {Default} config by passing in any keys as overrides.
 *
 * Interpolation is delayed until #createTemplate is called in order to allow Subclasses to make use of any
 * superclasses' partials.  Tokens are denoted by %% e.g. %header% will be replaced by config.header.
 *
 */
const Default = {
  // keep templates under the markup key so they can be whacked and not included in the general config overrides
  markup: {
    arrow: {
      left: `&laquo;`,
      right: `&raquo;`
    }
  }
}

const BS3Template = class extends BaseTemplate {

  constructor(...configs) {
    super(Default, ...configs)
  }

  generateView(className) {
    let html = `<div class="${className} ${ClassName.VIEW}">
    <table>
      <thead>
        <tr>
          <th colspan="7" class="${ClassName.TITLE}"></th>
        </tr>
        <tr>
          <th class="${ClassName.PREV}">%arrow.left%</th>
          <th colspan="5" class="${ClassName.SWITCH}"></th>
          <th class="${ClassName.NEXT}">%arrow.right%</th>
        </tr>
      </thead>
      <tbody>`

    if (className !== ClassName.DAYS) {
      html += `<tr>
          <td colspan="7"></td>
        </tr>`
    }

    html += `
      </tbody>
      <tfoot>
        <tr>
          <th colspan="7" class="${ClassName.TODAY}"></th>
        </tr>
        <tr>
          <th colspan="7" class="${ClassName.CLEAR}"></th>
        </tr>
      </tfoot>
    </table>
  </div>`

    return html
  }
}

export default BS3Template
