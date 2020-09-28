/**
 * Vue filter to round the decimal to the given place.
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
export const round = (value = 0, decimals = 0) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
