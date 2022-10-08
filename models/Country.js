import  { Schema, model } from  'mongoose';

const CountrySchema = new Schema({ 

    country_name: {
        type: String,
        required: false,
    }


}, {timestamps: true});

const Country = model("countries", CountrySchema)
export default Country;
