import { Router } from "express";
import { userAuth } from "../middlewares/auth";
import { requiresSignin , adminAuth} from "../middlewares";
import {  People } from "../models"


const router = Router()

router.post("/people", requiresSignin, async(req, res) => {

    try{
        const { phonenumber } = req.body;
        let { user } = req;

        let createpeople = await People.findOne({ phonenumber })
        if(createpeople){
            return res.status(411).json({
                success: false,
                message: "Phone Number already exits"
            })
        } 

         createpeople = new People({
            account: user._id,
            ... req.body
        })

        await createpeople.save()
        return res.status(200).json({
            success: true,
            message: "Created people Successfuly"
        })
    }catch(err){
        console.log(err)
    }  
})


router.get("/people",adminAuth,  async(req, res) => {
   try{
    const data = await People.find()
    return res.status(200).json({
        success: true,
        data
    })
   }catch(err){
    console.log(err)
   }
})

export default router;
