import { Router } from "express";
import { City } from "../models";

const router = Router()

router.post("/api/city", async(req, res) => {
    try{
        
        const {city_name, country } = req.body;

        let city = new City({
            city_name,
            country
        })
        console.log(city)
        await city.save()
        return res.status(201).json({
            success: true,
            message: "City save sucessfuly"
        })

    }catch(err){
        console.log(err)
    }
})

router.get("/api/all", async(req, res) => {
    try{
        const data = await City.find().populate('country').select('city_name')

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