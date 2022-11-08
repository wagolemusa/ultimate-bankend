import { Schema, model } from 'mongoose';

const PhoneSmsSchema = new Schema({
    to:[{
        type: String
    }],
    message: {
        type: String,
        require: false,
    },
    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    }

}, { timestamps: true });

const PhoneMessages = model("phones", PhoneSmsSchema)
export default PhoneMessages;