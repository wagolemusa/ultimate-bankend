import { Router } from "express";
import { Business } from "../models";
import {userAuth} from '../middlewares/auth'
import { phoneValidation } from "../validators";
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'


const router = Router()

router.post("/business", phoneValidation, userAuth, Validator, async(req, res) =>{
    try{
       
        let { body, user} = req;

        let { phone, phone1 } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }
        
        // checking if phone one exits
        let createbusiness1 = await Business.findOne({ phone})
        console.log(createbusiness1)
        if (createbusiness1) {
            return res.status(411).json({
                success: false,
                message: "Phone number is already exits"
            })
        }

        // Checking phone if exits
        let createbusiness2 = await Business.findOne({ phone1 });
        console.log(createbusiness2)
        if(createbusiness2){
            return res.status(411).json({
                success: false,
                message: "Phone number two is already exits"
            })
        }

        let createbusiness = new Business({
            account: user._id,
            ... req.body
            // business: body,
            // catgory: body
        })
        console.log(createbusiness)
        await createbusiness.save()
        return res.status(201).json({
            success: true,
            message: "Business was created successfuly"
        })

    }catch(error){
        console.log(error)
    }
})

router.get("/business", async (req, res) => {
    try {
        const data = await Business.find()
        return res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        console.log(err)
    }
})


export default router;
