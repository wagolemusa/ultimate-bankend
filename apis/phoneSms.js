import { Router } from "express";
import phoneSms from "../functions/phonesms";
import { userAuth } from '../middlewares/auth';
import PhoneMessages from "../models/PhoneSms";

const router = Router()

router.post("/phone/sms", userAuth, async(req, res) => {

    try{
        let { user } = req;
        let { to, message } = req.body;

        to = to.split(",").map(item =>(`+${item.trim()}`))
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


router.get('/number/sms', async(req, res) => {
    try{

        // let { to } = req

        // const phone = await PhoneMessages.find()     
        const phone = await PhoneMessages.find().populate().select('to').sort( [['_id', -1]] ).limit(1)

        console.log(phone)

        // let num = []

        // for (let i of phone){
        //     num.push(""+"+"+i +"")
        // }

        // console.log(num)

        return res.status(200).json({
            success: true,
            phone
        })

    }catch(err){
        console.log(err)
    }
})



export default router