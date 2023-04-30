import { Router } from 'express';
import { adapterController } from '../../adapter-controller';



export const authArchitectRouter = Router();

authArchitectRouter.post('/public/v1/auth-architect', [ 
  adapterController('AuthArchitectController'), 
]);
