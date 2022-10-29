import { Router } from "express";
import { Business } from "../models";
import {userAuth} from '../middlewares/auth'


const router = Router()

router.post("/business", userAuth,  async(req, res) =>{
    try{
       
        let { body, user} = req;

        let { phone, phone1, email, email1 } = req.body;
        
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

        // Checking email if exits
        let createbusiness3 = await Business.findOne({ email });
        console.log(createbusiness3)
        if(createbusiness3){
            return res.status(411).json({
                success: false,
                message: "Email is already exits"
            })
        }

        // checking email two if exits
      let  createbusiness4 = await Business.findOne({ email1 });
        if (createbusiness4){
            return res.status(411).json({
                success: false,
                message: "Email two already exits"
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

    }catch(err){
        console.log(err)
    }
})

router.get("/business", async(req, res) => {
    try{

        let { phone } = req.body;
        const data = await Business.findOne({ phone })

        return res.status(200).json({
            success: true,
            data
        })
    }catch(err){
        console.log(err)
    }
})

export default router;
