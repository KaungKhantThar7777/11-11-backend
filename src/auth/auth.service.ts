import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1 day',
    });
  }

  verify(token: string) {
    try {
      const result = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
