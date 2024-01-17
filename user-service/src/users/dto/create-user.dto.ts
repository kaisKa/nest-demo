import { AutoMap } from "@automapper/classes";

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
}
