import * as moongoose from 'mongoose';

export const ItemSchema = new moongoose.Schema({
  name: String,
  quantity: Number,
  desc: String,
});
