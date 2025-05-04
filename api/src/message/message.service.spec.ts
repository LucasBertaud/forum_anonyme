import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActivePseudoService } from '../active-pseudo/active-pseudo.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: ActivePseudoService,
          useValue: {
            findOne: jest
              .fn()
              .mockResolvedValue({ pseudo: 'testUser', expiredAt: new Date() }),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
