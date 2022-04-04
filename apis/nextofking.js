import { Router } from "express"
import { Nextofking, User } from "../models";
import {userAuth} from '../middlewares/auth'
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import { NextofkingValidation } from '../validators';
const router = Router();

 /**
 * @description Create next of king profile
 * @api /nextofking/api/next/king
 * @access Private 
 * @type POST
 */

 router.post("/api/next/king", userAuth, NextofkingValidation, Validator, async(req, res) => {
    try{
        let { body, user } = req;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }

        let nextofking = new Nextofking({
            next: body,
            account: user._id
        });
        await nextofking.save()

        return res.status(201).json({
            success: true,
            message: "Next of king was created Successfully"
        })

    }catch(error){
        console.log(error)
    }
 })

 /**
 * @description Get next of king profile
 * @api /nextofking/api/next/king
 * @access Private 
 * @type GET
 */
 router.get("/api/next-of-king", userAuth,  async(req, res) => {

    try{
        let nextking = await Nextofking.findOne({account: req.user._id})
        if(!nextking){
            return res.status(400).json({
                success: false,
                message: "Next of King not found"
            })
        }
        return res.status(200).json({
            success: true,
            nextking,
        });
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Something went Wrong"
        })
    }
 })

 /**
 * @description Update next of king profile
 * @api /nextofking/api/update-next-of-king
 * @access Private 
 * @type PUT
 */

 router.put("/api/update-next-of-king", userAuth, NextofkingValidation, Validator, async(req, res) => {
    try{
        let { body, user } = req;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }

        let nextking = await Nextofking.findOneAndUpdate(
            { account: user._id },
            { next: body },
            { new : true }
        )
        return res.status(200).json({
            success: true,
            message: "Your next of king is updated successfully",
            nextking
        })
    }catch(error){
        console.log(error)
        
    }
 })


export default router