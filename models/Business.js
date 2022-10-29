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
        require: false
    },
    website: {
        type: String,
        required: false,
    },

    sociallink: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        require: false
    },
    town: {
        type: String,
        require: false
    },
    category: {
        ref: "businesscategories",
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true });

const Business = model("business", BusinessSchema)
export default Business;
