import { Environment, environmentBase } from './environment.base';
import { LogLevel } from '../src/app/shared/log/log.constants';

export const environment: Environment = {
  ...environmentBase,
  baseApi: 'http://localhost:3000',
  logLevel: LogLevel.Info,
};
