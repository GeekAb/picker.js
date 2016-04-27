import BS4Template from './bs4Template'
import {ClassName} from './../constants'

const Default = {
  arrow: {
    left: `<i class="material-icons left-arrow">keyboard_arrow_left</i>`,
    right: `<i class="material-icons right-arrow">keyboard_arrow_right</i>`
  }
}

const BMD4Template = class extends BS4Template {
  constructor(...configs) {
    super(Default, ...configs)
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
