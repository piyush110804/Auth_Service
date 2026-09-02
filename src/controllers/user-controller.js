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

const signIn=async(req,res)=>{
    try {
      const response=await userService.signIn(req.body.email,req.body.password);
         return res.status(201).json({
    data:response,
    message:'successfully signed in',
    success:true,
    err:{},
  })
    } catch (error) {
       console.log(error);
      return res.status(500).json({
    data:{},
    message:'Something went wrong',
    success:false,
    err:{},
  })
    
    }
}

const isAuthenticated=async (req,res)=>{
   try {
    const token=req.headers['x-access-token'];
     const response= await userService.isAuthenticated(token);
     return res.status(200).json({
       data:response,
    message:'user is authenticated and token is valid',
    success:true,
    err:{},
     })
   } catch (error) {
       console.log(error);
      return res.status(500).json({
    data:{},
    message:'Something went wrong',
    success:false,
    err:{},
   })
}
}
const isAdmin= async (req,res)=>{
  try {
    const response=await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data:response,
    message:'sucessfully fetched whether user is admin or not',
    success:true,
    err:{},
    })

  } catch (error) {
    console.log(error);
     return res.status(500).json({
    data:{},
    message:'Something went wrong',
    success:false,
    err:{},
   })
    
  }
}
module.exports={
  create,
  signIn,
  isAuthenticated,
  isAdmin
}