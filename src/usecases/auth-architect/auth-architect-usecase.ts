import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { EncryptVerify } from '../port/encrypt/encrypt-verify';
import { JwtSign } from '../port/encrypt/jwt-sign';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { Validator } from '../../shared/interface/validator';
import { AuthError } from '../../shared/errors/auth-error';
import { AuthArchitectRequest } from './domain/auth-architect-request';
import { AuthArchitectResponse } from './domain/auth-architect-response';
import { ArchitectRepository } from '../port/repositories/architect-repository';
import { ArchitectNotFoundError } from '../../shared/errors/architect-not-found-error';

export interface AuthArchitectUsecase extends Usecase<AuthArchitectRequest, AuthArchitectResponse> {}

export interface EncryptVerifyAndSign extends EncryptVerify, JwtSign {}
@injectable()
export class AuthArchitect implements AuthArchitectUsecase {
  constructor(
    @inject('ArchitectRepository')
    private readonly repository: ArchitectRepository,
    @inject('Encrypt')
    private readonly encrypt: EncryptVerifyAndSign,
    @inject('AuthValidator')
    private readonly validator: Validator<AuthArchitectRequest>,
  ) {}

  async execute(payload: AuthArchitectRequest): Promise<AuthArchitectResponse> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const architect = await this.repository.findOne({ email: payload.email });

      if (!architect) {
        throw new ArchitectNotFoundError();
      }

      const isPasswordMatch = this.encrypt.encryptVerify(payload.password, architect.password);

      if (!isPasswordMatch) {
        throw new AuthError();
      }
      delete architect.password;
      const token = this.encrypt.jwtSign(architect);

      return { token };
    } catch (error) {
      throw error;
    }
  }

}
