import { Router } from "express";
import { userAuth } from "../../middlewares/auth";
import { requiresSignin , adminAuth} from "../../middlewares";
import {PeopleVidate  } from "../../validators";
import {  validationResult } from 'express-validator';
import Validator from '../../middlewares/validater-middleware'
import {  PhonelList } from "../../models"


const router = Router()

router.post("/phone/list",PeopleVidate, requiresSignin,  Validator, async(req, res) => {
    try{
        const { phonenumber } = req.body;
        let { user } = req;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }
        let createPhoneList = await PhonelList.findOne({ phonenumber })
        if(createpeople){
            return res.status(411).json({
                success: false,
                message: "Phone Number already exits"
            })
        } 

        createPhoneList = new PhonelList({
            account: user._id,
            ... req.body
        })

        await createPhoneList.save()
        return res.status(200).json({
            success: true,
            message: "Number Added to the list"
        })
    } catch (error) {
        console.log(error)
        
    }
})


router.get("/phone/list", requiresSignin, async(req, res) => {
   try{
    const data = await PhonelList.find()
    const countPhonelist = await PhonelList.count()
    return res.status(200).json({
        success: true,
        countPhonelist,
        data
    })
   }catch(err){
    console.log(err)
   }
})

export default router;

