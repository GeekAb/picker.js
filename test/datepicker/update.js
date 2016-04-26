import {$, $input, safeDispose, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden, assertDatesEqual, findDayOfMonth, prepare} from '../support'
import {Selector, ClassName} from '../../js/constants'
import moment from 'moment'

const FORMAT = 'DD-MM-YYYY'
describe('Datepicker', () => {

  let dp
  beforeEach(() => {
    prepare()
    $input.val('31-03-2011').datepicker({format: FORMAT})
    dp = assertData()
  })

  afterEach(() => safeDispose())

  describe('#update', () => {

    const assertUpdateDates = (dateString, dayOfMonth) => {
      expect($input.val()).to.equal(dateString) // html value
      expect(dp.getDateFormatted()).to.equal(dateString) // html value

      assertDatesEqual(dp.getDate(), moment(dateString, FORMAT))

      dp.show() // gotta show it, otherwise it isn't in the dom
      let $date = findDayOfMonth(dayOfMonth)
      expect($date, `Day ${dayOfMonth} to be active`).to.have.class(ClassName.ACTIVE)
    }

    it('should accept a string', () => {
      const dateString = '21-04-2012'
      expect(dp.update(dateString)).to.equal(dp) // chainable
      assertUpdateDates(dateString, '21')
    })

    it('should accept a moment', () => {
      const dateString = '21-04-2012'
      const mom = moment(dateString, FORMAT)
      expect(mom.isValid()).to.be.true
      expect(dp.update(mom)).to.equal(dp) // chainable
      assertUpdateDates(dateString, '21')
    })

    it('should accept null', () => {
      expect(dp.update(null)).to.equal(dp) // chainable
      expect(dp.dates.length()).to.equal(0)
      expect($(`${Selector.DAYS} td${Selector.ACTIVE}`).length, 'No date should be active').to.equal(0)
    })
  })
})
