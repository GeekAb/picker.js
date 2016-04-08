export const leftArrow = `<i class="material-icons">keyboard_arrow_left</i>`
export const rightArrow = `<i class="material-icons">keyboard_arrow_right</i>`

// head
export const head =
  `<thead>
      <tr>
          <th colspan="7" class="datepicker-title"></th>
      </tr>
      <tr>
          <th class="prev">${leftArrow}</th>
          <th colspan="5" class="datepicker-switch"></th>
          <th class="next">${rightArrow}</th>
      </tr>
  </thead>`

// cont?
export const cont =
  `<tbody>
      <tr>
          <td colspan="7"></td>
      </tr>
  </tbody>`

// foot
export const foot =
  `<tfoot>
      <tr>
          <th colspan="7" class="today"></th>
      </tr>
      <tr>
          <th colspan="7" class="clear"></th>
      </tr>
  </tfoot>`

// all together now
export const main =
  `<div class="datepicker">
      <div class="datepicker-days">
          <table class=" table-condensed">
              ${head}
              <tbody></tbody>
              ${foot}
          </table>
      </div>
      <div class="datepicker-months">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="datepicker-years">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="datepicker-decades">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="datepicker-centuries">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
  </div>`

