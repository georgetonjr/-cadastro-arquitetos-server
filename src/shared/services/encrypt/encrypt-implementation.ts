import crypto from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../../config';
import { EncryptEncode } from '../../../usecases/port/encrypt/encrypt-encode';
import { EncryptVerify } from '../../../usecases/port/encrypt/encrypt-verify';
import { JwtSign } from '../../../usecases/port/encrypt/jwt-sign';
import { JwtVerify } from '../../../usecases/port/encrypt/jwt-verify';


export class EncryptImplementation implements EncryptEncode, EncryptVerify, JwtSign, JwtVerify {
  private readonly salt = 10;

  jwtSign(data: Object): string {
    return sign(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data,
      }), config.JWT_SECRET,
    );
  }

  jwtVerify(token: string) {
    return verify(token, config.JWT_SECRET);
  }

  encryptVerify(password: string, hash: string): boolean {
    return crypto.compareSync(password, hash);
  }

  encryptEncode(password: string) {
    return crypto.hashSync(password, this.salt);
  }
}
