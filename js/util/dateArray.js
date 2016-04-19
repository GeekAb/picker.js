/**
 * Helper converted from legacy code, not sure we need to keep it but for ease of conversion of the entire
 *  codebase, I've kept it.  TODO: Revisit this later to see if we actually need it.
 *  FIXME: if we keep this after refactoring, we _have_ to rename it.
 */
const DateArray = class {
  constructor(...moments) {
    this.array = [].concat(moments)
  }

  last() {
    return this.get(-1)
  }

  length() {
    return this.array.length
  }

  push(m) {
    this.array.push(m)
  }

  get(i) {
    return this.array.slice(i)[0]
  }

  /**
   * Compares at the granularity of date (not specific to hours/minutes/seconds)
   * @param other
   * @returns {*}
   */
  contains(other) {
    for (let i in this.array) {
      let m = this.array[i]
      if (m.isSame(other, 'date')) {
        return i
      }
    }

    return -1
  }

  remove(i) {
    this.array.splice(i, 1)
  }

  clear() {
    this.array = []
  }

  copy() {
    return new DateArray(...this.array)
  }

  clonedArray(){
    let clones = []
    for(let m of this.array){
      clones.push(m.clone())
    }

    return clones
  }

  formattedArray(format){
    let formatted = []
    for(let m of this.array){
      formatted.push(m.local().format(format))  // needs to be local as it is displayed or put into the input
    }
    return formatted
  }
}

export default DateArray
