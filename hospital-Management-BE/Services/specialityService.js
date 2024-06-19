const express=require('express')
const {getSpecilaty,postSpecality}=require('../Controller/specialityController')

const router=express.Router()
router.get('/specialist/get',getSpecilaty)
router.post('/specialist/add',postSpecality)
console.log("hello")

module.exports=router