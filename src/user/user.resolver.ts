import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/meta/public.meta';
import { LoginInput, LoginResult } from './dtos/login.dto';
import { SignUpInput, SignUpResult } from './dtos/signup.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => SignUpResult)
  async signup(@Args('input') input: SignUpInput) {
    try {
      await this.userService.signup(input);
      return {
        ok: true,
      };
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
    return { ok: false };
  }
}
