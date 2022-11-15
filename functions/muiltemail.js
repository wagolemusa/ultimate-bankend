import sgMail from '@sendgrid/mail';
import { SENDGRID_API, HOST_EMAIL } from '../constants'

sgMail.setApiKey(SENDGRID_API);

const  mulitemail = async (email, from, subject, text, html) =>{
    try{
        const msg = {
            to: email,
            from,
            subject,
            text,
            html,
        };
        await sgMail.sendMultiple(msg);
        console.log("MAIL_SENT");
    } catch(error){
        console.log(error);
    }finally{
        return;
    }
}

export default mulitemail;