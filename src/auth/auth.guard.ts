import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './meta/public.meta';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context).getContext();

    const token = ctx['token'];
    if (!token) {
      return false;
    }

    try {
      const decoded = this.authService.verify(token);
      const user = await this.userService.findById(decoded.sub);
      if (!user) {
        return false;
      }
      ctx.user = user;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
