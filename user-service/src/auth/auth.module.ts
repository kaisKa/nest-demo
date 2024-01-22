/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStartegy } from './jwt.startegy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStartegy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [AuthService],

})
export class AuthModule { }
