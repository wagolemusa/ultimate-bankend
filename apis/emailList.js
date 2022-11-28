import { Router } from "express";
import { requiresSignin , adminAuth} from "../middlewares";
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import {  EmailList } from "../models"


const router = Router()

router.post("/email/list", validationResult, Validator, async(req, res) => {
    try {
        let { email } = req.body;
        let { user } = req;
        let  emailList  = await EmailList.findOne({ email })

        if(emailList){
            return res.status(401).json({
                success: false,
                message: `This email ${email} exits in your Email Listing`
            })
        }

        emailList = new EmailList ({
            account: user._id,
            ...req.body
        })
        await emailList.save()
        return res.status(201).json({
            success: false,
            message: "Email was added to a list"
        })

    }catch(err){
        console.log(err)
    }

})


router.get("/email/list", async(req, res) => {
    try{
        const data = EmailList.find();
        return res.status(200).json({
            success: false,
            data
        })
    }catch(err){
        console.log(err)
    }
})

export default router