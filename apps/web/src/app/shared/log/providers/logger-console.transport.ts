import { LogEntry, LogLevel, LogTransport } from '../log.constants';

export class LoggerConsoleTransport implements LogTransport {
  protected readonly levels: Record<LogLevel, (...messages: unknown[]) => void> = {
    [LogLevel.Debug]: console.log,
    [LogLevel.Info]: console.info,
    [LogLevel.Warn]: console.warn,
    [LogLevel.Error]: console.error,
  };

  write(entry: LogEntry) {
    this.levels[entry.level](`[${entry.ctx ?? 'NoContext'}] ${entry.message}`, entry.data);
  }
}
