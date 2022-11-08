import Router from  "express"
import mulitemail from "../functions/muiltemail";
import Messages from "../models/Messages";
import { requiresSignin, adminAuth} from "../middlewares";
import { userAuth } from '../middlewares/auth'

const router = Router()

router.post("/message", userAuth, async(req, res) => {
    try {
        let {  user } = req;

        let {to,  subject, text, html} = req.body;

        let sendMessage = new Messages({
            account: user._id,
            to,
            subject,
            text,
            html
        })
        console.log(to)
        await sendMessage.save()
       mulitemail(to, subject, text, html)
       return res.status(201).json({
        success: true,
        message: "Message Sent"
    })
    
    }catch(error){
        console.log(error)
    }
})


export default router;