import { Schema, model } from 'mongoose';

const CampanySchema = new Schema({

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },

    company_name: {
        type: String,
        required: false,
    },
    campany_category: {
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
    },
    status: {
        type: String,
        require: false,
    },
    country: {
        type: String,
        required: false
    },
    district: {
        type: String,
        require: false
    },
    town: {
        type: String,
        require: false
    }


}, { timestamps: true });

const Company = model("company", CampanySchema)
export default Company;
