import  { Schema, model } from  'mongoose';

const CitySchema = new Schema({ 

    city_name: {
        type: String,
        required: false,
    },
    country: [
        {type: Schema.Types.ObjectId,ref: "countries"}
    ]


}, {timestamps: true});

const City = model("cities", CitySchema)
export default City;
