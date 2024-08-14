const MemberRepository = require('../MemberRepository');

describe('MemberRepository', () => {
  let memberRepository;

  beforeEach(() => {
    memberRepository = new MemberRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when findByCode method is not implemented', async () => {
    await expect(memberRepository.findByCode()).rejects.toThrow('Method Not Implemented');
  });

  it('should throw an error when save method is not implemented', async () => {
    await expect(memberRepository.save()).rejects.toThrow('Method Not Implemented');
  });

  it('should throw an error when findAll method is not implemented', async () => {
    await expect(memberRepository.findAll()).rejects.toThrow('Method Not Implemented');
  });
});
