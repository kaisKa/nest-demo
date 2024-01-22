/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }



    create(createUserDto: CreateUserDto) {
        throw this.usersService.create(createUserDto)
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        // if (user && user.password === pass) {
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    // async signIn(email: string, pass: string) {
    //     const user = await this.usersService.findByEmail(email)
    //     console.log("here is the user mail "+user?.email)
    //     if (user?.password !== pass)
    //         throw new UnauthorizedException();

    //     const payload = { sub: user.userId, email: user.email };
    //     return {
    //         access_token: await this.jwtService.signAsync(payload),
    //     };

    // }

    async login(user: Users) {
        const payload = { sub: user.userId, email: user.email, roles: user.roles }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    listAll() {
        return this.usersService.findAll();
    }

}
