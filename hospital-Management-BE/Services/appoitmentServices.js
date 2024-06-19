const {DeleteAppoitment,updateApoitment,getAppoitment,saveAppoitment}=require('../Controller/appoitmentController')
const express=require('express')

const router =express.Router()

router.get('/appoitment/get',getAppoitment)
router.post('/appoitment/add',saveAppoitment)
router.put('/appoitment/update/:id',updateApoitment)
router.delete('/appoitment/delete/:id',DeleteAppoitment)

module.exports=router

