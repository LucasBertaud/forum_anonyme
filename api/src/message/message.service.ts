import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return this.repository.save(createMessageDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.repository.findOne({ where: { id } });
    if (!message) {
      throw new Error('Message not found');
    }
    await this.repository.update(id, updateMessageDto);
    return this.repository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const message = await this.repository.findOne({ where: { id } });
    if (!message) {
      throw new Error('Message not found');
    }
    await this.repository.delete(id);
  }
}
