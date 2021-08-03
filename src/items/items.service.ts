import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    const itemFound = await this.itemModel.findOne({ _id: id });
    if (!itemFound) {
      throw new NotFoundException(
        `The item with this id ${id} not found. Please enter the correct id`,
      );
    }
    return itemFound;
  }

  async create(item: Item): Promise<Item> {
    const addedItem = new this.itemModel(item);
    return await addedItem.save();
  }

  async delete(id: string): Promise<Item> {
    const itemFound = await this.itemModel.findById(id);
    if (!itemFound) {
      throw new NotFoundException(
        `The item with this id ${id} already not exists. Please enter the correct id`,
      );
    }
    return await this.itemModel.findByIdAndDelete(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
