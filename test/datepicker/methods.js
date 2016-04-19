import {$, $input, fromData, assertData, findPopper, assertNotFound, assertVisible, assertHidden} from '../support'
import {Selector} from '../../js/constants'


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
      $input.val('31-03-2011').datepicker({format: "DD-MM-YYYY"})
      dp = assertData()
    })

    afterEach(() => {
      $input.datepicker('dispose')
      dp = null
    })


    it('should show and hide', () => {
      assertNotFound(Selector.POPPER)
      expect(dp.show()).to.equal(dp) // chainable
      assertVisible(Selector.POPPER)
      expect(dp.hide()).to.equal(dp) // chainable
      assertNotFound(Selector.POPPER)
    })
  })
})
