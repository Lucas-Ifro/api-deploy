// __mocks__/prismaClient.js
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';

// Cria uma instância mock do PrismaClient
export const mockPrisma = mockDeep(PrismaClient);

// Mock do módulo cliente Prisma
jest.mock('../src/configs/prismaClient', () => ({
  __esModule: true,
  default: mockPrisma,
}));

beforeEach(() => {
  // Reseta os mocks antes de cada teste
  mockReset(mockPrisma);
});
