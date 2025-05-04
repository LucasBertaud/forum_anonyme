import { Test, TestingModule } from '@nestjs/testing';
import { ActivePseudoController } from './active-pseudo.controller';
import { ActivePseudoService } from './active-pseudo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActivePseudo } from './entities/active-pseudo.entity';

describe('ActivePseudoController', () => {
  let controller: ActivePseudoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivePseudoController],
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

    controller = module.get<ActivePseudoController>(ActivePseudoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
