import * as moongoose from 'mongoose';

export const ItemSchema = new moongoose.Schema({
  username: String,
  Email: String,
  Password: String,
});
