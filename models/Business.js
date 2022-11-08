import { Schema, model } from 'mongoose';

const BusinessSchema = new Schema({
    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },
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
    status: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false,
    },

    sociallink: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    town: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Business = model("business", BusinessSchema)
export default Business;
