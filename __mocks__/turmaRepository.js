// __mocks__/userRepository.js
const mockuserRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };
  //console.log('mockuserRepository', mockuserRepository);
  
  export default mockuserRepository;
