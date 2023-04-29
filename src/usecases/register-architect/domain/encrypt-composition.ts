import { EncryptEncode } from '../../port/encrypt/encrypt-encode';
import { JwtSign } from '../../port/encrypt/jwt-sign';

export interface EncryptComposition extends EncryptEncode, JwtSign {}
