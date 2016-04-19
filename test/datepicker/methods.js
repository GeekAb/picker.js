import {$, $input, safeDispose, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden, assertDatesEqual} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'


const FORMAT = 'DD-MM-YYYY'
describe('Datepicker', function () {

  it('should be able to jquery find element', () => {
    expect($input.length).to.equal(1)
  })

  it('should be able to instantiate', () => {
    expect($input.length).to.equal(1)
    $input.datepicker({})
  })

  describe('Methods', function () {

    let dp
    beforeEach(() => {
      $input.val('31-03-2011').datepicker({format: FORMAT})
      dp = assertData()
    })

    afterEach(() => {
      safeDispose()
      dp = null
    })


    it('should show and hide', () => {
      assertNotFound(Selector.POPPER)
      expect(dp.show()).to.equal(dp) // chainable
      assertVisible(Selector.POPPER)
      expect(dp.hide()).to.equal(dp) // chainable
      assertNotFound(Selector.POPPER)
    })

    it('should update with a string', () => {
      const newDate = '13-03-2012'
      expect(dp.update(newDate)).to.equal(dp) // chainable
      expect($input.val()).to.equal(newDate) // html value
      expect(dp.getDateFormatted()).to.equal(newDate) // html value

      assertDatesEqual(dp.getDate(), moment(newDate, FORMAT))

      dp.show() // gotta show it, otherwise it isn't in the dom
      let $date = $(`${Selector.DAYS} td:contains(13)`)
      expect($date, 'Date is selected').to.have.class(ClassName.ACTIVE)
    })
  })
})
