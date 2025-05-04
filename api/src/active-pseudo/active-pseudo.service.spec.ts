import { Test, TestingModule } from '@nestjs/testing';
import { ActivePseudoService } from './active-pseudo.service';
import { ActivePseudo } from './entities/active-pseudo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ActivePseudoService', () => {
  let service: ActivePseudoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivePseudoService,
        {
          provide: getRepositoryToken(ActivePseudo),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivePseudoService>(ActivePseudoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
