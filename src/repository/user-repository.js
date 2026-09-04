const  ValidationError  = require('../utils/validation-error');
const {User,Role}=require('../models/index');
const ClientError =require('../utils/client-error');
const { StatusCodes } = require('http-status-codes');
class UserRepository{
  async create(body){
    try {
      const user=await User.create(body);
    return user;
    } catch (error) {
      if(error.name=='SequelizeValidationError'){
        const validationError=new ValidationError(error);
        throw validationError
      }
      console.log('something went wrong in repository layer');
      throw error;
    }
  }
  async destroy(userId){
    try {
      await User.destroy({
      where:{
        id:userId
      }
    })
    } catch (error) {
            console.log('something went wrong in repository layer');
          throw error;
    }
  }
  async getUser(userId){
    try {
      const user=await User.findByPk(userId,{
        attributes:['email','id']
      })
      return user;
    } catch (error) {
       console.log('something went wrong in repository layer');
          throw error;
    }
  }
  async getByEmail(userEmail){
    try {
       const user=await User.findOne({
        where:{
          email:userEmail
        }
       });
       if(!user){
        throw new ClientError(
          'AttributeNotFound',
          'Invalid email sent',
          'Please check email',
          StatusCodes.NOT_FOUND
        )
       }
       return user;
    } catch (error) {
      console.log('something went wrong in repository layer');
          throw error;
    }
  }

  async isAdmin(userId){
    try {
      const user= await User.findByPk(userId);
      const adminRole=await Role.findOne({
        where:{
          name:'ADMIN'
        }
      });
      const response=await user.hasRole(adminRole);
      return response;
    } catch (error) {
      console.log('something went wrong in repository layer');
          throw error;
    }
  }
}

module.exports=UserRepository;