/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProductMapper } from './dto/mapper.profile';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  // controllers: [UsersController],
  providers: [...userProviders,ProductMapper,UsersService],
  exports: [UsersService]
})
export class UsersModule {}
