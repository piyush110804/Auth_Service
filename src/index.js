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
  if(process.env.DB_SYNC){
    db.sequelize.sync({alter:true});
  }

   console.log(`server started at port ${PORT}`);
  

  })
}  
prepareAndStartServer();