import Base from './base'

const Datepicker = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'datepicker'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Datepicker extends Base {

    constructor($element, ...configs) {
      super($element, Default, ...configs)
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }


    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Datepicker($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Datepicker._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Datepicker
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Datepicker._jQueryInterface
  }

  return Datepicker

})(jQuery)

export default Datepicker
