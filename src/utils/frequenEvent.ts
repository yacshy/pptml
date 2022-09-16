
export function debounce<T>(func: (e: T) => void, delay?: number): (e: T) => void {
  let timer: number | null = null
  return function (e: T) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(e)
    }, delay || 200)
  }
}

export function throttle<T>(func: (e: T) => void, delay?: number): (e: T) => void {
  let flag = true
  return function (e: T) {
    if (flag) {
      setTimeout(() => {
        func(e)
        flag = true
      }, delay || 200)
    }
    flag = false
  }
}
