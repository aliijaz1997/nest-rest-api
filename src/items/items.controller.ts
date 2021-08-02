import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Request, Response } from 'express';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(@Req() req: Request, @Res() res: Response): Response {
    console.log(req.url);
    return res.send(
      'These are the all items in response to the corresponding request',
    );
  }

  //   @Get(':id')
  //   findOne(@Param() param): string {
  //     return `This is the page of item number ${param.id}`;
  //   }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This is the page of item number ${id}`;
  }

  @Post()
  create(@Body() createItemDto: Item): string {
    return `The name of the item is ${createItemDto.name} and the 
    description is ${createItemDto.desc}. Number of quantity required is ${createItemDto.quantity}
    `;
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return `The deleted item is ${id}`;
  }
}
