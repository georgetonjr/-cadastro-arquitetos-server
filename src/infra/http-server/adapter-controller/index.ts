import { Request, Response} from 'express';
import { factory } from '../../dependency-injection/service-factory';
import { Controller } from '../../../shared/interface/controller';
import { HttpRequest } from '../../../shared/interface/http-request';
import { HttpResponse } from '../../../shared/interface/ http-response';

export const adapterController = (token: string) =>
  async (request: Request, response: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: request.body,
      headers: request.headers,
      params: request.params,
      query: request.query,
    };
    
    const httpResponse: HttpResponse = {
      ... response,
      send: response.send,
      sendStatus: response.sendStatus,
      status: response.status,
      json: response.json,
      jsonp: response.jsonp,
    }

    const controller = factory<Controller>(token);
    await controller.handle(httpRequest, httpResponse);
  };