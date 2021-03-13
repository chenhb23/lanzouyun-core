export type EventFn = (...args: any[]) => void

export class Event {
  listens: {
    [event: string]: {
      once: boolean
      fn: EventFn
    }[]
  } = {}

  on(event: string, fn: EventFn, isOnce = false) {
    if (!this.listens[event]) {
      this.listens[event] = []
    }
    this.listens[event].push({once: isOnce, fn})
  }

  once(event: string, fn: EventFn) {
    this.on(event, fn, true)
  }

  off(event: string, fn?: EventFn) {
    if (!this.listens[event]) return
    if (!fn) {
      this.listens[event] = []
    } else {
      this.listens[event] = this.listens[event].filter(value => value.fn !== fn)
    }
  }

  emit(event: string, ...args: any[]) {
    // if (!this.listens[event]?.length) return
    this.listens[event]?.forEach(value => {
      value.fn(...args)
      if (value.once) {
        this.off(event, value.fn)
      }
    })
  }
}
