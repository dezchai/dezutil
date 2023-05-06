import chalk, { ForegroundColorName, BackgroundColorName } from 'chalk'

export default class Log {
  prefix?: string

  constructor(prefix?: string) {
    if (prefix) this.prefix = prefix
  }

  /**
   * Prints formatted log messages to the console with an optional prefix.
   *
   * @param {ForegroundColorName | BackgroundColorName} color - The color to use for the log message.
   * @param {...any[]} args - The arguments to log.
   */
  printlog(color: ForegroundColorName | BackgroundColorName, ...args: any[]) {
    const formattedArgs = args.map((arg: any) => {
      if (arg instanceof Error) {
        return arg.stack || arg.message
      } else if (typeof arg === 'object') {
        return JSON.stringify(arg)
      }

      return arg
    })

    const date = new Date()
    const formattedDate = `[${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}]`

    if (this.prefix) {
      console.log(
        chalk.yellow(formattedDate),
        chalk.magenta(`[${this.prefix}]`),
        chalk[color](...formattedArgs)
      )
    } else {
      console.log(chalk.yellow(formattedDate), chalk[color](...formattedArgs))
    }
  }

  // regular log
  log(...args: any[]) {
    this.printlog('cyan', ...args)
  }

  // error log
  elog(...args: any[]) {
    this.printlog('red', ...args)
  }

  // success log
  slog(...args: any[]) {
    this.printlog('green', ...args)
  }

  static create(prefix?: string) {
    const logger = new Log(prefix)
    return {
      log: (...args: any[]) => logger.log(...args),
      elog: (...args: any[]) => logger.elog(...args),
      slog: (...args: any[]) => logger.slog(...args),
    }
  }
}

const l = new Log()

/**
 * Logs the given arguments to the console.
 *
 * @param {...any} args - The arguments to log.
 */
export const log = (...args: any[]) => {
  l.log(...args)
}
