import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: 'The title field is required.'
    },
   UserEmail: {
        type: String,
      //  required: 'The Details field is required.'
    },
    Password: {
        type: String,
        required: 'Starting Location is required.'
    }

}, 

);
const UserAuth = mongoose.model('UserAuth',authSchema);

export default UserAuth;
