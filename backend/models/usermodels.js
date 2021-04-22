import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type : String, required : true },
    email: { type : String, required : true, unique : true  },
    password: { type : String, required : true },
    isAdmin: { type : Boolean, required : true },
    address: { type : String, required : false },
    isProducer: { type : Boolean, required : true },
    isConsumer: { type : Boolean, required : true }

}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);
export default User;