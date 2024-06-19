const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const specialistRouter = require('./Services/specialityService');
const doctorRouter=require('./Services/doctorService')
const appoitmentRouter=require('./Services/appoitmentServices')
const PatientRouter=require('./Services/patientService')
const loginRouter=require('./Services/loginSerice')
const MONGO_URI = "mongodb://localhost:27017/hospital";
const PORT = 9000;
const app = express();
app.use(cors({
  origin: 'http://localhost:52804' 
}));

app.use(express.json());



app.use('/api', specialistRouter); 
app.use('/api', doctorRouter); 
app.use('/api', appoitmentRouter); 
app.use('/api', PatientRouter); 
app.use('/api', loginRouter);



mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB!");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1); 
});


app.listen(PORT, () => {
  console.log(`Server started running on http://localhost:${PORT}`);
});
