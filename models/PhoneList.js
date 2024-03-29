import { Schema, model } from 'mongoose';

const Phone_ListSchema = new Schema({

    name:{
        type: String,
        required: false,
    },
    phonenumber: {
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

const PhonelList = model("Phones", Phone_ListSchema)
export default PhonelList;
