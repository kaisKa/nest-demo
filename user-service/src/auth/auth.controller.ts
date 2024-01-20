/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SkipAuth } from './skip-auth.decorator';
import { RolesGuard } from './roles.guard';
import { HasRoles } from './has-role.decorator';
import { Role } from 'src/models/role.enum';
import { userProviders } from 'src/users/user.providers';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @SkipAuth()
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }
    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any, @Body() siginDto: SignInDto) {
        return this.authService.login(req.user)
    }


    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user
    }


    @Get('list-all')
    @UseGuards(RolesGuard)
    @HasRoles(Role.Admin)
    @ApiBearerAuth()
    getAllUser() {
        return this.authService.listAll()
    }
}
