import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken"

class TokenService {
    sign(payload: JwtPayload, secret: Secret, options: SignOptions): string {
        return jwt.sign(payload, secret, options);
    }
    verify(token: string, secret: Secret): JwtPayload {
        return jwt.verify(token, secret) as JwtPayload;
    }
}

export default new TokenService();