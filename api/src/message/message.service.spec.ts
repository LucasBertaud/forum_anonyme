import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ActivePseudoService } from '../active-pseudo/active-pseudo.service';
import { Repository } from 'typeorm';

describe('MessageService', () => {
  let service: MessageService;
  let repositoryMock: jest.Mocked<Repository<Message>>;
  let activePseudoServiceMock: jest.Mocked<ActivePseudoService>;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    activePseudoServiceMock = {
      findOne: jest.fn(),
      update: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getRepositoryToken(Message), useValue: repositoryMock },
        { provide: ActivePseudoService, useValue: activePseudoServiceMock },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new message and extend pseudo expiration', async () => {
      const createMessageDto = {
        id: 1,
        author: 'testUser',
        content: 'Hello World',
        date: new Date(),
      };
      activePseudoServiceMock.findOne.mockResolvedValue({
        pseudo: 'testUser',
        expiredAt: new Date(),
        setExpirationDate() {},
      });
      repositoryMock.save.mockResolvedValue(createMessageDto);

      const result = await service.create(createMessageDto);

      expect(activePseudoServiceMock.findOne).toHaveBeenCalledWith('testUser');
      expect(activePseudoServiceMock.update).toHaveBeenCalledWith(
        'testUser',
        expect.any(Object),
      );
      expect(repositoryMock.save).toHaveBeenCalledWith(createMessageDto);
      expect(result).toEqual(createMessageDto);
    });

    it('should throw an error if pseudo is not active', async () => {
      const createMessageDto = { author: 'testUser', content: 'Hello World' };
      activePseudoServiceMock.findOne.mockResolvedValue(null);

      await expect(service.create(createMessageDto)).rejects.toThrow(
        'Pseudo non actif ou inexistant',
      );
    });
  });

  describe('findAll', () => {
    it('should return all messages', async () => {
      const messages = [
        { id: 1, author: 'testUser', content: 'Hello', date: new Date() },
      ];
      repositoryMock.find.mockResolvedValue(messages);

      const result = await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled();
      expect(result).toEqual(messages);
    });
  });

  describe('findOne', () => {
    it('should return a message by id', async () => {
      const message = {
        id: 1,
        author: 'testUser',
        content: 'Hello',
        date: new Date(),
      };
      repositoryMock.findOne.mockResolvedValue(message);

      const result = await service.findOne(1);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(message);
    });
  });

  describe('update', () => {
    it('should update a message', async () => {
      const updateMessageDto = { content: 'Updated content' };
      const message = {
        id: 1,
        author: 'testUser',
        content: 'Hello',
        date: new Date(),
      };
      repositoryMock.findOne.mockResolvedValue(message);
      repositoryMock.findOne.mockResolvedValue({
        ...message,
        ...updateMessageDto,
      });

      const result = await service.update(1, updateMessageDto);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repositoryMock.update).toHaveBeenCalledWith(1, updateMessageDto);
      expect(result).toEqual({ ...message, ...updateMessageDto });
    });

    it('should throw an error if message is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, { content: 'Updated content' }),
      ).rejects.toThrow('Message not found');
    });
  });

  describe('remove', () => {
    it('should delete a message', async () => {
      const message = {
        id: 1,
        author: 'testUser',
        content: 'Hello',
        date: new Date(),
      };
      repositoryMock.findOne.mockResolvedValue(message);

      await service.remove(1);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if message is not found', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow('Message not found');
    });
  });
});
