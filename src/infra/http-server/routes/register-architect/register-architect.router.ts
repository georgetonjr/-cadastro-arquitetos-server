import { Router } from 'express';
import { adapterController } from '../../adapter-controller';


export const registerArchitectRouter = Router();

registerArchitectRouter.post('/public/v1/register-architect', [ adapterController('RegisterArchitectController') ]);
