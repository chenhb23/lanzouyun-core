export class Chain {
  private queue = []
  private canceled = false

  cancel() {
    this.canceled = true
  }

  add(fn) {
    this.queue.push(fn)
    return this
  }

  async start(args?: any) {
    let result = args
    for (const fn of this.queue) {
      if (!this.canceled) {
        result = await fn(result)
      }
    }
  }
}
