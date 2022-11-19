import { Router } from "express";
import { requiresSignin , adminAuth} from "../middlewares";
import {PeopleVidate  } from "../validators";
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import {  Korgas } from "../models"


const router = Router()

router.post("/korgas",PeopleVidate,  Validator, async(req, res) => {

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }
        
        let createpeople = new Korgas({
            ... req.body
        })

        await createpeople.save()
        return res.status(200).json({
            success: true,
            message: "Thanks for Answering Questions"
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

