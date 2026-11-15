import { Environment, environmentBase } from './environment.base';

export const environment: Environment = {
  ...environmentBase,
  baseApi: 'http://localhost:3000',
};
