import { Router } from "express";
import { Country } from "../models";

const router = Router();

 /**
 * @description Create country
 * @api /country/api/country
 * @access Private 
 * @type POST 
 */

 router.post("/api/country", async(req, res) => {

    try{
       const { country_name } = req.body;
       let country = new Country({
            country_name
        })
        console.log(country)
        await country.save()
    
        return res.status(201).json({
            success: true,
            message: "Country was created Successfully"
        })

    } catch(err){
        console.log(err)
    }
 } )


router.get("/api/all", async(req, res) => {
    try{
        const data = await Country.find().populate({}).select('country_name')

        console.log(data)
        return res.status(200).json({
            success: true,
            data
        })

    }catch(err){
        console.log(err)
    }
})



export default router;
