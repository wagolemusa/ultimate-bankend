import { Router } from "express";
import { requiresSignin , adminAuth} from "../middlewares";
import {PeopleVidate  } from "../validators";
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import {  Korgas } from "../models"


const router = Router()

router.post("/korgas",PeopleVidate,  Validator, async(req, res) => {

    try{
        const { phonenumber } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }

        let createpeople = await Korgas.findOne({ phonenumber })
        if(createpeople){
            return res.status(411).json({
                success: false,
                message: "You have already submitted your Answers"
            })
        } 
        
        createpeople = new Korgas({
            ... req.body
        })

        await createpeople.save()
        return res.status(200).json({
            success: true,
            message: "Thanks. We will call you"
        })
    } catch (error) {
        console.log(error)
        
    }
})


router.get("/korgas",adminAuth,  async(req, res) => {
   try{
    const data = await Korgas.find()
    return res.status(200).json({
        success: true,
        data
    })
   }catch(err){
    console.log(err)
   }
})

export default router;

