import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The author of the message',
    example: 'John Doe',
    type: 'string',
  })
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the message',
    type: 'string',
    format: 'longtext',
    example: 'This is a long text message.',
  })
  content: string;
}
