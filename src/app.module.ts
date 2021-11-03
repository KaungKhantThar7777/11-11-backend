import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './appointment/entities/appointment.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { Patient } from './patient/entities/patient.entity';
import { PatientModule } from './patient/patient.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Patient, Appointment, User],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      introspection: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectParams) => {
            return connectParams;
          },
        },
      },
      context: ({ req }) => {
        return { token: req.headers['token'] };
      },
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PatientModule,
    AppointmentModule,
    CommonModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
