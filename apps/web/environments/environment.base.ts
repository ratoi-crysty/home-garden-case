import { LogLevel } from '../src/app/shared/log/log.constants';

export interface Environment {
  baseApi: string;
  logLevel: LogLevel;
}

export const environmentBase: Environment = {
  baseApi: '/api',
  logLevel: LogLevel.Debug,
};
