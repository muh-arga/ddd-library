const prisma = require("./prisma/prismaClient");
const MemberRepository = require("../../domain/member/MemberRepository");

class MemberRepositoryImpl extends MemberRepository {
  async findByCode(code) {
    return await prisma.member.findUnique({
      where: { code },
      include: {
        borrowedBooks: {
          where: { returnedAt: null },
        },
      },
    });
  }

  async save(member) {
    return await prisma.member.upsert({
      where: { code: member.code },
      update: {
        name: member.name,
        penaltyUntil: member.penaltyUntil,
      },
      create: {
        code: member.code,
        name: member.name,
        penaltyUntil: member.penaltyUntil,
      },
    });
  }

  async findAll() {
    return await prisma.member.findMany({
      include: {
        borrowedBooks: {
          where: { returnedAt: null },
        },
      },
    });
  }
}

module.exports = MemberRepositoryImpl;
