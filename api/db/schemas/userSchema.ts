import mongoose from 'mongoose'
const {Schema} = mongoose

const userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    pins:[String]
})

export const userModel = mongoose.model('user',userSchema);