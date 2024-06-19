const patientSchema=require('../Model/patientSchema')


let getPatient=async (req,res,next)=>{
    try{
        let patientList=await patientSchema.find()
        res.status(200).send(patientList)
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}

let savePatient=async (req,res,next)=>{
    try{
        const savePatientList=new patientSchema({
            name:req.body.name,
            age:req.body.age,
            gender:req.body.gender,
        })
        await savePatientList.save()
        res.status(201).send({msg:'Saved Successfuly'})
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}


let updatePatient=async (req,res,next)=>{
    const patientId=req.params.id
    const {name,age,gender}=req.body
    try{
        const patientList=await patientSchema.findById(patientId)
        if(!patientList){
            res.status(404).send({msg:'Not Found'})
        }else{
            patientList.name=name
            patientList.age=age
            patientList.gender=gender
            await patientList.save()
            res.status(200).send({msg:'Updated Sucessfully'})
        }

    }catch(error){
        res.status(200).send({msg:error.message})
    }
}

let deletePatient=async (req,res,next)=>{
    console.log(req)
    const patientId=req.params.id
    
    try{
        await patientSchema.findByIdAndDelete(patientId)
        res.status(200).send({msg:'Deleted Successfully'})
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}


module.exports={deletePatient,updatePatient,getPatient, savePatient}