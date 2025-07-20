/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // it('should handle login successfully', async () => {
  //   const signInDto = { email: 'test@example.com', password: 'password' };
  //   const mockResult = { access_token: 'mock-token' };

  //   // jest.spyOn(AuthService, 'signIn').mockResolvedValue(mockResult);

  //   // const result = await controller.signIn(signInDto);
  //   // expect(result).toEqual(mockResult);
  //   // expect(AuthService.signIn).toHaveBeenCalledWith(signInDto);
  // });
});
