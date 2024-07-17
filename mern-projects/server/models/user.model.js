const mongoose=require('mongoose');

const User=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },

},
    {collection:'userdata'}
)


const model=mongoose.model('User',User);
module.exports=model;
