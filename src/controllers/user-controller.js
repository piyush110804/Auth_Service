const UserService=require('../services/user-service');

const userService=new UserService();

const create= async(req,res)=>{
 
  try {
     const response= await userService.create({
      email:req.body.email,
      password:req.body.password
     });
    return res.status(201).json({
    data:response,
    message:'successfully created a user',
    success:true,
    err:{},
  })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
    data:{},
    message:'Not able to create user',
    success:false,
    err:{},
  })
    
  }
}

module.exports={
  create
}