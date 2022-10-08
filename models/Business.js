import  { Schema, model } from  'mongoose';

const BusinessSchema = new Schema({ 

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },
    category: {
        ref: "businesscategories",
        type: Schema.Types.ObjectId,
    },
    next:{
        business_name: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        phone1: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        email1: {
            type: String,
            required: false,
        },
        website: {
            type: String,
            required: false,
        },
        sociallink: {
            type: String,
            required: false,
        }
    }

}, {timestamps: true});

const Business = model("business", BusinessSchema)
export default Business;
