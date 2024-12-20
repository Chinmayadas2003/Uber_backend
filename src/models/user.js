const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, enum: ['driver','passenger']},
    location: {
        type:{
            type: String,//point
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    }
})

//to hash the password and authenticate both work pre save logic
//This is a presaved middleware that runs before a document is saved to a db
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

//.method binds the object to indvidual/specific instance
userSchema.methods.comparePassword= async function (password){
    return bcrypt.compare(password,this.password);
}

const User= mongoose.model('User',userSchema);
module.exports= User;