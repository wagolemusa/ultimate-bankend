import { Schema, model } from 'mongoose';

const KorgasSchema = new Schema({

    name: {
        type: String,
        required: false,
    },
    phonenumber: {
        type: String,
        required: false,
    },
    sex: {
        type: String,
        require: false
    },
    district: {
        type: String,
        require: false
    },
    town:{
        type: String,
        require: false
    }

}, { timestamps: true });

const Korgas = model("korgas", KorgasSchema)
export default Korgas;
