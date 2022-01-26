/**
 *
 * @param {Number} time the delay to wait in milliseconds, default 2000 (2s)
 * @returns {Promise}
 */
export default function (time = 2000) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
