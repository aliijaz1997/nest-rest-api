import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';
@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
})
export class ItemsModule {}
