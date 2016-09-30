import 'gulp-pipeline'
import 'babel-polyfill'
//import 'babel-polyfill/dist/polyfill'
//import babel-polyfill from 'babel-polyfill'
//import 'core-js/es6/symbol'
//export { babel-polyfill }

export {default as Datepicker} from './datepicker'
export {default as BS3Template} from './templates/bs4Template'
export {default as BS4Template} from './templates/bs4Template'
export {default as BMD4Template} from './templates/bmd4Template'
export {default as StringTemplate} from './templates/stringTemplate'

// export moment for use with additional locales #13
import moment from 'moment'
window.moment = moment
export { moment }