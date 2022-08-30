/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as becrypt from 'bcrypt';

import { User } from 'src/interfaces/user.interface';
import { CreateUserDTO } from '../../_dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(CreateUserDTO: CreateUserDTO): Promise<any> {
    // hashing password and save user
    const password = CreateUserDTO.password;
    CreateUserDTO.password = await this.createHashedPassword(password);
    const createdUser = new this.UserModel(CreateUserDTO);
    const data = await createdUser.save();
    return {
      email: data.email,
      message: 'Signup Sucessful',
    };
  }

  async createHashedPassword(password: string) {
    return await becrypt.hash(password, 12);
  }
  async login(CreateUserDTO: CreateUserDTO): Promise<any> {
    const user = await this.UserModel.findOne({
      email: CreateUserDTO.email,
    }).exec();

    if (!user) {
      return { message: 'Email not found please login' };
    } else {
      const isPasswordCorrect = await becrypt.compare(
        CreateUserDTO.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const payload = { email: user.email };
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        });
        return {
          accessToken,
          message: 'Login successfully',
        };
      } else {
        return {
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
