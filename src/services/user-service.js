const UserRepository=require('../repository/user-repository');

class UserService{
  constructor(){
    this.userRepository=new UserRepository();
  }
  async create(body){
    try {
    const user= await this.userRepository.create(body);
    return user;
    } catch (error) {
     console.log('something went wrong in repository layer');
      throw error
    }
  }
}

module.exports=UserService;