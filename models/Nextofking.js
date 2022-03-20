import  { Schema, model } from  'mongoose';

const NextofkingSchema = new Schema({ 

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },
    next:{
        firstname: {
            type: String,
            required: false,
        },
        lastname: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        phonenumber: {
            type: String,
            required: false,
        },
        idnumber: {
            type: String,
            required: false,
        }
    }

}, {timestamps: true});

const Nextofking = model("nextofkings", NextofkingSchema)
export default Nextofking;
