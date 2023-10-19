import { PartialType } from '@nestjs/swagger';
import { CreateReceiptyDto } from './create-receipty.dto';

export class UpdateReceiptyDto extends PartialType(CreateReceiptyDto) {}
