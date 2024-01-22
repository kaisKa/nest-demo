/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt } from "passport-jwt"
import { Strategy } from "passport-jwt"
import { jwtConstants } from "./constants"
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });

    }

    async validate(payload: any) {

       
        // u could add invokation to db to add more details of the user
        return { userId: payload.sub, email: payload.eamil, roles: payload.roles, }
    }
}
