export interface Encrypt {
  encrypt(password: string): string;
  verify(password: string, hash: string):boolean;
  jwtGenerate(body: any): string;
  jwtVerify(token: string): any;
}
