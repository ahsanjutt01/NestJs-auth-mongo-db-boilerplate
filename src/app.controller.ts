/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './_dtos/user.dto';

import { UserService } from 'src/services/user/user.service';
import { CreatePostDTO } from './_dtos/post.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from './_util/multer.config';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly UserService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  async signup(@Body() CreateUserDTO: CreateUserDTO) {
    return await this.UserService.create(CreateUserDTO);
  }

  @Post('login')
  async login(@Body() CreateUserDTO: CreateUserDTO) {
    console.log('CreatePostDTO ', CreateUserDTO);
    return await this.UserService.login(CreateUserDTO);
  }

  @Post('post')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  createPost(
    // @Body() post: CreatePostDTO,
    @UploadedFiles() files,
  ) {
    // console.log('file =>> ', files);
    const response = [];
    files.forEach((file) => {
      response.push(file.path);
    });
    return response;
  }

  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    // save letter into database with mockups created or not boolean value
    // isMockups created
    return res.sendFile(image, { root: './images' });
  }
}
