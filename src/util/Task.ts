import {delay} from './utils'

type AsyncTask = (...args) => Promise<any>

class Task {
  list: AsyncTask[] = []

  limit = 2
  current = 0

  add(fn: AsyncTask) {
    this.list.push(fn)
    return this
  }

  async start() {
    if (this.current < this.limit) {
      // fn = this.list.pop()
      this.current++
      // await this.list.pop()
      this.list
        .shift()?.()
        .then(() => {
          console.log('finish', this.list.length)
          this.current--
          this.check()
        })
      this.start()
    }
  }

  private check() {
    if (this.list.length && this.current < this.limit) {
      this.start()
    } else if (!this.current && !this.list.length) {
      console.log('finish end')
    }
  }
}

const task = new Task()

task
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .add(() => delay())
  .start()
