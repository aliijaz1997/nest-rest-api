import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';
@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    AuthModule,
  ],
})
export class ItemsModule {}
