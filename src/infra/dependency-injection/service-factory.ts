import { containerV1 } from './container';

export const factory = <TInstance>(token: string): TInstance => containerV1.resolve(token);
