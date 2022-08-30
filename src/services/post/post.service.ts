/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../interfaces/post.interface';

import { CreatePostDTO } from '../../_dtos/post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private PostModel: Model<Post>) {}

  async createPost(CreatePostDTO: CreatePostDTO) {
    const createdPost = new this.PostModel(CreatePostDTO);
    return createdPost.save();
  }
}
