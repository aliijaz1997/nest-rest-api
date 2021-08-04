import * as moongoose from 'mongoose';

export const UserSchema = new moongoose.Schema({
  username: String,
  email: String,
  password: String,
});
