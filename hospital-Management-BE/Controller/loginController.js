const loginSchema=require('../Model/loginSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
JWT_SECRET_KEY='shwetha'

let getLogin=async (req,res,next)=>{
    try{
        let loginList=await loginSchema.find()
        res.status(200).send(loginList)
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}

let register = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        const existingUser = await loginSchema.findOne({ userName });
        if (existingUser) {
            return res.status(400).send({ msg: 'Username already exists' });
        }
        const existingEmail = await loginSchema.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ msg: 'Email already registered' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new loginSchema({ userName, password: hashedPassword, email });
        await newUser.save();

        res.status(201).send({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

let login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await loginSchema.findOne({ userName });

        if (!user) {
            return res.status(401).send({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, userName: user.userName },
                JWT_SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

let resetPassword = async (req, res,next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await loginSchema.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({ msg: 'Password reset successfully' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
module.exports={getLogin,login,resetPassword,register}