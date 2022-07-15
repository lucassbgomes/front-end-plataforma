import { Server } from 'miragejs';
import { fixtures } from './fixtures';
import routes from './routes';
import { models } from './models';

const config = (environment: string) => {
  const config = {
    environment,
    fixtures,
    models,
    routes,
  };

  return config;
};

export function makeServer({ environment = 'development' } = {}) {
  return new Server(config(environment));
}
