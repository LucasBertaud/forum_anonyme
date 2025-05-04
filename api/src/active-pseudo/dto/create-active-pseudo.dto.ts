import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivePseudoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The pseudo of the active pseudo',
    example: 'user123',
  })
  pseudo: string;
}
