import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/meta/public.meta';
import { GetUsersResult, GetUsersInput } from './dtos/get-users';
import { LoginInput, LoginResult } from './dtos/login.dto';
import { SignUpInput, SignUpResult } from './dtos/signup.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => SignUpResult)
  async signup(@Args('input') input: SignUpInput) {
    try {
      const user = await this.userService.signup(input);
      const payload = { sub: user.id };
      const token = this.authService.sign(payload);
      return { ok: true, token };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Public()
  @Mutation(() => LoginResult)
  async login(@Args('input') { email, password }: LoginInput) {
    const user = await this.userService.findOne(email);

    if (user && (await user.verifyPassword(password))) {
      const payload = { sub: user.id };
      const token = this.authService.sign(payload);
      return { ok: true, token };
    }
    return { ok: false, error: 'Invalid email/password' };
  }

  @Query(() => GetUsersResult)
  async getUsersByDepartment(@Args('input') input: GetUsersInput) {
    const users = await this.userService.getUsersByDepartment(input);

    return {
      ok: true,
      users,
    };
  }
}
