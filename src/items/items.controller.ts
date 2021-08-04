import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createItemDto: Item): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Body() updateItemDto: Item, @Param('id') id: string): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}
