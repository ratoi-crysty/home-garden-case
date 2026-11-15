export enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timeStamp: string;
  data?: unknown;
  ctx?: string;
}

export interface LogTransport {
  write: (entry: LogEntry) => void;
}
