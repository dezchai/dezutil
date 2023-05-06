import chalk from "chalk";

export class Log {
  prefix?: string;
  constructor(prefix?: string) {
    if (prefix) this.prefix = prefix;
  }
  printlog(color: string, ...args: any[]) {
    args = args.map((arg) => {
      if (arg instanceof Error) {
        return arg.stack || arg.message;
      } else if (typeof arg === "object") {
        return JSON.stringify(arg);
      } else {
        return arg;
      }
    });
    const date = new Date();
    const formattedDate =
      "[" +
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(
          2,
          "0"
        )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}` +
      "]";
    if (this.prefix) {
      console.log(
        chalk.yellow(formattedDate),
        chalk.magenta(this.prefix),
        chalk[color](...args)
      );
    } else {
      console.log(chalk.yellow(formattedDate), chalk.cyan(...args));
    }
  }
  // regular log
  log(...args: any[]) {
    this.printlog("cyan", ...args);
  }
  // error log
  elog(...args: any[]) {
    this.printlog("red", ...args);
  }
  // success log
  slog(...args: any[]) {
    this.printlog("green", ...args);
  }
  getLogger() {
    return (...args: any[]) => this.log(...args);
  }
  getErrorLogger() {
    return (...args: any[]) => this.elog(...args);
  }
  getSuccessLogger() {
    return (...args: any[]) => this.slog(...args);
  }

  static create(prefix?: string) {
    const logger = new Log(prefix);
    return [
      logger.getLogger(),
      logger.getErrorLogger(),
      logger.getSuccessLogger(),
    ];
  }
}

let l = new Log();
export const log = (...args: any[]) => {
  l.log(...args);
};
