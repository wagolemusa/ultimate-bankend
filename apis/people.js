import { Router } from "express";
import { userAuth } from "../middlewares/auth";
import { requiresSignin , adminAuth} from "../middlewares";
import {PeopleVidate  } from "../validators";
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import {  People } from "../models"


const router = Router()

router.post("/people", PeopleVidate, requiresSignin,  Validator, async(req, res) => {

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
        let createpeople = await People.findOne({ phonenumber })
        if(createpeople){
            return res.status(411).json({
                success: false,
                message: "Phone Number already exits"
            })
        } 

         createpeople = new People({
            account: user.id,
            ... req.body
        })

        await createpeople.save()
        return res.status(200).json({
            success: true,
            message: "Created people Successfuly"
        })
    } catch (error) {
        console.log(error)
        
    }
})


router.get("/people",adminAuth,  async(req, res) => {
   try{
    const data = await People.find()
    const countPeople = await People.count()
    return res.status(200).json({
        success: true,
        countPeople,
        data
    })
   }catch(err){
    console.log(err)
   }
})

export default router;

