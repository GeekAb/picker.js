import BaseTemplate from './baseTemplate'
import {ClassName, Data} from './../constants'

const Default = {
  // config overrides specific to this template
  button: {
    cancel: true,
    ok: true
  },
  view: {
    max: 'years' // Set a maximum limit for the view mode
  },
  // keep templates under the markup key so they can be whacked and not included in the general config overrides
  markup: {
    arrow: {
      left: `<i class="material-icons left-arrow">keyboard_arrow_left</i>`,
      right: `<i class="material-icons right-arrow">keyboard_arrow_right</i>`
    }
  }
}

const BMD4Template = class extends BaseTemplate {
  constructor(...configs) {
    super(Default, ...configs)
  }

  getDaySwitchFormat() {
    return `MMMM YYYY` // April 2016
  }

  /**
   * Unfortunately moment doesn't have the format we want, so we have to hack it directly
   * @param date
   * @returns string
   */
  formatDayOfWeek(date){
    return super.formatDayOfWeek(date)[0] // S M T W T F S
  }

  generateView(className) {
    let html = `<div class="card ${className} ${ClassName.VIEW}">
      <div class="card-header">
        <div class="card-text ${ClassName.LABEL_YEAR}"></div>
        <h2 class="card-title ${ClassName.LABEL_DATE}"></h2>
      </div>
    
      <div class="card-block">
        <div class="card-title">
          <button class="btn ${ClassName.PREV}">%arrow.left%</button>
          <button class="btn ${ClassName.SWITCH}"></button>
          <button class="btn ${ClassName.NEXT}">%arrow.right%</button>
        </div>
    
    
        <div class="card-text">
          <!-- view here -->
          <table>
            <thead></thead>
            <tbody>`
        if (className !== ClassName.DAYS) {
          html += `<tr>
              <td colspan="7"></td>
            </tr>`
        }
        html += `</tbody>
          </table>
        </div>
    
      </div>
      <div class="card-footer">
        <button class="btn btn-primary ${ClassName.TODAY}"></button>
        <button class="btn btn-primary ${ClassName.CLEAR}"></button>
        <button class="btn btn-primary ${ClassName.CANCEL}"></button>
        <button class="btn btn-primary ${ClassName.OK}"></button>
      </div>
    </div>`


    return html
  }

  /**
   *
   * @param date
   * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
   * @returns {string}
   */
  renderDayContent(date, classNames) {
    let classes = ['btn', 'bmd-btn-icon']
    if (classNames.includes(ClassName.DISABLED)) {
      classes.push(ClassName.DISABLED)
    }
    return `<button class="${classes.join(' ')}">${date.date()}</button>`
  }

  renderMonth(date, classNames, tooltip = '') {
    return `<button class="btn ${classNames.join(' ')}" ${tooltip} data-${Data.MOMENT}="${date}">${this.renderMonthContent(date, classNames)}</button>`
  }

  renderYear(date, classNames, tooltip = '') {
    return `<button class="btn ${classNames.join(' ')}" ${tooltip} data-${Data.MOMENT}="${date}">${this.renderYearContent(date, classNames)}</button>`
  }
}

export default BMD4Template
