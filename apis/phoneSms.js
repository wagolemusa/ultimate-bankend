import { Router } from "express";
import phoneSms from "../functions/phonesms";
import { userAuth } from '../middlewares/auth';
import PhoneMessages from "../models/PhoneSms";

const router = Router()

router.post("/phone/sms", userAuth, async(req, res) => {

    try{
        let { user } = req;
        let { to, message } = req.body;

        let phone_sms = new PhoneMessages({
            account: user._id,
            to,
            message
        })
        console.log(to)

        await phone_sms.save();
        phoneSms(to, message)
        
    return res.status(201).json({
        success: true,
        message: "SMS send"
    })
    }catch(err){
        console.log(err)
    }
    
})



export default router