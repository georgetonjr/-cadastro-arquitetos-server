export interface ValidatorResult<TPayload> {
  value: TPayload;
  errorFields: string[];
  isValid: boolean;
}

export interface Validator<TPayload> {
  validate(data:TPayload):ValidatorResult<TPayload>;
}
