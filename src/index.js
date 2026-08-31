const express=require('express');
const app=express();
const PORT=3001;
const bodyParser=require('body-parser');
const apiRoutes=require('./routers/index');
const UserRepository=require('./repository/user-repository');
const UserService=require('./services/user-service');

const prepareAndStartServer=()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);
  
  app.listen(PORT,async ()=>{
    const service=new UserService();
  //  const token=service.createToken({email:'dog@gmail.com',
  //     id:1
  //   });
  //    console.log('token:',token)
  const data= service.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZ0BnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzg4MTY0MjI2LCJleHAiOjE3ODgxNjc4MjZ9.Tn2OgeNAQae9LqpM6TKPQrCttMDTy1VID6us8CmIquI');
   return console.log(data);
   console.log(`server started at port ${PORT}`);


  })
}  
prepareAndStartServer();