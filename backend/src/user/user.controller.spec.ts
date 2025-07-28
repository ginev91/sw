import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from './guard/roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { UserRole } from './enums/user-role.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    deactivateUser: jest.fn(),
    activateUser: jest.fn(),
  };

  class MockRolesGuard {å
    canActivate(context: ExecutionContext) {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call userService.findAll and return the result', async () => {
      const users = [{ id: 1 }, { id: 2 }];
      mockUserService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toBe(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('deactivateUser', () => {
    it('should call userService.deactivateUser with the given id', async () => {
      const user = { id: 1, active: false };
      mockUserService.deactivateUser.mockResolvedValue(user);

      const result = await controller.deactivateUser(1);
      expect(result).toBe(user);
      expect(mockUserService.deactivateUser).toHaveBeenCalledWith(1);
    });
  });

  describe('activateUser', () => {
    it('should call userService.activateUser with the given id', async () => {
      const user = { id: 1, active: true };
      mockUserService.activateUser.mockResolvedValue(user);

      const result = await controller.activateUser(1);
      expect(result).toBe(user);
      expect(mockUserService.activateUser).toHaveBeenCalledWith(1);
    });
  });

  describe('getProfile', () => {
    it('should return req.user', () => {
      const req: any = { user: { id: 1, username: 'test', roles: [UserRole.USER] } };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});