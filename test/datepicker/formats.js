//import {jQuery as $, input as $input, expect} from '../support/fixture'
//import {jQuery, input, expect} from '../support/fixture'

const $ = window.jQuery
const $input = $('input')
//import {expect} from 'chai'
//import chai from 'chai'
//const expect = chai.expect

console.log(JSON.stringify(chai))

describe('Datepicker', function () {
  describe('Formats', function () {

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


    //it('should be able to instantiate', () => {
    //  expect($input.length).to.equal(1)
    //  $input.datepicker({})
    //})


    it('should be able to jquery find element', () => {
      expect($input.length).to.equal(1)
    })
  })
})
