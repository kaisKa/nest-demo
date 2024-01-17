/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
    @((InjectMapper as any)()) private readonly classMapper: Mapper,
  ) { }




  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (checkUser)
      throw new HttpException('User Already exist', HttpStatus.CONFLICT);
    const user = await this.classMapper.map(createUserDto, CreateUserDto, Users);
    user.password = await this.hashPassword(createUserDto.password)
    return await this.userRepository.save(user)
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email })
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

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }


}
