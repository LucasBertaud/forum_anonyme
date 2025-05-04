import { Test, TestingModule } from '@nestjs/testing';
import { ActivePseudoService } from './active-pseudo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActivePseudo } from './entities/active-pseudo.entity';
import { Repository } from 'typeorm';

describe('ActivePseudoService', () => {
  let service: ActivePseudoService;
  let repositoryMock: jest.Mocked<Repository<ActivePseudo>>;

  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivePseudoService,
        {
          provide: getRepositoryToken(ActivePseudo),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ActivePseudoService>(ActivePseudoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new active pseudo', async () => {
      const createDto = { pseudo: 'user123' };
      const savedEntity = {
        pseudo: 'user123',
        expiredAt: new Date(),
        setExpirationDate: jest.fn(),
      };

      repositoryMock.create.mockReturnValue(savedEntity);
      repositoryMock.save.mockResolvedValue(savedEntity);

      const result = await service.create(createDto);

      expect(repositoryMock.create).toHaveBeenCalledWith(createDto);
      expect(repositoryMock.save).toHaveBeenCalledWith(savedEntity);
      expect(result).toEqual(savedEntity);
    });
  });

  describe('findAll', () => {
    it('should return all active pseudos', async () => {
      const activePseudos = [
        {
          pseudo: 'user123',
          expiredAt: new Date(),
          setExpirationDate: jest.fn(),
        },
      ];
      repositoryMock.find.mockResolvedValue(activePseudos);

      const result = await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled();
      expect(result).toEqual(activePseudos);
    });
  });

  describe('findOne', () => {
    it('should return an active pseudo by pseudo', async () => {
      const activePseudo = {
        pseudo: 'user123',
        expiredAt: new Date(),
        setExpirationDate: jest.fn(),
      };
      repositoryMock.findOne.mockResolvedValue(activePseudo);

      const result = await service.findOne('user123');

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { pseudo: 'user123' },
      });
      expect(result).toEqual(activePseudo);
    });
  });

  describe('update', () => {
    it('should update an active pseudo', async () => {
      const updateDto = { expiredAt: new Date() };
      const existingPseudo = {
        pseudo: 'user123',
        expiredAt: new Date(),
        setExpirationDate: jest.fn(),
      };

      repositoryMock.findOne.mockResolvedValue(existingPseudo);
      repositoryMock.findOne.mockResolvedValue({
        ...existingPseudo,
        ...updateDto,
      });

      const result = await service.update('user123', updateDto);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { pseudo: 'user123' },
      });
      expect(repositoryMock.update).toHaveBeenCalledWith('user123', updateDto);
      expect(result).toEqual({ ...existingPseudo, ...updateDto });
    });

    it('should throw an error if pseudo is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(
        service.update('user123', { expiredAt: new Date() }),
      ).rejects.toThrow('Message not found');
    });
  });

  describe('remove', () => {
    it('should delete an active pseudo', async () => {
      const activePseudo = {
        pseudo: 'user123',
        expiredAt: new Date(),
        setExpirationDate: jest.fn(),
      };
      repositoryMock.findOne.mockResolvedValue(activePseudo);

      await service.remove('user123');

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { pseudo: 'user123' },
      });
      expect(repositoryMock.delete).toHaveBeenCalledWith('user123');
    });

    it('should throw an error if pseudo is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.remove('user123')).rejects.toThrow(
        'Message not found',
      );
    });
  });
});
