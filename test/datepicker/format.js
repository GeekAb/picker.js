import {$, $input, safeDispose, fromData, assertData, assertText, findPopper, findToday, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare, YYYY_MM_DD} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  beforeEach(() => prepare())
  afterEach(() => safeDispose())

  describe('format', () => {
    it('should set default from momentjs locale', () => {
      $input.datepicker()
      let dp = assertData()
      expect(dp.config.format, `config.format`).to.equal(moment().localeData().longDateFormat('L'))
    })

    it('can be set in constructor', () => {
      const FORMAT = 'DD-MM-YYYY'
      $input.datepicker({format: FORMAT})
      let dp = assertData()
      expect(dp.config.format, `config.format`).to.equal(FORMAT)
    })
  })
})

