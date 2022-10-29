import  { Schema, model } from  'mongoose';

const CompanyCategorySchema = new Schema({ 

    name: {
        type: String,
        required: false,
    }


}, {timestamps: true});

const Companycategory = model("companycategories", CompanyCategorySchema)
export default Companycategory;
