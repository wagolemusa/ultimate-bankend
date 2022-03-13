import { Router } from "express"
import { Profile, User } from "../models";
import { DOMAIN } from "../constants";
import {userAuth} from '../middlewares/auth'
import uploader from "../middlewares/uploader";

const router = Router();

 /**
 * @description Create user profile
 * @api /profile/api/create-profile
 * @access Private 
 * @type POST <multe-form > request 
 */
 router.post("/api/create-profile", userAuth, uploader.single("avatar"), async(req, res) => {
    try{
        let { body, file, user } = req;
        let path = DOMAIN + file.path.split("uploads/")[1];
        let profile = new Profile({
            social: body,
            account: user._id,
            avatar: path,
        });
        await profile.save()
        return res.status(201).json({
            success: true,
            message: "Your Profile was created successfully"
        });
    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Unable to create your profile"
        })
    }
 })

  /**
 * @description Get the authentinicated user's profile
 * @api /profiles/api/my-profile
 * @access Private 
 * @type GET 
 */

router.get("/api/my-profile", userAuth, async(req, res) => {

    try{
        let profile = await Profile.findOne({ account: req.user._id }).populate(
            "account", 
            "firstname lastname middlename phonenumber idnumber email"
        )
        if(!profile){
            return res.status(404).json({
                success: false,
                message: "Your profile is not available"
            })
        }
        return res.status(200).json({
            success: true,
            profile,
        });
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            messsage: "Unable to get the profile"
        })
    }
})


  /**
 * @description Update authentinicated user's profile
 * @api /profiles/api/update-profile
 * @access Private 
 * @type PUT
 */

router.put("/api/update-profile", userAuth, uploader.single("avatar"), async(req, res) => {
    try{
        let { body, file, user } = req; 
        let path  = DOMAIN + file.path.split("uploads/")[1];
        let profile = await Profile.findOneAndUpdate(
            { account: user._id },
            { social: body, avatar: path },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Your profile is now updated",
            profile,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Unable to update profile"
        })

    }
})


  /**
 * @description Get user by last name
 * @api /profiles/api/profile-user/:lastname
 * @access Public
 * @type GET
 */

  router.get("/api/profile-user/:lastname", async(req, res) => {
      try{
        let { lastname } = req.params;
        let user = await User.findOne({ lastname });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Not found",
            });
        }
        let profile = await Profile.findOne({ account: user._id});
        return res.status(200).json({
            profile: {
                ...profile.toObject(),
                account: user.getUserInfo()
            },
            success: true,
            // user: user.getUserInfo(),
        });

      }catch(err){
          console.log(err)
          return res.status(400).json({
              success: false,
              message: "Samething Went Wrong."
          })

      }
  })
export default router;