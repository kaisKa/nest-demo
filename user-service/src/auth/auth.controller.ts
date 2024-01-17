/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SkipAuth } from './skip-auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req:any, @Body() siginDto:SignInDto) {
        return this.authService.login(req.user)
    }


    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req:any){
        return req.user
    }
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req: any) {
    //     return req.user;
    // }
}
