import { Router } from 'express'
import { User } from '../models';
import { join } from 'path';
import { randomBytes } from "crypto";
import { DOMAIN } from '../constants';
import sendMain from '../functions/emailSender'
import { userAuth } from '../middlewares/auth';
import Validator from '../middlewares/validater-middleware'
import {  validationResult } from 'express-validator';
import { RegisterValidations, AuthenticateValidations, ResetPassword } from '../validators';
const router = Router()

/**
 * @description User create new account
 * @access Public
 * @api /users/api/register
 * @type POST
 */

router.post('/api/register', RegisterValidations, Validator, async (req, res) => {
    try {

        let { idnumber, email, phonenumber, password } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }

        let user = await User.findOne({ idnumber });
        if (user) {
            return res.status(411).json({
                success: false,
                message: "This Id Number is already registerd",
            })
        }

        // Check if email exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message:
                    "Email is already registered."
            })
        }


        user = new User({
            ...req.body,
            verificationCode: randomBytes(20).toString("hex"),
        })
        await user.save();

        // Send the email to the user with a varification code
        let html = `
        <h1>Hello, ${user.lastname}</h1>
        <p>Please click the following link to verify your account</p>
        <a href="${DOMAIN}users/verify-now/${user.verificationCode}">Verify Now</a>
    `;
        sendMain(user.email, "Verify Account", "Please verify Your Account", html);
        return res.status(201).json({
            success: true,
            message: "Your account is create please verify your email address."
        })


    } catch (error) {
        console.log(error)
        
    }

})

/**
 * @description Users Verify account
 * @access Public
 * @api /users/verify-now
 * @type GET
 */

router.get('/verify-now/:verificationCode', async (req, res) => {
    try {
        let { verificationCode } = req.params;
        let user = await User.findOne({verificationCode});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Invalid verification Code"
            })
        }
        user.verified = true;
        user.verificationCode = undefined;
        await user.save();
        return res.sendFile(join(__dirname, "../templates/verification-success.html"));
    } catch(err){
        console.log(err)
       return res.sendFile(join(__dirname, "../templates/errors.html"));
    }
})

/**
 * @description To authenticate user and the token 
 * @access Public
 * @api /users/api/authenticate
 * @type POST
 */

router.post("/api/authenticate", AuthenticateValidations, Validator, async(req, res) => {
    try{
        let { email, password} = req.body;
        let user = await User.findOne({ email})

        if(!user){
            return res.status(404).json({
                success: false.valueOf,
                message: "Email not found"
            })
        }

        if(!user.verified){
            return res.status(403).json({
                success: false,
                message: "Verify Your Account"
            })
        }
        if (!(await user.comparePassword(password))){
            return res.status(401).json({
                success: false,
                message: "Incorrent password."
            })
        }

        let token = await user.generateJWT();
        return res.status(201).json({
            success: true,
            user: user.getUserInfo(),
            token: `Bearer ${token}`,
            message: 'Your are now login'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            succuss: false,
            message: 'An error occured.'
        })
    }
})

/**
 * @description To get authenticated user 
 * @access Private
 * @api /users/api/authenticate
 * @type POST
 */

 router.get("/api/authenticate", userAuth,
 async(req, res)=>{
    console.log("REQ", req);
    return res.status(200).json({
       user: req.user
    });
})

/**
 * @description To initiate the password reset process
 * @api /users/api/reset-password"
 * @access Public
 * @type POST
 */
router.put("/api/reset-password", ResetPassword, Validator, async(req, res)=>{
    try{
        let { email } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                seccuss: false,
                message: "User with email is not find.",
            });
        }
        if(!user.verified){
            return res.status(403).json({
                success: false,
                message: "Verify Your Account"
            })
        }
        user.generatePasswordReset();
        await user.save();

        // Send the password reset in Email 
        let html = `
        <h1>Hello, ${user.lastname}</h1>
        <p>Please click the following link to reset your passsword</p>
        <a href="${DOMAIN}users/api/reset-password-now/${user.resetPasswordToken}">Verify Now</a>
    `;
        sendMain(user.email, "Reset Password", "Please reset your password", html);
        return res.status(201).json({
            success: true,
            message: "Password Reset Link is sent to your email account"
        });
         
    }catch(error){
        console.log(error)

    }
})


 /**
 * @description Torender reset password page
 * @api /users/api/reset-password-now/:resetPasswordToken
 * @access Restricted by Email
 * @type GET
 */

 router.get('/api/reset-password-now/:resetPasswordToken', async(req, res) => {
     try{
         let { resetPasswordToken }  = req.params;
         let user = await User.findOne({resetPasswordToken,
            resetPasswordExpiresIn: { $gt:Date.now() }, });
         if(!user){
             return res.status(401).json({
                 success: false,
                 message: "Please reset token is expired."
             });
         }
         return res.sendFile(join(__dirname, "../templates/password-reset.html"));

     }catch(error){
         console.log(error)
        return res.sendFile(join(__dirname, "../templates/errors.html"));
     }
 })

 /**
 * @description To get the authanticated user profile
 * @api /users/api/reset-password-now/:resetPasswordToken
 * @access Restricted by Email
 * @type POST
 */
router.post('/api/reset-password-now/:resetPasswordToken', async(req, res)=>{
    try{

        let { resetPasswordToken, password } = req.body;
        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiresIn
        });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Password reset token  is invalid or has expired"
            })
        }
        user.password = password;
        user.resetPasswordToken = undefined;    
        user.resetPasswordExpiresIn = undefined;

        await user.save();
       // Send the password reset in Email 
       let html = `
       <h1>Hello, ${user.lastname}</h1>
       <p>Your Password is reseted Successfully</p>
   `;
       sendMain(user.email, "Reset Password Successfull", "Your password has been changed", html);
       return res.status(200).json({
           success: true,
           message: "Your password request is reseted successfully Now you can login your account"
       });  
    
    }catch(err){
        return res.status(400)({
            success: false,
            message: "Samething Went Wrong"
        })
    }
});

export default router;





