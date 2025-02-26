import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token: String, 
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;