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
}

export default BMD4Template
