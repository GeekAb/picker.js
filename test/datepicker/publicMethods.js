import chai from 'chai'
const expect = chai.expect
const $ = window.jQuery

describe('Datepicker', function () {

  //let rectangle
  //beforeEach(() => {
  //  // Create a new Rectangle object before every test.
  //  rectangle = new Rectangle(10, 20);
  //})
  //
  //
  //setup: function(){
  //  this.$inputs = $('<input><input>')
  //    .datepicker()
  //    .appendTo('#qunit-fixture');
  //},
  //teardown: function(){
  //  this.$inputs.each(function(){
  //    $.data(this, 'datepicker').picker.remove();
  //  });
  //}


  it('should be able to instantiate', () => {
    let $input = $('input')
    expect($input.length).to.equal(1)

    $input.datepicker({})
  })
})
