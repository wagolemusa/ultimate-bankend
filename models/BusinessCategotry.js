import  { Schema, model } from  'mongoose';

const BusinessCategotrySchema = new Schema({ 

    name: {
        type: String,
        required: false,
    }


}, {timestamps: true});

const Businesscategories = model("businesscategories", BusinessCategotrySchema)
export default Businesscategories;
