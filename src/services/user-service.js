const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/serverConfig');
const bcrypt=require('bcrypt');
const AppErrors = require('../utils/error-handler');
class UserService{
  constructor(){
    this.userRepository=new UserRepository();
  }
  async create(body){
    try {
    const user= await this.userRepository.create(body);
    return user;
    } catch (error) {
      if(error.name=='SequelizeValidationError'){
        throw error;
      }
     console.log('something went wrong in service layer');
      throw new AppErrors(
        'ServerError',
        'Something went wrong in Service',
        'Logical issue found',
        500
      )
    }
  }
   async signIn(email,userPlainPassword){
     try {
      const user= await this.userRepository.getByEmail(email);
    const encryptedPassword=user.password;
     const compare=this.comparePassword(userPlainPassword,encryptedPassword);
     if(!compare){
      throw {error:'passwords do not match'};
     }
    const newJWT=this.createToken({email:user.email,id:user.id});
    return newJWT;
     } catch (error) {
       console.log('something went wrong in service layer');
      throw error
     }
   }

   async isAuthenticated(token){
       try {
         const response=  this.verifyToken(token);
         if(!response){
          throw{error:'Invalid token'};
         }
         const user= await this.userRepository.getUser(response.id);
         if(!user){
          throw {error:'User does not exist'}
         }
         return user.id
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

  async isAdmin(userId){
    try {
      const response= await this.userRepository.isAdmin(userId);
      return response;
    } catch (error) {
       console.log('something went wrong in comparing password');
      throw error
    }
  }
  }




module.exports=UserService;