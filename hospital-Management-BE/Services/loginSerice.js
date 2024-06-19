const express=require('express')
const {getLogin,login,resetPassword,register}=require('../Controller/loginController')

const router=express.Router()
router.get('/user/get', getLogin);
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/reset-password', resetPassword);

module.exports=router


