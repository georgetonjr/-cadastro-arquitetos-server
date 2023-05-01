import { inject, injectable } from 'tsyringe';
import { Usecase } from '../../shared/interface/usecase';
import { Validator } from '../../shared/interface/validator';
import { InvalidDataError } from '../../shared/errors/invalid-data-error';
import { RegisterArchitectRequest } from './domain/register-architect-request';
import { RegisterArchitectResponse } from './domain/register-architect-response';
import { Architect } from '../../entities/architect';
import { ArchitectRepository } from '../port/repositories/architect-repository';
import { EncryptComposition } from './domain/encrypt-composition';

export interface RegisterArchitectUsecase extends Usecase<
RegisterArchitectRequest, 
RegisterArchitectResponse | Error
> {}

@injectable()
export class RegisterArchitect implements RegisterArchitectUsecase {
  constructor(
    @inject('ArchitectRepository')
    private readonly repository: ArchitectRepository,
    @inject('RegisterCustomerValidator')
    private readonly validator: Validator<RegisterArchitectRequest>,
    @inject('Encrypt')
    private readonly encrypt: EncryptComposition,
  ) {}
  
  async execute(payload: RegisterArchitectRequest): Promise<RegisterArchitectResponse | Error> {
    try {
      const { errorFields, isValid } = this.validator.validate(payload);
      if (!isValid) {
        throw new InvalidDataError(errorFields);
      }
      const customer = await this.buildArchitect(payload);
      const token = this.encrypt.jwtSign(customer);

      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async buildArchitect(data: RegisterArchitectRequest): Promise<Architect> {
    const architect = new Architect({
      ...data,
      password: this.encrypt.encryptEncode(data.password),
    });
    await this.repository.save(architect);
    delete architect.password;
    return architect;
  }
}
