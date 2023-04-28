import httpServer from './infra/http-server';

(async () => {
  const server = await httpServer();
  server.listen(3000, () => console.log(`running server on http://localhost:3000`));
})();