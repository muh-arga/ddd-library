const MemberRepositoryImpl = require('../MemberRepositoryImpl');
const prisma = require('../prisma/prismaClient');

jest.mock('../prisma/prismaClient', () => ({
  member: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('MemberRepositoryImpl', () => {
  let memberRepositoryImpl;

  beforeEach(() => {
    memberRepositoryImpl = new MemberRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByCode', () => {
    it('should call prisma.member.findUnique', async () => {
      const mockMember = {
        code: 'M001',
        name: 'John Doe',
        borrowedBooks: [],
      };

      prisma.member.findUnique.mockResolvedValue(mockMember);

      const result = await memberRepositoryImpl.findByCode('M001');

      expect(prisma.member.findUnique).toHaveBeenCalledWith({
        where: {
          code: 'M001',
        },
        include: {
          borrowedBooks: {
            where: { returnedAt: null },
          },
        },
      });
      expect(result).toEqual(mockMember);
    });
  });

  describe('save', () => {
    it('should call prisma.member.upsert', async () => {
      const mockMember = {
        code: 'M001',
        name: 'John Doe',
        penaltyUntil: null,
      };

      prisma.member.upsert.mockResolvedValue(mockMember);

      const result = await memberRepositoryImpl.save(mockMember);

      expect(prisma.member.upsert).toHaveBeenCalledWith({
        where: { code: 'M001' },
        update: {
          name: 'John Doe',
          penaltyUntil: null,
        },
        create: {
          code: 'M001',
          name: 'John Doe',
          penaltyUntil: null,
        },
      });
      expect(result).toEqual(mockMember);
    });
  });

  describe('findAll', () => {
    it('should call prisma.member.findMany', async () => {
      const mockMembers = [
        {
          code: 'M001',
          name: 'John Doe',
          borrowedBooks: [],
        },
        {
          code: 'M002',
          name: 'Jane Doe',
          borrowedBooks: [],
        },
      ];

      prisma.member.findMany.mockResolvedValue(mockMembers);

      const result = await memberRepositoryImpl.findAll();

      expect(prisma.member.findMany).toHaveBeenCalledWith({
        include: {
          borrowedBooks: {
            where: { returnedAt: null },
          },
        },
      });
      expect(result).toEqual(mockMembers);
    });
  });
});
