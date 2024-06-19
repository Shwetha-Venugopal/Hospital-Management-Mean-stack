const express=require('express')
const {deleteDoctor,updateDoctor,saveDoctorList,getDoctorList}=require('../Controller/docterController')

const router=express.Router()

router.get('/doctor/get',getDoctorList)
router.post('/doctor/add', saveDoctorList)
router.put('/doctor/update/:id',updateDoctor)
router.delete('/doctor/delete/:id',deleteDoctor)

module.exports=router
