/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, createMap, createMapper, forMember, ignore } from "@automapper/core";
import { CreateUserDto } from "./create-user.dto";
import { Users } from "../entities/user.entity";
import { UpdateUserDto } from "./update-user.dto";


@Injectable()
export class ProductMapper extends AutomapperProfile {
    constructor(
        @((InjectMapper as any)()) mapper: Mapper
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, CreateUserDto, Users, forMember(dest => dest.userId, ignore()))
            createMap(mapper, UpdateUserDto, Users)
            createMap(mapper, Users, CreateUserDto)
            createMap(mapper, UpdateUserDto, Users)
            createMap(mapper, Users, UpdateUserDto)
        }

    }
}