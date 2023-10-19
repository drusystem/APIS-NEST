import { Module } from '@nestjs/common';
import { ReceiptiesService } from './receipties.service';
import { ReceiptiesController } from './receipties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipty } from './entities/receipty.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Receipty])],
  controllers: [ReceiptiesController],
  providers: [ReceiptiesService],
})
export class ReceiptiesModule {}
