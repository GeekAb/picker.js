import {ClassName} from './constants'

export const leftArrow = `<i class="material-icons">keyboard_arrow_left</i>`
export const rightArrow = `<i class="material-icons">keyboard_arrow_right</i>`

// head
export const head =
  `<thead>
      <tr>
          <th colspan="7" class="${ClassName.TITLE}"></th>
      </tr>
      <tr>
          <th class="${ClassName.PREV}">${leftArrow}</th>
          <th colspan="5" class="${ClassName.SWITCH}"></th>
          <th class="${ClassName.NEXT}">${rightArrow}</th>
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
          <th colspan="7" class="${ClassName.TODAY}"></th>
      </tr>
      <tr>
          <th colspan="7" class="${ClassName.CLEAR}"></th>
      </tr>
  </tfoot>`

// all together now
export const main =
  `<div class="${ClassName.NAME}">
      <div class="${ClassName.DAYS}">
          <table class=" table-condensed">
              ${head}
              <tbody></tbody>
              ${foot}
          </table>
      </div>
      <div class="${ClassName.MONTHS}">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="${ClassName.YEARS}">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="${ClassName.DECADES}">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
      <div class="${ClassName.CENTURIES}">
          <table class="table-condensed">
              ${head}
              ${cont}
              ${foot}
          </table>
      </div>
  </div>`

