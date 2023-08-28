import { Schema, model } from 'mongoose';

const Email_ListSchema = new Schema({

    name:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        require: false
    },
    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true });

const EmailList = model("emails", Email_ListSchema)
export default EmailList;
