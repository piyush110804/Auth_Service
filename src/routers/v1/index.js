const express=require('express');
const router=express.Router();
const UserController=require('../../controllers/user-controller');
const {authValidation}=require('../../middlewares/index');

router.post('/signup',
 authValidation.validateUserAuth,
  UserController.create);
router.post('/signin',
   authValidation.validateUserAuth,
  UserController.signIn);

router.get('/isauthenticated',UserController.isAuthenticated);
router.get('/isAdmin',
  authValidation.validateIsAdmin,
  UserController.isAdmin);
module.exports=router;

