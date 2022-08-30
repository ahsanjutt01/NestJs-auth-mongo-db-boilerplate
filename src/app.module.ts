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
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtStrategy } from './guards/jwt.setrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000m' },
    }),
    MulterModule.register({
      dest: './' + process.env.UPLOAD_LOCATION,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/myapp'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService, UserService, PostService],
})
export class AppModule {}
