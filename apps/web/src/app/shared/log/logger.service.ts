import { inject, Injectable, InjectionToken } from '@angular/core';
import { LogEntry, LogLevel, LogTransport } from './log.constants';
import { LoggerConsoleTransport } from './providers/logger-console.transport';

export const LOG_TRANSPORTS = new InjectionToken<LogTransport[]>('log.transports', {
  providedIn: 'root',
  factory: () => [new LoggerConsoleTransport()],
});
export const LOG_LEVEL = new InjectionToken<LogLevel>('log.providers', {
  providedIn: 'root',
  factory: () => LogLevel.Debug,
});

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  protected readonly level = inject(LOG_LEVEL);
  protected readonly transports = inject(LOG_TRANSPORTS);

  error(message: string, data?: unknown, ctx?: string) {
    this.write({ level: LogLevel.Error, message, data, ctx });
  }
  warn(message: string, data?: unknown, ctx?: string) {
    this.write({ level: LogLevel.Warn, message, data, ctx });
  }
  info(message: string, data?: unknown, ctx?: string) {
    this.write({ level: LogLevel.Info, message, data, ctx });
  }
  debug(message: string, data?: unknown, ctx?: string) {
    this.write({ level: LogLevel.Debug, message, data, ctx });
  }

  protected write(details: Omit<LogEntry, 'timeStamp'>) {
    if (details.level > this.level) {
      return;
    }

    const entry: LogEntry = { ...details, timeStamp: new Date().toISOString() };

    this.transports.forEach((transport: LogTransport) => {
      try {
        transport.write(entry);
      } catch {
        // do nothing, but prevent app failure because of logging
      }
    });
  }
}
