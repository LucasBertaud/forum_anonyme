import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { ActivePseudoModule } from './active-pseudo/active-pseudo.module';
import { ActivePseudo } from './active-pseudo/entities/active-pseudo.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'forum_anonyme',
      entities: [Message, ActivePseudo],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    MessageModule,
    ActivePseudoModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
