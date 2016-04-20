import {$, $input, safeDispose, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden, assertDatesEqual} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

describe('Datepicker', () => {

  let dp
  beforeEach(() => {
    expect($input.length).to.equal(1)
    assertData(true)
    //$input.datepicker()
    //dp = assertData()
  })

  afterEach(() => {
    safeDispose()
  })

  describe('configuration options', () => {
    it('should set the format', () => {
      const FORMAT = 'DD-MM-YYYY'
      $input.datepicker({format: FORMAT})
      let dp = assertData()
      expect(dp.config.format, 'config format test').to.equal(FORMAT)
    })
  })
})
