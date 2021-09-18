import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  verify(token: string) {
    console.log(process.env.JWT_SECRET, token);
    const result = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log(result);
    return result;
  }
}
