/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AutomapperModule.forRoot({strategyInitializer: classes()}),ProductsModule, DatabaseModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
