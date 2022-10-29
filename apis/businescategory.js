import { Router } from "express";
import { Businesscategories } from "../models";

const router = Router()

router.post("/api/", async(req, res) => {
    try{

        const { name } = req.body;

        let businessCategory =  new Businesscategories ({
            name
        })
        await businessCategory.save()
        return res.status(201).json({
            success: true,
            message: "Business Category save Successfuly"
        })

    }catch(err){
        console.log(err)
    }
})


router.get("/api/business", async(req, res) => {
    try{
        const data = await Businesscategories.find()

        return res.status(200).json({
            success: true,
            data
        })
    }catch(err){
        console.log(err)
    }
})

export default router
