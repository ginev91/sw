jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';


describe('UserService', () => {
  let service: UserService;
  let userRepo: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    userRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should call findOne with email', async () => {
      const user = { id: 1, email: 'test@test.com' } as User;
      userRepo.findOne!.mockResolvedValue(user);
      const result = await service.findByEmail('test@test.com');
      expect(result).toBe(user);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
    });
  });

  describe('create', () => {
    it('should hash password, create and save user', async () => {
      const email = 'a@a.com', password = 'pass';
      const hashed = 'hashedpass';
     (bcrypt.hash as jest.Mock).mockResolvedValue(hashed);

      const user = { email, password: hashed } as User;
      userRepo.create!.mockReturnValue(user);
      userRepo.save!.mockResolvedValue(user);

      const result = await service.create(email, password);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(userRepo.create).toHaveBeenCalledWith({ email, password: hashed });
      expect(userRepo.save).toHaveBeenCalledWith(user);
      expect(result).toBe(user);
    });
  });

  describe('validateUser', () => {
  it('should return user without password if valid', async () => {
    const email = 'b@b.com', password = 'pass';
    const user = { id: 1, email, password: 'hashed' } as User;
    service.findByEmail = jest.fn().mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  
    const result = await service.validateUser(email, password);
  
    expect(service.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual({ id: 1, email });
  });

    it('should return null if user not found', async () => {
      service.findByEmail = jest.fn().mockResolvedValue(undefined);
      const result = await service.validateUser('none@none.com', 'x');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      service.findByEmail = jest.fn().mockResolvedValue({ id: 1, email: 'x', password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await service.validateUser('x', 'y');
      expect(result).toBeNull();  
    });
  });

  describe('findOne', () => {
    it('should call findOne with id', async () => {
      const user = { id: 777 } as User;
      userRepo.findOne!.mockResolvedValue(user);
      const result = await service.findOne(777);
      expect(result).toBe(user);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 777 } });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1 }, { id: 2 }] as User[];
      userRepo.find!.mockResolvedValue(users);
      const result = await service.findAll();
      expect(result).toBe(users);
      expect(userRepo.find).toHaveBeenCalled();
    });
  });

  describe('activateUser', () => {
    it('should set deactivated=false and save', async () => {
      const user = { id: 1, deactivated: true } as User;
      userRepo.findOne!.mockResolvedValue(user);
      userRepo.save!.mockResolvedValue({ ...user, deactivated: false });
      const result = await service.activateUser(1);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepo.save).toHaveBeenCalledWith({ ...user, deactivated: false });
      expect(result).toEqual({ ...user, deactivated: false });
    });

    it('should return null if user not found', async () => {
      userRepo.findOne!.mockResolvedValue(undefined);
      const result = await service.activateUser(999);
      expect(result).toBeNull();
    });
  });

  describe('deactivateUser', () => {
    it('should set deactivated=true and save', async () => {
      const user = { id: 2, deactivated: false } as User;
      userRepo.findOne!.mockResolvedValue(user);
      userRepo.save!.mockResolvedValue({ ...user, deactivated: true });
      const result = await service.deactivateUser(2);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
      expect(userRepo.save).toHaveBeenCalledWith({ ...user, deactivated: true });
      expect(result).toEqual({ ...user, deactivated: true });
    });

    it('should return null if user not found', async () => {
      userRepo.findOne!.mockResolvedValue(undefined);
      const result = await service.deactivateUser(55);
      expect(result).toBeNull();
    });
  });
});