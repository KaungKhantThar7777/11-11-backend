import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Me } from 'src/auth/me.decorator';
import { Public } from 'src/auth/meta/public.meta';
import { GetUserByIdInput, GetUserByIdResult } from './dtos/get-user-by-id';
import { GetUsersResult, GetUsersInput } from './dtos/get-users';
import { LoginInput, LoginResult } from './dtos/login.dto';
import { MeResult } from './dtos/me';
import { SignUpInput, SignUpResult } from './dtos/signup.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => GetUserByIdResult)
  async getUserById(@Args('input') input: GetUserByIdInput) {
    const user = await this.userService.findById(`${input.id}`);
    return {
      ok: true,
      user,
    };
  }
  @Public()
  @Mutation(() => SignUpResult)
  async signup(@Args('input') input: SignUpInput) {
    try {
      const user = await this.userService.signup(input);
      const payload = { sub: user.id };
      const token = this.authService.sign(payload);
      return { ok: true, token, id: user.id };
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        return { ok: false, error: 'Email is already used' };
      }
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
      return {
        ok: true,
        token,
        id: user.id,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
      };
    }
    return { ok: false, error: 'Invalid email/password', token: null };
  }

  @Query(() => GetUsersResult)
  async getUsersByDepartment(@Args('input') input: GetUsersInput) {
    const [users, totalCount] = await this.userService.getUsersByDepartment(
      input,
    );

    return {
      ok: true,
      users,
      totalCount,
    };
  }

  @Query(() => MeResult)
  me(@Me() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
