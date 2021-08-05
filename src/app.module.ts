import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './todo/Middleware/logger.middleware';
import { TodoController } from './todo/todo.controller';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ItemsModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TodoController);
  }
}
