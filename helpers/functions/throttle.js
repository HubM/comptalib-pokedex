export default function throttle(func, time) {
  let lastTime = 0
  return function (...args) {
    const now = new Date()
    if (now - lastTime >= time) {
      func(...args)
      lastTime = now
    }
  }
}
