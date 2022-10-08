import  { Schema, model } from  'mongoose';

const CitySchema = new Schema({ 

    city_name: {
        type: String,
        required: false,
    }


}, {timestamps: true});

const City = model("cities", CitySchema)
export default City;
