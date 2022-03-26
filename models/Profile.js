import  { Schema, model } from  'mongoose';

const ProfileSchema = new Schema({

     account: {
         ref: "users",
         type: Schema.Types.ObjectId,
     },
    social: {
        facebook:{
            type: String,
            required: false,
        },
        twitter: {
            type: String,
             required: false,
        },
        linkedin: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
        avatar:{
            type: String,
            required: false,
        },
    }
}, { timestamps: true });


const Profile = model("profiles", ProfileSchema)
export default Profile;

