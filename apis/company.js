import { Router } from "express";
import { Company } from "../models";
import { userAuth } from '../middlewares/auth'


const router = Router()

router.post("/company", userAuth, async (req, res) => {
    try {

        let { body, user} = req;

        let { phone, phone1, email, email1 } = req.body;

        // checking if phone one exits
        let createcompany = await Company.findOne({ phone });
        if (createcompany) {
            return res.status(411).json({
                success: false,
                message: "Phone number is already exits"
            })
        }

        // Checking phone if exits
        createcompany = await Company.findOne({ phone1 });
        if (createcompany) {
            return res.status(411).json({
                success: false,
                message: "Phone number two is already exits"
            })
        }

        // Checking email if exits
        createcompany = await Company.findOne({ email });
        if (createcompany) {
            return res.status(411).json({
                success: false,
                message: "Email is already exits"
            })
        }

        // checking email two if exits
        createcompany = await Company.findOne({ email1 });
        if (createcompany) {
            return res.status(411).json({
                success: false,
                message: "Email two already exits"
            })
        }

        createcompany = new Company({
            account: user._id,
            ...req.body
        })
        console.log(createcompany)
        await createcompany.save()

        return res.status(201).json({
            success: true,
            message: "Company was created successfuly"
        })

    } catch (err) {
        console.log(err)
    }
})

router.get("/company", async (req, res) => {
    try {
        const data = await Company.find()

        console.log(data)
        return res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        console.log(err)
    }
})

export default router;
