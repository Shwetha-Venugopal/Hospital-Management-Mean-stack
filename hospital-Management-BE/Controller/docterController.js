const doctorSchema=require('../Model/doctorDeatil')


let getDoctorList=async (req,res,next)=>{
    try{
        let newList=await doctorSchema.find()
        res.status(200).send(newList)
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}



let saveDoctorList=async (req,res,next)=>{
    
    try{
        let saveDoctor=new doctorSchema({
            doctorName:req.body.doctorName,
            specialityId:req.body.specialityId
        })
        console.log('Doctor to save:', saveDoctor);
        let saveList=await saveDoctor.save()
        console.log('Doctor to saved successfully:' ,saveList);
        res.status(201).send({msg:'Doctor Added Successfully'})
        
    }catch(error){
        console.error('Error saving doctor:', error);
        res.status(400).send({msg:error.message})
    }

}


let updateDoctor=async (req,res,next)=>{
    console.log(req)
        const doctorId = req.params.id;
        let { doctorName, specialityId } = req.body;
        
    
        try {
            let doctorData = await doctorSchema.findById(doctorId);
            if (!doctorData) {
                return res.status(404).send({ msg: 'Doctor not found' });
            }
    
            doctorData.doctorName = doctorName;
            doctorData.specialityId = specialityId;
            await doctorData.save();
    
            res.status(200).send({ msg: 'Doctor updated successfully', doctor: doctorData });
        } catch (error) {
            console.error('Error updating doctor:', error);
            res.status(500).send({ msg: 'Internal Server Error' });
        }
    };



let deleteDoctor=async (req,res,next)=>{
    let  doctorId=req.params.id
    console.log(doctorId)
    try{
        await doctorSchema.findByIdAndDelete(doctorId)
        res.status(200).send({msg:'Deleted Successfully'})
    }catch{
        res.status(500).send({msg:' Internal Server Error'})
    }
}


module.exports={deleteDoctor,updateDoctor,saveDoctorList,getDoctorList}