/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Post extends Document {
  readonly title: string;
  readonly tags: string;
  readonly imageUrl: string[];
  readonly created_at: Date;
}
