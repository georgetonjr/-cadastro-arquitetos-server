export interface Encrypt {
  encrypt(password: string): string;
  verify(password: string, hash: string):boolean;
  jwtGenerate(body: Object): string;
  jwtVerify(token: string): any;
}
