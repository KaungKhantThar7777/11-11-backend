import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PUB_SUB } from './common.contstants';

const pubSub = new PubSub();

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    { provide: PUB_SUB, useValue: pubSub },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PUB_SUB],
})
@Global()
export class CommonModule {}
