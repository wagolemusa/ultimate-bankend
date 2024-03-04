import Router from  "express"
import sendMain from "../functions/emailSender";
import Btdata from "../models/Btdata";
import { requiresSignin, adminAuth} from "../middlewares";
import { userAuth } from '../middlewares/auth'
import { v4 as uuidv4 } from 'uuid';
const crypto = require('crypto');

const router = Router()

router.post("/btdata", async(req, res) => {
    try {
       
        // const generateUniqueId = () => {
        //     return uuidv4().split('-').join('').slice(0, 8);
        //   };
        
 

        let {firstname, lastname, age,phone, email} = req.body;
        // let userid = generateUniqueId()

        const userid = crypto.randomInt(10000000,99999999)

        let bt = new Btdata({
           firstname,
           lastname,
            age,
            phone,
            email,
            userid
        })


        console.log("userid", userid)
        console.log("email", email)
        await bt.save()
        let html = `
            <h1>Hello ${bt.firstname, bt.lastname}</h1>
            <h3>This Your ID Number ${userid}}        
        `

       sendMain(bt.email, "Stay With BT", html)

       return res.status(201).json({
        success: true,
        message: "Message Sent",
        bt
    })
    
    }catch(error){
        console.log(error)
    }
})



router.get("/getBtUser",  async(req, res) => {
    try{
     const data = await Btdata.find().sort({_id:-1})
     return res.status(200).json({
         success: true,
         data
     })
    }catch(err){
     console.log(err)
    }
 })

export default router;