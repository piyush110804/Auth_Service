const {User}=require('../models/index');

class UserRepository{
  async create(body){
    try {
      const user=await User.create(body);
    return user;
    } catch (error) {
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
}

module.exports=UserRepository;