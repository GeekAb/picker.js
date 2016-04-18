var $ = window.jQuery

// non-es6 for quick browser debugging of setup
// get jquery from the mocha environment
describe('Test setup', function () {


  it('should be able to jquery find element', () => {
    var $input = $('input')
    //expect($input.length).to.equal(1) // no expect here because not imported (not es6) and no require (because we are using es6)
    if($input.length !== 1){
      console.error('Expected length to be 1 but found', $input)
      throw new Error('Expected length to be 1')
    }
  })
})
