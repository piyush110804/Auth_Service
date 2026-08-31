const express=require('express');
const app=express();
const PORT=3001;
const bodyParser=require('body-parser');
const apiRoutes=require('./routers/index');
const prepareAndStartServer=()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);

  app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
  })
}  
prepareAndStartServer();