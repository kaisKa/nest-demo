import { AutoMap } from "@automapper/classes";
import { Role } from "src/models/role.enum";

/* eslint-disable prettier/prettier */
export class CreateUserDto {

    @AutoMap()
    userId: string;

    @AutoMap()
    email: string;

    @AutoMap()
    password: string;
    @AutoMap()
    status: string;
    @AutoMap()
    roles: Role[]
}
