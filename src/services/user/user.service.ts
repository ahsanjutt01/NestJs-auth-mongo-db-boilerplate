/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as becrypt from 'bcrypt';

import { User } from 'src/interfaces/user.interface';
import { CreateUserDTO } from '../../_dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<User>) {}

  async create(CreateUserDTO: CreateUserDTO): Promise<any> {
    // hashing password and save user
    const password = CreateUserDTO.password;
    CreateUserDTO.password = await this.createHashedPassword(password);
    const createdUser = new this.UserModel(CreateUserDTO);
    return createdUser.save();
  }

  async createHashedPassword(password: string) {
    return await becrypt.hash(password, 12);
  }
  async login(CreateUserDTO: CreateUserDTO): Promise<any> {
    const user = await this.UserModel.findOne({
      email: CreateUserDTO.email,
    }).exec();

    if (!user) {
      return null;
    } else {
      const isPasswordCorrect = await becrypt.compare(
        CreateUserDTO.password,
        user.password,
      );
      if (isPasswordCorrect) {
        return {
          accessToken: 'onGoing',
          message: 'Login successfully',
        };
      } else {
        return {
          access_token: null,
          message: 'Email and password are incorect',
        };
      }
    }
  }

  async updatePassword(CreateUserDTO: CreateUserDTO): Promise<any> {
    const password = CreateUserDTO.password;
    CreateUserDTO.password = await this.createHashedPassword(password);
    return await this.UserModel.findOneAndUpdate(
      { email: CreateUserDTO.email },
      CreateUserDTO,
      { new: true },
    );
  }
}
