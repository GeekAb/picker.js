import {$, $input, fromData} from '../support/fixture'

describe('Datepicker', function () {

  it('should be able to jquery find element', () => {
    expect($input.length).to.equal(1)
  })

  describe('Methods', function () {

    //let dp
    //beforeEach(function () {
    //
    //  $input.val('31-03-2011').datepicker({format: "DD-MM-YYYY"})
    //  dp = fromData()
    //  console.log('dp', JSON.stringify(dp))
    //})

    //afterEach(function () {
    //  $input.datepicker('destroy')
    //  dp = null
    //})


    //it('show', function () {
    //  // chainable
    //  expect(dp.show()).to.equal(dp)
    //})

    it('should be able to instantiate', () => {
      expect($input.length).to.equal(1)
      $input.datepicker({})
    })

  })
})
