const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/serverConfig');
class UserService{
  constructor(){
    this.userRepository=new UserRepository();
  }
  async create(body){
    try {
    const user= await this.userRepository.create(body);
    return user;
    } catch (error) {
     console.log('something went wrong in service layer');
      throw error
    }
  }
   createToken(user){
   try {
      const token=jwt.sign(user,JWT_SECRET,{
      expiresIn:'1h'
      });
      return token;
   } catch (error) {
    console.log('something went wrong in service layer');
      throw error
   }
  }
  verifyToken(token){
    try {
      const data=jwt.verify(token,JWT_SECRET);
      return data;
    } catch (error) {
       console.log('something went wrong in service layer');
      throw error
    }
  }
}

module.exports=UserService;