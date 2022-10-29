import  { Schema, model } from  'mongoose';

const LocationSchema = new Schema({ 

    country: {
        ref: "countries",
        type: Schema.Types.ObjectId,
    },
    city: {
        ref: "cities",
        type: Schema.Types.ObjectId,
    }

}, {timestamps: true});

const Location = model("locations", LocationSchema)
export default Location;
