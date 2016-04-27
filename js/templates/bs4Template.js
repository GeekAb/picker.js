import BS3Template from './bs3Template'
// import {ClassName} from './../constants'

/**
 * Eventually we will probably be rendering different markup...
 *
 */
const Default = {}

const BS4Template = class extends BS3Template {

  constructor(...configs) {
    super(Default, ...configs)
  }
}

export default BS4Template
