const express=require('express');
const app=express();
const PORT=3001;
const bodyParser=require('body-parser');
const apiRoutes=require('./routers/index');
const UserRepository=require('./repository/user-repository');
const prepareAndStartServer=()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);
  
  app.listen(PORT,async ()=>{
    const repo=new UserRepository();
      const response=await repo.getUser(1);
      console.log(response);
    console.log(`server started at port ${PORT}`);
  })
}  
prepareAndStartServer();