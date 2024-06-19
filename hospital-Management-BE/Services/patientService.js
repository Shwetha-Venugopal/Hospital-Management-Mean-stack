const express=require('express')
const {deletePatient,updatePatient,getPatient, savePatient}=require('../Controller/patientController')

const router=express.Router()

router.get('/patient/get',getPatient)
router.post('/patient/add',savePatient)
router.put('/patient/update/:id',updatePatient)
router.delete('/patient/delete/:id',deletePatient)

module.exports=router