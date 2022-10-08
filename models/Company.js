import  { Schema, model } from  'mongoose';

const CampanySchema = new Schema({ 

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },
    category: {
        ref: "companycategories",
        type: Schema.Types.ObjectId,
    },
    campany:{
        campany_name: {
            type: String,
            required: false,
        },
        campany: {
            type: String,
            require: false
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

const Campany = model("campany", CampanySchema)
export default Campany;
