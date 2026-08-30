const express=require('express');
const app=express();
const PORT=3001;
const prepareAndStartServer=()=>{
  app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
  })
}  
prepareAndStartServer();