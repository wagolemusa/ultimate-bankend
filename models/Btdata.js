import { Schema, model } from "mongoose";


const BtdataSchema = new Schema({

    firstname: {
        type: String,
        required: false,
    },
    lastname:{
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false
    },
    phone : {
        type: Number,
        required: false,
    },
    email : {
        type: String,
        required: false
    },
    userid: {
        type: String,
        required: false
    }

})

const btdata = model("btdata", BtdataSchema)
export default btdata;



