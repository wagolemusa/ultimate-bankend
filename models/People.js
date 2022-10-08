import  { Schema, model } from  'mongoose';

const PeopleSchema = new Schema({ 

    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    },
    people:{
        name: {
            type: String,
            required: false,
        },
        phonenumber: {
            type: String,
            required: false,
        }
    }

}, {timestamps: true});

const People = model("people", PeopleSchema)
export default People;
