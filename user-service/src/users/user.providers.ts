/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import { Users } from "./entities/user.entity";


export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (datSource:DataSource) => datSource.getRepository(Users),
        inject: ['DATA_SOURCE']
  },
    
]