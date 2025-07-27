import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.users.validateUser(email, password);
  }

  async login(user: { id: number; email: string, role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = this.jwt.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
    return { 
      accessToken: accessToken, 
      refreshToken: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };  }

    async refresh(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken);
      const newAccessToken = this.jwt.sign({ sub: payload.sub, email: payload.email }, { expiresIn: '15m' });
      return { 
        accessToken: newAccessToken,
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role
        }
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}