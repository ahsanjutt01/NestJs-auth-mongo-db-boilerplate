/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';

// const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
