import { Router } from "express";
import { Companycategory } from "../models";

const router = Router()

router.post("/companycategory", async(req, res) => {

    try{
        const { name } = req.body;

        let companycate = new Companycategory({
            name
        })
    
        await companycate.save();
        return res.status(201).json({
            success: true,
            message: "Company Categories saved sussessfuly"
            
        })
    }catch(err){
        console.log(err)
    }
})


router.get("/companycategory", async(req, res) => {
    try{
        const data = await Companycategory.find()
    
        return res.status(200).json({
            success: true,
            data
        })
    
    }catch(err){
        console.log(err);
    }
})

export default router;