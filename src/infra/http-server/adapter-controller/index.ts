import { Request, Response} from 'express';

export const adapterController = (token: string, version: number) =>
  async (request: Request, response: Response): Promise<void> => {
    const httpRequest = {
      body: request.body,
      headers: request.headers,
      params: request.params,
      query: request.query,
    };
    console.log('chegou no adapter controller com as seguintes informacoes', request);
    response.sendStatus(200);
  };