import { Module } from '@nestjs/common';
import { ActivePseudoService } from './active-pseudo.service';
import { ActivePseudoController } from './active-pseudo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivePseudo } from './entities/active-pseudo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivePseudo])],
  controllers: [ActivePseudoController],
  providers: [ActivePseudoService],
  exports: [ActivePseudoService],
})
export class ActivePseudoModule {}
