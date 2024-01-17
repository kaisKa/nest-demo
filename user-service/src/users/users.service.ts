/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
    @((InjectMapper as any)()) private readonly classMapper: Mapper,
  ) { }


  

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(this.classMapper.map(createUserDto,CreateUserDto,Users))
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email:string){
    return await this.userRepository.findOneBy({email: email})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
