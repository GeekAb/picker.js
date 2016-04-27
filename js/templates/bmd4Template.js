import BS4Template from './bs4Template'
//import {ClassName} from './../constants'

const Default = {
  arrow: {
    left: `<i class="material-icons">keyboard_arrow_left</i>`,
    right: `<i class="material-icons">keyboard_arrow_right</i>`
  }
}

const BMD4Template = class extends BS4Template {
  constructor(...configs) {
    super(Default, ...configs)
  }

  // addDayClasses(date, classNames){
  //   classNames.push('btn bmd-btn-icon')
  // }

  /**
   *
   * @param date
   * @param classNames - array - passed to be used as markers only, not to be rendered.  These are rendered in the container
   * @returns {string}
   */
  renderDayContent(date, classNames){
    // return `<span>${date.date()}</span>`
    // return date.date()
    return `<button class="btn bmd-btn-icon">${date.date()}</button>`
  }
}

export default BMD4Template
