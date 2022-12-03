import { Router } from "express";
import { Business } from "../../models";
import { Company } from "../../models"
import { requiresSignin } from "../../middlewares";

const router = Router()

// Queries phone numbers for businesses
router.post("/business/search", async(req, res) =>{
    try{

        let { category, district, town } = req.body;

        let business = await Business.find({category, town, district}).select('phone phone1')

            if (!business){
            return res.status(400).json({
                success: false,
                messages: "No Business found"
            })
        }
        return res.status(200).json({
            success: true,
            business
        })

    }catch(err){
        console.log(err)
    }
})

// query phone numbers for company
router.post("/company/phones", async(req, res)=>{
    try{   
        let { campany_category, district, town } = req.body;

        let company = await Company.find({ campany_category, district, town }).select('phone phone1 campany_category')
        console.log(company)

        if(!company){
            return res.status(400).json({
                success: false,
                message: "No such Data"
            })
        }
        return res.status(200).json({
            success: true,
            company
        })

    }catch(err){
        console.log(err)
    }
})

// query emails for company
router.post("/company/email", async(req, res) => {
    let { email } = req.body;
    const companyEmail = await Company.find({ email });
    if(!companyEmail){
        return res.status(400).json({
            success: false,
            message: 'No Emails Found'
        })
    }
    return res.status(200).json({
        success: true,
        companyEmail
    })
})

export default router;


