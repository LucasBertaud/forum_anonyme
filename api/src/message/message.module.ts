import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ActivePseudoModule } from 'src/active-pseudo/active-pseudo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ActivePseudoModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
