// non-es6 for quick browser debugging of setup
describe('Test setup (pre-ES2015)', function () {

  it('should be able to jquery find element', function () {
    var $input = $('input')
    if ($input.length !== 1) {
      console.error('Expected length to be 1 but found', $input)
      throw new Error('Expected length to be 1')
    }
  })
})
