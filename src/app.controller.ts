/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './_dtos/user.dto';

import { UserService } from 'src/services/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly UserService: UserService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('signup')
  async signup(CreateUserDTO: CreateUserDTO) {
    return await this.UserService.create(CreateUserDTO);
  }

  @Post('login')
  async login(CreateUserDTO: CreateUserDTO) {
    return await this.UserService.login(CreateUserDTO);
  }

  // PROCESS:: IMAGE_UPLOADING_BULCK
  // @UseInterceptors(FileInterceptor('file', MulterOptions))
  // @Post('post')
  // createPost(
  //   // @Body() post: CreatePostDTO,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   console.log('file =>> ', file);
  //   return file;
  // }
}
