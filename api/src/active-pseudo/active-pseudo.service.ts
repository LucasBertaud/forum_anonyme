import { Injectable } from '@nestjs/common';
import { CreateActivePseudoDto } from './dto/create-active-pseudo.dto';
import { UpdateActivePseudoDto } from './dto/update-active-pseudo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivePseudo } from './entities/active-pseudo.entity';
import { LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ActivePseudoService {
  constructor(
    @InjectRepository(ActivePseudo)
    private repository: Repository<ActivePseudo>,
  ) {}

  create(createMessageDto: CreateActivePseudoDto) {
    const entity = this.repository.create(createMessageDto);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(pseudo: string) {
    return this.repository.findOne({ where: { pseudo } });
  }

  async update(pseudo: string, updateMessageDto: UpdateActivePseudoDto) {
    const message = await this.repository.findOne({ where: { pseudo } });
    if (!message) {
      throw new Error('Message not found');
    }
    await this.repository.update(pseudo, updateMessageDto);
    return this.repository.findOne({ where: { pseudo } });
  }

  async remove(pseudo: string) {
    const message = await this.repository.findOne({ where: { pseudo } });
    if (!message) {
      throw new Error('Message not found');
    }
    await this.repository.delete(pseudo);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeInactivePseudo() {
    const now = new Date();
    await this.repository.delete({
      expiredAt: LessThan(now),
    });
  }
}
