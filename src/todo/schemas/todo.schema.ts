import * as moongoose from 'mongoose';

export const todoSchema = new moongoose.Schema({
  title: String,
  description: String,
  status: String,
  userId: String,
});
