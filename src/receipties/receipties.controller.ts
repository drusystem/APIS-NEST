import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceiptiesService } from './receipties.service';
import { CreateReceiptyDto } from './dto/create-receipty.dto';
import { UpdateReceiptyDto } from './dto/update-receipty.dto';

@Controller('receipties')
export class ReceiptiesController {
  constructor(private readonly receiptiesService: ReceiptiesService) {}

  @Post()
  create(@Body() createReceiptyDto: CreateReceiptyDto) {
    return this.receiptiesService.create(createReceiptyDto);
  }

  @Get()
  findAll() {
    return this.receiptiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptyDto: UpdateReceiptyDto) {
    return this.receiptiesService.update(+id, updateReceiptyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptiesService.remove(+id);
  }
}
