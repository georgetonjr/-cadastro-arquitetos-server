import { container } from 'tsyringe';

export const factory = <TInstance>(token: string): TInstance => container.resolve(token);