const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/serverConfig');
const bcrypt=require('bcrypt');
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
   async signIn(email,userPlainPassword){
    const user= await this.userRepository.getByEmail(email);
    const encryptedPassword=user.password;
     const compare=this.comparePassword(userPlainPassword,encryptedPassword);
     if(!compare){
      throw {error:'passwords do not match'};
     }
    const newJWT=this.createToken({email:user.email,id:user.id});
    return newJWT;
   }
   createToken(user){
   try {
      const token=jwt.sign(user,JWT_SECRET,{
      expiresIn:'1h'
      });
      return token;
   } catch (error) {
    console.log('something went wrong in creation');
      throw error
   }
  }
  verifyToken(token){
    try {
      const data=jwt.verify(token,JWT_SECRET);
      return data;
    } catch (error) {
       console.log('something went wrong in verification');
      throw error
    }
  }

  comparePassword(userPlainPassword,encryptedPassword){
     try {
      return bcrypt.compareSync(userPlainPassword,encryptedPassword);
     } catch (error) {
        console.log('something went wrong in comparing password');
      throw error
    }
     }
  }


module.exports=UserService;