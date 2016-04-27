import BaseTemplate from './baseTemplate'
import {ClassName} from './../constants'

const Default = {
  button: {
    cancel: true,
    ok: true
  },
  arrow: {
    left: `<i class="material-icons left-arrow">keyboard_arrow_left</i>`,
    right: `<i class="material-icons right-arrow">keyboard_arrow_right</i>`
  }
}

const BMD4Template = class extends BaseTemplate {
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

  /**
   *
   * @param date
   * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
   * @returns {string}
   */
  renderDayContent(date, classNames){
    let classes = ['btn', 'bmd-btn-icon']
    if(classNames.includes(ClassName.DISABLED)){
      classes.push(ClassName.DISABLED)
    }
    return `<button class="${classes.join(' ')}">${date.date()}</button>`
  }
}

export default BMD4Template
