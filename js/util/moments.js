const Moments = class {

  static toRange(...moments){
    if(!moments || moments.length < 2){
      throw new Error(`Expected at least two moments but found only ${moments}`)
    }

    return moment.range(Moments.earliest(...moments), Moments.latest(...moments))
  }

  static earliest(...moments){
    return Moments._comparison('isSameOrBefore', ...moments)
  }

  static latest(...moments){
    return Moments._comparison('isSameOrAfter', ...moments)
  }

  static _comparison(fn, ...moments){
    let result = null
    for(let m of moments){
      if (result == null){
        result = m
        next
      }

      if(m[fn](result)){
        result = m
      }
    }

    return m
  }
}

export default Moments
