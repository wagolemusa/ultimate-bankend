import { Schema, model } from 'mongoose';

const PeopleSchema = new Schema({

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },

    name: {
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
    country: {
        type: String,
        required: false
    },
    district: {
        type: String,
        require: false
    }

}, { timestamps: true });

const People = model("people", PeopleSchema)
export default People;
