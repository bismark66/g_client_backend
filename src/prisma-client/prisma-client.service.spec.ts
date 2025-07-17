import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from './prisma-client.service';

describe('PrismaClient', () => {
  let provider: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClient],
    }).compile();

    provider = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
