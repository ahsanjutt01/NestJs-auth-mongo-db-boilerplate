/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';
import { PostService } from './services/post/post.service';
import { UserSchema } from './_models/user.model';
import { PostSchema } from './_models/post.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myapp'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService],
})
export class AppModule {}
