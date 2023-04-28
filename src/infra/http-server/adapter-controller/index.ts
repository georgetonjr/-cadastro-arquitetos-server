import { Request, Response} from 'express';
import { factory } from '../../dependency-injection/service-factory';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';

export const adapterController = (token: string) =>
  async (request: Request, response: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: request.body,
      headers: request.headers,
      params: request.params,
      query: request.query,
    };

    const controller = factory<Controller>(token);
    await controller.handle(request, response);
  };