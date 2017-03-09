/* eslint-disable */
Array.prototype.findIndexByKey = function (key, val) {
  let index = -1
  this.every((v, k) => {
    if (v[key] === val) {
      index = k
      return false
    } else {
      return true
    }
  })
  return index
}