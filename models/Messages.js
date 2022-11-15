import { Schema, model } from 'mongoose';

const MessagesSchema = new Schema({
    to:[{
        type: String
    }],
    from: {
        type: String,
        require: false
    },
    subject: {
        type: String,
        require: false,
    },
    text: {
        type: String,
        require: false
    },
    html: {
        type: String,
        require: false
    },
    account: {
        ref: "users",
        type: Schema.Types.ObjectId,
    }

}, { timestamps: true });

const Messages = model("messages", MessagesSchema)
export default Messages;
