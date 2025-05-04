import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateActivePseudoDto } from './create-active-pseudo.dto';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateActivePseudoDto extends PartialType(CreateActivePseudoDto) {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: 'The expiration date of the active pseudo',
    example: '2023-10-01T00:00:00Z',
    required: false,
  })
  expiredAt?: Date;
}
