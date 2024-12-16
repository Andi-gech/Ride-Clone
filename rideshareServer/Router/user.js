const express=require('express')
const mongoose=require('mongoose')
const axios=require('axios')
const Router=express.Router()
const {User,validateuser,validateuserUpdate }=require('../Model/user')
const jwt = require('jsonwebtoken');

const OTP = mongoose.model('OTP', {
    phone: {type: Number, required: true},
    otp: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 3 * 60 * 1000) }, // Expires in 3 minutes
});

Router.get('',async(req,res)=>{

    try{
    const user=await User.find()
        res.send(user)
        }
        catch(err){
            res.status(500).send({message:err.message})
        }
})
Router.post('/send-otps',async(req,res)=>{

    try{
        const {error}=validateuser(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const phone = req.body.phone;
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
        // Generate a random 4-digit OTP
        const saveotp=new OTP({ phone, otp });
        await saveotp.save();
   
        await axios.post('https://app.nativenotify.com/api/notification', {
            appId: 20102,
            appToken: 'kuOxw3Bdzg86CJTpNKc76j',
            title: 'Your Test Api',
            body: `Your Ride app OTP is ${otp}`,
            dateSent: new Date().toISOString(),
        });


        
        res.send('otp sent sucessfully')
    }
    catch(err){
        res.status(500).send({message:err.message})
    }

})
Router.post('/verify-otp', async (req, res) => {
    try {
        const { otp,phone } = req.body;

        // Retrieve OTP from MongoDB
        const storedOTP = await OTP.findOne({phone}).sort({ createdAt: -1 });
        console.log(phone)
        console.log(otp)
    

        if (!storedOTP) {
            return res.status(400).send({ message: 'OTP not found. Please request a new OTP.' });
        }

        // Check if OTP has expired
        if (storedOTP.expiresAt < new Date()) {

            await OTP.deleteOne({ phone }); // Remove expired OTP from the database

            return res.status(400).send({ message: 'OTP has expired. Please request a new OTP.' });
        }

        if (otp === storedOTP.otp) {
            
            await OTP.deleteOne({ phone });
          
            const { error } = validateuser({phone:phone});
            if (error) return res.status(400).send(error.details[0].message);
            var user = await User.findOne({ phone }); 
            if (!user) {
                
                user = new User({ phone });
                await user.save();
            }

    

            const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
            res.send({ token });
        } else {
            res.status(400).send({ message: 'Invalid OTP. Please try again.' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


Router.put('/:id',async(req,res)=>{

    try{
        const {error}=validateuserUpdate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!user) return res.status(404).send('user not found')
        res.send(user)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})
Router.delete('/:id',async(req,res)=>{

    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send('The user with the given ID was not found.')
        res.send(user)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})
Router.get('/:id',async(req,res)=>{

    try{
    const user=await User.findById(req.params.id)
        res.send(user)
        }
        catch(err){
            res.status(500).send({message:err.message})
        }
})
module.exports=Router