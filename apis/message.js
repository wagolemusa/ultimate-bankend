import Router from  "express"
import mulitemail from "../functions/muiltemail";
import Messages from "../models/Messages";
import { requiresSignin, adminAuth} from "../middlewares";
import { userAuth } from '../middlewares/auth'

const router = Router()

router.post("/message", userAuth, async(req, res) => {
    try {
        let {  user } = req;

        let {to, from, subject, text, html} = req.body;
        
        to = to.split(",").map(item =>(`${item.trim()}`))

        let sendMessage = new Messages({
            account: user._id,
            to,
            from,
            subject,
            text,
            html
        })
        console.log(to)
        console.log(from)
        await sendMessage.save()
       mulitemail(to, from, subject, text, html)
       return res.status(201).json({
        success: true,
        message: "Message Sent"
    })
    
    }catch(error){
        console.log(error)
    }
})


export default router;