const express=require('express');
const app=express();
const PORT=3001;
const bodyParser=require('body-parser');
const apiRoutes=require('./routers/index');
const UserRepository=require('./repository/user-repository');
const UserService=require('./services/user-service');
const db=require('./models/index');
const {User,Role}=require('./models/index');
const prepareAndStartServer=()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);
  
  app.listen(PORT,async ()=>{
   // const service=new UserService();
  //  const token=service.createToken({email:'dog@gmail.com',
  //     id:1
  //   });
  //    console.log('token:',token)
  // const data= service.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZ0BnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzg4MTY0MjI2LCJleHAiOjE3ODgxNjc4MjZ9.Tn2OgeNAQae9LqpM6TKPQrCttMDTy1VID6us8CmIquI');
  //  return console.log(data);
  if(process.env.DB_SYNC){
    db.sequelize.sync({alter:true});
  }

  const u1= await User.findByPk(1);
  const r1=await Role.findByPk(3);
   const response= await u1.hasRole(r1)
   console.log(response);
   console.log(`server started at port ${PORT}`);
  

  })
}  
prepareAndStartServer();