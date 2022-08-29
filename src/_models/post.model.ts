/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';

// const Schema = mongoose.Schema;

export const PostSchema = new mongoose.Schema({
  title: String,
  tags: String,
  imageUrl: Array,
});
