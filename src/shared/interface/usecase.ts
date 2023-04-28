export interface Usecase<TUsecaseInput, TUsecaseOutput> {
  execute(payload: TUsecaseInput): TUsecaseOutput;
}
