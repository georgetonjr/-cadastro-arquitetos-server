import 'reflect-metadata'
import httpServer from './infra/http-server';
import { config } from './shared/config';

(async () => {
  const server = await httpServer();
  server.listen(config.SERVER_PORT, () => console.log(`Running server on http://localhost:${config.SERVER_PORT}`));
})();